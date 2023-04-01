import colors from "colors";

export default class Logger {
  public static log = (args: any) => this.info(args);
  public static info = (args: any) =>
    console.log(colors.blue(`[${new Date().toLocaleString()}] [INFO]`), typeof args === "string" ? colors.blue(args) : args);
  public static warning = (args: any) =>
    console.log(colors.yellow(`[${new Date().toLocaleString()}] [WARN]`), typeof args === "string" ? colors.yellow(args) : args);
  public static error = (args: any) =>
    console.log(colors.red(`[${new Date().toLocaleString()}] [ERROR]`), typeof args === "string" ? colors.red(args) : args);
}
