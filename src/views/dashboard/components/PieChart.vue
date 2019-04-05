<template>
    <div class="chart" style="height:300px; width:100%;" />
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie');
require('echarts/theme/macarons') // echarts theme


@Component
export default class PieChart extends Vue {

    private chart: any = {};

    @Prop({ required: true }) readonly pieData!: Array<object>;




    @Watch('pieData')
    OnPieDataChanged(val: Array<object>, oldVal: Array<object>) {
        this.setOptions(val);
    }

    mounted() {
        this.initCharts();
    }

    private initCharts() {
        this.chart = echarts.init(this.$el, 'macarons');
        this.setOptions(this.pieData);
    }

    private setOptions(actualData) {
        console.log(actualData)

        this.chart.setOption({
            title: {
                text: 'Haftalık Durum'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c} ({d}%)'
            },
            series: [{
                type: 'pie',
                center: ['50%', '50%'],
                data: actualData,
                animationEasing: 'cubicInOut',
                animationDuration: 2500
            }]
        })
    }
}
</script>

<style scoped>

</style>