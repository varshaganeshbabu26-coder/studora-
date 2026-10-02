import { useState, useCallback, useRef } from 'react'
import {
  FileText,
  Upload,
  X,
  Sparkles,
  Copy,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Lightbulb,
  Hash,
  Sigma,
  FileDown,
  Trash2,
} from 'lucide-react'

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20 MB

export default function App() {
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressStep, setProgressStep] = useState('')
  const [notes, setNotes] = useState(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef(null)

  const handleFile = useCallback((selectedFile) => {
    setError('')
    setNotes(null)

    if (!selectedFile) return

    if (selectedFile.type !== 'application/pdf') {
      setError('Please upload a PDF file. Other file types are not supported.')
      return
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('File is too large. Maximum size is 20 MB.')
      return
    }

    setFile(selectedFile)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }, [handleFile])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragOver(false)
  }, [])

  const clearFile = () => {
    setFile(null)
    setNotes(null)
    setError('')
    setProgress(0)
    setProgressStep('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleGenerate = async () => {
    if (!file) return

    setIsProcessing(true)
    setProgress(0)
    setError('')
    setNotes(null)

    try {
      // Step 1: Upload and extract text
      setProgressStep('Uploading PDF...')
      setProgress(15)

      const formData = new FormData()
      formData.append('pdf', file)

      const uploadRes = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
      })

      if (!uploadRes.ok) {
        const err = await uploadRes.json()
        throw new Error(err.error || 'Failed to process PDF')
      }

      const { pages, numPages } = await uploadRes.json()

      // Step 2: Reading pages
      setProgressStep(`Reading ${numPages} pages...`)
      setProgress(35)

      // Step 3: Generate notes
      setProgressStep('Generating notes with AI...')
      setProgress(60)

      const notesRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pages }),
      })

      if (!notesRes.ok) {
        const err = await notesRes.json()
        throw new Error(err.error || 'Failed to generate notes')
      }

      const data = await notesRes.json()

      setProgressStep('Finalizing...')
      setProgress(90)

      // Simulate a brief delay for UX
      await new Promise((r) => setTimeout(r, 500))

      setNotes(data.notes)
      setProgress(100)
      setProgressStep('Done!')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsProcessing(false)
      setTimeout(() => {
        setProgress(0)
        setProgressStep('')
      }, 1000)
    }
  }

  const handleCopy = async () => {
    if (!notes) return
    await navigator.clipboard.writeText(formatNotesAsText(notes))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadTxt = () => {
    if (!notes) return
    const blob = new Blob([formatNotesAsText(notes)], { type: 'text/plain' })
    downloadBlob(blob, `${notes.title || 'notes'}.txt`)
  }

  const handleDownloadPdf = () => {
    if (!notes) return
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>${notes.title || 'Study Notes'}</title>
          <style>
            body { font-family: 'Inter', system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; color: #1e293b; line-height: 1.7; }
            h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 0.5rem; font-size: 2rem; }
            h2 { color: #1e40af; margin-top: 2rem; font-size: 1.4rem; }
            h3 { color: #3b82f6; font-size: 1.1rem; }
            li { margin: 0.4rem 0; }
            .summary { background: #eff6ff; padding: 1rem 1.5rem; border-radius: 12px; border-left: 4px solid #3b82f6; margin: 1rem 0; }
            .definition { background: #f0fdf4; padding: 0.75rem 1rem; border-radius: 8px; margin: 0.5rem 0; border-left: 3px solid #22c55e; }
            .formula { background: #fefce8; padding: 0.75rem 1rem; border-radius: 8px; margin: 0.5rem 0; border-left: 3px solid #eab308; font-family: monospace; }
            .page-ref { color: #94a3b8; font-size: 0.8rem; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <h1>${notes.title || 'Study Notes'}</h1>
          ${notes.summary ? `<div class="summary"><strong>Summary:</strong> ${notes.summary}</div>` : ''}
          ${notes.sections?.map((s) => `
            <h2>${s.heading} ${s.pageRef ? `<span class="page-ref">(${s.pageRef})</span>` : ''}</h2>
            <ul>${s.bullets?.map((b) => `<li>${b}</li>`).join('')}</ul>
          `).join('') || ''}
          ${notes.definitions?.length ? `<h2>Definitions</h2>${notes.definitions.map((d) => `<div class="definition"><strong>${d.term}:</strong> ${d.definition}</div>`).join('')}` : ''}
          ${notes.formulas?.length ? `<h2>Formulas</h2>${notes.formulas.map((f) => `<div class="formula">${f}</div>`).join('')}` : ''}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-200">
              <FileText className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-800">PDF to Notes</span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Hero */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Transform PDFs into <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Study Notes</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-slate-500">
            Upload any PDF and get organized, AI-powered study notes in seconds.
          </p>
        </div>

        {/* Upload Card */}
        <div className="animate-slide-up rounded-2xl border border-slate-200/60 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
          {/* Drop Zone */}
          <div
            className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 sm:p-12 ${
              dragOver
                ? 'border-blue-400 bg-blue-50/50 scale-[1.01]'
                : file
                  ? 'border-green-300 bg-green-50/30'
                  : 'border-slate-300 bg-slate-50/50 hover:border-blue-300 hover:bg-blue-50/30'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !isProcessing && fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click() }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={(e) => handleFile(e.target.files[0])}
              className="hidden"
            />

            {file ? (
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{file.name}</p>
                  <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); clearFile() }}
                  className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                >
                  <X className="h-4 w-4" /> Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600">
                  <Upload className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-700">
                    {dragOver ? 'Drop your PDF here' : 'Drag & drop your PDF here'}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">or click to browse files</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <FileText className="h-4 w-4" />
                  <span>PDF only · Max 20 MB</span>
                </div>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Progress */}
          {isProcessing && (
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{progressStep}</span>
                <span className="text-slate-500">{progress}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!file || isProcessing}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Notes
              </>
            )}
          </button>
        </div>

        {/* Notes Display */}
        {notes && (
          <div className="animate-slide-up mt-8">
            {/* Action Buttons */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-slate-800">Your Notes</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <FileDown className="h-4 w-4" />
                  Download PDF
                </button>
                <button
                  type="button"
                  onClick={handleDownloadTxt}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <Download className="h-4 w-4" />
                  Download TXT
                </button>
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-md transition hover:from-blue-700 hover:to-indigo-700"
                >
                  <RefreshCw className="h-4 w-4" />
                  Regenerate
                </button>
              </div>
            </div>

            {/* Notes Content */}
            <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
              <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{notes.title || 'Study Notes'}</h1>

              {notes.summary && (
                <div className="mt-4 rounded-xl border-l-4 border-blue-500 bg-blue-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-800">
                    <Lightbulb className="h-4 w-4" />
                    Summary
                  </div>
                  <p className="mt-2 text-slate-700">{notes.summary}</p>
                </div>
              )}

              {/* Sections */}
              {notes.sections?.map((section, i) => (
                <div key={i} className="mt-6">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <h2 className="text-lg font-bold text-slate-800">{section.heading}</h2>
                    {section.pageRef && (
                      <span className="text-xs text-slate-400">({section.pageRef})</span>
                    )}
                  </div>
                  <ul className="mt-3 space-y-2">
                    {section.bullets?.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-2 text-slate-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Definitions */}
              {notes.definitions?.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center gap-2">
                    <Hash className="h-5 w-5 text-green-500" />
                    <h2 className="text-lg font-bold text-slate-800">Definitions</h2>
                  </div>
                  <div className="mt-3 space-y-2">
                    {notes.definitions.map((def, i) => (
                      <div key={i} className="rounded-lg border-l-3 border-green-400 bg-green-50 px-4 py-3">
                        <span className="font-semibold text-green-800">{def.term}:</span>
                        <span className="ml-2 text-slate-700">{def.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Formulas */}
              {notes.formulas?.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center gap-2">
                    <Sigma className="h-5 w-5 text-amber-500" />
                    <h2 className="text-lg font-bold text-slate-800">Formulas</h2>
                  </div>
                  <div className="mt-3 space-y-2">
                    {notes.formulas.map((formula, i) => (
                      <div key={i} className="rounded-lg border-l-3 border-amber-400 bg-amber-50 px-4 py-3 font-mono text-slate-800">
                        {formula}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Features */}
        {!notes && !isProcessing && (
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Upload, title: 'Upload PDF', desc: 'Drag & drop or browse' },
              { icon: Sparkles, title: 'AI-Powered', desc: 'Smart note generation' },
              { icon: BookOpen, title: 'Organized', desc: 'Topics, definitions & more' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-slate-200/60 bg-white p-5 text-center shadow-sm">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold text-slate-800">{title}</h3>
                <p className="mt-1 text-sm text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white/50 py-6 text-center text-sm text-slate-400">
        <p>PDF to Notes — Transform your study materials with AI</p>
      </footer>
    </div>
  )
}

function formatNotesAsText(notes) {
  let text = `${notes.title || 'Study Notes'}\n${'='.repeat(50)}\n\n`
  if (notes.summary) {
    text += `SUMMARY\n${'-'.repeat(30)}\n${notes.summary}\n\n`
  }
  notes.sections?.forEach((s) => {
    text += `${s.heading} ${s.pageRef || ''}\n${'-'.repeat(30)}\n`
    s.bullets?.forEach((b) => {
      text += `• ${b}\n`
    })
    text += '\n'
  })
  if (notes.definitions?.length) {
    text += `DEFINITIONS\n${'-'.repeat(30)}\n`
    notes.definitions.forEach((d) => {
      text += `${d.term}: ${d.definition}\n`
    })
    text += '\n'
  }
  if (notes.formulas?.length) {
    text += `FORMULAS\n${'-'.repeat(30)}\n`
    notes.formulas.forEach((f) => {
      text += `${f}\n`
    })
  }
  return text
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
