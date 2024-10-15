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
        background: #ccc;
        height: 100vh;
        padding: 0 15px;
    }
</style>