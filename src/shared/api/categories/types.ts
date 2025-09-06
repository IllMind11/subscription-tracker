export interface ICategory {
  id: number
  name: string
  is_global: boolean
}

export interface ICreateCategoryPayload {
  name: string
}

export interface IUpdateCategoryPayload {
  id: number
  name: string
}
