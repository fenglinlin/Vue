<template>
    <div id="evaluate" ref="evas" v-if="datas">
      <div class="pBox">
        <!--店铺信誉，综合评分-->
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{datas.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">
              高于周边商家{{datas.rankRate}}%
            </div>
          </div>
          <div class="overview-right">
            <div class="get_score">
              <span class="title">服务态度</span>
              <div class="content">
                <span class="score">{{datas.serviceScore}}</span>
              </div>
            </div>
            <div class="get_score">
              <span>商品评分</span>
              <div class="content">
                <span class="score">{{datas.foodScore}}</span>
              </div>
            </div>
            <div class="time">
              <span>送达时间</span>
              <span>38分钟</span>
            </div>
          </div>
        </div>
        <div class="select">
          <div class="rating-type">
          <span class="all">全部
          <span>{{datas.ratingCount}}</span>
        </span>
            <span class="satify">满意</span>
            <span class="unsatify">不满意</span>
          </div>
          <div class="comment">
            <span class="icon-check_circle check_icon"></span>
            <span class="has_comment">只看有内容的评价</span>
          </div>
        </div>
        <!--评论区-->
        <v-comment></v-comment>
        </div>
      </div>
    </div>
</template>
<script>
  import Comment from "./comment.vue";
  import BScroll from "better-scroll";
  export default{
    created(){//什么时候加载函数
      this.$http.get("http://10.80.13.64:8080/api/seller")
        .then(function(response){
          return response.json();
        }).then(function (response) {
        console.log(response.data.score);
          if(response.success ===1){
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
        isShow:false,
        scrollY:0,
      }
    },
    components:{
      "v-comment": Comment,
    },
    methods:{
      initScroll:function(){
        this.evas = new BScroll(this.$refs.evas);
      }
    }
  }
</script>
<style>
  #evaluate{
    font-size:20px;
    width:100%;
    position:absolute;
    bottom:0;
    top:175px;
    overflow:hidden;
    background-color:#f3f5f7;
  }
  #evaluate .pBox{
    width:100%;
    min-height:100%;
    flex-direction: column;
  }
  #evaluate .overview{
    display: flex;
    padding:18px 0;
    border-bottom:1px solid rgba(7,17,27,0.1);
    margin-bottom:16px;
    background-color:white;
  }
  #evaluate .overview .overview-left{
    flex:1;
    /*width:137px;*/
    padding:6px 0;
    text-align: center;
    border-right:1px solid rgba(7,17,27,0.1);
  }
  #evaluate .overview .overview-left .title{
    font-size:12px;
    color:rgb(7,17,27);
    line-height:12px;
    margin-bottom:8px;
  }
  #evaluate .overview .overview-left .rank{
    font-size:10px;
    color:#93999f;
    line-height:10px;
  }
  #evaluate .overview .overview-left .score{
    font-size:24px;
    color:rgb(255,153,0);
    line-height:28px;
    margin-bottom: 6px;
  }
  #evaluate .overview .overview-right{
    flex:1;
    margin:6px 0 6px 24px;
  }
  #evaluate .overview .overview-right div{
    font-size: 12px;
    color:rgb(7,17,27);
    margin-bottom:4px;
  }
  #evaluate .overview-right .get_score .title{
    display: inline-block;
    line-height:18px;
  }
  #evaluate .overview-right .get_score .content{
    display: inline-block;
  }
  #evaluate .overview-right .get_score .content .score{
    color:rgb(255,153,0);
    display: inline-block;
    font-size:12px;
    margin-left:12px;
    line-height:18px;
  }
  #evaluate .overview-right .time span:nth-child(2){
    color:rgb(147,153,159);
  }
  #evaluate .select .rating-type .all,.satify,.unsatify{
    display: inline-block;
    padding:8px 12px;
    font-size: 12px;
    border-radius:1px;
    line-height: 16px;
    margin-right: 8px;
  }
  #evaluate .select{
    border-top:1px solid rgba(7,17,27,0.1);
    padding: 18px 0 0;
    background-color:white;
  }
  #evaluate .select .rating-type{
    margin:0 18px;
    padding-bottom:18px;
    border-bottom:1px solid rgba(7,17,27,0.1);
  }
  #evaluate .select .rating-type .all{
    background-color: #00a0dc;
    color:white;
  }
  #evaluate .select .rating-type .satify{
    background-color: rgba(0,160,220,0.2);
    color:#4d555d;
  }
  #evaluate .select .rating-type .unsatify{
    background-color: rgba(77,85,93,0.2);
    color:#4d555d;
  }
  #evaluate .select .comment{
    display: flex;
    align-items: center;
    padding:12px 18px;
    border-bottom:1px solid rgba(7,17,27,0.1);
    color:#93999f;
  }
  #evaluate .select .comment .check_icon{
    color:#00c850;
    font-size:24px;
    margin-right:4px;
  }
  #evaluate .select .comment .has_comment{
    font-size:12px;
  }


</style>
