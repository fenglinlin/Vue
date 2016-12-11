<template>
    <div id="shops" ref="shops" v-if="datas">
      <div class="store">
        <div class="overView">
          <div class="store_top">
            <h1 class="title">{{datas.name}}</h1>
            <div class="collect" @click="like">
              <span class="icon-favorite"  :class="{'discolor':!isActive}" v-show="isShow"></span>
              <span class="save">收藏</span>
            </div>
            <p class="sell">月售690单</p>
          </div>
          <ul class="need">
            <li class="block">
              <h2>起送价</h2>
              <div class="content">
                <span class="stress">20</span>元
              </div>
            </li>
            <li class="block">
              <h2>商家配送</h2>
              <div class="content">
                <span class="stress">4</span>元
              </div>
            </li>
            <li class="block">
              <h2>平均配送时间</h2>
              <div class="content">
                <span class="stress">39</span>分钟
              </div>
            </li>
          </ul>
        </div>
        <div class="centerView">
          <h1 class="title">公共与活动</h1>
          <p>{{datas.bulletin}}</p>
          <ul class="supports">
            <li class="supports_item" v-for="data,index in datas.supports">
              <span class="icon" :class="mapClass[data.type]"></span>
              <span class="text">{{data.description}}</span>
            </li>
          </ul>
        </div>
        <div class="live-action">
          <p class="live-title">商家实景</p>
          <div class="live-wrap" ref="liveWrap">
            <ul class="pic-content">
              <li class="pics" v-for="data in datas.pics ">
                <img :src="data" alt="" width="120" height="90">
              </li>
            </ul>
          </div>
        </div>
        <div class="info">
          <p class="live-title">商家信息</p>
          <ul>
            <li class="info-item" v-for="data in datas.infos">
              {{data}}
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
  import BScroll from 'better-scroll';//第三方滚动模块
  export default{
    created(){
      this.mapClass=['invoice','special','discount','decrease','guarantee'];
      this.$http.get("http://10.80.13.64:8080/api/seller")
        .then((response)=>response.json())
        .then((response)=>{
          if(response.success === 1){
            this.datas =response.data;
            this.$nextTick(()=>{
              this.initScroll();
            })
          }
        })

    },
    data(){
      return{
        datas:"",
        isShow:true,
        scrollY:0,
        scrollX:0,
        isActive:true
      }

    },
    methods:{
      initScroll:function(){
        this.shops = new BScroll(this.$refs.shops,{
          click:true
        });
        this.liveWrap= new BScroll(this.$refs.liveWrap);
      },
      test(){
        alert("123")
      },
      like:function(){

        var ss = document.querySelector(".icon-favorite");
        ss.className = "icon-favorite discolor";
        this.isActive =!this.isActive;
      }
    }
  }
</script>
<style>
  html,body{
    width: 100%;
    height: 100%;
  }
  *{
    list-style: none;
    padding:0;
    margin:0;
  }
  #shops .store .collect span.discolor{
    color: red;
  }
#shops{
  font-size:0px;
  width:100%;
  position:absolute;
  bottom:0;
  top:175px;
  overflow:hidden;
  background-color:#f3f5f7;
}
#shops .store{
  width:100%;
  display: flex;
  flex-direction: column;
}
#shops .store .overView{
  padding:0 18px;
  border-bottom:1px solid rgba(7,17,27,0.1);
  background-color:white;
}
#shops .store .title{
  font-size:14px;
  color:rgb(7,17,27);
  line-height:14px;
}
#shops .store .store_top{
  border-bottom:1px solid rgba(7,17,27,0.1);
  padding:18px 0;
}
#shops .store .sell{
  font-size:10px;
  color:rgb(77,85,93);
  line-height:18px;
  margin-top: 8px;
}
#shops .store .collect{
  position: absolute;
  top:18px;
  right:18px;
}
#shops .store .collect .save{
  font-size:10px;
  color:rgb(77,85,93);
  line-height:20px;
}
#shops .store .collect .icon-favorite{
  font-size:24px;
  color:lightgray;
  line-height:24px;
  display: block;
}
  #shops .store .collect{
    color:red;
  }
#shops .store .need{
  display: flex;
  margin:0;
  padding:0;
  text-align: center;
  align-items: center;
}
#shops .store .block{
  border-right:1px solid rgba(7,17,27,0.1);
  margin:18px 0;
  flex:1;
}
#shops .store .block:nth-child(3){
  border:none;
}
#shops .store .block h2{
  font-size:10px;
  color:rgb(147,153,159);
  line-height:20px;
}
#shops .store .block .content{
  font-size:10px;
  color:rgb(7,17,27);
  line-height:24px;
}
#shops .store .block .content .stress{
  font-size:24px;
}
#shops .store .centerView{
  border-top:1px solid rgba(7,17,27,0.1);
  border-bottom:1px solid rgba(7,17,27,0.1);
  padding:18px 18px 0;
  background-color:white;
}
#shops .store .centerView .supports{
  margin:0;
  padding:0;
}
#shops .store .centerView p{
  font-size:12px;
  color:rgb(240,20,20);
  line-height:24px;
  margin:8px 12px 16px;
}
#shops .store .centerView .supports_item{
  border-top:1px solid rgba(7,17,27,0.1);
  padding:16px 12px;
  vertical-align: baseline;
}
#shops .store .centerView .supports_item .text{
  color:rgb(7,17,27);
  font-size:12px;
  line-height:16px;
  display: table-cell;
  vertical-align: middle;
  padding-left:6px;
}
#shops .store .centerView .supports_item .icon{
  display: table-cell;
  width:16px;
  height:16px;
  vertical-align: middle;
}
#shops .store .centerView .supports_item .icon.invoice{
  background: url("../../../resource/img/invoice_3@2x.png") 0 0 no-repeat;
  background-size: cover;
}
#shops .store .centerView .supports_item .icon.special{
  background: url("../../../resource/img/special_4@2x.png") 0 0 no-repeat;
  background-size: cover;
}
#shops .store .centerView .supports_item .icon.discount{
  background: url("../../../resource/img/discount_4@2x.png") 0 0 no-repeat;
  background-size: cover;
}
#shops .store .centerView .supports_item .icon.decrease{
  background: url("../../../resource/img/decrease_4@2x.png") 0 0 no-repeat;
  background-size: cover;
}
#shops .store .centerView .supports_item .icon.guarantee{
  background: url("../../../resource/img/guarantee_3@2x.png") 0 0 no-repeat;
  background-size: cover;
}
#shops .store .live-action{
  margin-top:16px;
  padding:18px;
  background-color:white;
  border-top:1px solid rgba(7,17,27,0.1);
  /*background: red;*/
}
#shops .store .live-title{
  font-size:14px;
  padding-bottom:12px;
  line-height:14px;
  width:100%;
}
#shops .store .live-action .live-wrap{
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
}
#shops .store  .pic-content{
  padding:0;
  margin:0;
  width: 498px;
  overflow-x: scroll;
}
#shops .store .pic-content .pics{
  display: inline-block;
  width:120px;
  height:90px;
  margin-right: 6px;
}
#shops .store .info{
  padding:16px;
  background-color:white;
  margin-top: 16px;
  border:1px solid rgba(7,17,27,0.1);
}
#shops .store .info .info-item{
  padding:16px 12px;
  font-size:12px;
  font-weight:200;
  color:rgb(7,17,27);
  line-height:16px;
  position:relative;

}
#shops .store .info .info-item::after{
  border-top:1px solid rgba(7,17,27,0.1);
  display: block;
  content: '';
  position: absolute;
  top:0;
  left:0;
  width:100%;
}
</style>
