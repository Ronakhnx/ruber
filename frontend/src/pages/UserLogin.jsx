import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserDataContext } from "../context/UserContext"
import axios from "axios"
const UserLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user, setUser } = React.useContext(UserDataContext)
  const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault()
    const userData = {
      email: email,
      password: password,
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    )

    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token',data.token)
      navigate("/home")
    }

    setEmail("")
    setPassword("")
  }

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
              <Link to="/signup" className="text-blue-600">
                {" "}
                Creat New Account
              </Link>
            </p>
          </form>
        </div>
        <div>
          <Link
            to="/captain-login"
            className="bg-[#10b461] flex item-center justify-center mb-5 text-white font-semibold mb-7 w-full rounded border px-4 py-2 text-lg placeholder:text-base"
          >
            Sign In as a Captain
          </Link>
        </div>
      </div>
    </>
  )
}

export default UserLogin
