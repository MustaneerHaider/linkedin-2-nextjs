import { Post } from '../typings'

export const fetchPosts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getPosts`
  )
  const data = await response.json()

  const posts: Post[] = data.posts
  return posts
}
