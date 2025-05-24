import React,{useEffect} from "react"

import { useNavigate } from "react-router-dom"

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
   useEffect(() => {if (!token) {
    navigate("/login")
  }})
  return <div>{children}</div>
}

export default UserProtectedWrapper
