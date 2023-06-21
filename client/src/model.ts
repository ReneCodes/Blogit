export interface BlogInterface {
  _id: string,
  title: string,
  content: string, 
  image: string, 
  category: string,
  author: User,
  createdAt: number | string,
}

type User = {
  username: string,
  email: string,
  password: string,
  image: string
}