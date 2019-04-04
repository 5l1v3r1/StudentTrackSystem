<template>
  <div v-if="!item.meta || !item.meta.hidden" :class="['menu-wrapper', collapse ? 'simple-mode' : 'full-mode', {'first-level': !isNest}]">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.meta.noShowingChildren)">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown': !isNest}">
          <svg-icon v-if="onlyOneChild.meta && onlyOneChild.meta.icon" :name="onlyOneChild.meta.icon" />
          <svg-icon v-else-if="item.meta && item.meta.icon" :name="item.meta.icon" />
          <span v-if="onlyOneChild.meta && onlyOneChild.meta.title" slot="title">{{onlyOneChild.meta.title}}</span>
          <span v-else-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span>
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <svg-icon v-if="item.meta && item.meta.icon" :name="item.meta.icon" />
        <span v-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :is-nest="true"
        :item="child"
        :key="child.path"
        :base-path="resolvePath(child.path)"
        :collapse="collapse"
        class="nest-menu"/>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from 'path';
import { Route } from 'vue-router';
import { Component, Vue, Prop } from 'vue-property-decorator';
import AppLink from './Link.vue';

@Component({
  // Set 'name' here to prevent uglifyjs from causing recursive component not work
  // See https://medium.com/haiiro-io/element-component-name-with-vue-class-component-f3b435656561 for detail
  name: 'SidebarItem',
  components: {
    AppLink,
  },
})
export default class SidebarItem extends Vue {
  @Prop({ required: true }) private item!: Route;
  @Prop({ default: false }) private isNest!: boolean;
  @Prop({ default: false }) private collapse!: boolean;
  @Prop({ default: '' }) private basePath!: string;

  private onlyOneChild: Route | null = null;

  private hasOneShowingChild(children: Route[], parent: Route) {
    let showingChildren: Route[] = [];

    if (children) {
      showingChildren = children.filter((item: Route) => {
        if (item.meta && item.meta.hidden) {
          return false;
        } else {
          this.onlyOneChild = item;
          return true;
        }
      });
    }

    if (showingChildren.length === 1) {
      return true;
    } else if (showingChildren.length === 0) {
      this.onlyOneChild = { ...parent, path: '', meta: { noShowingChildren: true } };
      return true;
    }

    this.onlyOneChild = null;
    return false;
  }

  private resolvePath(routePath: string) {
    return path.resolve(this.basePath, routePath);
  }
}
</script>

<style lang="scss">

</style>
