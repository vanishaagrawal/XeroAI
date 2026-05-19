import { useState } from "react"
import axios from "axios"

function Signup() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {

    try {

      const res = await axios.post(

        "http://127.0.0.1:8000/signup",

        {
          email,
          password
        }
      )

      alert(res.data.message)

      window.location.href = "/login"

    } catch (error) {

      console.error(error)

      alert("Signup failed")
    }
  }

  return (

    <div className="min-h-screen bg-black flex justify-center items-center">

      <div className="bg-gray-900 p-10 rounded-2xl w-[400px]">

        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Signup
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-black border border-gray-700 text-white mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-black border border-gray-700 text-white mb-6"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl text-white font-semibold"
        >
          Signup
        </button>

        <p className="text-gray-400 mt-6 text-center">

          Already have an account?

          <a
            href="/login"
            className="text-blue-400 ml-2"
          >
            Login
          </a>

        </p>

      </div>

    </div>
  )
}

export default Signup