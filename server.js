const  axios = require('axios')
const  crypto = require('./utils/crypto')
// const yapi = require('yapi.js');
// const ProxyModel = require('../models/proxyModels')
const  routers = require('./router')
const  controller = require('./controller/ProxyController')
// const constance = require('./constance')
// const instnce = yapi.getInst(ProxyModel);
module.exports = function () {
  // 代理请求
  this.bindHook('mock_after', async function (context) {
    let { body, header, query } = context.ctx.request
    let { path, method } = context.interfaceData
    let { basepath } = context.projectData
    const url = ''
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    const resData = await axios(path, {
      baseURL: url + basepath,
      method,
      headers:{
        ...header
      },
      params: query,
      data: crypto.enCryptoByDes(body)
    })
    context.mockJson = resData.data
    return context
  })
  this.bindHook('add_router', function (addRouter) {
    routers.forEach(item=>{
      addRouter({
        controller,
        ...item
      })
    })
  })
}