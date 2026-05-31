// 通用类型定义

// 通用ID类型
export type ID = string

// 时间戳类型
export type Timestamp = string

// 可选字段类型
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// 深度Partial类型
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// 提取对象值类型
export type ValueOf<T> = T[keyof T]

// 条件类型
export type If<C, T, F> = C extends true ? T : F

// 联合类型转交叉类型
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never

// 前缀类型
export type Prefixed<T, P extends string> = {
  [K in keyof T as `${P}${Capitalize<string & K>}`]: T[K]
}

// 事件处理器类型
export type EventHandler<T = void> = (event: T) => void

// 异步函数类型
export type AsyncFunction<T = void> = () => Promise<T>

// 组件大小
export type ComponentSize = 'small' | 'medium' | 'large'

// 组件状态
export type ComponentState = 'default' | 'hover' | 'active' | 'disabled' | 'loading'

// 主题模式
export type ThemeMode = 'light' | 'dark' | 'system'

// 语言
export type Locale = 'zh-CN' | 'zh-TW' | 'en' | 'ja'

// 断点
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// 对齐方式
export type Alignment = 'left' | 'center' | 'right'

// 方向
export type Direction = 'horizontal' | 'vertical'

// 位置
export type Position = 'top' | 'right' | 'bottom' | 'left'

// 边框样式
export type BorderStyle = 'solid' | 'dashed' | 'dotted' | 'none'

// 光标类型
export type CursorType = 'default' | 'pointer' | 'text' | 'move' | 'not-allowed' | 'grab' | 'grabbing'

// 拖拽状态
export interface DragState {
  isDragging: boolean
  dragElement: HTMLElement | null
  dragData: any
  dropTarget: HTMLElement | null
}

// 模态框状态
export interface ModalState {
  visible: boolean
  title: string
  content?: string
  onConfirm?: () => void
  onCancel?: () => void
}

// Toast消息类型
export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  content: string
  duration?: number
}

// 文件上传状态
export interface UploadState {
  file: File
  progress: number
  status: 'uploading' | 'success' | 'error'
  url?: string
  error?: string
}

// 搜索结果
export interface SearchResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// 树形节点
export interface TreeNode<T = any> {
  id: string
  label: string
  children?: TreeNode<T>[]
  data?: T
  expanded?: boolean
  selected?: boolean
  disabled?: boolean
}

// 表格列定义
export interface TableColumn<T = any> {
  key: string
  title: string
  width?: number | string
  minWidth?: number
  maxWidth?: number
  sortable?: boolean
  fixed?: 'left' | 'right'
  align?: Alignment
  render?: (value: any, row: T, index: number) => string
}

// 表格分页
export interface TablePagination {
  page: number
  pageSize: number
  total: number
  pageSizeOptions?: number[]
}

// 图标类型
export type IconName =
  | 'home'
  | 'user'
  | 'settings'
  | 'edit'
  | 'delete'
  | 'add'
  | 'remove'
  | 'search'
  | 'filter'
  | 'sort'
  | 'download'
  | 'upload'
  | 'share'
  | 'copy'
  | 'check'
  | 'close'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'arrow-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'chevron-down'
  | 'menu'
  | 'more'
  | 'refresh'
  | 'loading'
  | 'star'
  | 'heart'
  | 'bookmark'
  | 'calendar'
  | 'clock'
  | 'mail'
  | 'phone'
  | 'location'
  | 'link'
  | 'image'
  | 'file'
  | 'folder'
  | 'save'
  | 'print'
  | 'eye'
  | 'eye-off'
  | 'lock'
  | 'unlock'
  | 'logout'
  | 'login'
  | 'info'
  | 'warning'
  | 'error'
  | 'success'
