/**
 * 置顶！：参考文献
 * @link axios官方文档：https://www.axios-http.cn/docs/req_config
 * @link VUE3 + TS 使用 Axios（copy可直接使用）| 作者：超级无敌谢大脚 | 平台：CSDN 链接：https://blog.csdn.net/Cang_Ye/article/details/121722444
 */

/**
 * 1. 引入axios以及后面需要使用到的类型
 * @type {AxiosRequestConfig} axios整个配置对象的类型
 * @type {AxiosResponse} axios 响应拦截器接收的响应体类型
 * @type {InternalAxiosRequestConfig} axios 请求拦截器接收的请求体类型
 * @type {AxiosError} axios 响应拦截器错误类型
 * @type {AxiosInstance} axios 实例类型
 */
import Axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios'

/**
 * 2. 创建axios请求配置对象
 * @param {string} baseURL: `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
 * @param {number} timeout: `timeout` 指定请求超时的毫秒数。如果请求时间超过 `timeout` 的值，则请求会被中断
 * @param {boolean} withCredentials: `withCredentials` 表示跨域请求时是否需要使用凭证，默认值为 false
 * @param {string} responseType: `responseType` 表示浏览器将要响应的数据类型,选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream',浏览器专属：'blob'
 * @param {string} xsrfCookieName: `xsrfHeaderName` 是带有 xsrf token 值的http 请求头名称,xsrfHeaderName: 'X-XSRF-TOKEN', // 默认值
 * @param {string} xsrfHeaderName: xsrfCookieName` 是 xsrf token 的值，被用作 cookie 的名称，xsrfCookieName: 'XSRF-TOKEN', // 默认值
 * @param {number} maxContentLength: `maxContentLength` 定义了node.js中允许的HTTP响应内容的最大字节数
 * @param {number} maxBodyLength: `maxBodyLength`（仅Node）定义允许的http请求内容的最大字节数
 * @param {number} maxRedirects: `maxRedirects` 定义了在node.js中要遵循的最大重定向数。如果设置为0，则不会进行重定向
 * @param {string} socketPath:  `socketPath` 定义了在node.js中使用的UNIX套接字。e.g. '/var/run/docker.sock' 发送请求到 docker 守护进程。只能指定 `socketPath` 或 `proxy` 。若都指定，这使用 `socketPath`
 * @param {Class} httpAgent: `httpAgent` and `httpsAgent` define a custom agent to be used when performing http,and https requests, respectively, in node.js. This allows options to be added like,`keepAlive` that are not enabled by default.
 * @param {Class} httpsAgent:
 * @function transformRequest: `transformRequest` 允许在向服务器发送前，修改请求数据，它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法，数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream，你可以修改请求头
 * @function validateStatus: `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是 reject promise。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，则promise 将会 resolved，否则是 rejected。
 * @function onUploadProgress: 处理原生进度事件，浏览器专属
 * @function onDownloadProgress: 处理原生进度事件，浏览器专属
 */
