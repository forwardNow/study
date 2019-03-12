<template>
  <div>
    <ul class="mui-table-view news-list">
      <li v-for="item in newsList" :key="item.id" class="mui-table-view-cell mui-media">
        <router-link :to="`/home/newsinfo/${item.id}`">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <p class="mui-ellipsis title">{{ item.title }}</p>
            <p class="brief">{{ item.brief }}</p>
            <p class="aside">
              <span class="pub-date">{{ item.add_time | dateFormat}}</span>
              <span class="click-times">{{ item.click }} 次</span>
            </p>
          </div>
        </router-link>
      </li>
      </ul>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';

export default {
  created() {
    this.getNewsList();
  },
  data() {
    return {
      newsList: [],
    };
  },
  methods: {
    getNewsList() {
      this.$http.get('api/newslist')
      .then((res) => {
        const {
          body: {
            errorCode,
            result,
          }
        } = res;

        if (errorCode === 0) {
          this.newsList = result.items;
        } else {
          Toast('新闻列表加载失败！');
        }
      })
      .catch((res) => {
        Toast('新闻列表加载失败！');
      });
    }
  },
}
</script>
<style lang="less">
.news-list {
}

.mui-table-view .mui-media-object {
  max-width: 100px;
  height: 72px;
  line-height: 72px;
}

.title {
  font-size: 14px;
  color: #333;
}

.brief {
  height: 36px;
  overflow: hidden;
  font-size: 12px;
  line-height: 18px;
  color: #666;
  white-space: normal;
}

.aside {
  display: flex;
  justify-content: space-between;
  margin-top: 3px;
  font-size: 12px;
  line-height: 1;
  color: #999;
}
</style>
