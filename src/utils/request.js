import axios from "axios";
import appkey from "./appkey";

// 创建axios的实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, //公共接口
  timeout: 10 * 1000, //10s 超时时间
});

// 请求拦截器,在发送请求之前做些什么
service.interceptors.request.use(
  (config) => {
    config.headers = {
      "Content-Type": "application/json", //配置请求头
      appkey: appkey.appkey, //带上appkey才能访问
    };
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

// 响应拦截器,对响应数据做点什么
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default service;
