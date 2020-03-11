import proxyUi from './proxyComponent/projectProxy'

module.exports = function(){
  // 
  this.bindHook('sub_setting_nav', function(routers){
    // 全局转发
    routers.proxy = {
      name: '接口转发',
      component: proxyUi
    }
  })
  // this.bindHook('interface_tab', function(tabs){
  //   tabs.proxy = {
  //     name: '接口转发',
  //     component: proxyUi
  //   }
  // })
  
}