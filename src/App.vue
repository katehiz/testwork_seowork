<template>
	<div class="wrap">
		<h2 class="title">Chart</h2>
		<chart-component  v-if="dataSet.length" :data-set="dataSet" v-on:select="updateSelectedItem" />
		
		<h2 class="title" v-if="selectedDateItems.length">Active Date {{ selectedDate }}</h2>
		<table-component v-if="selectedDateItems.length" :data-set="selectedDateItems" />

		<h2 class="title">All Stats</h2>
		<table-component v-if="dataSet.length" :data-set="dataSet" />
	</div>
</template>

<script>
	import TableComponent from './components/TableComponent.vue';
	import ChartComponent from './components/ChartComponent';

	export default {
		name: 'MainPage',
		components: {
			TableComponent,
			ChartComponent
		},

		data () {
			return {
				dataSet: [],
				selectedDateItems: [],
				selectedDate: ''
			}
		},

		created () {
			fetch ('https://osian.ru/data').then(response => {
				return response.ok ? response.json() : null
			}).then(data => {
				this.dataSet = data ? data.items : []
			})
		},

		methods: {
			updateSelectedItem(date) {
				let data = JSON.parse(JSON.stringify(this.dataSet))
				this.selectedDateItems = data.reduce((acc, value) => {
					let group = value;
					group.data = value.data.filter(el => el.date === date);
					acc.push(group);
					return acc;
				}, [])
				this.selectedDate = date;
			}
		}
	}
</script>

<style lang="scss">
	* {
		box-sizing: border-box;
	}
	.wrap {
		width: 100%;
		position: relative;
		margin: 0 auto;
		background: #fff;
		min-height: 100%;
	}
	h2 {
		font-size: 30px;
	}
	.title {
		padding: 25px 25px 0;
		display: inline-block;
	}
</style>