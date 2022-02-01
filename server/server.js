import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import axios from 'axios'
import cookieParser from 'cookie-parser'
import Root from '../client/config/root'

import Html from '../client/html'

require('colors')
const { readFile, writeFile, stat, unlink } = require('fs').promises

const ADDRES_TO_PATH = {
  '/api/v1/users/': './data/users.json',
  '/api/v1/users': './data/users.json'
}
const DATA_TO_FILE_FROM_URL = {
  './data/users.json': 'https://jsonplaceholder.typicode.com/users'
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const setHeaders = (req, res, next) => {
  res.setHeaders('x-skillcrucial-user', '5b7a818e-af0f-4f2c-bba0-21b400fe5cbc')
  res.setHeaders('Access-Control-Expose-Headers', 'X-SKILLCRUCIAL-USER')
  next()
}

const middleware = [
  cors(),
  (req, res, next) => {
    res.set('x-skillcrucial-user', '5b7a818e-af0f-4f2c-bba0-21b400fe5cbc')
    res.set('Access-Control-Expose-Headers', 'X-SKILLCRUCIAL-USER')
    next()
  },
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

const echo = sockjs.createServer(setHeaders)
echo.on('connection', (conn) => {
  connections.push(conn)
  conn.on('data', async () => {})

  conn.on('close', () => {
    connections = connections.filter((c) => c.readyState !== 3)
  })
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

const setDataUrlToFile = async (pathToFile, urlToData = '') => {
  if (urlToData.length > 3) {
    await axios(urlToData).then(async (it) => {
      await writeFile(pathToFile, JSON.stringify(it.data), { encoding: 'utf8' })
    })
  } else if (Object.prototype.hasOwnProperty.call(DATA_TO_FILE_FROM_URL, pathToFile)) {
    await axios(DATA_TO_FILE_FROM_URL[pathToFile]).then(async (it) => {
      await writeFile(pathToFile, JSON.stringify(it.data), { encoding: 'utf8' })
    })
  }
}

const getDataFromFile = async (pathToFile, count = 0) => {
  let response = {}
  await stat(pathToFile)
    .then(async () => {
      await readFile(pathToFile, { encoding: 'utf8' })
        .then(async (text) => {
          response = await Object.assign(JSON.parse(text))
        })
        .catch((err) => {
          return err
        })
    })
    .catch(async () => {
      if (count < 5) {
        await setDataUrlToFile(pathToFile)
        response = await getDataFromFile(pathToFile, count + 1)
      } else {
        response = { error: 'cannot writeFile after 5 counts' }
      }
    })
  return response
}

const postDataToFile = async (pathToFile, dataToFile = {}, count = 0) => {
  let response = {}
  let dataFromFile = {}
  await stat(pathToFile)
    .then(async () => {
      await readFile(pathToFile, { encoding: 'utf8' }).then(async (text) => {
        dataFromFile = await Object.assign(JSON.parse(text))
        const id =
          dataFromFile.reduce((acc, it) => {
            return Math.max(acc, it.id)
          }, 0) + 1
        dataFromFile = [...dataFromFile, { id, ...dataToFile }]
        await writeFile(pathToFile, JSON.stringify(dataFromFile), { encoding: 'utf8' })
        response = { status: 'success', id }
      })
    })
    .catch(async () => {
      if (count < 5) {
        await setDataUrlToFile(pathToFile)
        response = await postDataToFile(pathToFile, dataToFile, count + 1)
      } else {
        response = { error: 'cannot writeFile after 5 counts' }
      }
    })
  return response
}

const patchDataToFile = async (pathToFile, dataToFile = {}, userId = -1, count = 0) => {
  let response = {}
  let dataFromFile = {}
  await stat(pathToFile)
    .then(async () => {
      await readFile(pathToFile, { encoding: 'utf8' }).then(async (text) => {
        dataFromFile = await JSON.parse(text).map((obj) => {
          if (obj.id.toString() === userId.toString()) {
            return { ...obj, ...dataToFile }
          }
          return obj
        })
        await writeFile(pathToFile, JSON.stringify(dataFromFile), { encoding: 'utf8' })
        response = { status: ' success', userId }
      })
    })
    .catch(async () => {
      if (count < 5) {
        await setDataUrlToFile(pathToFile)
        console.dir(dataToFile)
        response = await postDataToFile(pathToFile, dataToFile, userId, count + 1)
      } else {
        response = { error: 'cannot writeFile after 5 counts' }
      }
    })
  return response
}

const deleteDataFromFile = async (pathToFile, userId = -1) => {
  let response = {}
  let dataFromFile = {}
  await stat(pathToFile)
    .then(async () => {
      await readFile(pathToFile, { encoding: 'utf8' }).then(async (text) => {
        dataFromFile = await JSON.parse(text).filter((obj) => {
          return obj.id.toString() !== userId.toString()
        })
        await writeFile(pathToFile, JSON.stringify(dataFromFile), { encoding: 'utf8' })
        response = { status: ' success', userId }
      })
    })
    .catch(async () => {
      response = { warning: 'file not found' }
    })
  return response
}

const deleteFile = async (pathToFile) => {
  let response = {}
  await stat(pathToFile)
    .then(async () => {
      await unlink(pathToFile)
        .then(async () => {
          response = { status: 'success' }
        })
        .catch((err) => {
          response = err
        })
    })
    .catch(async () => {
      response = { warning: 'file not found' }
    })
  return response
}

server.delete('/api/v1/users/:userId', async (req, res) => {
  const { userId } = req.params
  console.log(`deleting ${userId}`)
  res.json(await deleteDataFromFile(ADDRES_TO_PATH['/api/v1/users/'], userId))
  res.status(200)
  res.end()
})

server.delete('/api/v1/users/', async (req, res) => {
  console.log('deleting file')
  res.json(await deleteFile(ADDRES_TO_PATH[req.path]))
  res.status(200)
  res.end()
})

server.patch('/api/v1/users/:userId', async (req, res) => {
  const { userId } = req.params
  console.log('patching')
  res.json(await patchDataToFile(ADDRES_TO_PATH['/api/v1/users/'], req.body, userId))
  res.status(200)
  res.end()
})

server.post('/api/v1/users/', async (req, res) => {
  console.log('posting')
  res.json(await postDataToFile(ADDRES_TO_PATH[req.path], req.body))
  res.status(200)
  res.end()
})

server.get('/api/v1/users/', async (req, res) => {
  console.log('getting')
  res.json(await getDataFromFile(ADDRES_TO_PATH[req.path]))
  res.status(200)
  res.end()
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

echo.installHandlers(app, { prefix: '/ws' })

// eslint-disable-next-line no-console
console.log(`Serving at http://localhost:${port}`)
