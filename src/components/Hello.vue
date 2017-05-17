<template>
  <div class="hello">
    <div class="logo-wrap">
      <img class="logo" src="../assets/llogo.png">
    </div>
    <button @click="startgame">start game</button>
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
.logo-wrap{
  margin-bottom: 25px;
}
.logo{
  width:50%;
}
</style>
