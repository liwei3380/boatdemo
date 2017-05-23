<template>
  <div class="gamestage">
    <div class="sun">
      <img src="../assets/game_sun.png" class="game_sun">
    </div>
    <div v-bind:class="contentClass" ref="wwater" style="left:0rem;">
      <div class="jianzhu">
        
        <img src="../assets/game_water3.png" class="water3" ref="water1">
        
      </div>
      <div class="jianzhu2">
        
        <img src="../assets/game_water3.png" class="water3" ref="water11">
        
      </div>
    </div>
    <div v-bind:class="contentClass" ref="water" style="left:0rem;">
      <div class="jianzhu">
        
        <img src="../assets/game_water2.png" class="water2" ref="water2">
        
      </div>
      <div class="jianzhu2">
        
        <img src="../assets/game_water2.png" class="water2" ref="water22">
        
      </div>
    </div>
    <div v-bind:class="contentClass" ref="jianzhu" style="left:0rem;">
      <div class="jianzhu">
        <div :class="speed1" @click="setspeed(1)"></div>

        <img src="../assets/game_water1.png" class="water1">
        <!-- <div class="speed2" @click="setspeed(2)">s2</div> -->
      </div>
      <div class="jianzhu2">
        <div :class="speed2" @click="setspeed(1)"></div>

        <img src="../assets/game_water1.png" class="water1">
        <!-- <div class="speed2" @click="setspeed(2)">s2</div> -->
      </div>
    </div>
    
    
    <div class="promcard">
      <div class="time">{{getTime}}</div>
      <div class="score">{{score}}m</div>
    </div>

    <div class="boat">
      
      <img src="../assets/game_p_body.png" class="game_p_body">
      <img src="../assets/game_boat.png" class="game_boat">
      <img src="../assets/game_left_up.png" class="game_left_up">
      <img src="../assets/game_right_up.png" class="game_right_up">
      <img src="../assets/boat_paddle.png" :class=boatpaddle ref="paddle" style="transform: rotate(40deg)">
      <img src="../assets/game_left_down.png" class="game_left_down" ref="ld" style="transform: rotate(99deg)">
      <img src="../assets/game_right_down.png" class="game_right_down" ref="rd" style="transform: rotate(-85deg)">
      
    </div>
    <div class="cclick"  @click="clickboat">
      <img src="../assets/game_click.png" class="game_click">
    </div>
    <div class="gameover" v-show=gameover>
      <div class="overtext" v-show=overtext>
        游戏结束<br>
        进击{{score}}米
        <div class="mybtn otbtn" @click="getrank()">
          查看排名
        </div>
      </div>
      <div class="overtext ranktext" v-show=ranktext>
        排名<br>
        {{rank}}
        <div class="mybtn rtbtn" @click="tosubmit()">
          提交信息
        </div>
        <div class="mybtn" @click="getprise()">
          赢取奖品
        </div>
        <div class="priseprom" @click="priseprom">
          奖品说明
        </div>
      </div>
      <div class="overtext submittext" v-show=submittext>
        <input class="input1" v-model=username type="text" name="name"  maxlength="11" placeholder="请输入姓名">
        <input class="input2" v-model=phone type="tel" maxlength="11" name="phone" placeholder="请输入手机号">
        <div class="mybtn" @click="submit()">
          提交
        </div>
      </div>
      <div class="overtext ppromtext" v-show=ppromtext>
      <img src="../assets/close.png" class="close" @click="closeprom()">
        <div class="ppromtext-title">
          奖品说明
        </div>
        <div class="ppromtext-content">
          活动规则:<br>
          本活动采用排名榜的形式选出奖品<br>
          奖项说明:<br>
          一等奖:思乐智综合空气检测仪(5名)<br>
          二等奖:太阳能车载净化器(10名)<br>
          三等奖:多功能转换插头(全球)(20名)<br>
          幸运奖:《基金定投的奥秘》(50名)<br>
          总人数:85人<br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import boat from '../js/boat.js'
