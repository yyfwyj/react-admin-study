import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Command } from "@/types/components/command/commandTypes";
import { COMMANDS } from "./Commands";
import loginSlice from "@/store/module/login";

/**
 * 自定义 Hook：管理命令执行
 */
export const useCommandManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * 根据命令名称查找对应命令
   * @param commandName 命令名称
   */
  const findCommand = (commandName: string): Command | undefined => {
    return COMMANDS.find((cmd) => cmd.commandName === commandName);
  };

  /**
   * 执行命令的主方法
   * @param input 用户输入的原生命令字符串（如 "login admin 123"）
   */
  const executeCommand = async (input: string) => {
    const [commandName, ...args] = input.trim().split(" ");

    // 查找匹配的命令
    const command = findCommand(commandName);

    if (!command) {
      dispatch(loginSlice.actions.errorCommand(commandName));
      return;
    }

    // 执行命令逻辑
    await command.executor(args, dispatch, navigate);
  };

  return { executeCommand };
};
