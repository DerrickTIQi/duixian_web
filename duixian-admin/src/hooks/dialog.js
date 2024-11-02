export const useDialog = options => {
  const dialog = reactive({
    ...options,
  })

  const openDialog = (action, item) => {
    dialog[action] = {
      ...dialog[action],
      show: true,
      // isEdit: true,
      data: { ...item },
    }
  }

  return {
    dialog,
    openDialog,
  }
}
