<template>
    <div class="search">
        <input type="text" :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @keypress.enter="$emit('enter')">
        <svg width="24" height="24" fill="#999">
            <use xlink:href="#search"/>
        </svg>
    </div>
</template>
<script>
export default {
    name: 'SearchInputComponent',
    props: {
        placeholder: {
            type: String
        },
        value: {}
    }
}
</script>
<style lang="scss" scoped>
.search {
    border-bottom: 1px solid #ccc;
    padding: 8px 12px 8px 0;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 20px;
    font-family: 'Roboto', sans-serif;
    color: #999999;
    input {
        width: 100%;
        outline: none;
        border: none;
        padding: 10px 0;
    }
    svg {
        min-width: 24px;
        min-height: 24px;
    }
}

</style>