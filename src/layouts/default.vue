<template>
    <router-view class="container"/>
</template>
<script>
export default {
    name: 'defaultLayout'
}
</script>
<style lang="scss" scoped>
    .container {
        background: #eee;
        min-height: 100vh;
        height: 100%;
        padding: 0 15px;
    }
</style>