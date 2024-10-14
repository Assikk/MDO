<template>
    <button :disabled="disabled" @click="$emit('click')">
        <slot/>
    </button>
</template>
<script>
export default {
    name: 'DefaultButtonComponent',
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style scoped>
button {
    padding: 8px 35px;
    background: #50B053;
    border-radius: 4px;
    border: none;
    font-size: 14px;
    line-height: 20px;
    color: white;
    cursor: pointer;
    box-shadow: 0px 4px 10px rgba(106, 174, 94, 0.25);
    transition: 0.3s;
    font-family: 'Roboto', sans-serif;
}
button:disabled {
    background: #6acc6a;
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.6;
}
button:not(:disabled):hover {
    background: #45A048;
    box-shadow: 0px 6px 12px rgba(106, 174, 94, 0.35);
}
</style>