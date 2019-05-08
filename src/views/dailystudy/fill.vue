<template>
    <div class="app-container">
        <div class="cetele-doldur" style="width: 70%; margin: auto;">
            <el-table :data="dailyStudy.studies" border fit v-loading="tableLoading">
                <el-table-column align="center" label="Ders Adı" min-width="180px">
                    <template slot-scope="scope">
                        <span>{{mapCourseIdToCourse(scope.row.course)}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="Sayfa Aralığı">
                    <el-table-column align="center" label="Başlangıç" width="120">
                        <template slot-scope="scope">
                            <el-input @input="ChangedAmount(scope.row)" class="edit-input" size="medium" type="number"
                                      v-model="scope.row.begining"/>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="Bitiş" width="120">
                        <template slot-scope="scope">
                            <el-input @input="ChangedAmount(scope.row)" class="edit-input" size="medium" type="number"
                                      v-model="scope.row.end"/>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column align="center" label="Miktar" width="120">
                    <template slot-scope="scope">
                        <el-input @input="ChangedAmount(scope.row)" class="edit-input" size="medium" type="number"
                                  v-model="scope.row.amount"/>
                    </template>
                </el-table-column>
            </el-table>

            <el-row align="center">
                <el-col align="center">
                    <el-button @click="SendCetele()" size="medium" style="margin-top: 20px;" type="primary">Kaydet
                    </el-button>
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    import {
        AdminGetDailyStudyByIdAsync,
        AdminGetTodayDailyStudy,
        AdminSendDailyStudy,
        GetTodayDailyStudyAsync,
        SendDailyStudyAsync
    } from "@/api/daily-study";
    import {CourseModel} from "@/models/CourseModel";
    import {DailyStudy} from "@/models/dailystudy";
    import {GetCoursesByGroupId, GetMyCoursesListAsync} from "@/api/course-group";
    import {Course} from "@/models/Course";
    import {Study} from "@/models/Study";
    import {AdminGetAccountByUserIdAsync} from "@/api/user";

    @Component
    export default class FillDailyStudy extends Vue {
        courseList: Course[] = [];

        dailyStudy: DailyStudy = {} as DailyStudy;

        tableLoading: boolean = true;

        @Prop() private userId!: number;
        @Prop() private userName!: string;
        @Prop() private dailyStudyId !: string;

        mapCourseIdToCourse(id: number) {
            if (this.courseList.length !== 0) {
                let found: any = this.courseList.find(c => {
                    return c.id == id
                });
                return found.name;
            }
        }


        ChangedAmount(row: Study) {

            if (isNaN(row.amount) && isNaN(parseFloat(row.amount.toString())) === null) {
                row.amount = 0;
                return;
            }

            if (row.begining != row.end) {
                if (row.begining > row.end) {
                    row.amount = row.end - row.begining;
                } else {
                    row.amount = row.end - row.begining + 1;
                }
            } else {
                if (row.amount < 0)
                    row.amount = 0;
                else
                    console.log(+row.amount)
            }
        }


        async SendCetele() {
            try {

                let statusVal: number = 0;

                if (this.userId === undefined) {
                    const {status} = await SendDailyStudyAsync(this.dailyStudy.id, this.dailyStudy.studies);
                    statusVal = status;
                } else {
                    const {status} = await AdminSendDailyStudy(this.dailyStudy.id, this.dailyStudy.studies, this.userId);
                    statusVal = status;
                }

                console.log(statusVal);

                if (statusVal == 200) {
                    this.$message({
                        message: 'Saved successfully!',
                        type: 'success',
                        duration: 2000,
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }

        async created() {
            this.tableLoading = true;

            try {
                if (this.userId === undefined) {
                    const {data: courses} = await GetMyCoursesListAsync();
                    this.courseList = courses as Course[];

                    const {data: dailyStudy} = await GetTodayDailyStudyAsync();
                    this.dailyStudy = dailyStudy as DailyStudy;
                } else { // talebe-işlemlerinden gelmiş.
                    //  group id alıp, coursegroup service'i o id üzerinden çalıştırmak için.
                    const {data: user} = await AdminGetAccountByUserIdAsync(this.userId);
                    this.courseList = await GetCoursesByGroupId(user.course_group);

                    if (this.dailyStudyId === undefined){ // o günün çetelesini dolduracak.
                        const { data } = await AdminGetTodayDailyStudy(user.id);
                        this.dailyStudy = data;
                    }
                    else { // özel bir günün çetelesini dolduracak.
                        const { data } = await AdminGetDailyStudyByIdAsync(+this.dailyStudyId);
                        this.dailyStudy = data;
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                this.tableLoading = false;
            }
        }


    }
</script>

<style scoped>
    .edit-input {

    }
</style>
