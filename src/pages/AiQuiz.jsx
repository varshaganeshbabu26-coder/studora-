import { useMemo, useState } from 'react'
import { ArrowLeft, CheckCircle2, ChevronRight, RotateCcw, Trophy, XCircle } from 'lucide-react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import Card from '../components/Card'
import mockQuizzes from '../data/mockQuizzes'
import mockQuizQuestions from '../data/mockQuizQuestions'

const difficultyVariantMap = {
  Easy: 'default',
  Medium: 'primary',
  Hard: 'warning',
}

export default function AiQuiz() {
  // TODO: Replace local quiz flow with backend-backed quiz attempts, scoring history, and progress persistence.
  const [screen, setScreen] = useState('selection')
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [resultSummary, setResultSummary] = useState(null)

  const quizQuestions = useMemo(() => {
    if (!selectedQuiz) return []

    return mockQuizQuestions.slice(0, Math.min(selectedQuiz.numberOfQuestions, mockQuizQuestions.length))
  }, [selectedQuiz])

  const currentQuestion = quizQuestions[currentIndex] || null
  const currentAnswer = answers[currentIndex]
  const isAnswered = typeof currentAnswer !== 'undefined'

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz)
    setCurrentIndex(0)
    setAnswers({})
    setResultSummary(null)
    setScreen('quiz')
  }

  const goBackToQuizzes = () => {
    setSelectedQuiz(null)
    setCurrentIndex(0)
    setAnswers({})
    setResultSummary(null)
    setScreen('selection')
  }

  const handleAnswer = (option) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: option }))
  }

  const handleNext = () => {
    if (!isAnswered) return

    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((index) => index + 1)
      return
    }

    const breakdown = quizQuestions.map((question, index) => {
      const selectedAnswer = answers[index]
      return {
        question: question.question,
        selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect: selectedAnswer === question.correctAnswer,
      }
    })

    const correctCount = breakdown.filter((item) => item.isCorrect).length
    const totalQuestions = breakdown.length
    const percentage = Math.round((correctCount / totalQuestions) * 100)

    setResultSummary({
      quizTitle: selectedQuiz.title,
      correctCount,
      incorrectCount: totalQuestions - correctCount,
      totalQuestions,
      score: percentage,
      breakdown,
    })
    setScreen('results')
  }

  const retakeQuiz = () => {
    setCurrentIndex(0)
    setAnswers({})
    setResultSummary(null)
    setScreen('quiz')
  }

  return (
    <section className="mx-auto max-w-6xl">
      {screen === 'selection' && (
        <div className="space-y-6 transition-all duration-300">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C0C0C0]">Practice mode</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight bg-[#000000] sm:text-4xl">AI Quiz</h1>
            </div>
            <Badge variant="primary">{mockQuizzes.length} available quizzes</Badge>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {mockQuizzes.map((quiz) => (
              <Card
                as="button"
                type="button"
                key={`${quiz.title}-${quiz.subject}`}
                onClick={() => startQuiz(quiz)}
                className="group flex h-full flex-col justify-between border-[#C0C0C0] bg-[#000000] p-5 text-left transition duration-200 hover:-translate-y-1 hover:border-[#C0C0C0] hover:shadow-lg hover:shadow-none"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant={difficultyVariantMap[quiz.difficulty] || 'default'}>{quiz.difficulty}</Badge>
                    <span className="text-xs bg-[#000000]">{quiz.numberOfQuestions} Qs</span>
                  </div>

                  <div>
                    <p className="text-[#C0C0C0] font-semibold uppercase tracking-[0.22em] text-[#C0C0C0]">{quiz.subject}</p>
                    <h2 className="mt-3 text-xl font-semibold bg-[#000000]">{quiz.title}</h2>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 border-t bg-[#000000] pt-4">
                  <div>
                    <p className="text-[#C0C0C0] font-medium uppercase tracking-[0.18em] bg-[#000000]">Past score</p>
                    {quiz.pastScore === null ? (
                      <span className="mt-1 block text-sm bg-[#000000]">Not attempted</span>
                    ) : (
                      <span className="mt-1 block text-sm font-semibold text-[#C0C0C0]">{quiz.pastScore}%</span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#C0C0C0]">
                    Start <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {screen === 'quiz' && selectedQuiz && currentQuestion && (
        <div className="space-y-6 transition-all duration-300">
          <div className="flex items-center justify-between gap-3">
            <Button type="button" variant="ghost" onClick={goBackToQuizzes} className="bg-[#000000] hover:bg-[#000000]">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Badge variant="primary">{selectedQuiz.subject}</Badge>
          </div>

          <div className="rounded-2xl border bg-[#000000] bg-[#000000] p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between text-sm bg-[#000000]">
              <span>
                Question {currentIndex + 1} of {quizQuestions.length}
              </span>
              <span>{Math.round(((currentIndex + 1) / quizQuestions.length) * 100)}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-[#000000]">
              <div
                className="h-full rounded-full bg-[#000000] transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <Card className="border-[#C0C0C0] bg-[#000000] p-6 sm:p-8">
            <p className="text-[#C0C0C0] font-semibold uppercase tracking-[0.22em] text-[#C0C0C0]">Question {currentIndex + 1}</p>
            <h2 className="mt-4 text-2xl font-semibold leading-snug bg-[#000000] sm:text-3xl">{currentQuestion.question}</h2>

            <div className="mt-6 space-y-3">
              {currentQuestion.options.map((option, index) => {
                const selected = currentAnswer === option

                return (
                  <button
                    key={`${option}-${index}`}
                    type="button"
                    onClick={() => handleAnswer(option)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition duration-200 ${
                      selected
                        ? 'border-[#C0C0C0] bg-[#000000] bg-[#000000]'
                        : 'bg-[#000000] bg-[#000000] bg-[#000000] hover:border-[#C0C0C0] hover:bg-[#000000]'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border bg-[#000000] text-xs font-semibold bg-[#000000]">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                    </span>

                    {selected && <span className="text-xs font-medium text-[#C0C0C0]">Selected</span>}
                  </button>
                )
              })}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm bg-[#000000]">{isAnswered ? 'Answer saved' : 'Choose an answer to continue'}</span>

              <Button type="button" onClick={handleNext} disabled={!isAnswered} className="min-w-[150px]">
                {currentIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {screen === 'results' && resultSummary && (
        <div className="space-y-6 transition-all duration-300">
          <div className="flex items-center justify-between gap-3">
            <Button type="button" variant="ghost" onClick={goBackToQuizzes} className="bg-[#000000] hover:bg-[#000000]">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Badge variant="primary">Completed</Badge>
          </div>

          <Card className="border-[#C0C0C0] bg-[#000000] p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[#C0C0C0] font-semibold uppercase tracking-[0.22em] text-[#C0C0C0]">{resultSummary.quizTitle}</p>
                <h2 className="mt-3 text-4xl font-bold bg-[#000000]">{resultSummary.score}%</h2>
                <p className="mt-2 bg-[#000000]">
                  {resultSummary.correctCount} of {resultSummary.totalQuestions} correct
                </p>
              </div>

              <div className="grid w-full gap-3 sm:grid-cols-2 lg:max-w-md">
                <div className="rounded-xl border bg-[#000000] bg-[#000000] p-4">
                  <div className="flex items-center gap-2 bg-[#000000]">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm font-semibold">Correct</span>
                  </div>
                  <p className="mt-3 text-2xl font-bold bg-[#000000]">{resultSummary.correctCount}</p>
                </div>

                <div className="rounded-xl border bg-[#000000] bg-[#000000] p-4">
                  <div className="flex items-center gap-2 bg-[#000000]">
                    <XCircle className="h-5 w-5" />
                    <span className="text-sm font-semibold">Incorrect</span>
                  </div>
                  <p className="mt-3 text-2xl font-bold bg-[#000000]">{resultSummary.incorrectCount}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-[#C0C0C0] bg-[#000000] p-6 sm:p-8">
            <h3 className="text-xl font-semibold bg-[#000000]">Answer breakdown</h3>

            <div className="mt-5 space-y-3">
              {resultSummary.breakdown.map((item, index) => (
                <div key={`${item.question}-${index}`} className="rounded-xl border bg-[#000000] bg-[#000000] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium bg-[#000000]">Question {index + 1}</p>
                      <p className="mt-2 text-sm bg-[#000000]">{item.question}</p>
                    </div>

                    {item.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 bg-[#000000]" />
                    ) : (
                      <XCircle className="h-5 w-5 shrink-0 bg-[#000000]" />
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span
                      className={`rounded-full px-2.5 py-1 ${
                        item.isCorrect ? 'bg-[#000000] bg-[#000000]' : 'bg-[#000000] bg-[#000000]'
                      }`}
                    >
                      Your answer: {item.selectedAnswer || 'No answer'}
                    </span>

                    {!item.isCorrect && (
                      <span className="rounded-full bg-[#000000] px-2.5 py-1 bg-[#000000]">
                        Correct answer: {item.correctAnswer}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={retakeQuiz}>
              <RotateCcw className="h-4 w-4" /> Retake Quiz
            </Button>
            <Button type="button" onClick={goBackToQuizzes}>
              <Trophy className="h-4 w-4" /> Back to Quizzes
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
