<template>
    <div class="table">
        <Dots class="center" v-if="loading"/>
        <table v-else>
            <thead>
                <tr>
                    <th v-for="item in head" :key="item.id"
                    :style="`width: ${item.width}px`">
                        {{item.name}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <slot name="body"/>
            </tbody>
        </table>
        <div class="table-pagination">
            <div class="count">
                <p>
                    <span>1–10</span> из <span>{{total}}</span> записей
                </p>
                <Select id="countPagination" :list="countList" textList="name" valueList="value" v-model="countPagination"/>
            </div>
            <Pagination :pageCount="totalPages" :clickHandler="change"/>
        </div>
    </div>
</template>
<script>
import Dots from './loading/dots.vue'
import Select from './selects/default.vue'
import Pagination from './pagination.vue'
export default {
    name: 'TableComponent',
    props: {
        head: {
            type: Array, 
            required: true
        },
        loading: {
            type: Boolean,
            default: true
        },
        count: {},
        totalPages: {
            type: Number,
        },
        total: {
            type: Number
        }
    },
    components: {
        Dots,
        Select,
        Pagination
    },
    computed: {
        countPagination: {
            get() {
                return this.count;
            },
            set(count) {
                this.$emit('update:count', count);
            },
        },
    },
    data() {
        return {
            countList: [
                {
                    id: 1,
                    name: '10',
                    value: '10'
                },
                {
                    id: 2,
                    name: '20',
                    value: '20'
                },
                {
                    id: 3,
                    name: '50',
                    value: '50'
                }
            ]
        }
    },
    methods: {
    change(page) {
      this.$emit('changePage', page)
    },
  },
}
</script>
<style lang="scss" scoped>
.table {
    position: relative;
    font-size: 14px;
    line-height: 20px;
    table {
        width: 100%;
        text-align: left;
        border-spacing: 0;
        
        thead tr th {
            padding: 12px 8px;
            border-bottom: 1px solid #DDDFE0;
            color: #50B053;
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
        }
        tbody tr td {
            padding: 20px 8px;
            border-bottom: 1px solid #DDDFE0;
            color: #333333;
            font-family: 'Inter', sans-serif;
            font-weight: 400;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .table-pagination {
        margin-top: 32px;
        display: flex;
        justify-content: space-between;
        .count {
            display: flex;
            gap: 16px;
            align-items: center;
            font-family: 'Roboto', sans-serif;
            color: #333;
            span {
                font-weight: 700;
            }
            select {
                width: 90px;
            }
        }
    }
}
.center {
    min-height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>