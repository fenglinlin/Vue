<template>
    <div id="good" v-if="datas">
      <!--<div style="font-size: 20px">-->
        <!--{{getIndex}}-->
      <!--</div>-->
      <div class="left" ref="left">
        <ul>
          <li @click="go(index)"  v-for="data,index in datas" class="item-list" :class="{active:index == getIndex}">
            <span>
              <span class="icon" v-if="data.type > 0" :class="mapClass[data.type]">
              </span>
              {{data.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="feature" ref="feature">
        <ul>
          <li v-for="item,index in datas" class="foods-list">
            <h2>{{item.name}}</h2>
            <ul>
              <li v-for="item_1 in item.foods" class="inlist">
                <div class="picture">
                  <img :src="item_1.image" width="57" height="57"/>
                </div>
                <div class="introduce">
                  <h1>{{item_1.name}}</h1>
                  <p>{{item_1.description}}
                  <div class="rate">
                    <span class="count">
                      月售{{item_1.sellCount}}份
                    </span>
                    <span>
                      好评率{{item_1.rating}}%
                    </span>
                  </div>
                  <div class="price">
                    <span class="now">
                      ￥&nbsp{{item_1.price}}
                    </span>
                  </div>
                  <div class="control-wrap">
                    <div class="icon_reduce">
                      <i></i>
                    </div>
                    <div class="icon_add">
                      <!--<i class="iconfont">&#xe728;</i>-->
                      <span class="icon-add_circle add_icon"></span>
                    </div>
                  </div>
                </div>

              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="shopCart">
        <div class="content-left">
          <div class="circle">
            <div class="car">
              <span class="icon-shopping_cart icon_car"></span>
            </div>
          </div>
          <div class="left-price">￥0</div>
          <div class="fare">另需配送费￥4元</div>
        </div>
        <div class="content-right">
          <div class="pay">
            ￥20元起送
          </div>
        </div>
      </div>
    </div>

</template>
<script>
  import BScroll from "better-scroll";//滚动的第三方模块
  export default{
    created(){
      this.mapClass =['invoice','special','discount','decrease','guarantee'];
      this.$http.get("http://10.80.13.64:8080/api/goods")
        .then(function (response) {
//          console.log(response);
          return response.json();//把json数据转换成对象格式
        }).then(function (response) {
        console.log(response.data[0].foods[0].name);
          if(response.success === 1){
            this.datas =response.data;
            this.$nextTick(()=>{
              this.initScroll();
              this.feature.on('scroll',(pos)=>{
                this.scrollY =Math.abs(Math.round(pos.y))
              })
              this.cheight();
              console.log(this.listHeight)
            })
          }
      })
    },
    computed:{
      getIndex:function(){
        let index = 0;
        for(let i = 0;i<this.listHeight.length;i++){
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if(this.scrollY >= height1 && this.scrollY <= height2){
            return i;
          }
        }
        return index;
      }
    },
    data(){
      return {
        datas:"",
        isShow:false,
        scrollY: 0,
        listHeight: []
      }
    },
  methods: {
      go:function(index){
        let list = this.$refs.feature.querySelectorAll('.foods-list');
        let ele = list[index];
        this.feature.scrollToElement(ele,300)
      },
    initScroll: function () {
      this.left = new BScroll(this.$refs.left,{
        click:true
      });
      this.feature = new BScroll(this.$refs.feature,{
        probeType:3
      });
    },
    cheight:function () {
      let height = 0;
      this.listHeight.push(height);
      let list = this.$refs.feature.querySelectorAll('.foods-list');
      for (let i=0;i<list.length;i++){
        let liHeight =list[i].clientHeight;
        height += liHeight;
        this.listHeight.push(height);
      }
    },

   }
  }
</script>
<style>
  #good{
    display: flex;
    position:absolute;
    top:175px;
    bottom: 46px;
    background-color:#f3f5f7;
    width:100%;
    font-size:0;
    overflow: hidden;
  }
  /*左侧css样式*/
  #good .left{
    flex:0 0 80px;
    /*overflow: scroll;*/
  }
  #good .left ul{
    padding:0;
    margin:0;
    width:56px;
    flex-direction: column;
  }
  #good .left ul li{
    display: table;
    list-style: none;
    height:54px;
    width:56px;
    font-size:12px;
    color:rgb(77,85,93);
    padding:0 12px;
    border-bottom:1px solid rgba(7,17,27,0.1);
  }
  #good .left .item-list.active{
    background:#fff;
    font-weight:bold;
    border:none;
  }
  #good .left ul li span{
    display: table-cell;
    vertical-align: middle;
    margin-top:-1px;
    /*margin-top:50%;*/
    /*transform: translateY(-50%);*/
  }
  #good .left ul li .icon{
    width:12px;
    height:12px;
    float:left;
    margin-right:2px;
  }
  #good .left ul li .icon.special{
    background: url("../../../resource/img/special_4@2x.png") 0 0 no-repeat;
    background-size: cover;
  }
  #good .left ul li .icon.discount{
    background: url("../../../resource/img/discount_3@2x.png") 0 0 no-repeat;
    background-size: cover;
  }
  /*右侧css样式*/
  #good .feature{
    flex:1;
    background-color: white;
    /*overflow: auto;*/
  }
  #good .feature h2{
    margin:0;
    height:26px;
    background-color:#f3f5f7;
    font-size:12px;
    color:rgb(147,153,159);
    line-height: 26px;
    border-left:4px solid #d9dde1;
    padding-left:14px;
  }
  #good .feature ul{
    padding:0;
    margin:0;
  }
  #good .feature ul li{
    position: relative;
  }
  #good .feature ul li::after{
    display: block;
    content: "";
    position:absolute;
    left:0;
    bottom:0;
    width: 100%;
    border-top:1px solid rgba(7,17,27,0.1);
  }
  #good .feature ul li:last-child::after{
    display: none;
  }
  #good .feature ul li ul li{
    margin:18px 18px 0;
    display: flex;
    padding-bottom:18px;
  }
  #good .feature ul li h1{
    font-size: 14px;
    color:rgb(7,17,27);
    line-height:14px;
    margin-bottom: 8px;
  }
  #good .feature ul li .picture{
    margin-right:10px;
    flex: 0 0 57px;
  }
  h1,h2,h3,p{
    padding:0;
    margin:0;
  }
  #good .feature ul li ul li p{
    font-size: 10px;
    color:rgb(147,153,159);
    line-height:12px;
    margin-bottom: 8px;
  }
  #good .feature .introduce .rate{
    display: flex;
    vertical-align:baseline;
  }
  #good .feature .introduce .rate span{
    font-size: 10px;
    color:rgb(147,153,159);
    line-height:12px;
  }
  #good .feature .introduce .rate .count{
    margin-right: 12px;
  }
  #good .feature .introduce .price{
    font-size:10px;
    color:#f01414;
    font-weight:normal;
    line-height: 24px;
  }
  #good .feature .introduce .control-wrap{
    position: absolute;
    right: 0;
    bottom: 12px;
    padding: 6px;
  }
  /*底部css样式*/
  .add_icon{
    font-family:"iconfont";
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: #00a0dc;
    font-style: normal;
  }
  .shopCart{
    height:48px;
    width:100%;
    background-color:#141d27;
    position: fixed;
    bottom:0;
    left:0;
    display: flex;
  }
  .shopCart .content-left{
    flex:1;
    box-sizing: border-box;
  }
  .shopCart .content-left .left-price{
    text-align: center;
    line-height: 24px;
    font-size: 16px;
    color:rgba(255,255,255,0.4);
    font-weight:700;
    display: inline-block;
    margin:12px 12px 0 0;
    padding-right: 12px;
    vertical-align: top;
    border-right:1px solid rgba(255,255,255,0.1);
  }
  .shopCart .content-left .fare{
    font-size: 10px;
    color:rgba(255,255,255,0.4);
    font-weight:700;
    line-height:24px;
    display: inline-block;
    margin:12px 0 0 0;
    vertical-align: top;
  }
  .shopCart .content-left .circle{
    display: inline-block;
    position: relative;
    width:58px;
    height:58px;
    border-radius: 50%;
    background-color: #141d27;
    top:-10px;
    margin:0 12px 0 18px;
  }
  .shopCart .content-left .circle .car{
    position: absolute;
    bottom:8px;
    left:7px;
    width:44px;
    height:44px;
    border-radius:50%;
    background-color:#2b343c;
    text-align: center;
  }
  .shopCart .content-right{
    width:105px;
    background-color:#2b333b;
  }
  .shopCart .content-right .pay{
    color:rgba(255,255,255,0.4);
    font-size:12px;
    font-weight:700;
    height:48px;
    line-height: 48px;
    text-align: center;
  }
  .icon_car{
    color:rgba(255,255,255,0.4);
    line-height:44px;
    font-size:24px;
  }

</style>
