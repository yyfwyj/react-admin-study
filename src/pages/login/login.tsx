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
    <div className="grid px-2 grid-cols-2 justify-between w-full h-8 bg-gray-46 rounded-t-lg ">
      {/* 黑色Tab */}
      <div className="grid self-end w-48 h-4/5">
        <div className="rounded-t-lg bg-black text-center text-xs px-2 ">
          [react-admin-study]&nbsp;&nbsp;Login
        </div>
      </div>
      <div className="grid  w-full h-full justify-between">
        <div className="grid">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
        </div>
        <div className="grid">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default Login
