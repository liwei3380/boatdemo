<template>
  <div id="app">
    <!-- <music :audioSrc=audioSrc></music> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Music from './components/music'
export default {
  name: 'app',
  data  () {
    return {
      audioSrc: 'http://123.56.26.118:8080/assets/518.mp3'
    }
  },
  components: {
    Music
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
body{
  overflow: hidden;
  font-family:"Comic Sans MS","幼圆","黑体",sans-serif;
}
#app {
  height: 100%; 
}
</style>
