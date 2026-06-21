export interface Product {
  $id: string
  name: string
  slug: string
  description: string
  price: number
  brand_code: 'triu' | 'saltedhash'
  status: 'active' | 'inactive'
  imageFileId?: string
  category?: string
  tags?: string[]
  $createdAt: string
}

export interface ContactLead {
  name: string
  email: string
  phone?: string
  message: string
  source: string
}

export interface StudioService {
  id: number
  title: string
  desc: string
  category: string
}
