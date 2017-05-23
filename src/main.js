// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import init from './js/init' //初始化微信分享
import axios from 'axios' //ajax请求
import runconfig from './js/config'
import { Indicator } from 'mint-ui';

Vue.config.productionTip = false

Indicator.open();
init();
var code = getUrlParam('code');
//取地址参数
function getUrlParam(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r!=null) return unescape(r[2]); 
  return null;
}
axios({
    url:runconfig.hosturl+'/getweboauthuserinfo?code='+code,
    type:'get',
    contentType:'application/json',
    dataType:'json'
}).then(function(response){
	var data = response.data;
	Indicator.close();
      if(data.data==null) {
        console.log('data is null');
      }else{
        sessionStorage.setItem('wechatid',data.data.wechatid);
        sessionStorage.setItem('createdtime',data.data.createdtime);
      }
}).catch(function(err){
	console.log(err)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
