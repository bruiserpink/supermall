import axios from 'axios'
//方法三 省略promise，因为调用的instance是一个axios的实例，axios对象返回的就是一个promise实例
export function request(config) {
  const instance = axios.create({
      baseURL: 'http://106.54.54.237:8000/api/hy',
      //baseURL: 'http://123.207.32.32:8000/api/hy',
      timeout: 8000
    })
  //axios拦截器
  //1.请求拦截器
/*  instance.interceptors.request.use(config=>{
    return config;
  },err=>{
    console.log(err);
  });*/
  //2.响应拦截器
  instance.interceptors.response.use(res=>{
    return res;
  },err=>{
    console.log(err);
  })
    //发送网络请求
    return instance(config);
}
