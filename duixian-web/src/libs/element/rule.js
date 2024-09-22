export const mumeric = [{ pattern: /^\d+$/, message: '请输入数字', trigger: 'blur' }]

// 请输入
export const required = [{ required: true, message: '请输入', trigger: 'blur' }]

// 只能输入中文
export const chinese = [{ pattern: /^[\u4e00-\u9fa5]+$/, message: '只能输入中文', trigger: 'blur' }]

// 只能输入0-100的百分比
export const percent = [
  { pattern: /^\d+$/, message: '请输入数字', trigger: 'blur' },
  { pattern: /^(0|[1-9]\d*)(\.\d+)?$/, message: '请输入0-100的数', trigger: 'blur' },
]
