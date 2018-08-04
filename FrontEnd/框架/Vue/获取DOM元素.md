 # 获取DOM元素

## 1. 说明

在特殊情况下才会直接操作DOM，比如第三方库

## 2. 使用

**获取当前组件的元素**：

```html
<!-- 指定引用名称 -->
<div ref="myDiv"></div>

<!-- 获取DOM元素 -->
this.$refs.myDiv;
```

**获取子组件的元素**：
```html
<!-- 指定引用名称 -->
<my-sub ref="mySub"></my-sub>

<!-- 获取DOM元素 -->
this.$refs.mySub.$el
```

## 3. 示例

```html
<template>
    <div>
        <page-footer ref="sub"></page-footer>
        <div ref="myDiv"></div>
    </div>
</template>
<script>
import PageFooter from "./components/PageFooter.vue";
export default {
    mounted() {
        console.info( "当前组件的元素：", this.$refs.myDiv );
        this.$nextTick( () => {
            console.info( "子组件的根元素", this.$refs.sub.$el );
        });
    }
}
</script>
```