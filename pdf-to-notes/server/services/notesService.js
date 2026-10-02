import OpenAI from 'openai'
import 'dotenv/config'

const SYSTEM_PROMPT = `You are an expert study assistant. Convert PDF content into well-organized study notes.

Rules:
- Stay faithful to the source — do NOT invent facts
- If something is unclear, mark it as "unclear in source"
- Include page references where possible
- Extract formulas if present
- Identify definitions and key concepts

Return valid JSON with this structure:
{
  "title": "Note title",
  "summary": "2-3 sentence summary",
  "sections": [
    {
      "heading": "Section heading",
      "bullets": ["point 1", "point 2"],
      "pageRef": "p. 1-3"
    }
  ],
  "definitions": [
    { "term": "Term", "definition": "Definition" }
  ],
  "formulas": ["formula 1", "formula 2"]
}

Return ONLY valid JSON, no markdown formatting.`

export async function generateNotes(pages) {
  const apiKey = process.env.AI_API_KEY

  if (!apiKey) {
    throw new Error('AI_API_KEY is not configured. Add it to your .env file.')
  }

  const openai = new OpenAI({ apiKey })

  // Combine all text with page markers
  const fullText = pages
    .map((p) => `--- Page ${p.page} ---\n${p.text}`)
    .join('\n\n')

  // If text is very long, chunk it
  const MAX_CHARS = 12000
  let chunks = []

  if (fullText.length <= MAX_CHARS) {
    chunks = [fullText]
  } else {
    // Split by pages into chunks
    let currentChunk = ''
    for (const page of pages) {
      const pageText = `--- Page ${page.page} ---\n${page.text}`
      if (currentChunk.length + pageText.length > MAX_CHARS && currentChunk.length > 0) {
        chunks.push(currentChunk)
        currentChunk = pageText
      } else {
        currentChunk += (currentChunk ? '\n\n' : '') + pageText
      }
    }
    if (currentChunk) chunks.push(currentChunk)
  }

  // Process each chunk
  const chunkResults = []
  for (const chunk of chunks) {
    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4o-mini',
      temperature: 0.3,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Convert this PDF content into study notes:\n\n${chunk}` },
      ],
      response_format: { type: 'json_object' },
    })

    const result = completion.choices?.[0]?.message?.content
    if (result) {
      try {
        chunkResults.push(JSON.parse(result))
      } catch {
        // Skip invalid JSON
      }
    }
  }

  if (chunkResults.length === 0) {
    throw new Error('No notes could be generated from this PDF.')
  }

  // Merge results
  return mergeNotes(chunkResults)
}

function mergeNotes(results) {
  const merged = {
    title: results[0].title || 'Study Notes',
    summary: results[0].summary || '',
    sections: [],
    definitions: [],
    formulas: [],
  }

  // Merge sections
  const sectionMap = new Map()
  for (const result of results) {
    for (const section of result.sections || []) {
      const key = section.heading.toLowerCase()
      if (sectionMap.has(key)) {
        sectionMap.get(key).bullets.push(...(section.bullets || []))
      } else {
        sectionMap.set(key, { ...section })
      }
    }
  }
  merged.sections = Array.from(sectionMap.values())

  // Merge definitions
  const termSet = new Set()
  for (const result of results) {
    for (const def of result.definitions || []) {
      if (!termSet.has(def.term.toLowerCase())) {
        termSet.add(def.term.toLowerCase())
        merged.definitions.push(def)
      }
    }
  }

  // Merge formulas
  for (const result of results) {
    merged.formulas.push(...(result.formulas || []))
  }

  return merged
}
