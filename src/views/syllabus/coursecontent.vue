<template>
    <div >
        <el-row type="flex" justify="center">
            <el-col align="center" :xs="24" :sm="12" :md="12" :lg="12">
                <el-table
                        :data="contentList"
                        ref="multipleTable"
                        @select="handleSelection"
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            property="name"
                            label="Content">
                    </el-table-column>

                    <el-table-column label="Status">
                        <template slot-scope="scope">
                            <el-tag
                                    :type="scope.row.isValidated === true ? 'success' : 'warning'">
                                {{tagStatus(scope.row)}}
                            </el-tag>
                        </template>
                    </el-table-column>

                </el-table>
            </el-col>
        </el-row>


        <el-row>
            <el-col align="center" style="margin-top: 20px;" >
                <el-button type="primary" @click="SendContents()">Save</el-button>
            </el-col>
        </el-row>
    </div>

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {LevelCourse} from "../../models/LevelCourse";
    import {Content} from "@/models/Content";
    import {
        AdminCreateUserSyllabus, AdminDeleteUserSyllabusObjectById,
        AdminGetUserSyllabusAsync,
        AdminValidateUserSyllabusObjectById,
        GetContentsBySyllabusId
    } from "@/api/syllabus";
    import {ElTable} from "element-ui/types/table";
    import {UserSyllabus} from "@/models/UserSyllabus";
    import vm from "@/main";

    @Component
    export default class CourseContent extends Vue {
        @Prop(String) readonly userId !: string;
        @Prop(String) readonly userName !: string;
        @Prop(String) readonly courseId !: string;

        private contentList: Array<Content> = [];
        private selectedContentList: Array<Content> = [];
        private completedList: Array<UserSyllabus> = [];

        private componentKey: number = 1;

        private updated = true;


        private tagStatus(row: Content) {
            if (row.isValidated === true)
                return 'Approved';
            else {
                if (row.isChecked)
                    return 'Waiting For Approval';
                return 'Uncompleted.';
            }
        }

        private toggleSelection(rows) {
            rows.forEach(row => {
                (<ElTable> this.$refs.multipleTable).toggleRowSelection(row, true);
            });
        }

        private handleSelection(selection) {
            console.log("handle")
            this.selectedContentList = selection;
        }

        private handleRowClick(row, col, evt) {
            (<ElTable> this.$refs.multipleTable).toggleRowSelection(row);
        }

        private compareContentArrays() {
            const finalArray: Array<Content> = [];
            //setTimeout(() => ( console.log("wait") ), 1000);
            this.completedList.forEach(completedContent => this.contentList.forEach(content => {
                if (completedContent.content === content.id) {
                    finalArray.push(content);

                    content.isValidated = completedContent.is_validated === true;
                    content.isChecked = true;
                    content.syllabusId = completedContent.id;
                    content.waitForValidate = content.isChecked && !content.isValidated;
                }
            }));

            this.toggleSelection(finalArray);
        }

        private async SendContents() {

            this.contentList.forEach( async (content: Content, index) => {

                const isChecked = this.selectedContentList.find((c: Content) => {
                    return c.id == content.id
                });

                if (isChecked) {
                    if (content.isValidated === false) {

                        // daha önceden göndermedi.
                        if (content.waitForValidate === false) {

                            let contentInfo = {
                                content: content.id
                            };

                            if (this.userId === undefined) {

                            }
                            else {
                                contentInfo["user"] = this.userId;
                                const { data: usm } = await AdminCreateUserSyllabus(contentInfo);

                                const { data } = await AdminValidateUserSyllabusObjectById(usm.id, contentInfo);

                                this.contentList[index].isValidated = true;
                            }

                        }

                    }
                }
                else {
                    if (content.isValidated === true) {
                        if (this.userId !== undefined){

                            if (content.syllabusId !== undefined) {
                                await AdminDeleteUserSyllabusObjectById(content.syllabusId);
                                this.contentList[index].isValidated = true;
                            }

                        }
                    }
                }
            });


            this.$message({
                message: 'Saved successfully!',
                type: 'success',
                duration: 1000,
            });




        }


        async created() {

            try {
                const { data } = await GetContentsBySyllabusId(this.courseId);

                this.contentList = data;

                this.contentList.forEach(cl => {
                    cl.waitForValidate = false;
                    cl.isValidated = false;
                    cl.isChecked = false;
                });

                if (this.userId === undefined){

                }
                else { // talebe işlemlerinden geldi.

                    const { data } = await AdminGetUserSyllabusAsync(
                        {user: this.userId, content__syllabus: this.courseId }
                    );
                    this.completedList = data;

                    console.log(this.completedList);

                    this.compareContentArrays();
                }
            }
            catch (e) {
                console.error("coursecontent " + e);
            }
        }


    }
</script>

<style scoped>

</style>
