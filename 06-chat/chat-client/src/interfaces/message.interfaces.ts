export interface Message {
  message: string
  author: Author
  destination: Author
  id: string
  created_at: string
}

export interface Author {
  id: string
}
