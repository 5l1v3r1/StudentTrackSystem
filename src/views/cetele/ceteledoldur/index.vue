<template>
  <div class="cetele-doldur" style="width: 70%; margin: auto;">
    <el-table :data="dailyStudy.studies" border fit >
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { StudyModel } from "@/models/Study";
import {GetMyCoursesList, GetTodayDailyStudy, SendDailyStudy} from "@/api/cetele";
import {CourseModel} from "@/models/CourseModel";
import {DailyStudyModel} from "@/models/dailystudy";

@Component
export default class CeteleDoldur extends Vue {
  courseList: CourseModel[] = [];

  dailyStudy: DailyStudyModel = {} as DailyStudyModel;

  mapCourseIdToCourse(id: number) {
    //  mapCourseIdToCourse(scope.row.id)
    if (this.courseList.length !== 0) {
      let found: any = this.courseList.find(c => {
        return c.id == id
      });
      return found.name;
    }
  }

  ChangedBegining(row: StudyModel){
    /*
    if (row.begining < 0)
      row.begining = 0;

    if (row.begining > row.end)
      row.begining = row.end;

    else {
      if (row.end > row.begining != 0) {
        row.amount = row.end - row.begining
      }
    }
    */
  }

  ChangedEnd(row: StudyModel) {
    /*
    console.log(event);
    if (row.end < 0)
      row.end = 0;

    if (row.end < row.begining)
      row.end = row.begining;

    else {
      if (row.end - row.begining != 0) {
        row.amount = row.end - row.amount;
      }
    }
    */
  }

  ChangedAmount(row: StudyModel) {
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
      const { data, status } = await SendDailyStudy(this.dailyStudy.id, this.dailyStudy.studies);
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
    try {
      const { data: courses } = await GetMyCoursesList();
      this.courseList = courses;

      const { data: dailyStudy } = await GetTodayDailyStudy();
      this.dailyStudy = dailyStudy;
    }
    catch (e) {
      console.log(e);
    }
  }


}
</script>

<style scoped>
.edit-input {
  
}
</style>
