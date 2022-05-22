import { useState } from 'react'
import { Post } from '../typings'
import { fetchPosts } from '../util/fetchPosts'
import PostCmp from './Post'
import PostBox from './PostBox'

interface Props {
  posts: Post[]
}

function Feed({ posts: postsProp }: Props) {
  const [posts, setPosts] = useState<Post[]>(postsProp)

  const handleRefresh = async () => {
    const newPosts = await fetchPosts()
    setPosts(newPosts)
  }

  return (
    <div className="col-span-7 mt-8 mb-5 md:mt-0 md:ml-5 lg:col-span-5">
      {/* PostBox */}
      <div>
        <PostBox refetchPosts={handleRefresh} />
      </div>

      <div className="mt-6 space-y-3">
        {posts.map((post) => (
          <PostCmp key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Feed
