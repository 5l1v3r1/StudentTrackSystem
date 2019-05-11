<template>
    <div class="app-container">

        <el-row type="flex" justify="center">
            <el-col align="center" :xs="24" :sm="12" :md="12" :lg="12">
            <el-date-picker
                    v-model="dateValue"
                    type="daterange"
                    align="right"
                    format="MM-dd-yyyy"
                    unlink-panels
                    range-separator="To"
                    start-placeholder="Start Date"
                    end-placeholder="End Date"
                    :picker-options="pickerOptions">
            </el-date-picker>


            <el-button type="primary" @click="ceteleleriListele">Get</el-button>
            </el-col>
        </el-row>

        <el-row type="flex" justify="center">
            <el-col align="center" :xs="24" :sm="12" :md="12" :lg="12">
        <el-table
                :data="DailyStudyList"
                @row-click="tariheGit"
                style="width: 100%">
            <el-table-column
                    prop="created_day"
                    :formatter="dateColFormatter"
                    label="Date">
            </el-table-column>

        </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" >
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import moment from 'moment';
    import {AdminGetDailyStudies} from "@/api/daily-study";
    import {DailyStudy} from "@/models/Dailystudy";

    @Component
    export default class DateList extends Vue {

        @Prop(String) readonly userId !: string;
        @Prop(String) readonly userName !: string;

        private dateValue = [];

        private pickerOptions = {
            shortcuts: [{
                text: 'Last Week',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                }},
                {
                    text: 'Last 2 Week',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: 'Last 3 Week',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 21);
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: 'Last Month',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }}
            ],

        };

        private DailyStudyList: Array<DailyStudy> = [];

        private tableRowClassName({row, rowIndex}) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        }

        private async ceteleleriListele() {
            const startDate = moment(this.dateValue[0]).format("YYYY-MM-DD");

            const endDate = moment(this.dateValue[1]).format("YYYY-MM-DD");

            try {
                const { data } = await AdminGetDailyStudies({
                    begining: startDate.toString(),
                    end: endDate.toString(),
                    ordering: '-created_day',
                    user: this.userId.toString()
                });

                this.DailyStudyList = data;
            }
            catch (e) {
                console.log("datelist ceteleleriListele " + e);
            }

        }

        dateColFormatter(row) {
            return moment(row.created_day).format("MM-DD-YYYY");
        }

        tariheGit(row: DailyStudy) {
            this.$router.push({
                name: 'FillDailyStudyWithParams',
                params: {
                    userName: this.userName,
                    userId: this.userId.toString()
                },
                query: {
                    id: row.id.toString()
                }
            })
        }

    }
</script>

<style>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>
