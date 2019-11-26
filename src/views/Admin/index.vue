<template>
  <div class="admin">
    <admin-head @getHeadData='getHeadData' ref="child"></admin-head>
    <admin-content :tableData="tableData"></admin-content>
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
      pageSize: 15
    }
  },

  methods: {
    getHeadData(data = []) {
      if (!Array.isArray(data)) {
        data = [data]
      }
      if (data.length < this.pageSize) {
        this.page = 1
      }
      this.tableData = data.slice((this.page-1)*this.pageSize, this.page*this.pageSize)
      this.total = data.length
    },

    getFootData(page, pageSize) {
      this.page = page
      this.pageSize = pageSize
      this.$refs.child.getAdmin()
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