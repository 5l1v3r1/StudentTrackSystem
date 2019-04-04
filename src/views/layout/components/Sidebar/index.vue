<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      mode="vertical"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" :collapse="collapse"/>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { AppModule } from '@/store/app.module';
import SidebarItem from './SidebarItem.vue';
import { PermissionModule } from '@/store/permission.module';

@Component({
  components: {
    SidebarItem,
  },
})

export default class SideBar extends Vue {
  @Prop({ default: false }) private collapse!: boolean;

  get sidebar() {
    return AppModule.sidebar;
  }

  get routes() {
    //console.log((this.$router as any).options.routes)
    return PermissionModule.routers
    //return (this.$router as any).options.routes;
  }

  get isCollapse() {
    return !this.sidebar.opened;
  }
}
</script>
