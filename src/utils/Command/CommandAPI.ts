import { Command } from "./Command";
import { get, post } from "@api/request/funcRequest"; // 确保这里的路径是正确的
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

/**
 * @class HelpCommand 帮助命令 用于获取帮助信息，命令列表
 */
class HelpCommand implements Command {
  public commandName = "help";

  execute(args: string[]): void {
    // console.log(this.Command)
  }
}

/**
 * @class LoginCommand 登录命令 用于登录
 */
class LoginCommand implements Command {
  public commandName = "login";
  async execute(args: string[]): Promise<any | void> {
    const res = await post("/api/admin/auth/login", {
      username: args[0],
      password: args[1],
    });

    return res;
  }
}

export const CommandAPI = {
  HelpCommand,
  LoginCommand,
};
