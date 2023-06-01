import express, { json } from 'express'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import cors from 'cors'
import qs from 'node:querystring'
import { CountryData, FilteredSalary } from './api/endpoints.js'

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(cors(
  {
    methods: ['GET'],
    origin: [`http://localhost:${PORT}`, 'https://chat.openai.com']
  }
))
app.use(json())

app.use((req, _res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`)
  next()
})

const html = `
<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='UTF-8'>
    <meta
      http-equiv='X-UA-Compatible'
      content='IE=edge'
    >
    <meta
      name='viewport'
      content='width=device-width, initial-scale=1.0'
    >
    <script
      src='https://cdn.tailwindcss.com'
    ></script>
    <style>
      .neon {
        text-shadow:
        0 0 9px #0e7490,
        0 0 9px #0e7490,
        0 0 9px #0e7490;
      }
    </style>
  </head>
  <body class='dark:bg-[#222] text-[#222] dark:text-[#ccc] bg-[#ccc]'>
    <div class='grid place-content-center h-screen'>
      <h1 class='text-2xl p-4'>
      <span class='text-transparent bg-clip-text bg-gradient-to-bl from-cyan-700 to-cyan-900 uppercase neon'>Sueldos.dev</span>
      <span class='underline'>Plugin ChatGPT</span>
      </h1>
    </div>
  </body>
</html>
`

app.get('/', (req, res, next) => {
  res.send(html)
})

app.get('/openapi.yaml', async (req, res, next) => {
  try {
    const filePath = join(process.cwd(), '../openapi.yaml')
    const yamlData = await readFile(filePath, 'utf-8')
    res.setHeader('Content-Type', 'text/yaml')
    res.send(yamlData)
  } catch (e) {
    console.error(e.message)
    res.status(500).send({ error: 'Unable obtain openapi.yaml file' })
  }
})

app.get('/.well-known/ai-plugin.json', async (_req, res, _next) => {
  res.sendFile(join(process.cwd(), '../.well-known/ai-plugin.json'))
})

app.get('/img/logo.png', async (_req, res, _next) => {
  res.sendFile(join(process.cwd(), './img/logo.png'))
})

app.get('/filtered-salary?', async (req, res, _next) => {
  const { country } = req.query
  const data = await FilteredSalary(country)
  res.send(data)
})

app.get('/country-data?', async (req, res, _next) => {
  const { country } = req.query
  const data = await CountryData(country)
  res.send(data)
})

app.listen(PORT, () => {
  console.log(`Server listening in port: http://localhost:${PORT}`)
})
