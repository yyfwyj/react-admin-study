/**
 * @interface Command 命令接口 该接口用于多个命令类继承，实现execute方法执行命令逻辑。命令在登录页面使用
 * @property {string[]} execute 执行命令
 */
export interface Command {
  commandName: string;
  execute(args: string[]): any | void;
}
