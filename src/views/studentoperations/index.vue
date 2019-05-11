<template>
    <div class="app-container">

        <el-row type="flex" justify="center">
            <el-col align="center" :xs="24" :sm="24" :md="24" :lg="16">
                <el-table
                        :data="filterTable"
                        >
                    <el-table-column
                            label="Name"
                            sortable
                            prop="first_name"
                            width="120">
                    </el-table-column>

                    <el-table-column
                            label="Surname"
                            sortable
                            prop="last_name"
                            width="120">
                    </el-table-column>

                    <el-table-column align="center">

                        <template slot="header" slot-scope="scope">
                            <el-input
                                    placeholder="Search"
                                    prefix-icon="el-icon-search"
                                    v-model="search">
                            </el-input>
                        </template>

                        <!-- @click="handleEdit(scope.$index, scope.row)" -->
                        <template slot-scope="scope"   >

                            <router-link :to="{name: 'FillDailyStudyWithParams',
                           params: { userName: scope.row.first_name + '-' + scope.row.last_name,
                                     userId: scope.row.id.toString()}}" >
                                <el-button style="margin-right: 5px"
                                        size="mini">Fill Daily Study</el-button>
                            </router-link>

                            <router-link :to="{name: 'DailyStudyDates',
                          params: { userName: scope.row.first_name + '-' + scope.row.last_name,
                                     userId: scope.row.id.toString()}}" >
                                <el-button style="margin-right: 5px"
                                        size="mini">List Daily Studies</el-button>
                            </router-link>

                            <router-link :to="{name: 'SyllabusList',
                          params: { userName: scope.row.first_name + '-' + scope.row.last_name,
                                     userId: scope.row.id.toString()}}" >
                                <el-button
                                        size="mini">Syllabus Operations</el-button>
                            </router-link>

                        </template>

                    </el-table-column>

                </el-table>
            </el-col>
        </el-row>

    </div>
</template>


<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import {GetMyClassroomAsync} from "@/api/classroom";
    import {AdminGetUsersByClassroomIdAsync} from "@/api/user";
    import {Classroom} from "@/models/Classroom";
    import {User} from "@/models/User";

    @Component
    export default class StudentOperations extends Vue {

        private search = '';

        private userList: User[] = [];

        get filterTable() {
            return this.userList.filter(data => !this.search || data.first_name.toLowerCase().includes(this.search.toLowerCase()))
        }

        async created() {
            try {
                const { data: classroomList } = await GetMyClassroomAsync();

                let classroom: Classroom;
                for (classroom of classroomList) {
                    const { data } = await AdminGetUsersByClassroomIdAsync(classroom.id);

                    this.userList = this.userList.concat(data);

                    this.userList.shift();

                }

            }
            catch (e) {
                console.log(e);
            }
        }

    }

</script>


<style>
    .el-input__prefix {
        left: 10px;
    }

</style>

<style lang="scss" scoped>
    .el-button--mini {
        width: 140px;
    }
</style>
