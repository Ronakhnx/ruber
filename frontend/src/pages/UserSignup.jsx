import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import UserContext, { UserDataContext } from "../context/UserContext"
const UserSignup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userData, setUserData] = useState({})
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const { user, setUser } = React.useContext(UserDataContext)
  const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    )

    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem("token", data.token)
      navigate("/home")
    }

    setEmail("")
    setPassword("")
    setLastName("")
    setFirstName("")
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
            <h3 className="text-lg font-medium mb-2">What's your name</h3>
            <div className="flex mb-6">
              <input
                className="bg-[#eeeeee] w-1/2  rounded  px-4 py-2 text-lg placeholder:text-base"
                required
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
              />

              <input
                className="bg-[#eeeeee] w-1/2  rounded  px-4 py-2 text-lg placeholder:text-base"
                required
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
              />
            </div>
            <h3 className="text-lg font-medium mb-2">Enter your email</h3>
            <input
              className="bg-[#eeeeee] w-full mb-6 rounded  px-4 py-2 text-lg placeholder:text-base "
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="password"
            />
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              className="bg-[#eeeeee] w-full mb-6 rounded  px-4 py-2 text-lg placeholder:text-base "
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <button className="bg-[#111] text-white font-semibold mb-3 w-full rounded  px-4 py-2 text-lg placeholder:text-base">
              Sign Up
            </button>
            <p className="text-center">
              Already have a account ?{"   "}
              <Link to="/login" className="text-blue-600">
                {" "}
                Log in
              </Link>
            </p>
          </form>
        </div>
        <div>
          <p className="text-[10px] leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">google Privacy Policy</span>
            and <span className="underline">Terms of Services</span> apply.
          </p>
        </div>
        {/* <div>
          <Link
            to="/captain-signup"
            className="bg-[#10b461] flex item-center justify-center mb-5 text-white font-semibold mb-7 w-full rounded border px-4 py-2 text-lg placeholder:text-base"
          >
            Sign Up as a Captain
          </Link>
        </div> */}
      </div>
    </>
  )
}

export default UserSignup
