<template>
  <div class="appeal">
    <div class="overlay" @click="show_addModal(false)"/>
    <div class="form">
      <div class="header">
        <h2>
            Создание заявки
        </h2>
        <p>
            Новая
        </p>
      </div>
      <div class="loading" v-if="loadingModal">
        <Dots/>
      </div>
      <div class="body" v-else>
        <div class="first-line">
            <Select id="premise_id" :list="premises" valueList="id" textList="title" 
            v-model="form.premise_id" placeholder="Дом"
            :error="v$.form.premise_id.$dirty && v$.form.premise_id.required.$invalid"
            @input="selectPremise">
              <template #error>
                <span v-if="v$.form.premise_id.$dirty && v$.form.premise_id.required.$invalid">
                  Выберите дом
                </span>
              </template>
            </Select>
            <Select id="apartment_id" :list="apartments" valueList="id" textList="label" 
            v-model="form.apartment_id" placeholder="Квартира"
            :error="v$.form.apartment_id.$dirty && v$.form.apartment_id.required.$invalid"
            :disabled="apartments.length == 0">
              <template #error>
                <span v-if="v$.form.apartment_id.$dirty && v$.form.apartment_id.required.$invalid">
                  Выберите квартиру
                </span>
              </template>
            </Select>
            <Date placeholder="Срок" v-model="form.due_date"
            :error="v$.form.due_date.$dirty && v$.form.due_date.required.$invalid">
              <template #error>
                <span v-if="v$.form.due_date.$dirty && v$.form.due_date.required.$invalid">
                  Это поле обязателен к заполнению
                </span>
              </template>
            </Date>
        </div>
        <div class="second-line">
            <Input placeholder="Фамилия" v-model="form.applicant.last_name"
            :error="v$.form.applicant.last_name.$dirty && v$.form.applicant.last_name.required.$invalid">
              <template #error>
                <span v-if="v$.form.applicant.last_name.$dirty && v$.form.applicant.last_name.required.$invalid">
                  Это поле обязателен к заполнению
                </span>
              </template>
            </Input>
            <Input placeholder="Имя" v-model="form.applicant.first_name"
            :error="v$.form.applicant.first_name.$dirty && v$.form.applicant.first_name.required.$invalid">
              <template #error>
                <span v-if="v$.form.applicant.first_name.$dirty && v$.form.applicant.first_name.required.$invalid">
                  Это поле обязателен к заполнению
                </span>
              </template>
            </Input>
            <Input placeholder="Отчество" v-model="form.applicant.patronymic_name"
            :error="v$.form.applicant.patronymic_name.$dirty && v$.form.applicant.patronymic_name.required.$invalid">
              <template #error>
                <span v-if="v$.form.applicant.patronymic_name.$dirty && v$.form.applicant.patronymic_name.required.$invalid">
                  Это поле обязателен к заполнению
                </span>
              </template>
            </Input>
            <Input placeholder="Телефон" v-model="form.applicant.username"
            :error="v$.form.applicant.username.$dirty && v$.form.applicant.username.required.$invalid">
              <template #error>
                <span v-if="v$.form.applicant.username.$dirty && v$.form.applicant.username.required.$invalid">
                  Это поле обязателен к заполнению
                </span>
                <span v-else-if="v$.form.applicant.username.$dirty && v$.form.applicant.username.numeric.$invalid">
                  Разрешен только чисоловой формат
                </span>
              </template>
            </Input>
        </div>
        <Textarea v-model="form.description" placeholder="Описание заявки"
        :error="v$.form.description.$dirty && v$.form.description.required.$invalid"
        errorMsg="Это поле обязателен к заполнению">
        </Textarea>
      </div>
      <div class="footer">
        <Button :disabled="disabledAdd" @click="addApeal">
          Создать
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Select from '@/components/ui/selects/default.vue'
import Input from '@/components/ui/inputs/default.vue'
import Textarea from '@/components/ui/textarea.vue'
import Button from '@/components/ui/buttons/default.vue'
import useVuelidate from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import Dots from '@/components/ui/loading/dots.vue'
import Date from '@/components/ui/inputs/date.vue'
export default {
  name: 'AddAppealModal',
  components: {
    Select,
    Input,
    Textarea,
    Button,
    Dots,
    Date
  },
  computed: {
    ...mapState({
        premises: state => state.premises.premises,
        apartments: state => state.apartments.apartments
    })
  },
  data() {
    return {
        form: {
          applicant: {
            last_name: null,
            first_name: null,
            patronymic_name: null,
            username: null,
          },
          premise_id: null,
          apartment_id: null,
          due_date: null,
          description: null,
          status_id: 1,
        },
        disabledAdd: true,
        loadingModal: true
    }
  },
  validations() {
    return {
      form: {
        premise_id: {
          required,
        },
        apartment_id: {
          required,
        },
        applicant: {
          last_name: {
            required,
          },
          first_name: {
            required,
          },
          patronymic_name: {
            required,
          },
          username: {
            required,
            numeric
          },
        },
        due_date: {
          required,
        },
        description: {
          required,
        }
      }
    }
  },
  setup() {
    return { v$: useVuelidate() }
  },
  methods: {
    ...mapMutations({
      show_addModal: 'appeals/SHOW_ADDMODAL',
      loading_alert: 'alert/LOADING_ALERT'
    }),
    ...mapActions({
      get_premises: 'premises/get_premises',
      get_apartments: 'apartments/get_apartments',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      create_appeal: 'appeals/create_appeal',
      get_appeals: 'appeals/get_appeals'
    }),
    async init() {
      this.loadingModal = true
      await Promise.all([
        this.get_premises()
      ])
      this.loadingModal = false
      this.disabledAdd = false
    },
    async selectPremise() {
        this.form.apartment_id = null
        await this.get_apartments({
            premise_id: this.form.premise_id
        })
    },
    async addApeal() {
      this.v$.$touch()
      if (this.v$.$invalid) {
        return
      }
      if(!this.disabledAdd) {
        this.disabledAdd = true
        try {
          this.loading_alert()
          await this.create_appeal(this.form)
          await this.get_appeals({
            page: 1,
            page_size: 10,
          })
          this.show_addModal(false)
          this.success_alert('Заявка успешно создана')
        } catch (error) {
          this.disabledAdd = false
          this.error_alert(error.response.data.detail)
        }
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.appeal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00000046;
    z-index: 10;
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .form {
        position: relative;
        overflow-y: auto;
        width: 738px;
        background: white;
        padding: 24px 32px;
        border-radius: 8px;
        .header {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            align-items: center;
            color: #333;
            h2 {
                font-size: 16px;
                line-height: 24px;
                font-weight: 500;
                font-family: 'Roboto', sans-serif;
            }
            p {
                font-size: 14px;
                line-height: 20px;
                font-family: 'Inter', sans-serif;
            }
        }
        .loading {
          height: 393px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .body {
            margin: 24px 0;
            display: flex;
            flex-direction: column;
            gap: 32px;
            .first-line {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 14px;
            }
            .second-line {
                display: grid;
                grid-template-columns: repeat(4, minmax(0, 1fr));
                gap: 14px;
            }
        }
        .footer {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
    }
}
</style>