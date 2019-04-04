<template>
  <div class="app-container">
  <div class="cetele-doldur" style="width: 70%; margin: auto;">
    <el-table v-loading="tableLoading" :data="dailyStudy.studies" border fit >
      <el-table-column align="center" label="Ders Adı" min-width="180px">
        <template slot-scope="scope">
          <span>{{mapCourseIdToCourse(scope.row.course)}}</span>
        </template>
      </el-table-column>

      <el-table-column label="Sayfa Aralığı" align="center">
        <el-table-column align="center" label="Başlangıç"  width="120">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.begining" @input="ChangedAmount(scope.row)" class="edit-input" size="medium"/>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Bitiş" width="120">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.end" @input="ChangedAmount(scope.row)" class="edit-input" size="medium"/>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column align="center" label="Miktar" width="120">
        <template slot-scope="scope">
          <el-input v-model.number="scope.row.amount" @input="ChangedAmount(scope.row)" class="edit-input" size="medium"/>
        </template>
      </el-table-column>
    </el-table>

    <el-row>
      <el-button style="margin-top: 30px;" size="medium" @click="SendCetele()" type="primary">Kaydet</el-button>
    </el-row>

  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { GetTodayDailyStudyAsync, SendDailyStudyAsync } from "@/api/daily-study";
import {CourseModel} from "@/models/CourseModel";
import {DailyStudy} from "@/models/dailystudy";
import {GetMyCoursesListAsync} from "@/api/course-group";
import {Course} from "@/models/Course";
import {Study} from "@/models/Study";

@Component
export default class CeteleDoldur extends Vue {
  courseList: Course[] = [];

  dailyStudy: DailyStudy = {} as DailyStudy;

  tableLoading: boolean = true;

  mapCourseIdToCourse(id: number) {
    //  mapCourseIdToCourse(scope.row.id)
    if (this.courseList.length !== 0) {
      let found: any = this.courseList.find(c => {
        return c.id == id
      });
      return found.name;
    }
  }


  ChangedAmount(row: Study) {
    if (row.begining != row.end){
      if (row.begining > row.end) {
        row.amount = row.end - row.begining;
      }
      else {
        row.amount = row.end - row.begining + 1;
      }
    }
    else {
      if (row.amount < 0)
        row.amount = 0;
    }
  }


  async SendCetele() {
    try {
      const { data, status } = await SendDailyStudyAsync(this.dailyStudy.id, this.dailyStudy.studies);
      console.log(status);
      if (status == 200) {
        this.$message({
          message: 'Çeteleniz başarıyla kaydedildi.',
          type: 'success',
          duration: 2000,
        });
      }
      console.log(data);
    }
    catch (e) {
      console.log(e);
    }
  }

  async created() {
    this.tableLoading = true;
    try {
      const { data: courses } = await GetMyCoursesListAsync();
      this.courseList = courses as Course[];

      const { data: dailyStudy } = await GetTodayDailyStudyAsync();
      this.dailyStudy = dailyStudy as DailyStudy;
    }
    catch (e) {
      console.log(e);
    }
    finally {
      this.tableLoading = false;
    }
  }


}
</script>

<style scoped>
.edit-input {
  
}
</style>
