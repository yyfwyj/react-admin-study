import React, { useRef } from "react";
import CommandParser from '@utils/Command/CommandParser'



const Login = () => {
  return (
    <div className="grid place-items-center w-screen h-screen bg-black-23 font-mono">
      <LoginCMD></LoginCMD>
    </div>
  );
};

const LoginCMD = () => {
  return (
    <div className="border-gray-46 border-2 lg w-3/5 h-4/6 bg-black rounded-lg shadow-lg">
      <LoginCDMTop></LoginCDMTop>
      <LoginCDMContent></LoginCDMContent>
    </div>
  );
};

const LoginCDMTop = () => {
  return (
    <div className="grid px-2 justify-between w-full h-8 bg-gray-46 rounded-t-lg ">
      {/* 黑色Tab */}
      <div className="rounded-t-lg bg-black  text-center  grid self-end w-48 h-4/5">
        <span className="text-xsl flex items-center justify-start">
          [react-admin-study]&nbsp;Login
        </span>
      </div>
    </div>
  );
};

const LoginCDMContent = () => {

  const commandParser = new CommandParser();

  const enterDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 阻止默认的Enter键行为
      // 获取当前编辑框的内容
      const target = event.target as HTMLDivElement;
      const text = target.innerText;
      // text.split(" ").forEach((item) => {
      //   console.log(item);
      // });
      // console.log(text);

      commandParser.parseAndExecute(text);

    }
  };

  return (
    <div className="text-sm w-full h-full p-2">
      <div className="mb-2">
        <p>react-admin-study [版本 0.0.1]</p>
        <p>(c) 2024 yyfwyj。保留所有权利。</p>
      </div>
      <div className="flex items-center">
        <div>C:\Users&gt;</div>
        <div
          contentEditable="true"
          className="flex-1 ml-2 focus:outline-none"
          onKeyDown={enterDown}
        >
          {/* 初始值可以放在这里 */}
        </div>
      </div>
    </div>
  );
};

export default Login;
