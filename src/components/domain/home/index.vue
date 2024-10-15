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
                <Search placeholder="Поиск (№ заявки, название)" v-model="filter.search" @enter="get_appeals(filter)"/>
                <Select placeholder="Дом" id="searchHome" iconLocation="98"
                :list="premises" valueList="id" textList="title"
                v-model="filter.premise_id" @input="get_appeals(filter)"></Select>
            </div>
        </div>
    </section>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Button from '@/components/ui/buttons/default.vue'
import Search from '@/components/ui/inputs/search.vue'
import Select from '@/components/ui/selects/default.vue'
export default {
    name: 'HomeComponent',
    components: {
        Button,
        Search,
        Select
    },
    computed: {
        ...mapState({
            premises: state => state.premises.premises
        })
    },
    data() {
        return {
            filter: {
                page: 1,
                page_size: 10,
                search: null,
                premise_id: null
            }
        }
    },
    methods: {
        ...mapActions({
            get_premises: 'premises/get_premises',
            get_appeals: 'appeals/get_appeals'
        }),
        async init() {
            await Promise.all([
                this.get_premises(),
                this.get_appeals(this.filter)
            ])
        }
    },
    mounted() {
        this.init()
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