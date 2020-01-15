<template>
  <div class="admin">
    <admin-head @getHeadData='getHeadData' ref="child" :page='page'></admin-head>
    <admin-content :tableData="tableData" :listLoading="listLoading" @contentFlush='contentFlush'></admin-content>
    <admin-foot :total="total" @getFootData='getFootData'></admin-foot>
    <div class="block"></div>
  </div>
</template>

<script>
import AdminHead from './components/AdminHead'
import AdminContent from './components/AdminContent'
import AdminFoot from './components/AdminFoot'

export default {
  components: {
    AdminHead,
    AdminContent,
    AdminFoot
  },

  data() {
    return {
      tableData: [],
      total: 0,
      page: 1,
      listLoading: true,
    }
  },

  methods: {
    // 接收从Head传来的数据（所有交互的数据都会传回父级，在由父级下发）
    getHeadData(data, listLoading = false) {
      let result = data.result
      this.tableData = result.admins
      this.total = result.total
      this.listLoading = false

      if (this.total < 15) {
        this.page = 1
      }
    },

    // 调用Head的方法，刷新content数据
    contentFlush() {
      this.$nextTick(() => {
        this.$refs.child.getAdmin()
      })
    },

    // 接收从Foot传来的数据
    getFootData(page, pageSize) {
      this.page = page
      this.$nextTick(() => {
        this.$refs.child.getAdmin()
      })
    }
  },
}
</script>

<style lang="less" scoped>
.admin {
  width: 100%;
  margin: 10px 0;
  // border: 2px solid blue;
  // height: 95%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}

.block{
  flex: 0 0 100px
}
</style>