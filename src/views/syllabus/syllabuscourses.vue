<template>
    <el-row type="flex" justify="center">
        <el-col align="center" :xs="24" :sm="12" :md="12" :lg="12">
    <el-table
            :data="courseList"
            @row-click="ContentsGit"
            style="width: 100%">
        <el-table-column
                prop="course"
                label="Course">
        </el-table-column>

    </el-table>
        </el-col>
    </el-row>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {GetCoursesByLevelAsync} from "@/api/syllabus";
    import {Course} from "@/models/Course";
    import {LevelCourse} from "@/models/LevelCourse";

    @Component
    export default class SyllabusCourses extends Vue {

        @Prop(String) readonly userId !: string;
        @Prop(String) readonly userName !: string;
        @Prop(String) readonly kurNo !: string;

        private courseList: Array<LevelCourse> = [];

        private ContentsGit(row) {
            this.$router.push({
                name: 'CourseContentList',
                params: {
                    courseName: row.course,
                    userName: this.userName,
                    userId: this.userId,
                },
                query: {
                    courseId: row.id.toString()
                }
            })
        }

        async created() {
            try {
                const { data } = await GetCoursesByLevelAsync(this.kurNo);
                console.log(data);
                this.courseList = data;
            }
            catch (e) {
                console.error("SyllabusCourses " + e);
            }
        }

    }
</script>

<style scoped>

</style>
