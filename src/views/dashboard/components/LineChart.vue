<template>
    <div class="chart" style="height:300px; width:100%;" />
</template>

<script lang="ts">
    import {Component, Vue, Prop, Watch} from 'vue-property-decorator';

    var echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/pie');
    require('echarts/theme/macarons');

    @Component
    export default class LineChart extends Vue {

        private chart:any = {};

        @Prop({ required: true }) readonly chartData!: Array<number>;

        @Watch('chartData')
        OnLineDataChanged(val: Array<number>, oldVal: Array<number>) {
            this.setOptions(val);
        }

        mounted() {
            this.initCharts();
        }

        private initCharts() {
            this.chart = echarts.init(this.$el, 'macarons');
            this.setOptions(this.chartData);
        }

        private setOptions(actualData: number[]) {
            this.chart.setOption({
                xAxis: {
                    type: 'category',
                    data: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Pzr'],
                    boundaryGap: false,
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    axisTick: {
                        show: false
                    }
                },
                series: [{
                    //data: [820, 932, 901, 934, 1290, 1330, 1320],
                    data: actualData,
                    type: 'line',
                    center: ['50%', '50%'],
                    itemStyle: {
                        normal: {
                            color: '#3888fa',
                            lineStyle: {
                                color: '#3888fa',
                                width: 2
                            },
                            areaStyle: {
                                color: '#f3f8ff'
                            }
                        }
                    },
                    animationDuration: 2000,
                    animationEasing: 'quadraticOut'
                }]
            });
        }
    }
</script>

<style scoped>

</style>