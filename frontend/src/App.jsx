import ProtectedRoute from "./components/ProtectedRoute"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import ResumeUpload from "./components/ResumeUpload"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
  path="/"
  element={
    <ProtectedRoute>
      <ResumeUpload />
    </ProtectedRoute>
  }
/>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App