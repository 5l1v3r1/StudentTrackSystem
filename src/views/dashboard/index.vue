<template>
    <div class="dashboard-editor-container">

        <el-row :gutter="40">
            <panel :value="veri.ToplamTalebe" icon-name="peoples" title="Toplam Talebe"/>
            <panel :value="veri.ToplamKatVakfi" icon-name="peoples" title="Toplam Kat Vakfı"/>
            <panel :value="veri.ToplamIlceVakfi" icon-name="peoples" title="Toplam İlçe Vakfı"/>
            <panel :value="veri.ToplamMedrese" icon-name="home" title="Toplam Medrese"/>
            <panel :value="veri.ToplamIlce" icon-name="home" title="Toplam Ilce"/>
        </el-row>

        <el-row :gutter="32">
            <el-col :lg="12" :sm="24" :xs="24">
                <div class="chart-wrapper">
                    <pie-chart :pie-data="GetPieData"/>
                </div>
            </el-col>
        </el-row>


    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import CountTo from 'vue-count-to'
    import Panel from "./components/Panel";
    import PieChart from "@/views/dashboard/components/PieChart.vue";
    import {GetDashboardData} from "@/api/report";


    @Component({
        components: {
            Panel,
            PieChart
        }
    })
    export default class Dashboard extends Vue {

        private veri = {
            "ToplamTalebe": 0,
            "ToplamKatVakfi": 0,
            "ToplamIlceVakfi": 0,
            "ToplamMedrese": 0,
            "ToplamIlce": 0,
            "BuHaftaHergunCeteleDolduranlar": 0,
            "BuHaftaHicCeteleDoldurmayanlar": 0
        };

        get GetPieData() {
            return [
                {value: this.veri.BuHaftaHergunCeteleDolduranlar, name: 'Her Gün Çetele Dolduran'},
                {value: this.veri.BuHaftaHicCeteleDoldurmayanlar, name: 'Hiç Çetele Doldurmayan'},
            ];
        }

        async created() {
            try {
                const { data } = await GetDashboardData();
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
        padding: 16px 16px 0;
        margin-bottom: 32px;
    }
</style>
