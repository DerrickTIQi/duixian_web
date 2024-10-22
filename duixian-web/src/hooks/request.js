export const useRequest = (fn, autoExec = true) => {
  const state = reactive({ loading: false })

  const request = (loading = true) => {
    if (loading) state.loading = true

    return fn().finally(() => {
      state.loading = false
    })
  }

  if (autoExec) request()

  return { ...toRefs(state), request }
}
