<template>
    <div class="table-container">
        <div class="table-container__scroll">
            <table>
                <colgroup>
                    <col width="180px">
                    <col width="100%">
                </colgroup>
                <thead>
                    <tr class="table-line">
                        <td>Type stats</td>
                        <td v-for="item of queries" :key="item.date">
                            {{ item.date | dateFormat }}
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>queries</td>
                        <td v-for="item of queries" :key="item.date" v-text="item.value" />
                    </tr>
                    <tr>
                        <td>groups</td>
                        <td v-for="item of groups" :key="item.date" v-text="item.value" />
                    </tr>
                    <tr>
                        <td>documents</td>
                        <td v-for="item of documents" :key="item.date" v-text="item.value" />
                    </tr>
                    <tr>
                        <td>categories</td>
                        <td v-for="item of categories" :key="item.date" v-text="item.value" />
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    filters: {
        dateFormat (value = Date.now()) {
            let currentDate = new Date(value);
            return currentDate.toLocaleDateString("en", { month: 'long', day: '2-digit', year: 'numeric'});
        },
    },
    props: {
        dataSet: Array
    },
    computed: {
        queries () {
            if (this.dataSet.length)
                return this.dataSet.filter(item => item.name === 'queries')[0].data
        },
        groups () {
            if (this.dataSet.length)
                return this.dataSet.filter(item => item.name === 'groups')[0].data
        },
        documents () {
            if (this.dataSet.length)
                return this.dataSet.filter(item => item.name === 'documents')[0].data
        },
        categories () {
            if (this.dataSet.length)
                return this.dataSet.filter(item => item.name === 'categories')[0].data
        }
    }
}
</script>

<style lang="scss" scoped>
    .table-container {
        width: 100%;
        padding: 25px;
        overflow: hidden;

        &__scroll {
            overflow: auto;
        }
        
        table {
            width: 100%;
            text-align: left;
            border-collapse: collapse;
            font-size: 12px;
            line-height: 14px;
            border: 0;
            color: #2d3646;

            td {
                border: 1px solid #e0e6f0;
                padding: 10px;
                white-space: nowrap;
            }
        }
    }
</style>