<template>
  <span v-if="item.items" class="navlist">
    <template v-if="item.items.length == 0">
        <el-menu-item :index="'/'+item['menu_route']+''">
          <!-- <i class="el-icon-menu"></i> -->
          {{item.menu_name}}
        </el-menu-item>
    </template>

    <el-submenu v-else :index="'/'+item['menu_route']+''">
      <template slot="title" >
        <!-- <i class="el-icon-menu"></i> -->
        {{item.menu_name}}
      </template>

      <template v-for="(child,key) in item.items">
        <sidebar-item
          v-if="child.items&&child.items.length!==0"
          :item="child"
          :key="key"/>
        <el-menu-item v-else :key="child.menu_route" :index="'/'+child['menu_route']+''">
          <!-- <i class="el-icon-location"></i> -->
          {{child.menu_name}}
        </el-menu-item>
      </template>
    </el-submenu>
  </span>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.navlist{
     font-size: 12px;
    display: inline-block;
    height: 50px;
    // width: 135px;
    .el-menu-item{
    display: inline-block;
    height: 50px;
    // width: 120px;    
    }
}
</style>