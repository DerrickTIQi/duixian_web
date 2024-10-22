import { ElMessage, ElMessageBox } from 'element-plus'

export const usePage = (fetch, options) => {
  options = {
    type: 'page', // 类型（page：页面，dialog：弹窗）
    autoRun: true,
    ...options,
  }

  const { dialog, openDialog } = useDialog({
    edit: { show: false },
    // productAttribute: { show: false ,data: []},
    detail: { show: false },
    // addPro: { show: false ,data: []},
    // showPro: { show: false ,data: []},
    // editPro: { show: false ,data: []},
  })

  const pageData = reactive({
    total: 0, // 总条数
    page: Number(options.page) || 1, // 当前页数
    pageSize: Number(options.pageSize) || 20, // 每页条数

    loading: false,
    list: [],

    query: { ...options.query },
  })

  const pageActions = {
    openDialog,

    initData() {
      pageData.loading = true

      return fetch().finally(() => {
        pageData.loading = false
      })
    },

    // 分页切换
    handlePageChange(page) {
      pageData.page = page

      if (pageActions.beforeQuery) pageActions.beforeQuery()

      pageActions.refresh(true)
    },

    // 条数切换
    handleSizeChange(pageSize) {
      pageData.page = 1
      pageData.pageSize = pageSize

      if (pageActions.beforeQuery) pageActions.beforeQuery()

      pageActions.refresh(true)
    },

    // 搜索
    handleSearch() {
      pageData.page = 1
      pageData.total = 0

      if (pageActions.beforeQuery) pageActions.beforeQuery()

      pageActions.refresh(true)
    },

    // 刷新
    refresh(loading) {
      if (loading === true) {
        pageActions.initData()
      } else {
        fetch()
      }
    },

    // 删除
    handleDelete(item) {
      ElMessageBox.confirm('确认删除?', '提示', {
        type: 'warning',
      }).then(() => {
        http({
          method: 'delete',
          url: '/user/delete_agent/',
          data: {
            agent_id: item[pageData.key || 'id'],
          },
        }).then(() => {
          ElMessage.success('删除成功')
        })
      })
    },

    // 重置
    handleReset() {
      pageData.query = { ...options.query }
      pageActions.handleSearch()
    },

    // 新增
    handleAdd(data) {
      dialog.edit.isEdit = false;
      openDialog('edit', { ...data })
    },

    // 编辑
    handleEdit(item) {
       dialog.edit.isEdit = true;
      openDialog('edit', { ...item })
    },

    // handleDialog(row) {
    //   dialog.productAttribute.data = row.attr_list
    //   dialog.productAttribute.id = row.id
    //   dialog.productAttribute.show = true
    // },
    // handleAddPro(row) {
    //   dialog.addPro.data = row
    //   dialog.addPro.show = true
    // },
    // handleShowPro(row) {
    //   dialog.showPro.data = row
    //   dialog.showPro.show = true
    // },
    // handleEditPro(row) {
    //   dialog.editPro.data = row
    //   dialog.editPro.show = true
    // },

    // 详情
    handleView(item) {
      openDialog('detail', { ...item })
    },

    formatter(row, column, cellValue, index) {
      return cellValue || '—'
    },
  }

  if (options.autoRun) {
    onMounted(() => {
      pageActions.initData()
    })
  }

  return {
    dialog,
    pageData,
    pageActions,
  }
}
