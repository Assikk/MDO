<template>
    <div class="phone">
        <div class="icon">
            icon
        </div>
        <div class="input">
            <label for="id">{{label}}</label>
            <input :id="id" type="text">
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
        }
    }
}
</script>
<style lang="scss" scoped>
.phone {
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: flex-end;
    gap: 8px;
    padding-bottom: 8px;
    .input {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    input {
        border: none;
        outline: none;
    }
}
</style>