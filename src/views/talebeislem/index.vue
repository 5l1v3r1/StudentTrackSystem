<template>
  <div class="app-container">

    <el-button
            size="medium"
            type="primary"
            style="float:right;">Talebe Ekle</el-button>

    <el-table
            :data="filterTable"
            style="width: 100%">
      <el-table-column
              label="İsim"
              sortable
              prop="first_name"
              width="180">
      </el-table-column>

      <el-table-column
              label="Soyisim"
              sortable
              prop="last_name"
              width="180">
      </el-table-column>

      <el-table-column >

        <template slot="header" slot-scope="scope">
          <el-input
                  placeholder="Ara"
                  prefix-icon="el-icon-search"
                  v-model="search">
          </el-input>

        </template>

        <template slot-scope="scope">

          <router-link :to="{name: 'CeteleIslem', params: {id: scope.row.id, name: scope.row.first_name + '-' + scope.row.last_name} }" >
            <el-button
                    size="mini"
                    class="filter-item"
                    @click="handleCeteleIslem(scope.$index, scope.row)">Çetele İşlemleri</el-button>
          </router-link>

          <router-link :to="{name: 'KurIslem', params: {id: scope.row.id, name: scope.row.first_name + '-' + scope.row.last_name} }" >
            <el-button
                    size="mini"
                    class="filter-item"
                    @click="handleKurIslem(scope.$index, scope.row)">Kur İşlemleri</el-button>

          </router-link>

          <router-link :to="{name: 'ProfilIslem', params: {id: scope.row.id, name: scope.row.first_name + '-' + scope.row.last_name} }" >
            <el-button
                    size="mini"
                    class="filter-item"
                    @click="handleProfilIslem(scope.$index, scope.row)">Profil İşlemleri</el-button>
          </router-link>
        </template>
      </el-table-column>

    </el-table>



  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {GetMyClassroomAsync} from "@/api/classroom";
import {AdminGetUsersByClassroomIdAsync} from "@/api/user";
import {Classroom} from "@/models/Classroom";
import {User} from "@/models/User";

@Component
export default class TalebeIslem extends Vue {

  private search = '';

  private userList: User[] = [];

  get filterTable() {
    return this.userList.filter(data => !this.search || data.first_name.toLowerCase().includes(this.search.toLowerCase()))
  }


  handleCeteleIslem(index, row) {
    console.log(index, row);
  }

  handleKurIslem(index, row) {
    console.log(index, row);
  }

  handleProfilIslem(index, row) {
    console.warn(index, row);
  }

  async created() {
    try {
      const { data: classroomList } = await GetMyClassroomAsync();

      let classroom: Classroom
      for (classroom of classroomList) {
        const { data } = await AdminGetUsersByClassroomIdAsync(classroom.id);

        this.userList = this.userList.concat(data);
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

<style scoped>
  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
  }
</style>