const defaultAxiosConfig: AxiosRequestConfig = {
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: '',
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
  // 你可以修改请求头。
  transformRequest: [
    function (data, headers) {
      // 对发送的 data 进行任意转换处理

      return JSON.stringify(data)
    },
  ],
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    function (data) {
      // 对接收的 data 进行任意转换处理

      // return data;
      //对响应的数据进行处理
      if (typeof data === 'string' && data.startsWith('{')) {
        data = JSON.parse(data)
      }
      return data
    },
  ],
  // 自定义请求头
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是 reject promise。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，
  // 则promise 将会 resolved，否则是 rejected。
  validateStatus: function (status) {
    return status >= 200 && status < 300 // 默认值
  },
  // `timeout` 指定请求超时的毫秒数。
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  timeout: 10000,
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default
  // `responseType` 表示浏览器将要响应的数据类型
  // 选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream'
  // 浏览器专属：'blob'
  responseType: 'json', // 默认值
  // `xsrfCookieName` 是 xsrf token 的值，被用作 cookie 的名称
  // xsrfCookieName: 'XSRF-TOKEN', // 默认值

  // `xsrfHeaderName` 是带有 xsrf token 值的http 请求头名称
  // xsrfHeaderName: 'X-XSRF-TOKEN', // 默认值
  // `onUploadProgress` 允许为上传处理进度事件
  // 浏览器专属
  onUploadProgress: function (progressEvent) {
    // 处理原生进度事件
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  // 浏览器专属
  onDownloadProgress: function (progressEvent) {
    // 处理原生进度事件
  },
  // `maxContentLength` 定义了node.js中允许的HTTP响应内容的最大字节数
  maxContentLength: 2000,

  // `maxBodyLength`（仅Node）定义允许的http请求内容的最大字节数
  maxBodyLength: 2000,

  // `maxRedirects` 定义了在node.js中要遵循的最大重定向数。
  // 如果设置为0，则不会进行重定向
  maxRedirects: 5, // 默认值

  // `socketPath` 定义了在node.js中使用的UNIX套接字。
  // e.g. '/var/run/docker.sock' 发送请求到 docker 守护进程。
  // 只能指定 `socketPath` 或 `proxy` 。
  // 若都指定，这使用 `socketPath` 。
  socketPath: null, // default

  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows options to be added like
  // `keepAlive` that are not enabled by default.
  // httpAgent: new http.Agent({ keepAlive: true }),
  // httpsAgent: new https.Agent({ keepAlive: true }),

  // `proxy` 定义了代理服务器的主机名，端口和协议。
  // 您可以使用常规的`http_proxy` 和 `https_proxy` 环境变量。
  // 使用 `false` 可以禁用代理功能，同时环境变量也会被忽略。
  // `auth`表示应使用HTTP Basic auth连接到代理，并且提供凭据。
  // 这将设置一个 `Proxy-Authorization` 请求头，它会覆盖 `headers` 中已存在的自定义 `Proxy-Authorization` 请求头。
  // 如果代理服务器使用 HTTPS，则必须设置 protocol 为`https`
  // proxy: {
  //   protocol: 'https',
  //   host: '127.0.0.1',
  //   port: 9000,
  //   auth: {
  //     username: 'mikeymike',
  //     password: 'rapunz3l',
  //   },
  // },

  // see https://axios-http.com/zh/docs/cancellation
  // cancelToken: new CancelToken(function (cancel) {}),

  // `decompress` indicates whether or not the response body should be decompressed
  // automatically. If set to `true` will also remove the 'content-encoding' header
  // from the responses objects of all decompressed responses
  // - Node only (XHR cannot turn off decompression)
  // decompress: true, // 默认值
}

/**
 * 3. 封装函数，用于获取 axios 配置参数
 */
const getConfig = (config?: AxiosRequestConfig): AxiosRequestConfig => {
  if (!config) return defaultAxiosConfig
  return config
}

/**
 * 4. 封装Axios类
 */
class AxiosHttp {
  // 4.1 构造方法，创建对象的时候执行
  constructor() {}

  // 4.2 定义一个私有变量，用于保存获取到的axios实例
  static axiosInstance: AxiosInstance = Axios.create(getConfig())

  // 4.3 设置请求拦截器
  private HttpIntercetorsRequest(): void {
    AxiosHttp.axiosInstance.interceptors.request.use(
      (
        config:
          | InternalAxiosRequestConfig<any>
          | Promise<InternalAxiosRequestConfig<any>>
      ):
        | InternalAxiosRequestConfig<any>
        | Promise<InternalAxiosRequestConfig<any>> => {
        //  在请求发出去之前作出一下处理
        // console.log("config=>:", config);
        return config
      },
      (err) => {
        return Promise.resolve(err)
      }
    )
  }
  // 4.4 设置响应拦截器
  private HttpInterceptorsResponse(): void {
    AxiosHttp.axiosInstance.interceptors.response.use(
      (
        response: AxiosResponse<any, any>
      ): AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> => {
        const { status } = response
        return response
      },
      () => {}
    )
  }
}

export default AxiosHttp
