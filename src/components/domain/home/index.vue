<template>
    <section class="page">
        <h1 class="title">
            Список заявок
        </h1>
        <div class="table">
            <div class="add">
                <Button>
                    Создать
                </Button>
            </div>
            <div class="filters">
                <Search/>
                <div>
                    right
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import Button from '@/components/ui/buttons/default.vue'
import Search from '@/components/ui/inputs/search.vue'
export default {
    name: 'HomeComponent',
    components: {
        Button,
        Search
    }
}
</script>
<style lang="scss" scoped>
    .page {
        display: flex;
        flex-direction: column;
        .title {
            padding: 23.5px 0;
            font-size: 20px;
            line-height: 24px;
            font-weight: 400;
            font-family: 'Roboto', sans-serif;
        }
        .table {
            flex: 1 1 0;
            margin-top: 47px;
            padding: 10px 20px;
            background: white;
            border-radius: 8px;
            .add {
                display: flex;
                justify-content: end;
            }
            .filters {
                padding: 32px 0;
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 15px;
            }
        }
    }
</style>