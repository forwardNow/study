# iView

## 1. 表单验证

* 一旦值发送改变就触发：`trigger: 'change'`
* `DatePicker` 的验证规则需要指定 `{ type: 'date', ...... }`
* `Select` 的值如果是数字在应该指定 `{ type: 'number', ...... }`
* `Input` 需要指定 `{ type: 'string', ...... }`

## 2. 模态框（Modal）

### 2.1. 自身和父级都可控制其显示和隐藏

```html
<template>
  <div>
    <Modal v-model="value">
      ......
    </Modal>
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      value: false,
    };
  },
  watch: {
    isShow(value, oldValue) {
      this.value = value;
    },
  },
}
</script>
```