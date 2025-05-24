import React from "react"
import { Link } from "react-router-dom"

const Start = () => {
  return (
    <>
      <div className="bg-cover bg-bottom bg-[url('https://images.pexels.com/photos/2422270/pexels-photo-2422270.jpeg')] h-screen pt-8 flex justify-between flex-col w-full bg-red-400">
        <img
          className="w-16 ml-8"
          src="https://freelogopng.com/images/all_img/1659768779uber-logo-white.png"
        />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link to='/login' className="flex w-full item-center justify-center bg-black text-white py-3 rounded mt-2">
            Continue
          </Link>
        </div>
      </div>
    </>
  )
}

export default Start
