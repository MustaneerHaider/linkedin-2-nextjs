import { Comment, CommentBody, Post } from '../typings'
import TimeAgo from 'react-timeago'
import {
  DotsHorizontalIcon,
  ThumbUpIcon,
  ChatAlt2Icon,
  ShareIcon,
} from '@heroicons/react/outline'
import { PaperAirplaneIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { fetchComments } from '../util/fetchComments'
import toast from 'react-hot-toast'

interface Props {
  post: Post
}

function PostCmp({ post }: Props) {
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const [comments, setComments] = useState<Comment[]>([])
  const { data: session } = useSession()

  useEffect(() => {
    refreshComments()
  }, [])

  const refreshComments = async () => {
    const comments = await fetchComments(post._id)
    setComments(comments)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const commentInfo: CommentBody = {
      comment: input,
      username: session?.user?.name!,
      profileImg: session?.user?.image!,
      postId: post._id,
    }

    const refreshToast = toast.loading('Adding Comment...')

    await fetch('/api/addComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentInfo),
    }).then((res) => res.json())

    toast.success('Comment Added!', {
      icon: '🚀',
      id: refreshToast,
    })

    setInput('')
    refreshComments()
  }

  return (
    <div className="rounded-lg border bg-white">
      <div className="flex space-x-3 p-4">
        <img
          className="h-14 w-14 rounded-full object-cover"
          src={post.profileImg}
          alt=""
        />

        <div className="flex-1">
          <p className="cursor-pointer font-semibold hover:text-blue-500 hover:underline">
            {post.username}
          </p>
          <p className="text-sm text-gray-500">
            @{post.username.replace(/\s+/g, '').toLowerCase()}
          </p>

          <TimeAgo date={post._createdAt} className="text-xs text-gray-500" />
        </div>

        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100">
          <DotsHorizontalIcon className="h-6 w-6 text-gray-600" />
        </div>
      </div>

      <p className="px-4">{post.text}</p>

      {post.image && (
        <img
          className="mt-3 max-h-80 w-full object-cover"
          src={post.image}
          alt=""
        />
      )}

      <div className="mx-4 border-b py-2">
        {comments.length > 0 && (
          <p className="cursor-pointer text-right text-xs text-gray-500 hover:text-blue-500 hover:underline">
            {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
          </p>
        )}
      </div>

      <div className="flex justify-evenly py-2">
        <div className="flex cursor-pointer items-center space-x-1 rounded-md p-2 hover:bg-gray-100">
          <ThumbUpIcon className="icon" />
          <p className="text-sm font-semibold text-gray-500">Like</p>
        </div>
        <div
          onClick={() => setCommentBoxVisible(!commentBoxVisible)}
          className="flex cursor-pointer items-center space-x-1 rounded-md p-2 hover:bg-gray-100"
        >
          <ChatAlt2Icon className="icon" />
          <p className="text-sm font-semibold text-gray-500">Comment</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-1 rounded-md p-2 hover:bg-gray-100">
          <ShareIcon className="icon" />
          <p className="text-sm font-semibold text-gray-500">Share</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-1 rounded-md p-2 hover:bg-gray-100">
          <PaperAirplaneIcon className="icon rotate-45" />
          <p className="text-sm font-semibold text-gray-500">Send</p>
        </div>
      </div>

      {/* comments */}
      {commentBoxVisible && (
        <div className="mt-2 px-4 pb-3">
          {/* comment box */}
          {session && (
            <form onSubmit={handleSubmit} className="flex">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Add a comment..."
                className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
              />
              <button
                disabled={!input || !session}
                className="ml-3 font-semibold text-blue-400 
              disabled:cursor-not-allowed disabled:text-gray-300"
                type="submit"
              >
                Post
              </button>
            </form>
          )}

          {/* comments */}
          {comments.length > 0 && (
            <div className="mt-5 space-y-3">
              {comments.map(({ comment, username, profileImg, _createdAt }) => (
                <div className="flex space-x-2" key={_createdAt}>
                  <img
                    className="h-10 w-10 rounded-full"
                    src={profileImg}
                    alt=""
                  />

                  <div className="flex-1 rounded-lg bg-gray-100 p-4">
                    <div className="flex">
                      <div className="flex-1">
                        <p className="cursor-pointer text-sm font-semibold hover:text-blue-500 hover:underline">
                          {username}
                        </p>
                        <p className="text-xs text-gray-500">
                          @{username.replace(/\s+/g, '').toLowerCase()}
                        </p>
                      </div>

                      <TimeAgo
                        className="text-xs text-gray-500"
                        date={_createdAt}
                      />
                    </div>

                    <p className="pt-4 text-[15px]">{comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PostCmp
