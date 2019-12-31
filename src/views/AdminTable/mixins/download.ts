import { Vue, Component } from 'vue-property-decorator'

declare module 'vue/types/vue' {
  interface Vue {
    downloadLoading: Boolean,
    downloadLoading1: Boolean,
    downloadData: any
  }
}

@Component
export default class downloadMixins extends Vue {
  downloadLoading = false
  downloadLoading1 = false
  filename = 'test'

  public handleDownloadExcel() {
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

  public handleDownloadZip() {
    this.downloadLoading1 = true
    import('@/vendor/Export2Zip').then(zip => {
      const tHeader = ['id', 'name', 'sex', 'addr', 'email']
      const filterVal = ['id', 'name', 'sex', 'addr', 'email']
      const list = this.downloadData
      const data = this.formatJson(filterVal, list)
      zip.export_txt_to_zip(tHeader, data, this.filename, this.filename)
      this.downloadLoading1 = false
    })
  }

  public formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => {
      return v[j]
    }))
  }
}