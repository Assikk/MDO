<template>
    <div>
        <textarea :cols="cols" :rows="rows"
        :value="value"
        @input="$emit('input', $event.target.value)"
        :placeholder="placeholder"
        :class="[
        {'error': error}
        ]"></textarea>
        <div v-if="error" class="error-text">
            {{errorMsg}}
        </div>
    </div>
</template>
<script>
export default {
    name: 'TextareaComponent',
    props: {
        cols: {
            type: String,
            default: '30'
        },
        rows: {
            type: String,
            default: '10'
        },
        value: {},
        placeholder: {
            type: String
        },
        error: {
            type: Boolean,
            default: false
        },
        errorMsg: {
            type: String
        }
    }
}
</script>
<style scoped>
textarea {
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid #ccc;
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