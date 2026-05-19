import { useState } from "react"
import axios from "axios"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

    const handleLogin = async () => {

  try {

    const res = await axios.post(

      "http://127.0.0.1:8000/login",

      {
        email,
        password
      }
    )

    console.log(res.data)

    console.log("LOGIN RESPONSE:", res.data)
    alert(JSON.stringify(res.data))

    if (!res.data.token) {

      alert("No token received")

      return
    }

    localStorage.setItem(
      "token",
      res.data.token
    )

    console.log(
      "TOKEN STORED:",
      localStorage.getItem("token")
    )

    alert("Login successful")

    window.location.href = "/"

  } catch (error) {

    console.error(error)

    alert("Login failed")
  }
}

  return (

    <div className="min-h-screen bg-black flex justify-center items-center">

      <div className="bg-gray-900 p-10 rounded-2xl w-[400px]">

        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Login
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
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl text-white font-semibold"
        >
          Login
        </button>

        <p className="text-gray-400 mt-6 text-center">

          Don’t have an account?

          <a
            href="/signup"
            className="text-blue-400 ml-2"
          >
            Signup
          </a>

        </p>

      </div>

    </div>
  )
}

export default Login