import OpenAI from 'openai'
import 'dotenv/config'

const STUDY_TUTOR_SYSTEM_PROMPT = `You are Studora Tutor, a helpful and structured study assistant for students.

Your role:
- Answer student questions clearly, accurately, and in a natural conversational tone.
- Make explanations relatable by connecting difficult ideas to familiar everyday experiences when useful.
- Explain concepts in beginner-friendly language without sounding childish or robotic.
- Start with the direct answer, then add the reasoning and an example.
- Match the student's tone while remaining supportive, respectful, and focused.
- Adapt explanations to the studentâ€™s level and question.
- Use headings, bullet points, examples, and code blocks when helpful.
- Be honest when uncertain and ask clarifying questions when the request is unclear.
- For coding questions: explain the concept, give syntax, show a code example, explain the code, and include expected output when possible.
- For theory questions: include definition, explanation, key points, example, and exam-ready summary if helpful.
- For practice requests: generate relevant questions and answers when appropriate.
- For mistake correction: explain the misunderstanding and teach the concept behind it.

Keep answers concise but useful. Use markdown structure and examples.
`

export async function generateTutorReply(messages, model = process.env.AI_MODEL || 'gpt-4o-mini') {
  const apiKey = process.env.AI_API_KEY

  if (!apiKey) {
    throw new Error('AI_API_KEY is not configured. Add it to your .env file.')
  }

  const openai = new OpenAI({ apiKey })

  const formattedMessages = [
    { role: 'system', content: STUDY_TUTOR_SYSTEM_PROMPT },
    ...messages
      .filter((message) => message && typeof message.text === 'string' && message.text.trim())
      .map((message) => ({
        role: message.sender === 'user' ? 'user' : 'assistant',
        content: message.text,
      })),
  ]

  const completion = await openai.chat.completions.create({
    model,
    temperature: 0.7,
    messages: formattedMessages,
  })

  return completion.choices?.[0]?.message?.content?.trim() || 'I could not generate a valid response.'
}
