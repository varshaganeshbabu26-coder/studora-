import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import multer from 'multer'
import { extractTextFromPdf } from './services/pdfService.js'
import { generateNotes } from './services/notesService.js'

const app = express()
const port = Number(process.env.PORT || 3001)

app.use(cors())
app.use(express.json({ limit: '2mb' }))

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/extract', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file was uploaded.' })
    }

    const { buffer, mimetype } = req.file

    if (mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Only PDF files are accepted.' })
    }

    const { pages, numPages } = await extractTextFromPdf(buffer)

    res.json({ pages, numPages })
  } catch (error) {
    console.error('Extract failed:', error.message)

    const message = error.message.includes('AI_API_KEY')
      ? 'The AI service is not configured.'
      : error.message

    res.status(500).json({ error: message })
  }
})

app.post('/api/generate', async (req, res) => {
  try {
    const { pages } = req.body || {}

    if (!Array.isArray(pages) || pages.length === 0) {
      return res.status(400).json({ error: 'No PDF content provided.' })
    }

    const notes = await generateNotes(pages)

    res.json({ notes })
  } catch (error) {
    console.error('Generate failed:', error.message)

    const message = error.message.includes('AI_API_KEY')
      ? 'The AI service is not configured. Add AI_API_KEY in your .env file.'
      : error.message.includes('429')
        ? 'The AI service is rate-limited. Please try again in a moment.'
        : error.message

    res.status(500).json({ error: message })
  }
})

app.listen(port, () => {
  console.log(`PDF to Notes server running on http://localhost:${port}`)
})
