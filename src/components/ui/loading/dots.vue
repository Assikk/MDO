<template>
  <div class="dots flex gap-2">
    <div class="dot" v-for="num in 3" :key="num"/>
  </div>
</template>
<script>
export default {
  name: 'DotsLoadingComponent',
}
</script>
<style lang="scss" scoped>
    .dots {
        display: flex;
        gap: 8px;
        .dot {
            width: 20px;
            height: 20px;
            border-radius: 9999px;
            background: #50B053;
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            @keyframes pulse {
            0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: .5;
                }
            }
        }
    }
</style>