import { post } from "@/api/request/funcRequest";
import loginSlice from "@/store/module/login";
import { CommandExecutor,Command } from "@/types/components/command/commandTypes";

/**
 * 登录命令实现
 */
const loginExecutor: CommandExecutor = async (args, dispatch) => {
  if (args.length < 2) {
    dispatch(
      loginSlice.actions.errorCommand(
        "登录需要输入用户名和密码，例如：login admin 123456"
      )
    );
    return;
  }

  try {
    // 调用登录API
    const res = await post("/api/admin/auth/login", {
      username: args[0],
      password: args[1],
    });
    if (res) {
    } else {
      //   dispatch(loginSlice.actions.errorCommand(res.message || "登录失败"));
    }
  } catch (error) {
    dispatch(loginSlice.actions.errorCommand("网络请求失败"));
  }
};

/**
 * 注册命令实现
 */
const registerExecutor: CommandExecutor = async (args, dispatch) => {
  if (args.length < 2) {
    dispatch(
      loginSlice.actions.errorCommand(
        "注册需要输入用户名和密码，例如：register admin 123456"
      )
    );
    return;
  }

  try {
    // 调用登录API
    const res = await post("/api/admin/auth/register", {
      username: args[0],
      password: args[1],
    });
  } catch (error) {
    dispatch(loginSlice.actions.errorCommand("网络请求失败"));
  }
};

/**
 * 帮助命令实现
 */
const helpExecutor: CommandExecutor = (args, dispatch) => {
  const helpText = `
    可用命令列表：
    - login <用户名> <密码> : 登录系统
    - register <用户名> <密码> : 注册新账号
    - help : 查看帮助信息
    `;
  // dispatch(loginSlice.actions.showHelpText(helpText));
};

/**
 * 所有可用命令集合
 */
export const COMMANDS: Command[] = [
  {
    commandName: "login",
    executor: loginExecutor,
    description: "登录系统，需要用户名和密码",
  },
  {
    commandName: "register",
    executor: registerExecutor,
    description: "注册新账号",
  },
  {
    commandName: "help",
    executor: helpExecutor,
    description: "查看帮助信息",
  },
];
