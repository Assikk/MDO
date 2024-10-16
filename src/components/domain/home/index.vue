<template>
    <section class="page">
        <h1 class="title">
            Список заявок
        </h1>
        <div class="page-table">
            <div class="add">
                <Button @click="show_addModal(true)">
                    Создать
                </Button>
            </div>
            <div class="filters">
                <Search placeholder="Поиск (№ заявки, название)" v-model="filter.search" @enter="get_appeals(filter)"/>
                <Select placeholder="Дом" id="searchHome" iconLocation="98"
                :list="premises" valueList="id" textList="title"
                v-model="filter.premise_id" @input="get_appeals(filter)"></Select>
            </div>
            <Table :head="head" :loading="loadingTable" :total="total"
            :count="filter.page_size" :totalPages="totalPages"
            @update:count="changeCount"
            @changePage="changePage">
                <template #body>
                    <tr v-for="item in appeals" :key="item.id">
                        <td>
                            <span class="number_appeal"
                            @click="showEditModal(item.id)">
                                {{item.number}}
                            </span>
                        </td>
                        <td>
                            {{item.created_at}}
                        </td>
                        <td>
                            {{item.premise?.address}} {{item.apartment?.label}}
                        </td>
                        <td>
                            {{item.applicant?.first_name}} {{item.applicant?.last_name}} {{item.applicant?.patronymic_name}}
                        </td>
                        <td>
                            {{item.description}}
                        </td>
                        <td>
                            {{item.due_date}}
                        </td>
                        <td>
                            {{item.status.name}}
                        </td>
                    </tr>
                </template>
            </Table>
        </div>
        <transition-group name="fade">
           <AddModal v-if="showAddModal" key="add"/>
           <EditModal v-if="isShowEditModal" key="edit" :id="appealId"/>
        </transition-group>
    </section>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Button from '@/components/ui/buttons/default.vue'
import Search from '@/components/ui/inputs/search.vue'
import Select from '@/components/ui/selects/default.vue'
import Table from '@/components/ui/table.vue'
import AddModal from './modals/add.vue'
import EditModal from './modals/edit.vue'
export default {
    name: 'HomeComponent',
    components: {
        Button,
        Search,
        Select,
        Table,
        AddModal,
        EditModal
    },
    computed: {
        ...mapState({
            premises: state => state.premises.premises,
            appeals: state => state.appeals.appeals,
            totalPages: state => state.appeals.totalPages,
            total: state => state.appeals.total,
            showAddModal: state => state.appeals.showAddModal,
            isShowEditModal: state => state.appeals.showEditModal
        })
    },
    data() {
        return {
            filter: {
                page: 1,
                page_size: 10,
                search: null,
                premise_id: null
            },
            head: [
                {
                    id: 1,
                    name: '№',
                    width: 100
                },
                {
                    id: 2,
                    name: 'Создана',
                    width: 150
                },
                {
                    id: 3,
                    name: 'Адрес',
                    width: 200
                },
                {
                    id: 4,
                    name: 'Заявитель',
                    width: 200
                },
                {
                    id: 5,
                    name: 'Описание',
                    width: 260
                },
                {
                    id: 6,
                    name: 'Срок',
                    width: 150
                },
                {
                    id: 7,
                    name: 'Статус',
                    width: 150
                }
            ],
            loadingTable: true,
            appealId: null
        }
    },
    methods: {
        ...mapMutations({
            show_addModal: 'appeals/SHOW_ADDMODAL',
            show_editModal: 'appeals/SHOW_EDITMODAL'
        }),
        ...mapActions({
            get_premises: 'premises/get_premises',
            get_appeals: 'appeals/get_appeals'
        }),
        async init() {
            this.loadingTable = true
            await Promise.all([
                this.get_premises(),
                this.get_appeals(this.filter)
            ])
            this.loadingTable = false
        },
        async changeCount(value) {
            this.filter.page_size = value
            await this.get_appeals(this.filter)
        },
        async changePage(page) {
            this.filter.page = page
            await this.get_appeals(this.filter)
        },
        showEditModal(id) {
            this.appealId = id
            this.show_editModal(true)
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
        .page-table {
            flex: 1 1 0;
            margin-top: 47px;
            padding: 10px 20px;
            background: white;
            border-radius: 8px;
            margin-bottom: 20px;
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
            .number_appeal {
                padding: 4px 14.5px;
                background: #50B053;
                border-radius: 4px;
                color: #FFFFFF;
                cursor: pointer;
            }
        }
    }
    
</style>