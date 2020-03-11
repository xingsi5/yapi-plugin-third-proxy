const yapi = require('yapi.js');
const baseModel = require('models/base.js');

class ProxyModel extends baseModel {
  getName() {
    return 'proxy_model';
  }
  getSchema() {
    return {
      uid: String,
      interface_id: { type: Number, required: true },
      project_id: { type: Number, required: true },
      envName:String, //环境变量配置
      proxy_url:String, //url选项
      is_proxy:Boolean, //是否开启
      pre_proxy_script:String, // 后置脚本
      after_proxy_script:String, // 前置脚本
      up_time: Number
    };
  }
  // 查询唯一记录
  get(id) {
    return this.model
      .findOne({
        _id: id
      })
      .exec();
  }
  /**
   * 项目id，如果有project_id没有interface_id则认为挂载在项目的全局，否则被认为是挂在在接口层次上
   * @param {*} project_id 
   * @param {*} interface_id 
   */
  getById(project_id,interface_id) {
    return this.model.findOne({
      project_id: project_id,
      interface_id:interface_id
    }) 
  }
  // 删除
  del(id) {
    return this.model.remove({
      _id: id
    });
  }
  // 更新
  up(id, data) {
    data.up_time = yapi.commons.time();
    return this.model.update(
      {
        _id: id
      },
      data
    );
  }
 
  save(data) {
    var defaultData = {
      envName:'',
      proxy_url:'',
      is_proxy:false,
      pre_proxy_script:'',
      after_proxy_script:'',
      up_time:yapi.commons.time()
    }
    data = Object.assign({},defaultData,data)
    let m = new this.model(data);
    return m.save();
  }

}

module.exports = ProxyModel;