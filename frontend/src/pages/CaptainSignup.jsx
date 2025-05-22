import React, { useState } from "react"
import { Link } from "react-router-dom"

const CaptainSignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userData, setUserData] = useState({})
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const submitHandler = (e) => {
    e.preventDefault()
    setUserData({
      username: { firstName: firstName, lastName: lastName },
      email: email,
      password: password,
    })
    setEmail("")
    setPassword("")
    setLastName("")
    setFirstName("")
  }
  console.log(userData)
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
            By proceeding, you consent to get calls, emails or SMS messages,
            including by automated means, from Uber and its affliates tro the
            number provided.
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

export default CaptainSignUp
