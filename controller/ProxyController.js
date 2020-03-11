const yapi = require('yapi.js');
const ProxyModel = require('../models/proxyModels')
const baseController = require('controllers/base.js');
const constance = require('../constance')

// uid: String,
// interface_id: { type: Number, required: true },
// project_id: { type: Number, required: true },
// envName:String, //环境变量配置
// proxy_url:String, //url选项
// is_proxy:Boolean, //是否开启
// pre_proxy_script:String, // 后置脚本
// after_proxy_script:String, // 前置脚本
// up_time: Number,
class ProxyController extends baseController {
  constructor(ctx){
    super(ctx)
    this.Model = yapi.getInst(ProxyModel);
  }
  // 通过项目增加代理设置
  async addById(ctx){
    let params = ctx.request.body;
    params = yapi.commons.handleParams(params, {
      project_id: 'number',
      interface_id:'number'
    });
    if (!params.project_id) {
      return (ctx.body = yapi.commons.resReturn(null, 400, '项目id不能为空'));
    }
    if(!params.interface_id){
      params.interface_id = constance.INTERFACE_PROJECT
    }
    try {
      let findOne = await this.Model.getById(params.project_id,params.interface_id)
      if(findOne){
        return (ctx.body = yapi.commons.resReturn(null, 400, '项目已经存在'));
      }
     let data = {
        uid:this.getUid(),
        interface_id:params.interface_id,
        project_id: params.project_id
      };
     
      let result = await this.Model.save(data);
      ctx.body = yapi.commons.resReturn(result);
    } catch (e) {
      ctx.body = yapi.commons.resReturn(null, 402, e.message);
    }
  }
  async getById(ctx){
    let params = ctx.request.body;
    params = yapi.commons.handleParams(params, {
      project_id: 'number',
      interface_id:'number'
    });
    if (!params.project_id) {
      return (ctx.body = yapi.commons.resReturn(null, 400, '项目id不能为空'));
    }
    if(!params.interface_id){
      params.interface_id = constance.INTERFACE_PROJECT
    }
    try {
      // 如果没有则增加这个记录
      let findOne = await this.Model.getById(params.project_id,params.interface_id)
      if(findOne){
        return (ctx.body = yapi.commons.resReturn(findOne));
      }else{
        let data = {
          uid:this.getUid(),
          interface_id:params.interface_id,
          project_id: params.project_id
        };
       
        let result = await this.Model.save(data);
        ctx.body = yapi.commons.resReturn(result);
      }
    }catch (e) {
      ctx.body = yapi.commons.resReturn(null, 402, e.message);
    }
  }

  async delById(ctx){
    let params = ctx.request.body;
    params = yapi.commons.handleParams(params, {
      project_id: 'number',
      interface_id:'number'
    });
    if (!params.project_id) {
      return (ctx.body = yapi.commons.resReturn(null, 400, '项目id不能为空'));
    }
    if(!params.interface_id){
      params.interface_id = constance.INTERFACE_PROJECT
    }
    try {
      // 如果没有则增加这个记录
      let findOne = await this.Model.getById(params.project_id,params.interface_id)
      if(findOne){
        const  record =await this.Model.del(findOne._id)
        if(record){
          return (ctx.body = yapi.commons.resReturn(null,200,'删除成功'));
        }else{
          return (ctx.body = yapi.commons.resReturn(null,500,'删除出错'));
        }
      }else{
        ctx.body = yapi.commons.resReturn(null, 400, '数据不存在')
      }
    }catch (e) {
      ctx.body = yapi.commons.resReturn(null, 402, e.message);
    }
  }
}

module.exports = ProxyController

