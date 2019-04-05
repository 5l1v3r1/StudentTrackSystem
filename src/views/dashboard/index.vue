<template>
    <div class="dashboard-editor-container">
        <el-row :gutter="30">
            <panel :value="veri.ToplamTalebe" icon-name="peoples" title="Toplam Talebe"/>
            <panel :value="veri.ToplamKatVakfi" icon-name="peoples" title="Toplam Kat Vakfı"/>
            <panel :value="veri.ToplamIlceVakfi" icon-name="peoples" title="Toplam İlçe Vakfı"/>
            <panel :value="veri.ToplamMedrese" icon-name="home" title="Toplam Medrese"/>
            <panel :value="veri.ToplamIlce" icon-name="home" title="Toplam Ilce"/>
        </el-row>

        <el-row >
            <el-col>
                <div class="chart-wrapper">
                    <pie-chart :pie-data="GetPieData"/>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="30">
            <panel type="BuHaftaKuran" :value="GetSum(veri.BuHaftaKuran)" @handleSetLineChartData="handleSetLineChartData" icon-name="quran" title="Toplam Kur'an"/>
            <panel type="BuHaftaMutalaa" :value="GetSum(veri.BuHaftaMutalaa)" @handleSetLineChartData="handleSetLineChartData" icon-name="quran" title="Toplam Mütalaa"/>
            <panel type="BuHaftaEzber" :value="GetSum(veri.BuHaftaEzber)" @handleSetLineChartData="handleSetLineChartData" icon-name="pin" title="Toplam Ezber"/>
            <panel type="BuHaftaYazi" :value="GetSum(veri.BuHaftaYazi)" @handleSetLineChartData="handleSetLineChartData" icon-name="divit" title="Toplam Yazı"/>
            <panel type="BuHaftaCevsen" :value="GetSum(veri.BuHaftaCevsen)" @handleSetLineChartData="handleSetLineChartData" icon-name="pin" title="Toplam Cevşen"/>
        </el-row>

        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
            <line-chart :chartData="lineChartData" />
        </el-row>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Panel from "./components/Panel";
    import PieChart from "@/views/dashboard/components/PieChart.vue";
    import LineChart from "@/views/dashboard/components/LineChart.vue";
    import {GetDashboardData} from "@/api/report";

    @Component({
        components: {
            Panel,
            PieChart,
            LineChart
        }
    })
    export default class Dashboard extends Vue {

        private veri = {
            "ToplamTalebe": 67,
            "ToplamKatVakfi": 15,
            "ToplamIlceVakfi": 10,
            "ToplamMedrese": 17,
            "ToplamIlce": 9,
            "BuHaftaHergunCeteleDolduranlar": 0,
            "BuHaftaHicCeteleDoldurmayanlar": 0,
            "BuHaftaKuran": [
                16,
                13,
                5,
                1,
                1,
                3,
                4,
                1
            ],
            "BuHaftaMutalaa": [
                16,
                12,
                5,
                1,
                31,
                2,
                3,
                1
            ],
            "BuHaftaEzber": [
                16,
                13,
                5,
                1,
                1,
                3,
                4,
                1
            ],
            "BuHaftaYazi": [
                16,
                13,
                5,
                12,
                19,
                13,
                4,
                12
            ],
            "BuHaftaCevsen": [
                16,
                13,
                12,
                1,
                5,
                3,
                2,
                1
            ]
        };

        private lineChartData = [];

        get GetPieData() {
            return [
                {value: this.veri.BuHaftaHergunCeteleDolduranlar, name: 'Her Gün Çetele Dolduran'},
                {value: this.veri.BuHaftaHicCeteleDoldurmayanlar, name: 'Hiç Çetele Doldurmayan'},
            ];
        }


        private GetSum(arr: Array<number>){
            return 40;
            //return arr.reduce((partial_sum, a) => partial_sum + a);
        }

        private handleSetLineChartData(type: string) {
            this.lineChartData = this.veri[type]
        }


        async created() {
            try {
                const { data } = await GetDashboardData();
                console.log(data);
                this.veri = data;
            } catch (e) {
                console.log(e.message);
            }
        }

    }
</script>

<style lang="scss" scoped>
    .dashboard-editor-container {
        padding: 32px;
        background-color: rgb(240, 242, 245);
        position: relative;
    }

    .chart-wrapper {
        background: #fff;
        margin-bottom: 32px;
    }
</style>
