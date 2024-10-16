<template>
<div>
    <select
    :id="id"
    :value="value"
    @input="$emit('input', $event.target.value)"
    :disabled="disabled"
    :class="[
    {'error': error}
    ]">
        <option hidden selected value="">{{placeholder}}</option>
        <option v-for="(item, index) in list" :key="index" :value="item[valueList]">{{item[textList]}}</option>
    </select>
    <div class="error-text">
        <slot  name="error"/>
    </div>
</div>
    
</template>
<script>
import Icon from '@/assets/img/arrow-down.svg'
export default {
    name: 'DefaultSelectComponent',
    props: {
        id: {
            type: String,
            required: true
        },
        value: {},
        placeholder: {
            type: String
        },
        iconLocation: {
            type: String,
            default: "95"
        },
        list: {
            type: Array,
            required: true
        },
        textList: {
            type: String,
            required: true
        },
        valueList: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        }
    },
    methods: {
    changeStyles() {
      let select = document.getElementById(this.id)
      select.style.webkitAppearance = 'none'
      select.style.background = `url(${Icon}) ${this.iconLocation}% 50% no-repeat`
    }
  },
  mounted() {
    this.changeStyles()
  },
}
</script>
<style lang="scss" scoped>
select {
    min-width: 70px;
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 18px 0;
    font-size: 14px;
    line-height: 20px;
    font-family: 'Roboto', sans-serif;
    color: #999999;
}
.error {
    border-bottom: 1px solid #ff0000;
}
.error-text {
    margin-top: 4px;
    color: #ff0000;
    font-size: 14px;
    line-height: 16px;
}
</style>