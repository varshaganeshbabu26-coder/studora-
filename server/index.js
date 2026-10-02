import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateTutorReply } from './services/aiService.js'

const app = express()
const port = Number(process.env.PORT) || 8080
const serverDirectory = dirname(fileURLToPath(import.meta.url))
const frontendDirectory = resolve(serverDirectory, '../dist')

app.use(cors())
app.use(express.json({ limit: '2mb' }))
app.use(express.static(frontendDirectory))

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.post('/api/tutor', async (request, response) => {
  try {
    const { messages } = request.body || {}

    if (!Array.isArray(messages) || messages.length === 0) {
      return response.status(400).json({ error: 'No conversation data was provided.' })
    }

    const reply = await generateTutorReply(messages)

    return response.json({ reply })
  } catch (error) {
    console.error('Tutor request failed:', {
      message: error?.message,
      code: error?.code,
      status: error?.status,
    })

    const message = error?.message || 'The AI tutor could not generate a response.'
    const userMessage = message.includes('AI_API_KEY')
      ? 'The AI service is not configured. Add AI_API_KEY in your .env file.'
      : message.includes('429') || message.toLowerCase().includes('credits')
        ? 'The AI service has no remaining credits. Add billing credits or use a funded API key.'
        : message

    return response.status(500).json({
      error: userMessage,
    })
  }
})

app.use((request, response, next) => {
  if (request.method !== 'GET' || request.path === '/api' || request.path.startsWith('/api/')) {
    return next()
  }

  return response.sendFile(resolve(frontendDirectory, 'index.html'), (error) => {
    if (error) next(error)
  })
})

app.listen(port, () => {
  console.log(`Studora AI tutor server listening on port ${port}`)
})
