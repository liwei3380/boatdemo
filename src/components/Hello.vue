<template>
  <div class="hello">
    <img src="../assets/home_bg.png" class="home_bg">
    <img src="../assets/home_logo.png" class="home_logo">
    <img src="../assets/home_boat.png" class="home_boat">
    <img src="../assets/start_btn.png" class="start_btn" @click="startgame">
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    startgame () {
      this.$router.push('/game')
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
</style>