import axios from 'axios'
import myconfig from '../js/config'
import { Indicator,Toast } from 'mint-ui'
/*myconfig.hosturl = 'http://localhost:8080/Linki2uCenterTest'*/
export default {
  name: 'game',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      contentClass: 'content',
      time: 300,
      score: 0,
      rank: 0,
      speed1: 'speed speed1',
      speed2: 'speed speed2',
      gameover: false,
      overtext: true,
      ranktext: false,
      submittext: false,
      ppromtext: false,
      boatpaddle: 'boat_paddle',
      has:null,
      username: '',
      phone: '',
      jianzhu: {
        background: 'url(' + require('../assets/game_water1.png') + ')',
        backgroundSize: 'contain'
      }
    }
  },
  methods:{
    clickboat () {
      boat.speed = 15
      if(boat.ready == true && boat.started == false){
        boat.started = true
        let vm = this
        boat.si = setInterval(function(){
          if(vm.time > 0){
            vm.time -= 1
          } else {
            clearInterval(boat.si)
            vm.gameover = true
            boat.ready = false
            Indicator.open();
            axios.post(myconfig.hosturl+'/boatuserinfo',{
                  score:vm.score,
                  wechatid:sessionStorage.getItem('wechatid'),
                  create_time:sessionStorage.getItem('createdtime'),
                }).then(function(res){
                  Indicator.close();
                  if (res.data.message=="0") {
                    vm.rank = res.data.rank;
                    vm.has = res.data.has;
                  }
                }).catch(function(err){
                  console.log(err)
                })
          }
        },10)
      }
      if (boat.ready == true && this.time > 0) {
        this.$refs.paddle.style.transform = 'rotate(40deg)'
        this.$refs.ld.style.transform = 'rotate(99deg)'
        this.$refs.rd.style.transform = 'rotate(-85deg)'
        this.render()
      }
    },
    setLeft(dom,water,water2){
      let paddle = this.$refs.paddle
      let paddleRotate = paddle.style.transform;
      let paddleRotateNum = (parseFloat(paddleRotate.substring(7,9)) + 1) > 50 ? 50 : (parseFloat(paddleRotate.substring(7,9)) + 1)
      paddle.style.transform='rotate(' + paddleRotateNum + 'deg)'

      let ld = this.$refs.ld
      let ldRotate = ld.style.transform;
      let ldRotateNum = (parseFloat(ldRotate.substring(7,9)) - 1) < 85 ? 85 : (parseFloat(ldRotate.substring(7,9)) - 1)
      ld.style.transform='rotate(' + ldRotateNum + 'deg)'

      let rd = this.$refs.rd
      let rdRotate = rd.style.transform;
      let rdRotateNum = (parseFloat(rdRotate.substring(7,10)) + 1) > -75 ? -75 : (parseFloat(rdRotate.substring(7,10)) + 1)
      rd.style.transform='rotate(' + rdRotateNum + 'deg)'

      let dleft = boat.move();
      let waterdleft = dleft * .5
      let waterdleft2 = dleft * .25
      let left = dom.style.left
      let waterleft = water.style.left
      let waterleft2 = water2.style.left
      if (left=='') {
        left = '0rem'
      }
      if (waterleft=='') {
        waterleft = '0rem'
      }
      if (waterleft2=='') {
        waterleft2 = '0rem'
      }
      let leftnum = parseFloat(left.substring(0,left.length-3))
      let waterleftnum = parseFloat(waterleft.substring(0,waterleft.length-3))
      let waterleftnum2 = parseFloat(waterleft2.substring(0,waterleft2.length-3))
      if(leftnum < -7.2){
        leftnum = parseFloat((leftnum + 7.2).toFixed(2))
        this.speed1 = this.speed2
        this.speed2 = 'speed speed' + boat.resetLogo()
      }
      if(waterleftnum < -7.2){
        waterleftnum = parseFloat((waterleftnum + 7.2).toFixed(2))
      }
      if(waterleftnum2 < -7.2){
        waterleftnum2 = parseFloat((waterleftnum2 + 7.2).toFixed(2))
      }
      left = ((leftnum*100 + parseInt(dleft))*0.01).toFixed(2) + 'rem'
      waterleft = ((waterleftnum*100 + parseInt(waterdleft))*0.01).toFixed(2) + 'rem'
      waterleft2 = ((waterleftnum2*100 + parseInt(waterdleft2))*0.01).toFixed(2) + 'rem'
      dom.style.left = left
      water.style.left = waterleft
      water2.style.left = waterleft2
    },
    setspeed(rate){
      boat.speed = 15 + rate * 5
       if (boat.ready == true && this.time > 0) {
        this.$refs.paddle.style.transform = 'rotate(40deg)'
        this.$refs.ld.style.transform = 'rotate(99deg)'
        this.$refs.rd.style.transform = 'rotate(-85deg)'
        this.render()
      }
    },
    render(){
      // 一些更新界面的操作
      this.setLeft(this.$refs.jianzhu,this.$refs.water,this.$refs.wwater);
      if (boat.speed != 0 && this.time > 0) {
        requestAnimationFrame(this.render);
        this.score = (boat.getScore()*.2).toFixed(0)
      }
    },
    rankbtn(){
      console.log('打开排行榜')
    },
    restart(){
      this.gameover = false
      boat.started = false
      boat.score = 0
      this.score = 0
      this.time = 5
    },
    getrank(){
      //axios rank
      this.overtext = false;
      this.ranktext = true;
    },
    tosubmit(){
      console.log(this.has)
      if (this.has == true) {
        Toast({
                message:'已经提交过信息',
                duration: 2000
              })
      } else {
        this.ranktext = false;
        this.submittext = true;
      }
    },
    getprise(){

    },
    priseprom(){
      this.ranktext = false;
      this.ppromtext = true;
    },
    closeprom(){
      this.ranktext = true;
      this.ppromtext = false;
    },
    submit(){
      var phonereg = new RegExp("^1[0-9]{10}$");
      if (this.username != '' && this.phone != '') {
        if(!phonereg.test(this.phone)){
            Toast({
                message:'请输入正确的手机号',
                duration: 2000
              })
            return;
          }
        var vm = this
        Indicator.open();
        //myconfig.hosturl = 'http://192.168.1.112:8080/Linki2uCenterTest'
        axios.post(myconfig.hosturl+'/boatuserinfo',{
            wechatid:sessionStorage.getItem('wechatid'),
            create_time:sessionStorage.getItem('createdtime'),
            name:this.username,
            phone:this.phone
          }).then(function(res){
            Indicator.close();
            if (res.data.message=="0") {
              //vm.issuc = true
              Toast({
                message:'提交成功',
                duration: 2000
              })
            } /*else if(res.data.message == "0"){
              //alert("重复的电话号")
              Toast({
                message:'重复的电话号',
                duration: 2000
              })
            }*/
          }).catch(function(err){
            Indicator.close();
            Toast({
                message:'请求失败',
                duration: 2000
              })
          })
      } else {
        Toast({
                message:'请完善信息',
                duration: 2000
              })
      }
    }

  },
  mounted(){
    boat.started = false
    boat.ready = true
    boat.score = 0
    axios.get(myconfig.hosturl+'/getboatcount?wechatid='+sessionStorage.getItem('wechatid')).then(function(res){
      if (res.data.data == '0') {
        boat.ready = false
        Toast({
                message:'今天游戏次数用完了',
                duration: 2000
              })
      }
    }).catch(function(err){
      console.log(err)
    });
  },
  computed: {
    getTime(){
      return parseInt(this.time/100) + 's:' + this.time%100 + 'ms'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gamestage{
    background: #81D0FE;
    width: 7.2rem;
    height: 100%;
    overflow: hidden;
    position: absolute;
}
.content{
  width: 14.4rem;
  height: 100%;
  position: absolute;
}
.content div{
  position: absolute;
}
.jianzhu{
  background-size: contain;
  width:7.2rem;
  height: 100%;
  left:0px;
}
.jianzhu2{
  background-size: contain;
  width:7.2rem;
  height: 100%;
  left:7.2rem;
}
.jianzhu3{
  background-size: contain;
  width:7.2rem;
  height: 12.06rem;
  left:14.4rem;
}
.ani{
  transition:left cubic-bezier(0, 0, 0.2, 1) 0.5s;
}
.boat{
  width:5.73rem;
  height: 3.88rem;
  z-index: 0;
  left: 50%;
  bottom:2.55rem;
  transform: translateX(-50%);
  position: absolute;
}
.boat img{
  position: absolute;
}
.game_p_body{
  width: .92rem;
  height: 2.28rem;
  left: 1.3rem;
  top: .95rem;
}
.game_boat{
  width:5.73rem;
  height: 3.88rem;
}
.boat_paddle{
  width: .53rem;
  height: 2.87rem;
  left: 1rem;
  top: 1.55rem;
  transform: rotate(40deg);
  transform-origin:10% center;
}
.ani {
  transform: rotate(30deg);
}
.game_left_up{
  width: .24rem;
  height: .8rem;
  left: 1.35rem;
  top: 2rem;
  transform: rotate(25deg);
  transform-origin:top center;
}
.game_left_down{
  width: .29rem;
  height: .74rem;
  left: 2.35rem;
  top: 2.45rem;
  transform: rotate(100deg);
  transform-origin:top center;
}
.game_right_up{
  width: .24rem;
  height: .8rem;
  left: 1.95rem;
  top: 1.85rem;
  transform: rotate(-25deg);
  transform-origin:top center;
}
.game_right_down{
  width: .29rem;
  height: .74rem;
  left: 1.05rem;
  top: 2.6rem;
  transform: rotate(-85deg);
  transform-origin:top center;
}
.promcard{
  color:white;
  position: absolute;
  width: 6.07rem;
  height: 1.20rem;
  font-size: 20px;
  left: 50%;
  transform: translateX(-50%);
  top:.35rem;
  background:url("../assets/game_score_box.png");
  background-size: cover;
  font-weight: bold;
  -webkit-text-stroke: 1px black;
}
.promcard div{
  box-sizing: border-box;
  padding-left: .4rem;
  width: 50%;
  height: 100%;
  line-height: 0.9rem;
  float: left;
}
.sun{
  position: absolute;
  left: .25rem;
  top:1.6rem;
  width:2.23rem;
}
.game_sun{
  width: 2.23rem;
}
.speed{
  bottom:6.5rem;
  left:50%;
  transform: translateX(-50%);
}
.speed1{
  width: 6.28rem;
  height: 1.28rem;
  background:url("../assets/game_hexin.png");
  background-size: cover;
}
.speed2{
  width: 3.88rem;
  height: 2.12rem;
  background:url("../assets/game_tianyi.png");
  background-size: cover;
}
.speed3{
  width: 4.19rem;
  height: 2.74rem;
  background:url("../assets/game_zhizhu.png");
  background-size: cover;
}
.speed4{
  width: 3.64rem;
  height: 3.53rem;
  background:url("../assets/game_jijin.png");
  background-size: cover;
}
.speed5{
  width: 4.49rem;
  height: 2.03rem;
  background:url("../assets/game_zhangbu.png");
  background-size: cover;
}
.gameover{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
  font-size: 12px;
  z-index: 9;
}
.water1,.water2,.water3{
  position: absolute;
}
.water1{
  width: 7.2rem;
  bottom: 0;
  z-index: 1;
}
.water2{
  width: 7.2rem;
  bottom: 2rem;
}
.water3{
  width: 7.2rem;
  bottom: 2.5rem;
}
.cclick{
  width: 2.52rem;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}
.game_click{
  width: 2.52rem;
}
.overtext{
  box-sizing: border-box;
  padding-top: 1rem;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 6.72rem;
  height: 5.03rem;
  background: url("../assets/lit_window_bg.png");
  background-size: cover;
  text-align: center;
  font-size: 20px;
  color: #6E3923;
  font-weight: bold;
}
.ranktext{
  padding-top: .5rem;
}
.ppromtext{
  width: 9.1rem;
  height: 7.84rem;
  padding-top: 0;
  background: url("../assets/big_window_bg.png");
  background-size: cover;
}
.ppromtext-title{
  padding-top: .25rem;
  font-size: 24px;
  font-weight: bold;
}
.ppromtext-content{
  box-sizing: border-box;
  width: 5.45rem;
  height: 5.5rem;
  margin: auto;
  margin-top: .35rem;
  padding: .25rem;
  font-size: 14px;
  text-align: left;
  line-height: 24px;
}
.submittext{
  padding-top: .95rem;
}
.submittext input{
  width: 3.05rem;
  height: .85rem;
  border: 2px solid #51200D;
  display: block;
  margin:0 0 .25rem 1.95rem;
  border-radius: .15rem;
  box-sizing: border-box;
  background: #F4D197;
  color: #6E3923;
  text-align: center;
}
.mybtn{
  width: 2.5rem;
  height: .8rem;
  line-height: .8rem;
  text-align: center;
  color: white;
  border-radius: 0.4rem;
  background: #6E3923;
  box-shadow:0 0 2px 1px #502A1A inset;
  font-size:16px;
  font-weight: bold;
  margin: 0 0 0 2.25rem;
}
.otbtn{
  margin-top: 1.5rem;
}
.rtbtn{
  margin-top: .25rem;
  margin-bottom: .25rem;
}
.priseprom{
  font-size: 14px;
  padding-top: .15rem;
  color: #005814;
  font-weight: bold;
}
.close{
  width: .45rem;
  height: .47rem;
  position: absolute;
  top: .4rem;
  right: 1.95rem;
}
</style>
