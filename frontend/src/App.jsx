import React from "react"
import { Route, Routes } from "react-router-dom"
import {
  Home,
  UserLogin,
  UserSignup,
  CaptainLogin,
  CaptainSignup,
  Start,
} from "./pages/index.js"
import UserProtectedWrapper from "./pages/UserProtectedWrapper.jsx"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
      </Routes>
    </>
  )
}

export default App
