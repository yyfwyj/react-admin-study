import React, { useEffect, useRef } from "react";
import CommandParser from "@utils/Command/CommandParser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginCMDState } from "@/types";
import loginSlice from "@/store/module/login";
import { useCommandManager } from "@/utils/Command/useCommandManager";

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
  // 获取store
  const dispatch = useDispatch();
  const loginCMDArr = useSelector(
    (state: { login: LoginCMDState }) => state.login.loginCMDArr
  );

  // 获取命令执行器
  const { executeCommand } = useCommandManager();

  // 让最后一个输入元素自动获取焦点，并且添加全局监听事件，保证焦点一直在输入框聚焦
  const lastCommandRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (lastCommandRef.current) {
      lastCommandRef.current.focus();
    }

    // 添加全局点击事件监听器
    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement;
      if (lastCommandRef.current && !lastCommandRef.current.contains(target)) {
        // 如果点击发生在输入框之外，则重新聚焦
        setTimeout(() => {
          (lastCommandRef.current as HTMLElement).focus();
        }, 0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // 支持触摸设备

    // 清理事件监听器
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [loginCMDArr]);

  const commandParser = new CommandParser();
  const navigate = useNavigate();

  const enterDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      // 阻止默认的Enter键行为
      event.preventDefault();
      // 获取当前编辑框的内容
      const target = event.target as HTMLDivElement;
      const commandText = target.innerText.trim();
      
      // 执行命令
      await executeCommand(commandText);

      // if (commandParser.inspectCommand(text)) {
      //   await commandParser.parseAndExecute(text);
      // } else {
      //   dispatch(loginSlice.actions.errorCommand(text));
      // }

      // console.log(loginCMDArr);
    }
  };

  return (
    <div className="text-sm w-full h-full p-2">
      <div className="mb-2">
        <p>react-admin-study [版本 0.0.1]</p>
        <p>(c) 2024 yyfwyj。保留所有权利。</p>
      </div>

      <div>
        {loginCMDArr.map((item, index) => (
          <div key={index}>
            <div className="flex items-center">
              <div>{item.initialText}</div>
              <div
                contentEditable={index === loginCMDArr.length - 1}
                className="flex-1 ml-2 focus:outline-none"
                onKeyDown={enterDown}
                ref={index === loginCMDArr.length - 1 ? lastCommandRef : null}
              >
                {/* 初始值可以放在这里 */}
              </div>
            </div>
            <div className="mb-5">{item.errorText}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;
