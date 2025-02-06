import { NavigateFunction } from 'react-router-dom';

/**
 * 命令执行函数类型
 * @Param args 命令参数数组
 * @Param dispatch Redux dispatch函数
 */
export type CommandExecutor = (
    args: string[],
    dispatch: any,
    navigate?: NavigateFunction
) => void | Promise<void>;

/**
 * 命令对象结构
 * @property commandName 命令名称（如 "login"）
 * @property executor 命令执行函数
 * @property description 命令描述（用于帮助信息）
 */
export interface Command {
    commandName: string;
    executor: CommandExecutor;
    description?: string;
}