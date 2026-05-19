import { useState } from "react"
import axios from "axios"

function MockInterview({
  setInterviewScores
}) {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [feedback, setFeedback] = useState("")
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)

  const startInterview = async () => {

    setLoading(true)

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/mock-interview"
      )

      setQuestion(res.data.question)
      speakQuestion(res.data.question)

    } catch (error) {

      console.error(error)

      alert("Interview failed")
    }

    setLoading(false)
  }

  const submitAnswer = async () => {

    setLoading(true)

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/evaluate-answer",
        {
          question,
          answer
        }
      )

      setFeedback(res.data.feedback)

      const scoreMatch =
  res.data.feedback.match(/(\d+)\/10/)

if (scoreMatch) {

  const score =
    parseInt(scoreMatch[1]) * 10

  setInterviewScores(prev => [
    ...prev,
    score
  ])
}

      setQuestion(res.data.next_question)
      speakQuestion(res.data.next_question)

      setAnswer("")

    } catch (error) {

      console.error(error)

      alert("Evaluation failed")
    }

    setLoading(false)
  }

  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition

    const recognition = new SpeechRecognition()

    recognition.lang = "en-US"

    recognition.start()

    setListening(true)

    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0].transcript

      setAnswer(transcript)

      setListening(false)
    }

    recognition.onerror = () => {

      setListening(false)

      alert("Voice recognition failed")
    }
  }

  const speakQuestion = (text) => {

  const speech = new SpeechSynthesisUtterance(text)

  speech.lang = "en-US"

  speech.rate = 1

  speech.pitch = 1

  window.speechSynthesis.speak(speech)
}

  return (

    <div className="bg-black border border-gray-800 rounded-2xl p-8 mt-10">

      <h2 className="text-3xl font-bold text-purple-400 mb-6">
        AI Mock Interview
      </h2>

      <button
        onClick={startInterview}
        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl"
      >
        {loading
          ? "AI Interviewer Thinking..."
          : "Start Interview"}
      </button>

      {question && (

        <div className="mt-8">

          <h3 className="text-xl font-semibold mb-4">
            Question:
          </h3>

          <div className="bg-gray-900 p-6 rounded-xl mb-6">
            {question}
          </div>

          <textarea
            placeholder="Type your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 h-40"
          ></textarea>

          <button
            onClick={startListening}
            className="mt-4 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl mr-4"
          >

            {listening
              ? "Listening..."
              : "🎤 Speak Answer"}

          </button>

          <button
            onClick={submitAnswer}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
          >
            Submit Answer
          </button>

        </div>

      )}

      {feedback && (

        <div className="mt-8 bg-gray-900 p-6 rounded-xl">

          <h3 className="text-2xl font-bold text-green-400 mb-4">
            AI Feedback
          </h3>

          <div className="whitespace-pre-wrap">
            {feedback}
          </div>

        </div>

      )}

    </div>
  )
}

export default MockInterview