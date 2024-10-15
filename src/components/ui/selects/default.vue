<template>
    <select
    :id="id"
    :value="value"
    @input="$emit('input', $event.target.value)">
        <option hidden selected value="">{{placeholder}}</option>
        <option v-for="(item, index) in list" :key="index" :value="item[valueList]">{{item[textList]}}</option>
    </select>
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
    outline: none;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 18px 0;
    font-size: 14px;
    line-height: 20px;
    font-family: 'Roboto', sans-serif;
    color: #999999;
}
</style>