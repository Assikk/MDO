<template>
  <div class="container">
    <div class="overlay"></div>
    <div class="form">
      <h2 class="header">
        Авторизация
      </h2>
      <div class="body">
        <div class="inputs">
            <Phone id="authPhone" label="Логин или Телефон" v-model="form.username"
            :error="(v$.form.username.$dirty && v$.form.username.required.$invalid) || (v$.form.username.$dirty && v$.form.username.numeric.$invalid)">
              <template #error>
                  <span v-if="v$.form.username.$dirty && v$.form.username.required.$invalid">
                      Это поле обязателен к заполнению
                  </span>
                  <span v-else-if="v$.form.username.$dirty && v$.form.username.numeric.$invalid">
                      Разрешен только числовой формат
                  </span>
              </template>
            </Phone>
            <Password id="authPassword" v-model="form.password"
            :error="(v$.form.password.$dirty && v$.form.password.required.$invalid) || (v$.form.password.$dirty && v$.form.password.minLength.$invalid)">
              <template #error>
                  <span v-if="v$.form.password.$dirty && v$.form.password.required.$invalid">
                      Это поле обязателен к заполнению
                  </span>
                  <span v-else-if="v$.form.password.$dirty && v$.form.password.minLength.$invalid">
                      Минимальое кол-во символов - 6
                  </span>
              </template>
            </Password>
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
import {mapMutations, mapActions} from 'vuex'
import Phone from '@/components/ui/inputs/phone.vue'
import Password from '@/components/ui/inputs/password.vue'
import Button from '@/components/ui/buttons/default.vue'
import useVuelidate from '@vuelidate/core'
import { required, minLength, numeric } from '@vuelidate/validators'
export default {
  name: 'loginPage',
  components: {
    Button,
    Phone,
    Password
  },
  data() {
    return {
        disabledAuth: false,
        form: {
          username: '7',
          password: null
        }
    }
  },
  validations() {
    return {
      form: {
        username: {
          required,
          numeric
        },
        password: {
          required,
          minLength: minLength(6)
        }
      }
      
    }
  },
  setup() {
    return { v$: useVuelidate() }
  },
  methods: {
    ...mapMutations({
      loading_alert: 'alert/LOADING_ALERT'
    }),
    ...mapActions({
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      login: 'auth/login'
    }),
    async auth() {
      this.v$.$touch()
      if (this.v$.$invalid) {
        return
      }
      if(!this.disabledAuth) {
        this.disabledAuth = true
        try {
        this.loading_alert()
        await this.login(this.form)
        this.success_alert('Вы успешно вошли в систему')
        } catch (error) {
          this.disabledAuth = false
          this.error_alert(error.response.data.detail)
        }
      }
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
        width: 100%;
      }
    }
  }
}
</style>
