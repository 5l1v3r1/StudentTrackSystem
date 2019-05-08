<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />

    <div class="avatar-container">
      <el-button size="medium" type="danger" @click="logout()" >Logout</el-button>
    </div>

  </div>
</template>

<script lang="ts">
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import Hamburger from '@/components/Hamburger/index.vue';
import { Component, Vue } from 'vue-property-decorator';
import { AppModule } from '@/store/app.module';
import {AuthModule} from "@/store/auth.module";
import {PermissionModule} from "@/store/permission.module";

@Component({
  components: {
    Breadcrumb,
    Hamburger,
  },
})
export default class Navbar extends Vue {
  get sidebar() {
    return AppModule.sidebar;
  }

  private toggleSideBar() {
    AppModule.ToggleSideBar(false);
  }

  private logout() {
    AuthModule.LogOut().then(() => {
      //PermissionModule.RemoveRouters();
      location.reload();
    });
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
}
.avatar-container {
  height: 50px;
  display: inline-block;
  position: absolute;
  right: 25px;
  cursor: pointer;

}


</style>

