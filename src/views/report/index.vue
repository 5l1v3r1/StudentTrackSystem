<template>
    <div class="app-container">

        <div class="filter-container">

            <el-row type="flex" justify="center">
                <el-col align="center">
                    <el-tag class="filter-item">United Kingdom</el-tag>

                    <el-date-picker
                            style="margin-left:20px;"
                            v-model="dateValue"
                            type="daterange"
                            align="left"
                            size="large"
                            format="MM-dd-yyyy"
                            start-placeholder="Start Date"
                            end-placeholder="End Date"
                            :picker-options="pickerOptions">
                    </el-date-picker>

                    <el-select style="margin-left:20px;"
                               v-model="courseGroupId" size="large" placeholder="Choose Course Group">
                        <el-option
                                v-for="course in courses"
                                :label="course.name"
                                :key="course.id"
                                :value="course.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>



            <el-row style="margin-top: 20px;" >
                <el-col align="center">
                    <el-switch
                            class="filter-item"
                            v-model="validated"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="Validated DailyStudy"
                            inactive-text="Unvalidated DailyStudy">
                    </el-switch>


                    <el-button class="filter-item"
                               style="cursor: pointer;" type="primary"
                               @click="GetDailyStudies">List Daily Studies
                    </el-button>


                    <el-button class="filter-item" type="primary"
                               :disabled="IsRaporOlusturDisable"
                               @click="exportExcel">Create Report
                    </el-button>
                </el-col>
            </el-row>


        </div>

        <!-- isLoading ekle. -->
        <el-table
                ref="tableData"
                :data="veri"
                v-if="veri.length !== 0"
                border
                fit
                style="width: 100%;">

            <el-table-column
                    label="NO"
                    type="index">
            </el-table-column>

            <el-table-column v-for="(item,key,index) in veri[0]" :prop="key" :key="index" sortable
                             :label="key">
            </el-table-column>

        </el-table>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {GetDailyStudiesAsync} from "@/api/report";
    import {GetAllCourseGroups, GetMyCoursesListAsync} from "@/api/course-group";
    import {CourseModel} from "@/models/CourseModel";

    import moment from 'moment';
    import {Course} from "@/models/Course";

    @Component
    export default class DailyStudyReport extends Vue {


        private isLoading = true;

        private veri = [];
        private courses: Course[] = [];

        private courseGroupId = '';

        private startDate: string = '';
        private endDate: string = '';
        private dateValue = [];
        private validated: boolean = false;


        private timeTyme = [
            {displayName: 'Week', key: 'week'},
            {displayName: 'Month', key: 'month'},
        ];


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

        get IsRaporOlusturDisable() {
            return this.veri.length === 0
        }


        created() {

            this.GetAllCourseGroups();

        }

        private exportExcel() {

            import('./Export2Excel.js').then(excel => {

                //const headers = ['No'];
                const headers: any[] = [];
                const data: any[] = [];

                //let count = 1;
                let iIndex = 0;
                for(let i in this.veri){
                    //let key = i;
                    const val = this.veri[i];
                    const arr: any[] = [];
                    //arr.push(count);
                    //count++;
                    for(let j in val){
                        const sub_key = j;
                        const sub_val = val[j];
                        if (iIndex == 0) {
                            headers.push(sub_key);
                        }
                        arr.push(sub_val);
                    }
                    iIndex++;
                    data.push(arr);
                }

                excel.export_json_to_excel({
                    header: headers, //Header Required
                    data, //Specific data Required
                    filename: 'daily-study-liste', //Optional
                    autoWidth: true, //Optional
                    bookType: 'xlsx' //Optional
                })

            });

        }

        private GetDailyStudies() {

            const startDate = moment(this.dateValue[0]).format("YYYY-MM-DD");

            const endDate = moment(this.dateValue[1]).format("YYYY-MM-DD");

            this.isLoading = true;
            GetDailyStudiesAsync(1,this.courseGroupId,startDate,endDate,this.validated).then(res => {
                const { data } = res;

                console.log(data);
                this.veri = data;
                //this.tableData = data;

                this.isLoading = false;
            })
            .catch(err => {
                console.log(err);
            });

        }

        private async GetAllCourseGroups() {

            try {
                const { data: groupList } = await GetAllCourseGroups();

                this.courses = groupList;
            }
            catch {

            }
        }

    }
</script>

<style>

    .el-table .cell {
        word-break: break-word;
    }


</style>

<style scoped lang="scss">

    .filter-container {
        padding-bottom: 10px;

        .filter-item {
            display: inline-block;
            vertical-align: middle;
            margin-bottom: 10px;
            margin-left: 20px;
        }
    }


</style>
