export interface Article {
  source: {
    id: string
    name: string
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: Date
  content: string
}

export interface Post extends PostBody {
  _id: string
  _createdAt: string
  _updatedAt: string
  _rev: string
  _type: 'post'
}

export type PostBody = {
  text: string
  username: string
  profileImg: string
  image?: string
}

export type CommentBody = {
  comment: string
  username: string
  profileImg: string
  postId: string
}

export interface Comment extends CommentBody {
  _id: string
  _createdAt: string
  _updatedAt: string
  _rev: string
  _type: 'comment'
  post: {
    _type: 'reference'
    _ref: string
  }
}
