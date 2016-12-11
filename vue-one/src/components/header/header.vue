<template>
    <div id="header" v-if="datas">
      <div class="info">
        <div class="pic"></div>
        <div class="right">
          <div class="one">
            <span></span>
            <span>{{datas.name}}</span>
          </div>
          <div class="two">
            <span>{{datas.description}}</span>&nbsp/
            <span>{{datas.deliveryTime}}分钟</span>
          </div>
          <div class="three">
            <span></span>
            <span>{{datas.supports[0].description}}&nbsp,&nbsp满50减10</span>
          </div>
        </div>
      </div>
        <div class="message">
          <span></span>
          <span>{{datas.bulletin}}</span>
        </div>
        <div class="btn" v-on:click="change"><span>5个 ></span></div>
        <div class="bg"></div>
        <div class="mask" v-show="isShow">
          <div class="filter">
            <h1>粥品香坊(大运村)</h1>
            <div class="star"></div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports">
              <li v-for="data,index in datas.supports">
                <span class="icon"></span>
                <span class="sp_text">{{data.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{datas.bulletin}}</p>
            </div>
            <div class="detail-close" v-on:click="change1">
              <span class="icon-close close-close"></span>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
  export default{
    methods:{
      change(){
        this.isShow = !this.isShow;
      },
      change1(){
        this.isShow =!this.isShow;
      }
    },
    beforeCreate(){
      console.log("组件刚被创建");
    },
    created(){
      this.$http.get("http://10.80.13.64:8080/api/seller")
        .then(function (response) {
          return response.json();
        }).then(function (response) {
          console.log(response.data.supports[0].description);
          if(response.success ===1){
            this.datas =response.data;
          }
      })
    },
    data(){
      return{
        datas:"",
        isShow:false
      }
    }
  }
</script>
<style>
  #header{
    font-size: 0;
    position: relative;
    background-color:rgba(7,17,27,0.5);
  }
  .pic{
    display: inline-block;
    width:64px;
    height:64px;
    margin:24px 16px 18px 24px;
    background:url("http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg") 0 0 no-repeat;
    background-size:cover;
    border-radius:4px;
  }
  .right{
    display: inline-block;
    margin:26px 0 0 0;
    vertical-align:top;
  }
  .right .one{
    font-size: 16px;
    color:rgb(255,255,255);
    font-weight:bold;
    line-height:18px;
  }
  .right .one span{
    display: inline-block;
  }
  .right .one span:first-child{
    background:url("../../../resource/img/brand@2x.png");
    height: 18px;
    width:30px;
    background-size: 30px 18px;
    margin-right:6px;
  }
  .right .one span:last-child{
    vertical-align:top;
  }
  .right .two{
    font-size: 12px;
    color:rgb(255,255,255);
    font-weight:100;
    line-height: 12px;
    margin-top:4px;
  }
  .right .three{
    font-size: 10px;
    color:rgb(255,255,255);
    font-weight:100;
    line-hight:12px;
    margin-top:6px;
  }
  .right .three span{
    display: inline-block;
  }
  .right .three span:first-child{
    height:16px;
    width:16px;
    background:url("../../../resource/img/decrease_1@2x.png") no-repeat;
    background-size:16px 16px;
  }
  .right .three span:last-child{
    vertical-align: top;
    margin-top:3px;
  }
  .message{
    height:28px;
    font-size:10px;
    color:rgb(255,255,255);
    line-height:28px;
    background-color:rgba(7,17,27,0.1);
  }
  .message span:first-child{
    display: inline-block;
    background: url("../../../resource/img/bulletin@2x.png");
    width:22px;
    height:12px;
    background-size: 22px 12px;
    margin:8px 2px 0 12px;
    vertical-align: top;
  }
  .message span:last-child{
    display: inline-block;
    overflow: hidden;
    width:80%;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .bg{
    position: absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
    background:url("http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg") 0 0 no-repeat;
    background-size:cover;
    filter:blur(5px);
    z-index:-1;
  }
  .btn{
    position: absolute;
    top:68px;
    right:12px;
    font-size:10px ;
    color:white;
    font-weight:100;
    line-height:24px;
    background-color: rgba(0,0,0,0.2);
    padding:0 8px;
    height:24px;
    border-radius: 14px;
  }
  .mask{
    width:100%;
    min-height:667px;
    position:absolute;
    top:0;
    left:0;
    background-color: rgba(7,17,27,0.8);
    z-index:10;
  }
  .mask .filter{
    filter:blur(10px);
  }
  .mask .filter h1{
    font-size:16px;
    font-weight:700;
    color:rgb(255,255,255);
    line-height:16px;
    margin-top: 64px;
    text-align: center;
  }
  .mask .filter .title{
    display: flex;
    width:80%;
    margin:28px auto 24px;
  }
  .mask .filter .line{
    flex:1;
    position: relative;
    top:-6px;
    border-bottom:1px solid rgba(255,255,255,0.2);
  }
  .mask .filter .text{
    font-size:14px;
    font-weight: 200;
    padding:0 12px;
    color:white;
  }
  .mask .filter .star{
    width:100%;
    height:24px;
    /*padding:2px 0;*/
    margin-top:18px;
  }
  .mask .filter .supports{
    margin:0 auto;
    width:80%;
  }
  .mask .filter .supports li{
    font-size:12px;
    font-weight:700;
    color:white;
    line-height: 12px;
    list-style: none;
    margin-bottom:12px;
  }
  .mask .filter .supports li span{
    display:inline-block;
  }
  .mask .filter .supports li .sp_text{
    margin-top:-10px;
    height:16px;
    line-height:16px;
    vertical-align: bottom;
  }
  .mask .filter .supports li .icon{
    width:16px;
    height:16px;
    margin-right: 6px;
    vertical-align: top;
  }
  .mask .filter .supports li:nth-child(1) .icon{
    background-image:url("../../../resource/img/decrease_2@2x.png");
    background-size: cover;
  }
  .mask .filter .supports li:nth-child(2) .icon{
    background-image:url("../../../resource/img/discount_2@2x.png");
    background-size: cover;
  }
  .mask .filter .supports li:nth-child(3) .icon{
    background-image:url("../../../resource/img/guarantee_2@2x.png");
    background-size: cover;
  }
  .mask .filter .supports li:nth-child(4) .icon{
    background-image:url("../../../resource/img/invoice_2@2x.png");
    background-size: cover;
  }
  .mask .filter .supports li:nth-child(5) .icon{
    background-image:url("../../../resource/img/special_2@2x.png");
    background-size: cover;
  }
  .mask .filter .bulletin{
    margin-top:24px;
    width:80%;
    margin:0 auto;
  }
  .mask .filter .bulletin .content{
    font-size:12px;
    font-weight:200;
    color:rgb(255,255,255);
    line-height:24px;
    margin:0 12px;
  }
  .mask .filter .detail-close{
    width:32px;
    height:32px;
    position: absolute;
    bottom:32px;
    left:50%;
    margin-left:-32px;
  }
  .mask .filter .detail-close .close-close{
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgba(255,255,255,0.5);
  }
  @font-face {
    font-family: 'iconfont';  /* project id 197049 */
    src: url('//at.alicdn.com/t/font_ux9o7ia2z4z08uxr.eot');
    src: url('//at.alicdn.com/t/font_ux9o7ia2z4z08uxr.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_ux9o7ia2z4z08uxr.woff') format('woff'),
    url('//at.alicdn.com/t/font_ux9o7ia2z4z08uxr.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_ux9o7ia2z4z08uxr.svg#iconfont') format('svg');
  }
</style>
