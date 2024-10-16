export default {
    install(Vue) {
      const changeForm = (oldForm, form) => {
        for (let keyOldForm in oldForm) {
          if (form.hasOwnProperty(keyOldForm)) {
            form[keyOldForm] = oldForm[keyOldForm];
          }
        }
      };
      Vue.prototype.$changeForm = changeForm;
    }
  };
  