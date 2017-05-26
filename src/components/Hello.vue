<template>
  <div class="hello">
    <img src="../assets/home_bg.png" class="home_bg">
    <img src="../assets/home_logo.png" class="home_logo">
    <img src="../assets/home_boat.png" class="home_boat">
    <img src="../assets/start_btn.png" class="start_btn" @click="startgame">
    <div class="share-shadow" v-show=shareshadow @click="shareshadow = !shareshadow">
      <img src="../assets/share-arrow.png">
      今天游戏次数用完了<br>分享朋友圈再获得两次游戏机会
    </div>
    <div class="share-shadow nocount" v-show=nocount @click="nocount = !nocount">
      今天游戏次数用完了<br>请明天再来
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import myconfig from '../js/config'
import { Indicator,Toast } from 'mint-ui'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      shareshadow: false,
      nocount: false,
    }
  },
  methods: {
    startgame () {
      let vm = this
      axios.get(myconfig.hosturl+'/getboatcount?wechatid='+sessionStorage.getItem('wechatid')).then(function(res){
          if (res.data.data == '0') {
            
           vm.nocount = true

          } else if (res.data.data == '2') {
            
            vm.shareshadow = true
            
          } else {
            vm.$router.push('/game')
          }
        }).catch(function(err){
          console.log(err)
        });
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.home_bg{
  width: 7.2rem;
  position: absolute;
  top: 0;
  left: 0;
}
.home_boat{
  width: 7.2rem;
  position: absolute;
  bottom: 0;
  left: 0;
}
.home_logo{
  width: 65%;
  position: absolute;
  top: 0.8rem;
  left: 50%;
  transform: translateX(-50%);
}
.start_btn{
  width: 3.12rem;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
}
.share-shadow{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background:rgba(0,0,0,0.7);
  font-size: 16px;
  color: white;
  text-align: center;
}
.share-shadow img{
  width: 3.78rem;
  display: block;
  margin: auto;
  padding: 2rem 0 .25rem 1rem;
}
.nocount{
  padding-top:3rem;
}
</style>
