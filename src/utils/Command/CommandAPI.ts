import { Command } from "./Command";

/**
 * @class HelpCommand 帮助命令 用于获取帮助信息，命令列表
 */
export class HelpCommand implements Command {
    execute(args: string[]): void {
        console.log("help command");
    }
}

/**
 * @class LoginCommand 登录命令 用于登录
 */
export class LoginCommand implements Command {
    execute(args: string[]): void {
        console.log("login command");
    }
}

