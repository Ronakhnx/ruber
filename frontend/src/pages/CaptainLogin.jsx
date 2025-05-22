import React, { useState } from "react"
import { Link } from "react-router-dom"

const CaptainLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [captainData, setCaptainData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()
    setCaptainData({ email: email, password: password })
    setEmail("")
    setPassword("")
  }
  console.log(captainData)
  return (
    <>
      <div className="p-7 flex flex-col justify-between h-screen">
        <div>
          {" "}
          <img
            className="w-16 mb-10"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          />
          <form
            onSubmit={(e) => {
              submitHandler(e)
            }}
          >
            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              className="bg-[#eeeeee] w-full mb-7 rounded border px-4 py-2 text-lg placeholder:text-base"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
            />
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              className="bg-[#eeeeee] w-full mb-7 rounded border px-4 py-2 text-lg placeholder:text-base "
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <button className="bg-[#111] text-white font-semibold mb-3 w-full rounded border px-4 py-2 text-lg placeholder:text-base">
              Login
            </button>
            <p className="text-center">
              New here ?{"   "}
              <Link to="/captain-signup" className="text-blue-600">
                {" "}
                Join the fleet 
              </Link>
            </p>
          </form>
        </div>
        <div>
          <Link
            to="/login"
            className="bg-[#d5622d] flex item-center justify-center mb-5 text-white font-semibold mb-7 w-full rounded border px-4 py-2 text-lg placeholder:text-base"
          >
            Sign in as an User
          </Link>
        </div>
      </div>
    </>
  )
}

export default CaptainLogin
