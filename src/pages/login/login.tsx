import React from 'react'

const Login = () => {
  return (
    <div className="grid place-items-center w-screen h-screen bg-black-23">
      <LoginCMD></LoginCMD>
    </div>
  )
}

const LoginCMD = () => {
  return (
    <div className="border-gray-46 border-2 lg w-3/5 h-4/6 bg-black rounded-lg shadow-lg">
      <LoginCDMTop></LoginCDMTop>
    </div>
  )
}

const LoginCDMTop = () => {
  return (
    <div className="grid w-full h-10 bg-gray-46 rounded-t-lg">
      <div className="grid grid-cols-3 w-full h-full">
        <div className="grid place-items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
        </div>
        <div className="grid place-items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default Login
