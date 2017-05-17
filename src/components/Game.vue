<template>
  <div class="gamestage">
    <div v-bind:class="contentClass" ref="jianzhu" style="left:0rem;">
      <div class="jianzhu">
        <div class="speed1" @click="setspeed(1)">s1</div>
        <!-- <div class="speed2" @click="setspeed(2)">s2</div> -->
      </div>
      <div class="jianzhu2">
        <div class="speed1" @click="setspeed(1)">s1</div>
        <!-- <div class="speed2" @click="setspeed(2)">s2</div> -->
      </div>
    </div>
    <div class="boat" @click="clickboat"></div>
    <div class="promcard">
      <div class="time">time {{time}}</div>
      <div class="score">score {{score}}</div>
    </div>
  </div>
</template>

<script>
import boat from '../js/boat.js'
export default {
  name: 'game',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      contentClass: 'content',
      time: 10,
      score: 0
    }
  },
  methods:{
    clickboat () {
      boat.speed = 20
      if(boat.started == false){
        boat.started = true
        let vm = this
        boat.si = setInterval(function(){
          if(vm.time > 0)
            vm.time -= 1
        },500)
      }
      if (this.time > 0) this.render()
    },
    setLeft(dom){

      let dleft = boat.move();

      let left = dom.style.left
      if (left=='') {
        left = '0rem'
      }
      let leftnum = parseFloat(left.substring(0,left.length-3))
      if(leftnum < -7.5){
        leftnum = leftnum + 7.5
      }
      left = ((leftnum*100 + parseInt(dleft))*0.01).toFixed(2) + 'rem'
      dom.style.left = left

    },
    setspeed(rate){
      boat.speed = 20 + rate * 5
      if (this.time > 0) this.render()
    },
    render(){
      // 一些更新界面的操作
      this.setLeft(this.$refs.jianzhu);
      if (boat.speed != 0 && this.time > 0) {
        requestAnimationFrame(this.render);
        this.score = boat.getScore().toFixed(0)
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gamestage{
    background: gray;
    width: 7.5rem;
    height: 12.06rem;
    overflow: hidden;
    position: absolute;
}
.content{
  width: 15rem;
  height: 12.06rem;
  position: absolute;
}
.content div{
  position: absolute;
}
.jianzhu{
  background: url("../assets/jianzhu1.png");
  background-size: contain;
  width:7.5rem;
  height: 12.06rem;
  left:0px;
}
.jianzhu2{
  background: url("../assets/jianzhu1.png");
  background-size: contain;
  width:7.5rem;
  height: 12.06rem;
  left:7.5rem;
}
.ani{
  transition:left cubic-bezier(0, 0, 0.2, 1) 0.5s;
}
.boat{
  width:0.83rem;
  height:0.42rem;
  background: url("../assets/boat.png");
  background-size: cover;
  top:70%;
  left:3.5rem;
  position: absolute;
}
.promcard{
  position: absolute;
  width: 4rem;
  height: 0.3rem;
  font-size: 12px;
  left: 50%;
  transform: translateX(-50%);
  top:1rem;
}
.promcard div{

  width: 50%;
  height: 100%;
  float: left;
}
.speed1,.speed2{
  width:1rem;
  height: .5rem;
  border-radius: .25rem;
  background: yellow;
  text-align: center;
  font-size: 12px;
}
.speed1{
  top:50%;
  left:30%;
}
.speed2{
  top:55%;
  left:40%;
}
</style>
