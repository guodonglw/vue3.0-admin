import { Vue, Component } from 'vue-property-decorator'

declare module 'vue/types/vue' {
  interface Vue {
    downloadLoading: Boolean,
    downloadData: any
  }
}

@Component
export default class downloadMixins extends Vue {
  downloadLoading = false
  filename = 'test'

  public handleDownload() {
    this.downloadLoading = true
    import('@/vendor/Export2Excel').then(excel => {
      const tHeader = ['id', 'name', 'sex', 'addr', 'email']
      const filterVal = ['id', 'name', 'sex', 'addr', 'email']
      const list = this.downloadData
      const data = this.formatJson(filterVal, list)
      excel.export_json_to_excel({
        header: tHeader,
        data,
        filename: this.filename,
        autoWidth: true,
        bookType: 'xlsx'
      })
      this.downloadLoading = false
    })
  }

  public formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => {
      return v[j]
    }))
  }
}