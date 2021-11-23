<template>
    <div class="chart-container">
        <highcharts class="hc" :options="chartOptions" />
    </div>
</template>

<script>
    import Highcharts from 'highcharts';
	import exportingInit from 'highcharts/modules/exporting';
	exportingInit(Highcharts);

    export default {
        name: 'ChartComponent',
		props: {
			dataSet: Array
		},

        data () {
            const _this = this;
			return {
                selectedItem: null,
				chartOptions: {
					chart: {
						type: 'spline'
					},
					title: {
						text: null
					},
                    legend: {
                        align: 'top',
                        verticalAlign: 'top'
                    },
					xAxis: {
						type: 'datetime',
						range: 1000 * 3600 * 24 * 365 * 3,
                        tickPixelInterval: 100,
						labels: {
                            align: 'top',
                            formatter () {
                                return _this.formatDate(this.value)
                            },
						}
					},
					yAxis: {            
						title: {
							text: 'Значение (сек)'
						},
                        opposite: true
					},
                    series: [],
                    plotOptions: {
                        series: {
                            allowPointSelect: true,
                            point: {
                                events: {
                                    select: function () {
                                        _this.selectedItem = this.category;
                                    }
                                }
                            }
                        }
                    },
				},
			}
		},

        created () {
            this.chartOptions.series = this.prepairChartSeriesData()
        },

        watch: {
            selectedItem(value) {
                this.$emit('select', value)
            }
        },

        methods: {
            formatDate(value) {
                let currentDate = new Date(value);
                return currentDate.toLocaleDateString("en-GB", { day: '2-digit', month: 'short' });
            },
            prepairChartSeriesData () {
                return [
                    {   
                        color: 'blue',
                        name: "Queries",
                        data: this.dataSet.find((element, index, array) => element.name === 'queries').data.map(el => ([el.date, el.value]))
                    },
                    {
                        color: 'orange',
                        name: "Groups",
                        data: this.dataSet.find((element, index, array) => element.name === 'groups').data.map(el => ([el.date, el.value]))
                    },
                    {
                        color: 'green',
                        name: "Documents",
                        data: this.dataSet.find((element, index, array) => element.name === 'documents').data.map(el => ([el.date, el.value]))
                    },
                    {
                        color: 'red',
                        name: "Categories",
                        data: this.dataSet.find((element, index, array) => element.name === 'categories').data.map(el => ([el.date, el.value]))
                    },
                ];
            }
        }
    }
</script>

<style lang="scss" scoped>
    .hc {
        padding-top: 40px;
    }
</style>