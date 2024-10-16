<template>
  <div class="alert" :class="alert.type">
    <div class="content">
      <svg v-if="alert.type == 'success'" width="24" height="24" fill="#34D399">
            <use xlink:href="#success"/>
        </svg>
        <svg v-else-if="alert.type == 'error'" width="24" height="24" fill="#F87171">
            <use xlink:href="#error"/>
        </svg>
        <svg v-else width="24" height="24" fill="#FBBF24">
            <use xlink:href="#warning"/>
        </svg>
      <p>
        {{alert.msg}}
      </p>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'AlertComponent',
  computed: {
    ...mapState({
      alert: state => state.alert.alert
    })
  }
}
</script>
<style lang="scss" scoped>
.alert {
  position: fixed;
  bottom: 50px;
  right: 50px;
  min-width: 400px;
  max-width: 90%;
  width: max-content;
  padding: 8px 16px;
  border-radius: 8px;
  z-index: 100;
  background: #FFFBEB;
  color: #92400E;
  font-weight: 500;
  .content {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}
.error {
  background: #FEF2F2;
  color: #991B1B;
}
.success {
  background: #cff7e4;
  color: #065F46;
}
</style>