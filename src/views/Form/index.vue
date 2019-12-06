<template>
  <div class="form">
    <form-demo @getFormData='getFormData'></form-demo>
    <table-data :tableData='tableData'></table-data>
  </div>
</template>

<script>
import FormDemo from './components/FormDemo'
import TableData from './components/TableData'

export default {
  components: {
    FormDemo,
    TableData
  },

  data() {
    return {
      tableData: []
    }
  },

  methods: {
    getFormData(val) {
      this.tableData.push(val)
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  width: 100%;
  min-height: 85%;
  margin: 20px 0;
  border: 1px solid rgba(173,216,230, 1);
  background-color: #fff;
  overflow: auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
</style>