import AxiosHttp from './request'

// GET
export const get = async (url: string, params?: any) => {
  return AxiosHttp.axiosInstance.get(url, params)
}

// POST
export const post = async (url: string, params?: any) => {
  return AxiosHttp.axiosInstance.post(url,params)
}

// PUT
export const put = async (url: string, params?: any) => {
  return AxiosHttp.axiosInstance.put(url,params)
}

// DELETE
export const requestDelete = async (url: string, params?: any) => {
  return AxiosHttp.axiosInstance.delete(url,params)
}