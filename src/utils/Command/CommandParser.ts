import { Command } from "./Command";
import { CommandAPI } from './CommandAPI';

/**
 * @class CommandParser 命令解析器
 */
export default class CommandParser {
    private commands: { [key: string]: Command } = {};

    constructor() {
        this.registerCommand();
    }

    // 循环注册CommandAPI中的命令，注册到命令解析器中
    private registerCommand() {
        for (const key in CommandAPI) {
            if (Object.prototype.hasOwnProperty.call(CommandAPI, key)) {
                const CommandClass = (CommandAPI as unknown as { [key: string]: new () => Command })[key];
                const commandInstance = new CommandClass();
                // console.log(`Registering command: ${commandInstance.commandName}`, commandInstance);
                if (!commandInstance || typeof commandInstance.commandName !== 'string') {
                    // console.error(`Invalid command instance: ${key}`, commandInstance);
                    continue;
                }
                this.commands[commandInstance.commandName] = commandInstance;
                // console.log(`Registered command: ${commandInstance.commandName}`);
            }
        }
    }

    // 根据输入的命令以及参数执行命令
    public parseAndExecute(commandLine: string): any | void {
        const args = commandLine.split(' ');
        const commandName = args.shift();
        if (commandName) {
            const command = this.commands[commandName];
            if (command) {
                return command.execute(args);
            } else {
                console.error(`Unknown command: ${commandName}`);
            }
        }
    }

    // 检查命令是否存在
    public inspectCommand(commandName: string): boolean {
        return commandName in this.commands;
    }
}