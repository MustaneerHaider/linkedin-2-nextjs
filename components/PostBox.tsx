import { PhotographIcon } from '@heroicons/react/outline'
import { MdVideoLibrary as VideoIcon, MdArticle } from 'react-icons/md'
import { BsCalendarEvent as CalendarIcon } from 'react-icons/bs'
import React, { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { PostBody } from '../typings'
import { fetchPosts } from '../util/fetchPosts'
import toast from 'react-hot-toast'

interface Props {
  refetchPosts: () => {}
}

function PostBox({ refetchPosts }: Props) {
  const [input, setInput] = useState<string>('')
  const [imageUrlBoxVisible, setImageUrlBoxVisible] = useState<boolean>(false)
  const [image, setImage] = useState<string>('')
  const imageInputRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()

  const addImageToPost = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    if (!imageInputRef?.current?.value) return

    setImage(imageInputRef.current.value)
    imageInputRef.current.value = ''
    setImageUrlBoxVisible(false)
  }

  const addPost = async () => {
    const postInfo: PostBody = {
      text: input,
      username: session?.user?.name!,
      profileImg: session?.user?.image!,
      image,
    }

    const result = await fetch('/api/addPost', {
      method: 'POST',
      body: JSON.stringify(postInfo),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())

    refetchPosts()

    toast.success('Post Added!', {
      icon: '🚀',
    })

    return result
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    addPost()

    setInput('')
    setImage('')
    setImageUrlBoxVisible(false)
  }

  return (
    <div className="border bg-white p-4 sm:rounded-lg">
      <div className="flex space-x-2">
        <img
          className="h-14 w-14 rounded-full"
          src={session?.user?.image || 'https://links.papareact.com/gll'}
          alt=""
        />

        <div className="flex-1 self-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-1 flex-col rounded-full border border-gray-500 py-2 px-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent outline-none"
              type="text"
              placeholder="Start a post about a topic that excites you"
            />
            <button disabled={!input || !session} type="submit" hidden>
              Submit
            </button>
          </form>

          <div className="mt-3 flex items-center justify-between">
            <div
              onClick={() =>
                session && setImageUrlBoxVisible(!imageUrlBoxVisible)
              }
              className="flex cursor-pointer items-center space-x-2 rounded-lg p-2 hover:bg-gray-100"
            >
              <PhotographIcon className="h-6 w-6 text-blue-400" />
              <p className="hidden text-sm font-semibold text-gray-500 sm:inline">
                Photo
              </p>
            </div>
            <div className="flex cursor-pointer items-center space-x-2 rounded-lg p-2 hover:bg-gray-100">
              <VideoIcon className="h-6 w-6 text-green-500" />
              <p className="hidden text-sm font-semibold text-gray-500 sm:inline">
                Video
              </p>
            </div>
            <div className="flex cursor-pointer items-center space-x-2 rounded-lg p-2 hover:bg-gray-100">
              <CalendarIcon className="h-6 w-6 text-yellow-500" />
              <p className="hidden text-sm font-semibold text-gray-500 sm:inline">
                Event
              </p>
            </div>
            <div className="flex cursor-pointer items-center space-x-2 rounded-lg p-2 hover:bg-gray-100">
              <MdArticle className="h-6 w-6 text-pink-500" />
              <p className="hidden text-sm font-semibold text-gray-500 sm:inline">
                Write Article
              </p>
            </div>
          </div>

          {imageUrlBoxVisible && (
            <form className="mt-3 flex space-x-3 rounded-md bg-blue-400 p-3">
              <input
                ref={imageInputRef}
                type="text"
                placeholder="Enter Image URL..."
                className="flex-1 bg-transparent text-white outline-none placeholder:text-white"
              />
              <button
                onClick={addImageToPost}
                className="font-semibold text-white"
                type="submit"
              >
                Add Image
              </button>
            </form>
          )}

          {image && (
            <img
              className="mx-auto mt-2 max-h-40 object-contain shadow-lg"
              src={image}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default PostBox
