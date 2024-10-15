<template>
  <div id="app">
    <Icons/>
    <Alert v-if="alert.isActive"/>
    <router-view/>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Icons from '@/components/ui/icons.vue'
import Alert from '@/components/ui/alert.vue'
export default {
  name: 'App',
  components: {
    Icons,
    Alert
  },
  computed: {
    ...mapState({
      alert: state => state.alert.alert
    })
  }
}
</script>

