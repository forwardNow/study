<template>
    <div>
        <page-header></page-header>
        <page-main v-bind:content="content"></page-main>
        <page-footer ref="sub"></page-footer>
        <div ref="myDiv"></div>
    </div>
</template>
<script>
import PageHeader from "./components/PageHeader.vue";
import PageMain from "./components/PageMain.vue";
import PageFooter from "./components/PageFooter.vue";

export default {
    data() {
        return {
            content: "hh"
        }
    },
    components: {
        PageHeader: PageHeader,
        PageMain,
        PageFooter
    },
    mounted() {
        console.info( "当前组件的元素：", this.$refs.myDiv );
        this.$nextTick( () => {
            console.info( "子组件的根元素", this.$refs.sub.$el );
        });
    }
}
</script>

<style scoped>
</style>
