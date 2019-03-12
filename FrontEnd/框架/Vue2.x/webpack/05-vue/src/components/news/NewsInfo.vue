<template>
  <div class=news-info>
    <div class="title">新闻标题</div>
    <div class="sub-title">
      <span>发表时间：</span>
      <span>点击：0 次</span>
    </div>
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
      content: null,
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
            this.content = result.content;
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
<style lang="less" scoped>
.news-info {
  padding: 0 4px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  line-height: 48px;
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

