<template>
  <div>
    <!-- 轮播图 -->
    <div class="swipe-container">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in carouselList" :key="item.url">
          <a :href="item.url"><img :src="item.img" :alt="item.url" /></a>
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- 功能区域 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
              <img src="../../common/assets/images/icon_1.png" alt="">
              <div class="mui-media-body">新闻资讯</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../common/assets/images/icon_2.png" alt="">
              <div class="mui-media-body">图片分享</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../common/assets/images/icon_3.png" alt="">
              <div class="mui-media-body">商品购买</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../common/assets/images/icon_4.png" alt="">
              <div class="mui-media-body">留言反馈</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../common/assets/images/icon_5.png" alt="">
              <div class="mui-media-body">视频专区</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../common/assets/images/icon_6.png" alt="">
              <div class="mui-media-body">联系我们</div></a></li>
  </ul>

  </div>
</template>
<script>
import { Toast } from 'mint-ui';

export default {
  created() {
    this.getCarouselList();
  },
  data() {
    return {
      carouselList: [],
    };
  },
  methods: {
    getCarouselList() {
      this.$http.get('api/carousel')
      .then((res) => {
        const {
          body: {
            errorCode,
            result,
          }
        } = res;

        if (errorCode === 0) {
          this.carouselList = result.items;
        } else {
          Toast('轮播图加载失败！');
        }
      })
      .catch((res) => {
        Toast('轮播图加载失败！');
      });
    }
  },
}
</script>
<style scoped lang="less">
  .swipe-container {
    height: 200px;
  }

  .mint-swipe-item {
    overflow: hidden;
    background: green;

    a {
      display: block;
    }

    a,
    img {
      height: 100%;
      // width: 100%;
    }
  }

  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none 0;

    .mui-table-view-cell {
      border: none 0;
    }

    .mui-media-body {
      font-size: 13px;
    }

    img {
      width: 60px;
    }
  }
</style>

