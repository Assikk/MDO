<template>
  <div class="container">
    <div class="overlay"></div>
    <div class="form">
      <h2 class="header">
        Авторизация
      </h2>
      <div class="body">
        <div class="inputs">
            <Phone id="authPhone" label="Логин или Телефон"/>
            <Phone/>
        </div>
        <Button @click="auth"
        :disabled="disabledAuth">
            Войти
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import Phone from '@/components/ui/inputs/phone.vue'
import Button from '@/components/ui/buttons/default.vue'
export default {
  name: 'loginPage',
  components: {
    Button,
    Phone
  },
  data() {
    return {
        disabledAuth: false
    }
  },
  methods: {
    auth() {
        console.log('auth');
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: absolute;
  inset: 0;
  background-image: url('~@/assets/img/auth.jpg');
  background-size: cover;
  background-position: center;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  .form {
    background: white;
    z-index: 2;
    width: 340px;
    border-radius: 5px;
    padding: 20px;
    position: relative;
    height: 290px;
    .header {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -75%);
      background: #44A248;
      width: 90%;
      padding: 18px 0;
      text-align: center;
      font-weight: 500;
      color: white;
      border-radius: 5px;
      font-size: 20px;
      line-height: 20px;
      font-weight: 500;
    }
    .body {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: end;
      align-items: center;
      gap: 28px;

      .inputs {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    }
  }
}
</style>
