<template>
<div>
    <div class="password" 
    :class="[
    {'error': error}
    ]">
        <svg width="24" height="22" fill="#757575">
            <use xlink:href="#lock"/>
        </svg>
        <div class="input">
            <label v-if="label" for="id">{{label}}</label>
            <label v-else>&nbsp;</label>
            <div>
                <input :id="id" :type="type"
                :value="value"
                @input="$emit('input', $event.target.value)">
                <svg width="24" height="22" fill="#757575" class="close-eye"
                @click="clickEye">
                    <use xlink:href="#close-eye"/>
                </svg>
            </div>
        </div>
    </div>
    <div class="error-text">
        <slot  name="error"/>
    </div>
</div>
    
</template>
<script>
export default {
    name: 'PhoneInputComponent',
    props: {
        id: {
            type: String,
            required: true
        },
        label: {
            type: String
        },
        error: {
            type: Boolean,
            default: false
        },
        value: {}
    },
    data() {
        return {
            type: 'password'
        }
    },
    methods: {
        clickEye() {
            if(this.type === 'password') {
                this.type = 'text'
            } else this.type = 'password'
        }
    }
}
</script>
<style lang="scss" scoped>
.password {
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: flex-end;
    gap: 8px;
    padding-bottom: 8px;
    width: 100%;
    font-family: 'Roboto', sans-serif;
    .input {
        flex: 1 1 0%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-size: 14px;
        line-height: 20px;
        margin-right: 12px;
        div {
            display: flex;
            gap: 8px;
            .close-eye {
                cursor: pointer;
            }
        }
        label {
            color: #50B053;
            font-style: 14px;
            line-height: 18px;
        }
        input {
            border: none;
            outline: none;
            font-size: 14px;
            line-height: 20px;
            width: 100%;
        }
    }
}
.error {
    border-bottom: 1px solid #ff0000;
}
.error-text {
    margin-top: 4px;
    color: #ff0000;
    font-size: 14px;
    line-height: 16px;
}
</style>