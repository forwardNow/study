<template>
  <div class=news-info>
    <div class="title">{{ newsInfo.title }}</div>
    <div class="sub-title">
      <span>发表时间：{{ newsInfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsInfo.click }}次</span>
    </div>
    <div v-html="newsInfo.content"></div>
  </div>
</template>
<script>
export default {
  created() {
    this.getNewsInfo();
  },
  data() {
    return {
      id: this.$route.params.id,
      newsInfo: {},
    }
  },
  methods: {
    getNewsInfo() {
      this.$http.get(`api/newsinfo/${this.id}`)
        .then((res) => {
          const {
            body: {
              errorCode,
              result,
            }
          } = res;

          if (errorCode === 0) {
            this.newsInfo = result.newsInfo;
          } else {
            Toast('新闻详情加载失败！');
          }
        })
        .catch((res) => {
          Toast('新闻详情加载失败！');
        });
    },
  },
}
</script>
<style lang="less">
.news-info {
  p {
    text-indent: 2em;
  }

  .author-icon img {
    width: 40px;
  }
}
</style>
<style lang="less" scoped>

.news-info {
  padding: 0 0.5em;
}

.title {
  font-size: 18px;
  font-weight: bold;
  line-height: 1.6;
  text-align: center;
}

.sub-title {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 24px;
  color: #666;
  border-top: solid 1px #eee;
}
</style>

