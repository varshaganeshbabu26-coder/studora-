import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.min.mjs', import.meta.url).toString()

export async function extractTextFromPdf(buffer) {
  try {
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise
    const numPages = pdf.numPages
    const pages = []

    for (let i = 1; i <= numPages; i++) {
      try {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const text = textContent.items.map((item) => item.str).join(' ').trim()
        pages.push({ page: i, text: text || '[No text extracted]' })
      } catch {
        pages.push({ page: i, text: '[Error reading page]' })
      }
    }

    const totalText = pages.reduce((sum, p) => sum + p.text.length, 0)
    if (totalText < 50) {
      throw new Error('This PDF appears to be empty or contains no readable text.')
    }

    return { pages, numPages }
  } catch (error) {
    if (error.name === 'PasswordException') {
      throw new Error('This PDF is password-protected. Please remove the password and try again.')
    }
    if (error.name === 'InvalidPDFException') {
      throw new Error('This file is not a valid PDF.')
    }
    throw error
  }
}
