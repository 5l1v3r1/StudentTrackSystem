<template>
    <el-table
            :data="levelList"
            @row-click="kuraGit"
            style="width: 100%">
        <el-table-column
                prop="level"
                label="Seviye"
                :formatter="kurFormatter"
        >
        </el-table-column>

    </el-table>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {GetLevelsAsync} from "@/api/syllabus";

    @Component
    export default class Syllabus extends Vue {

        @Prop(String) readonly userId !: string;
        @Prop(String) readonly userName !: string;

        private levelList = [];

        private kuraGit(row) {
            //console.log(row.level)

            this.$router.push({
                name: 'KurCoursesList',
                params: {
                    kurNo: row.level.toString(),
                    userName: this.userName,
                    userId: this.userId
                }
            })

        }

        private kurFormatter(row) {
            return `Level ${row.level}`;
        }

        async created() {
            try {
                const { data } = await GetLevelsAsync();
                this.levelList = data;
            }
            catch (e) {
                console.log("levels " + e);
            }
        }

    }
</script>


<style>

</style>
