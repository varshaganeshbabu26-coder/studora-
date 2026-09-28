import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react'

const STUDY_TIPS = [
  "You've got this!",
  'One more task to go!',
  'Small steps, big progress!',
  'Your brain is growing!',
  'Keep hopping forward!',
  'Every task counts!',
  'You are doing great!',
  'Stay curious!',
]

const ENCOURAGEMENTS = [
  'Nice work!',
  'Keep it up!',
  'You are on fire!',
  'Amazing progress!',
  'Way to go!',
  'Fantastic!',
]

const SLEEP_THOUGHTS = ['z z z', 'dreaming of carrots', 'so sleepy...']

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const BunnyWalker = forwardRef(function BunnyWalker({
  speed = 50,
  stageWidth = 300,
  stageHeight = 100,
  onTaskComplete,
  countryFlag,
  tasksToNextStop = 2,
  className = '',
}, ref) {
  const [bunnyState, setBunnyState] = useState('wave') // wave, idle, walk-left, walk-right, sniff, look-left, look-right, sleep, happy-hop
  const [position, setPosition] = useState(0.5) // 0 = left edge, 1 = right edge
  const [direction, setDirection] = useState(1) // 1 = right, -1 = left
  const [speechBubble, setSpeechBubble] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const [showThought, setShowThought] = useState(false)

  const bunnyRef = useRef(null)
  const stageRef = useRef(null)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(null)
  const stateTimerRef = useRef(null)
  const speechTimerRef = useRef(null)
  const thoughtTimerRef = useRef(null)
  const positionRef = useRef(0.5)
  const directionRef = useRef(1)
  const bunnyStateRef = useRef('wave')

  // Refs for values used in animation loop
  const speedRef = useRef(speed)
  const stageWidthRef = useRef(stageWidth)

  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  useEffect(() => {
    stageWidthRef.current = stageWidth
  }, [stageWidth])

  // Sync refs with state
  useEffect(() => {
    positionRef.current = position
  }, [position])

  useEffect(() => {
    directionRef.current = direction
  }, [direction])

  useEffect(() => {
    bunnyStateRef.current = bunnyState
  }, [bunnyState])

  // Show speech bubble
  const showSpeech = useCallback((text, duration = 3000) => {
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current)
    setSpeechBubble(text)
    speechTimerRef.current = setTimeout(() => setSpeechBubble(null), duration)
  }, [])

  // Show thought bubble with real data
  const showThoughtBubble = useCallback(() => {
    if (thoughtTimerRef.current) clearTimeout(thoughtTimerRef.current)
    setShowThought(true)
    thoughtTimerRef.current = setTimeout(() => setShowThought(false), 4000)
  }, [])

  // State machine: pick next state randomly
  const pickNextState = useCallback(() => {
    const states = ['idle', 'walk-left', 'walk-right', 'sniff', 'look-left', 'look-right', 'sleep']
    const weights = [25, 20, 20, 10, 8, 7, 10]
    const totalWeight = weights.reduce((a, b) => a + b, 0)
    let random = Math.random() * totalWeight

    for (let i = 0; i < states.length; i++) {
      random -= weights[i]
      if (random <= 0) {
        return states[i]
      }
    }
    return 'idle'
  }, [])

  // Schedule next state transition
  const scheduleNextState = useCallback(() => {
    if (stateTimerRef.current) clearTimeout(stateTimerRef.current)
    const delay = getRandomInt(2000, 6000)
    stateTimerRef.current = setTimeout(() => {
      const nextState = pickNextState()
      setBunnyState(nextState)

      // Schedule thought bubble occasionally
      if (Math.random() < 0.3) {
        setTimeout(showThoughtBubble, getRandomInt(500, 1500))
      }

      // Schedule next transition
      scheduleNextState()
    }, delay)
  }, [pickNextState, showThoughtBubble])

  // Animation loop
  const animate = useCallback(
    (timestamp) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      const deltaTime = (timestamp - lastTimeRef.current) / 1000
      lastTimeRef.current = timestamp

      const state = bunnyStateRef.current
      const currentPos = positionRef.current
      const currentDir = directionRef.current
      const bunnyWidth = 60 // approximate bunny width in px
      const maxPos = 1 - bunnyWidth / stageWidthRef.current

      if (state === 'walk-left' || state === 'walk-right') {
        const moveAmount = (speedRef.current * deltaTime) / stageWidthRef.current
        let newPos = currentPos + moveAmount * currentDir
        let newDir = currentDir

        if (newPos >= maxPos) {
          newPos = maxPos
          newDir = -1
          setBunnyState('idle')
        } else if (newPos <= 0) {
          newPos = 0
          newDir = 1
          setBunnyState('idle')
        }

        setPosition(newPos)
        setDirection(newDir)
      }

      rafRef.current = requestAnimationFrame(animate)
    },
    []
  )

  // Start/stop animation based on visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = null
        }
        lastTimeRef.current = null
      } else {
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(animate)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  // State machine scheduler
  useEffect(() => {
    scheduleNextState()
    return () => {
      if (stateTimerRef.current) clearTimeout(stateTimerRef.current)
    }
  }, [scheduleNextState])

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current)
      if (thoughtTimerRef.current) clearTimeout(thoughtTimerRef.current)
    }
  }, [])

  // Initial wave
  useEffect(() => {
    const timer = setTimeout(() => {
      setBunnyState('idle')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Expose happy hop trigger via ref
  useImperativeHandle(ref, () => ({
    triggerHappyHop: () => {
      setBunnyState('happy-hop')
      showSpeech(getRandomItem(ENCOURAGEMENTS))
      if (onTaskComplete) onTaskComplete()
      setTimeout(() => setBunnyState('idle'), 1500)
    },
  }), [onTaskComplete, showSpeech])

  // Cursor tracking for look-at-cursor
  const handleMouseMove = useCallback(
    (e) => {
      if (!stageRef.current || !bunnyRef.current) return
      const stageRect = stageRef.current.getBoundingClientRect()
      const bunnyRect = bunnyRef.current.getBoundingClientRect()
      const bunnyCenterX = bunnyRect.left + bunnyRect.width / 2
      const cursorX = e.clientX

      if (cursorX < bunnyCenterX - 20) {
        setBunnyState((prev) => (prev === 'idle' ? 'look-left' : prev))
      } else if (cursorX > bunnyCenterX + 20) {
        setBunnyState((prev) => (prev === 'idle' ? 'look-right' : prev))
      }
    },
    []
  )

  const handleClick = useCallback(() => {
    setBunnyState('happy-hop')
    showSpeech(getRandomItem(STUDY_TIPS))
    setTimeout(() => setBunnyState('idle'), 1500)
  }, [showSpeech])

  const handleHover = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false)
  }, [])

  // Determine bunny visual state
  const isWalking = bunnyState === 'walk-left' || bunnyState === 'walk-right'
  const isSleeping = bunnyState === 'sleep'
  const isHappy = bunnyState === 'happy-hop'
  const isSniffing = bunnyState === 'sniff'
  const isWaving = bunnyState === 'wave'
  const isLooking = bunnyState === 'look-left' || bunnyState === 'look-right'

  const bunnyTransform = `translateX(${position * (stageWidth - 60)}px)`
  const bunnyFlip = direction === -1 ? 'scaleX(-1)' : ''

  return (
    <div
      ref={stageRef}
      className={`pointer-events-none relative ${className}`}
      style={{ width: stageWidth, height: stageHeight }}
      onMouseMove={handleMouseMove}
      role="img"
      aria-label="Study bunny"
    >
      {/* Mini floating platform */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Grass/cloud ground */}
        <div className="relative mx-auto h-8 w-[90%]">
          <div className="absolute inset-x-0 bottom-0 h-6 rounded-full bg-gradient-to-t from-green-200/60 to-green-100/40 blur-[1px]" />
          {/* Flowers */}
          <div className="absolute bottom-2 left-[15%] h-3 w-3 rounded-full bg-pink-300/80" />
          <div className="absolute bottom-3 left-[20%] h-2 w-2 rounded-full bg-pink-200/60" />
          <div className="absolute bottom-2 right-[15%] h-3 w-3 rounded-full bg-purple-300/80" />
          <div className="absolute bottom-3 right-[22%] h-2 w-2 rounded-full bg-purple-200/60" />
          {/* Pebbles */}
          <div className="absolute bottom-1 left-[40%] h-1.5 w-3 rounded-full bg-gray-300/50" />
          <div className="absolute bottom-1 left-[55%] h-1 w-2 rounded-full bg-gray-300/40" />
          <div className="absolute bottom-1 left-[65%] h-1.5 w-2.5 rounded-full bg-gray-300/50" />
        </div>
      </div>

      {/* Speech bubble */}
      {speechBubble && (
        <div
          className="absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-2xl border border-white/60 bg-white/90 px-3 py-1.5 text-xs font-semibold text-pink-600 shadow-lg backdrop-blur-md"
          aria-live="polite"
        >
          {speechBubble}
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white/60 bg-white/90" />
        </div>
      )}

      {/* Thought bubble */}
      {showThought && !speechBubble && (
        <div
          className="absolute -top-10 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-2xl border border-white/60 bg-white/80 px-3 py-1.5 text-xs text-gray-500 shadow-lg backdrop-blur-md"
          aria-live="polite"
        >
          <span className="mr-1">{countryFlag}</span>
          {tasksToNextStop} tasks to next stop
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white/60 bg-white/80" />
        </div>
      )}

      {/* Sleep Z's */}
      {isSleeping && (
        <div className="absolute -top-6 left-1/2 z-20 -translate-x-1/2 text-lg font-bold text-indigo-300 animate-bounce" aria-hidden="true">
          💤
        </div>
      )}

      {/* Happy sparkles */}
      {isHappy && (
        <>
          <div className="absolute -top-4 left-[20%] z-20 text-sm sparkle-burst" aria-hidden="true">✨</div>
          <div className="absolute -top-2 left-[70%] z-20 text-sm sparkle-burst" style={{ animationDelay: '0.2s' }} aria-hidden="true">✨</div>
          <div className="absolute top-0 left-[50%] z-20 text-sm sparkle-burst" style={{ animationDelay: '0.4s' }} aria-hidden="true">💖</div>
        </>
      )}

      {/* Bunny */}
      <div
        ref={bunnyRef}
        className="pointer-events-auto absolute bottom-4 left-0 cursor-pointer"
        style={{ transform: bunnyTransform }}
        onClick={handleClick}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverEnd}
        role="button"
        aria-label="Study bunny - click for encouragement"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick() }}
      >
        <div
          className={`relative transition-transform duration-100 ${isWalking ? 'bunny-walk' : ''} ${isHappy ? 'hop-animation' : ''} ${isHovered ? 'scale-110' : ''}`}
          style={{ transform: bunnyFlip }}
        >
          {/* Shadow */}
          <div
            className={`absolute -bottom-1 left-1/2 h-2 w-10 -translate-x-1/2 rounded-full bg-black/10 blur-[2px] transition-all duration-200 ${isWalking ? 'shadow-scale' : ''} ${isHappy ? 'scale-75' : ''}`}
            aria-hidden="true"
          />

          {/* Bunny SVG */}
          <svg
            viewBox="0 0 100 100"
            className="h-14 w-14 drop-shadow-md"
            aria-hidden="true"
          >
            {/* Body */}
            <ellipse cx="50" cy="65" rx="22" ry="28" fill="#F5F0E8" stroke="#E0D5C5" strokeWidth="1.5" />
            {/* Head */}
            <circle cx="50" cy="38" r="18" fill="#F5F0E8" stroke="#E0D5C5" strokeWidth="1.5" />
            {/* Ears */}
            <ellipse
              cx="38" cy="18" rx="6" ry="16" fill="#F5F0E8" stroke="#E0D5C5" strokeWidth="1.5"
              className={isWalking || isHappy ? 'bunny-ear-bounce' : 'bunny-ear-wiggle'}
            />
            <ellipse
              cx="62" cy="18" rx="6" ry="16" fill="#F5F0E8" stroke="#E0D5C5" strokeWidth="1.5"
              className={isWalking || isHappy ? 'bunny-ear-bounce' : 'bunny-ear-wiggle'}
            />
            {/* Inner ears */}
            <ellipse cx="38" cy="18" rx="3" ry="10" fill="#FFB6C1" />
            <ellipse cx="62" cy="18" rx="3" ry="10" fill="#FFB6C1" />
            {/* Eyes */}
            {isSleeping ? (
              <>
                <path d="M 40 36 Q 43 39 46 36" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 54 36 Q 57 39 60 36" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="43" cy="36" r="3" fill="#333" className="bunny-blink" />
                <circle cx="57" cy="36" r="3" fill="#333" className="bunny-blink" />
              </>
            )}
            {/* Nose */}
            <ellipse cx="50" cy="44" rx="2.5" ry="2" fill="#FFB6C1" className={isSniffing ? 'nose-twitch' : ''} />
            {/* Mouth */}
            <path d="M 47 47 Q 50 50 53 47" fill="none" stroke="#999" strokeWidth="1" strokeLinecap="round" />
            {/* Cheeks */}
            <circle cx="38" cy="44" r="3" fill="#FFB6C1" opacity="0.5" />
            <circle cx="62" cy="44" r="3" fill="#FFB6C1" opacity="0.5" />
            {/* Feet */}
            <ellipse cx="40" cy="90" rx="8" ry="5" fill="#F5F0E8" stroke="#E0D5C5" strokeWidth="1" />
            <ellipse cx="60" cy="90" rx="8" ry="5" fill="#F5F0E8" stroke="#E0D5C5" strokeWidth="1" />
            {/* Tail */}
            <circle cx="50" cy="88" r="5" fill="white" stroke="#E0D5C5" strokeWidth="1" />
            {/* Country flag scarf */}
            {countryFlag && (
              <text x="50" y="60" textAnchor="middle" fontSize="10" aria-hidden="true">
                {countryFlag}
              </text>
            )}
          </svg>
        </div>
      </div>
    </div>
  )
})

export default BunnyWalker
