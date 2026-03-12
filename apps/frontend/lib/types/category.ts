export type Category = {
  id: number
  name: string
  description: string
  previewImgUrl: string
  creationDate: string
  updatingDate: string
  bouquetsAmount: number
}

export interface UpdateCategoryData {
  id?: number
  name?: string;
  description?: string;
  previewImgUrl?: string | File;
  updatingDate?: string
}

export interface UpdateCategoryResponse {
  message: string;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  previewImgUrl?: File | string;
}