// 引入vue
import wxshare from './wxshare.js'
import config from './config.js'
import axios from 'axios'

function cb(data){
  if (data == 'ShareAppMessage Success' || data == 'ShareTimeline Success') {
    axios.get(config.hosturl+'/doshare?wechatid='+sessionStorage.getItem('wechatid')).then(function(res){
      if(res.data.rank == '0'){
        
      }
    }).catch(function(err){
      console.log(err)
    })
  } else if (data == 'ShareAppMessage cancel') {
    
  }
}
var init = function () {
  wxshare.init({
        signatureurl:config.hosturl+'/getsignature',
        appId:'wx3d5547d122fc289c',
        jsApiList:['onMenuShareTimeline','onMenuShareAppMessage'],
        title:'进击的龙舟',
        desc:'进击的龙舟',
        link:'http://www.linki2u.com/wxjstxt/boat/dist/dao.html',
        imgurl:'http://www.linki2u.com/wxjstxt/boat/dist/share.png',
        callback:cb
      });
}

export default init
