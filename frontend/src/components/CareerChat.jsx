import { useState } from "react"
import axios from "axios"

function CareerChat() {

  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {

    if (!message) return

    const updatedChat = [
      ...chat,
      {
        role: "user",
        content: message
      }
    ]

    setChat(updatedChat)

    setLoading(true)

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          message
        }
      )

      setChat([
        ...updatedChat,
        {
          role: "assistant",
          content: res.data.response
        }
      ])

      setMessage("")

    } catch (error) {

      console.error(error)

      alert("Chat failed")
    }

    setLoading(false)
  }

  return (

    <div className="bg-black border border-gray-800 rounded-2xl p-6 mt-10">

      <h2 className="text-3xl font-bold mb-6 text-purple-400">
        AI Career Copilot
      </h2>

      <div className="h-96 overflow-y-auto mb-6 space-y-4">

        {chat.map((msg, index) => (

          <div
            key={index}
            className={`p-4 rounded-2xl max-w-[80%]
            ${msg.role === "user"
              ? "bg-blue-600 ml-auto"
              : "bg-gray-800"
            }`}
          >
            {msg.content}
          </div>

        ))}

        {loading && (

          <div className="bg-gray-800 p-4 rounded-2xl w-fit">
            AI Agents Thinking...
          </div>

        )}

      </div>

      <div className="flex gap-4">

        <input
          type="text"
          placeholder="Ask AI Career Copilot..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-gray-900 border border-gray-700 rounded-xl p-4 text-white"
        />

        <button
          onClick={sendMessage}
          className="bg-purple-600 hover:bg-purple-700 px-6 rounded-xl"
        >
          Send
        </button>

      </div>

    </div>
  )
}

export default CareerChat