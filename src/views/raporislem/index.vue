<template>
    <div class="app-container">

        <div class="filter-container">
            <el-tag class="filter-item">İzmir</el-tag>



            <el-date-picker
                    v-model="dateValue"
                    type="daterange"
                    align="right"
                    format="dd-MM-yyyy"
                    unlink-panels
                    range-separator="To"
                    start-placeholder="Başlangıç Tarihi"
                    end-placeholder="Bitiş Tarihi"
                    :picker-options="pickerOptions">
            </el-date-picker>



            <el-select v-model="courseGroupId" class="filter-item" placeholder="Grup Seç">
                <el-option
                        v-for="course in courses"
                        :label="course.name"
                        :key="course.id"
                        :value="course.id">
                </el-option>
            </el-select>


            <el-switch
                    class="filter-item"
                    v-model="validated"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="Onaylanan Çeteleler"
                    inactive-text="Onaylanmayan Çeteleler">
            </el-switch>


            <el-button class="filter-item"
                       style="cursor: pointer;" type="primary"
                       @click="GetDailyStudies">Çeteleleri Listele
            </el-button>


            <el-button class="filter-item" type="primary"
                       :disabled="IsRaporOlusturDisable"
                        @click="exportExcel"
                    >Raporu Oluştur
            </el-button>



        </div>

        <!-- isLoading ekle. -->
        <el-table
                ref="tableData"
                :data="veri"
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
    import {GetMyCoursesListAsync} from "@/api/course-group";
    import {CourseModel} from "@/models/CourseModel";

    import moment from 'moment';
    import {Course} from "@/models/Course";

    @Component
    export default class CeteleGenelToplam extends Vue {


        private isLoading = true;

        private veri = [];
        private courses: Course[] = [];

        private courseGroupId = '';

        private startDate: string = '';
        private endDate: string = '';
        private dateValue = [];
        private validated: boolean = false;


        private timeTyme = [
            {displayName: 'Haftalık', key: 'week'},
            {displayName: 'Aylık', key: 'month'},
        ];

        private sortables = [
            {prop: 'kuran', order: 'descending'},
        ];

        private pickerOptions = {
            shortcuts: [{
                text: 'Geçen Hafta',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                }},
                {
                    text: '2 Hafta Önce',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '3 Hafta Önce',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 21);
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                text: 'Geçen Ay',
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



            /*
            for (let i = 0; i<100; i++){
                this.veri.push(
                    {
                        "İsim Soyisim": "Ali Veli ",
                        "Medrese": "Nur",
                        "Yazı": 3,
                        "Kur'an-ı Kerim": 4,
                        "Cevşen": 5,
                        "Ezber": 4,
                        "Mütalaa": 4,
                        "Kitap Okuma": 4 ,
                        "Etüt": 3 ,
                        "Soru": 2
                    }
                );

            }*/

            //this.GetDailyStudies();
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
                    filename: 'excel-list', //Optional
                    autoWidth: true, //Optional
                    bookType: 'xlsx' //Optional
                })

            });

        }

        private GetDailyStudies() {

            const startDate = moment(this.dateValue[0]).format("YYYY-DD-MM");

            const endDate = moment(this.dateValue[1]).format("YYYY-DD-MM");

            console.log(this.courseGroupId);
            console.log(this.validated);


            this.isLoading = true;
            GetDailyStudiesAsync(1,3,'2019-01-01','2019-03-30',true).then(res => {
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

            console.log('Bismillah');
            try {
                const { data: groupList } = await GetMyCoursesListAsync();

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