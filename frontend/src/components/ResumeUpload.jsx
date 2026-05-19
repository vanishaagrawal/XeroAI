import jsPDF from "jspdf"
import AnalyticsDashboard from "./AnalyticsDashboard"
import MockInterview from "./MockInterview"
import CareerChat from "./CareerChat"
import { useState, useEffect } from "react"
import axios from "axios"
import { FileText, Briefcase, Brain } from "lucide-react"

function ResumeUpload() {

  const [file, setFile] = useState(null)
  const [response, setResponse] = useState("")
  const [optimizedResume, setOptimizedResume] = useState("")
  const [interviewScores, setInterviewScores] = useState([60])
  const [score, setScore] = useState("0")
  const [jobDescription, setJobDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState("")
  const [agentStatus, setAgentStatus] = useState([])
  const [history, setHistory] = useState([])

  useEffect(() => {

    loadHistory()

  }, [])

  const handleLogout = () => {

    localStorage.removeItem("token")

    window.location.href = "/login"
  }

  const handleUpload = async () => {

    if (!file) {

      alert("Please select a PDF")

      return
    }

    try {

      const token =
        localStorage.getItem("token")

      console.log("TOKEN:", token)

      if (!token) {

        alert("Please login again")

        window.location.href = "/login"

        return
      }

      const formData = new FormData()

      formData.append("file", file)

      formData.append(
        "job_description",
        jobDescription || "General software engineering role"
      )

      setLoading(true)

      setLoadingText(
        "🧠 Resume Agent analyzing..."
      )

      setAgentStatus([
        {
          name: "Resume Agent",
          status: "Running"
        },
        {
          name: "ATS Agent",
          status: "Waiting"
        },
        {
          name: "Interview Agent",
          status: "Waiting"
        }
      ])

      setTimeout(() => {

        setLoadingText(
          "📊 ATS Agent calculating score..."
        )

        setAgentStatus([
          {
            name: "Resume Agent",
            status: "Completed"
          },
          {
            name: "ATS Agent",
            status: "Running"
          },
          {
            name: "Interview Agent",
            status: "Waiting"
          }
        ])

      }, 2000)

      setTimeout(() => {

        setLoadingText(
          "🎤 Interview Agent generating questions..."
        )

        setAgentStatus([
          {
            name: "Resume Agent",
            status: "Completed"
          },
          {
            name: "ATS Agent",
            status: "Completed"
          },
          {
            name: "Interview Agent",
            status: "Running"
          }
        ])

      }, 4000)

      const res = await axios.post(

        "http://127.0.0.1:8000/upload-resume",

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log(res.data)

      setResponse(res.data.analysis)

      const atsMatch =
        res.data.analysis.match(
          /ATS Match Score:\s*(\d+)%/i
        )

      if (atsMatch) {

        setScore(atsMatch[1])

      } else {

        setScore("0")
      }

      loadHistory()

      setAgentStatus([
        {
          name: "Resume Agent",
          status: "Completed"
        },
        {
          name: "ATS Agent",
          status: "Completed"
        },
        {
          name: "Interview Agent",
          status: "Completed"
        }
      ])

      setLoading(false)

    } catch (error) {

      console.error(error)

      setLoading(false)

      alert("Upload failed")
    }
  }

  const optimizeResume = async () => {

    try {

      const res = await axios.post(

        "http://127.0.0.1:8000/optimize-resume",

        {
          resume_text: response
        }
      )

      setOptimizedResume(
        res.data.optimized_resume
      )

    } catch (error) {

      console.error(error)

      alert("Resume optimization failed")
    }
  }

  const downloadPDF = () => {

    const doc = new jsPDF()

    const splitText =
      doc.splitTextToSize(
        optimizedResume,
        180
      )

    doc.text(splitText, 10, 10)

    doc.save("Optimized_Resume.pdf")
  }

  const loadHistory = async () => {

    try {

      const token =
        localStorage.getItem("token")

      if (!token) {

        return
      }

      const res = await axios.get(

        "http://127.0.0.1:8000/history",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setHistory(res.data)

    } catch (error) {

      console.error(error)
    }
  }

  return (

    <div className="flex min-h-screen bg-black text-white">

      <div className="w-72 bg-gray-950 border-r border-gray-800 p-6">

        <h2 className="text-2xl font-bold mb-8 text-blue-400">
          XeroAI
        </h2>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl mb-6"
          onClick={() => {

            setResponse("")
            setScore("0")
            setFile(null)
            setJobDescription("")
          }}
        >
          + New Analysis
        </button>

        <div className="space-y-4 mt-6">

          {history.map((item, index) => (

            <div
              key={index}

              onClick={() => {

                setResponse(
                  item.analysis_result
                )

                setScore(
                  item.ats_score
                )
              }}

              className="bg-gray-900 hover:bg-gray-800 p-4 rounded-xl mb-3 cursor-pointer"
            >

              <h3 className="text-white font-semibold">
                {item.resume_name}
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                ATS Score: {item.ats_score}%
              </p>

            </div>

          ))}

        </div>

      </div>

      <div className="flex-1 p-8">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-3xl font-bold">
            XeroAI — Multi-Agent Career Intelligence Platform
          </h2>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
          >
            Logout
          </button>

        </div>

        <p className="text-gray-400 mb-6">
          AI-powered resume analysis,
          ATS optimization,
          job matching,
          interview preparation,
          and career guidance.
        </p>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="block w-full text-gray-300
          file:mr-4 file:py-3 file:px-6
          file:rounded-xl file:border-0
          file:bg-blue-600 file:text-white
          hover:file:bg-blue-700"
        />

        <textarea
          placeholder="Paste Job Description Here..."
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(e.target.value)
          }
          className="w-full mt-6 bg-black border border-gray-700 rounded-xl p-4 text-white h-40"
        ></textarea>

        <button
          onClick={handleUpload}
          className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
        >
          {loading
            ? loadingText
            : "Analyze Resume"}
        </button>

        {loading && (

          <div className="mt-8 grid md:grid-cols-3 gap-4">

            {agentStatus.map((agent, index) => (

              <div
                key={index}
                className="bg-black border border-gray-800 rounded-2xl p-4"
              >

                <h3 className="text-xl font-semibold mb-2">
                  {agent.name}
                </h3>

                <p className="text-blue-400">
                  {agent.status}
                </p>

              </div>

            ))}

          </div>

        )}

        {response && (

          <>

            <div className="flex gap-4 mb-6 mt-8">

              <button
                onClick={optimizeResume}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl"
              >
                ✨ Optimize Resume
              </button>

              {optimizedResume && (

                <button
                  onClick={downloadPDF}
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl"
                >
                  📄 Download PDF
                </button>

              )}

            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl mb-8 text-center">

              <h2 className="text-2xl font-semibold mb-4">
                ATS Match Score
              </h2>

              <div className="text-6xl font-bold">
                {score}%
              </div>

            </div>

            <div className="bg-black p-8 rounded-2xl border border-gray-800">

              <h3 className="text-3xl font-bold mb-6 text-blue-400">
                AI Career Analysis
              </h3>

              <div className="text-gray-300 whitespace-pre-wrap leading-8">
                {response}
              </div>

            </div>

          </>

        )}

      </div>

    </div>
  )
}

export default ResumeUpload