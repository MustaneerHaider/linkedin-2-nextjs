import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { Article } from '../typings'
import TimeAgo from 'react-timeago'
import Image from 'next/image'

interface Props {
  articles: Article[]
}

function Widgets({ articles }: Props) {
  return (
    <div className="col-span-3 ml-5 hidden lg:inline">
      <div className="space-y-3 rounded-lg border bg-white p-4">
        <div className="flex justify-between">
          <p className="font-bold decoration-black hover:underline">
            LinkedIn News
          </p>
          <ExclamationCircleIcon className="h-5 w-5 text-black/80" />
        </div>

        {articles.slice(0, 5).map((article) => (
          <div key={article.url}>
            <h2 className="truncate text-sm font-semibold">
              . {article.title}
            </h2>
            <TimeAgo
              date={article.publishedAt}
              className="text-xs text-gray-600"
            />
          </div>
        ))}
      </div>

      <div className="sticky top-20 mt-3 h-60 w-full">
        <Image
          className="rounded-lg shadow-sm"
          src="https://rb.gy/kbfeaa"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  )
}

export default Widgets
