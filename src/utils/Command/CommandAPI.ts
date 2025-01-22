import loginSlice from "@/store/module/login";
import { Command } from "./Command";
import { get, post } from "@api/request/funcRequest"; // 确保这里的路径是正确的
import { useDispatch, useSelector } from "react-redux";

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
    const dispatch = useDispatch();
    if (args.length === 0) {
      console.log("是这里吗")
      dispatch(loginSlice.actions.errorCommand("请输入用户名密码"));
      return;
    }

    const res = await post("/api/admin/auth/login", {
      username: args[0],
      password: args[1],
    });

    return res;
  }
}

class RegisterCommand implements Command {
  public commandName = "register";
  async execute(args: string[]): Promise<any | void> {
    const res = await post("/api/admin/auth/register", {
      username: args[0],
      password: args[1],
    });

    return res;
  }
}

export const CommandAPI = {
  HelpCommand,
  LoginCommand,
  RegisterCommand,
};
