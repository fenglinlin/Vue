<template>
    <div id="rating-wrapper" v-if="datas">
      <ul>
        <li v-for="data,index in datas" class="rating-item">
          <div class="rating-left">
            <img :src="data.avatar" width="28" height="28">
          </div>
          <div class="rating-right">
            <div class="buyTop">
              <h1 class="id">{{data.username}}</h1>
              <p>{{data.rateTime}}</p>
            </div>
            <div class="star_val"></div>
            <p class="words">{{data.text}}</p>
            <div class="hasBuy">
              <span v-if="data.rateType" class="icon-thumb_up thumb_icon"></span>
              <span v-for="data_1,index in data.recommend">
                {{data_1}}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>
<script>
  export default{
    methods:{
      change(){

      }
    },
    created(){
      this.$http.get("http://10.80.13.64:8080/api/ratings")
        .then((response)=>response.json())
        .then((response)=>{
          console.log(response.data[0].score);
          function getLocalTime(nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
      }
          console.log(getLocalTime(response.data[0].rateTime));
          if(response.success ===1){
            this.datas =response.data;
          }
        })
    },
    data(){
      return{
        datas:'',
        isShow:false,
        scrollY:0,
      }
    },
//    methods:{
//      initScroll:function(){
//        this.ratingwrapper =new BScroll(this.$refs.ratingwrapper,{
//
//        });
//      }
//    }
  }
</script>
<style>
  /*评论区样式*/
  #rating-wrapper{
    width:100%;
    background-color: white;
  }
  #rating-wrapper ul{
    padding:0;
    margin:0;
  }
  #rating-wrapper .rating-item{
    margin:0 18px;
    padding:18px 0;
    border-bottom:1px solid rgba(7,17,27,0.1);
    display: flex;
  }
  /*左边头像样式*/
  #rating-wrapper .rating-item .rating-left{
    margin-right:12px;
  }
  #rating-wrapper .rating-item .rating-left img{
    border-radius:50%;
  }
  #rating-wrapper .rating-item .rating-right{
    flex:1;
  }
  #rating-wrapper .rating-item .rating-right .buyTop{
    display: flex;
    justify-content: space-between;
  }
  #rating-wrapper .rating-item .rating-right .id{
    font-size: 10px;
    color:rgb(7,17,27);
    line-height:12px;
  }
  #rating-wrapper .rating-right .buyTop p{
    font-size:10px;
    font-weight:200;
    color:rgb(147,153,159);
    line-height: 12px;
  }
  #rating-wrapper .rating-item .rating-right .words{
    font-size:12px;
    color:rgb(7,17,27);
    line-height:18px;
  }
  #rating-wrapper .rating-item .rating-right .hasBuy{
    line-height:16px;
  }
  #rating-wrapper .rating-item .rating-right .hasBuy span{
    font-size:9px;
    color:rgb(147,153,159);
    display: inline-block;
    border:1px solid rgba(7,17,27,0.1);
    border-radius:2px;
    background-color:rgb(255,255,255);
    margin-right:8px;
    padding:0 6px;

  }
  #rating-wrapper .rating-item .rating-right .hasBuy .thumb_icon{
    border:none;
    color:rgb(0,160,220);
    font-size: 12px;
    line-height: 16px;
  }
  /*右边样式*/
</style>
