
var Boat = {
   
    speed: 100, //速度
    time: 1, //前进时间
    acceleration: -1, //加速度
    score: 0, //得分
    started: false, //是否开始
    si: null,//计时

    move: function(){
    	var s = 0
    	if(this.speed != 0){
    		s = (-this.speed * this.time - this.acceleration * this.time * this.time / 2).toFixed(2)
    		this.updateSpeed();
    	}else{
    		s = 0
    	}
    	this.score += parseFloat(s)*0.05
        return s
    },

    updateSpeed: function(){
    	this.speed = this.speed + this.acceleration * this.time;
    },

    getScore: function(){
    	var distance = - this.score
    	var r = this.RandomNumBoth(1,3)
    	return (distance+r)*10
    },

    RandomNumBoth: function(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range); //四舍五入
      return num;
}
}
export default Boat
