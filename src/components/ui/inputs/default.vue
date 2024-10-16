<template>
<div>
    <div class="default"
    :class="[
    {'error': error}
    ]">
        <input type="text" :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @keypress.enter="$emit('enter')">
    </div>
    <div class="error-text">
        <slot  name="error"/>
    </div>
</div>
</template>
<script>
export default {
    name: 'SearchInputComponent',
    props: {
        placeholder: {
            type: String
        },
        value: {},
        error: {
            type: Boolean,
            default: false
        },
    }
}
</script>
<style lang="scss" scoped>
.default {
    border-bottom: 1px solid #ccc;
    padding: 18px 12px 18px 0;
    font-size: 14px;
    line-height: 20px;
    font-family: 'Roboto', sans-serif;
    color: #999999;
    input {
        width: 100%;
        outline: none;
        border: none;
        color: #999;
    }
}
input::placeholder {
    color: #999;
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