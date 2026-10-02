import { useEffect, useRef, useState } from 'react'
import { Bot, Lightbulb, MessageCircle, Plus, Send, Sparkles, Trash2, UserRound } from 'lucide-react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import GlassCard from '../components/GlassCard'
import mockChatHistory from '../data/mockChatHistory'

const suggestedPrompts = [
  'Explain a difficult concept simply',
  'Give me 5 array practice questions',
  'Explain inheritance in C++ with an example',
  'Summarize this topic in 5 bullet points',
  'Simplify recursion in C++',
]

const cannedResponses = [
  'A useful way to think about this is to break it into smaller steps. Start with the main idea, then connect each detail back to that idea with a simple example.',
  'Here is the short version: focus on what changes, what stays the same, and why the result matters. Once those three pieces are clear, the rest becomes much easier to remember.',
  'Try explaining it to yourself using a familiar situation from everyday life. If the analogy makes sense, check it against the technical definition so the details stay accurate.',
  'For revision, write down the definition, one example, and one common mistake. That small checklist gives you a quick way to test whether you really understand the topic.',
]

function formatTime(timestamp) {
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(timestamp))
}

export default function AiTutor() {
  const [messages, setMessages] = useState(mockChatHistory)
  const [draft, setDraft] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const messageListRef = useRef(null)
  const responseIndexRef = useRef(0)
  const responseTimerRef = useRef(null)

  useEffect(() => {
    const messageList = messageListRef.current
    if (messageList) messageList.scrollTop = messageList.scrollHeight
  }, [messages, isThinking])

  useEffect(() => () => window.clearTimeout(responseTimerRef.current), [])

  function sendMessage(text = draft) {
    const trimmedText = text.trim()
    if (!trimmedText || isThinking) return

    const userMessage = { sender: 'user', text: trimmedText, timestamp: new Date().toISOString() }
    setMessages((current) => [...current, userMessage])
    setDraft('')
    setIsThinking(true)

    responseTimerRef.current = window.setTimeout(() => {
      const response = cannedResponses[responseIndexRef.current % cannedResponses.length]
      responseIndexRef.current += 1
      setMessages((current) => [...current, { sender: 'ai', text: response, timestamp: new Date().toISOString() }])
      setIsThinking(false)
    }, 700)
  }

  function handleSubmit(event) {
    event.preventDefault()
    sendMessage()
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  function handleNewChat() {
    setMessages(mockChatHistory)
    setDraft('')
    setIsThinking(false)
    responseIndexRef.current = 0
  }

  return (
    <section className="mx-auto flex h-[calc(100vh-7rem)] min-h-[36rem] max-w-7xl flex-col gap-4">
      <header className="flex shrink-0 items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-gradient-to-br from-pink-100 to-lavender-100 p-2 text-pink-500"><Sparkles className="h-4 w-4" /></span>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pink-500">Study support</p>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">AI Tutor</h1>
          <p className="mt-1 text-sm text-gray-600">Ask for explanations, examples, quizzes, or help fixing mistakes.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={handleNewChat} className="hidden sm:inline-flex">
            <Plus className="h-4 w-4" /> New chat
          </Button>
          <Badge variant="primary"><span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />Online</Badge>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <GlassCard className="flex min-h-0 flex-col overflow-hidden p-0">
          <div ref={messageListRef} className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4 sm:p-6" aria-live="polite">
            <div className="mx-auto mb-6 max-w-md text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-lavender-100 text-pink-500">
                <Bot className="h-6 w-6" />
              </div>
              <p className="mt-3 text-sm font-semibold text-gray-800">Your AI study partner</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">Ask for an explanation, a practice question, or a new way to remember something.</p>
            </div>

            {messages.map((message, index) => {
              const isUser = message.sender === 'user'

              return (
                <div key={`${message.timestamp}-${index}`} className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${isUser ? 'order-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white' : 'bg-white/70 text-pink-500'}`}>
                    {isUser ? <UserRound className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`max-w-[85%] sm:max-w-[72%] ${isUser ? 'order-1 items-end' : 'items-start'}`}>
                    <div className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${
                      isUser
                        ? 'border-pink-200 bg-gradient-to-r from-pink-400 to-rose-400 text-white'
                        : 'border-white/50 bg-white/70 text-gray-700'
                    }`}>
                      <p className="whitespace-pre-wrap">{message.text}</p>
                    </div>
                    <p className={`mt-1 px-1 text-xs text-gray-400 ${isUser ? 'text-right' : ''}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              )
            })}

            {isThinking && (
              <div className="flex items-end gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-pink-500">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl rounded-bl-md bg-white/70 px-4 py-3">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-400 [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-400 [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-400" />
                  </span>
                </div>
              </div>
            )}

          </div>

          <form onSubmit={handleSubmit} className="shrink-0 border-t border-white/50 bg-white/30 p-3 sm:p-4">
            <div className="flex items-end gap-2 rounded-2xl border border-white/50 bg-white/70 p-2 focus-within:border-pink-300 focus-within:ring-1 focus-within:ring-pink-200">
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={handleKeyDown}
                rows="1"
                placeholder="Ask your tutor anything..."
                aria-label="Message AI Tutor"
                className="max-h-32 min-h-[2.5rem] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />
              <Button type="submit" className="h-10 w-10 shrink-0 p-0" aria-label="Send message" disabled={!draft.trim() || isThinking}>
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-2 flex items-center justify-between gap-3 px-2">
              <p className="hidden text-xs text-gray-500 sm:block">Press Enter to send · Shift + Enter for a new line</p>
              <button type="button" onClick={handleNewChat} className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition hover:text-pink-600">
                <Trash2 className="h-3.5 w-3.5" /> Clear chat
              </button>
            </div>
          </form>
        </GlassCard>

        <aside className="hidden space-y-4 lg:block">
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-pink-500" />
              <h2 className="font-bold text-gray-800">Quick actions</h2>
            </div>
            <div className="mt-4 space-y-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  disabled={isThinking}
                  className="flex w-full items-start gap-2 rounded-xl border border-white/50 bg-white/50 px-3 py-2.5 text-left text-xs font-medium leading-5 text-gray-600 transition hover:bg-white/80 hover:text-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  {prompt}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <p className="text-sm font-semibold text-gray-800">Study mode</p>
            <p className="mt-2 text-xs leading-5 text-gray-600">Ask for definitions, examples, misconceptions, or revision questions tailored to your topic.</p>
          </GlassCard>
        </aside>
      </div>
    </section>
  )
}
