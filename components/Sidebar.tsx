import { PlusIcon } from '@heroicons/react/outline'
import { BookmarkIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'

function Sidebar() {
  const { data: session } = useSession()

  return (
    <div className="col-span-3 lg:col-span-2">
      {/* Top */}
      <div>
        <div className="flex flex-col items-center border bg-white pb-5 sm:rounded-t-lg">
          <img
            className="-mb-6 h-16 w-full object-cover sm:rounded-t-lg"
            src="https://static.vecteezy.com/system/resources/previews/004/223/139/non_2x/gradient-mesh-blurred-background-in-soft-rainbow-colors-vector.jpg"
            alt=""
          />

          <img
            className="h-16 w-16 cursor-pointer rounded-full border-2 border-white"
            src={session?.user?.image || 'https://links.papareact.com/gll'}
            alt=""
          />

          <h2 className="pt-6 font-semibold hover:underline ">
            {session?.user?.name || 'Unknown User'}
          </h2>
          <h3 className="pt-1 text-sm text-gray-500">
            {session?.user?.email || 'unknown@linkedin.com'}
          </h3>
        </div>

        <div className="hidden border-x border-b bg-white p-4 md:block">
          <div className="flex justify-between text-xs">
            <p className="font-semibold text-gray-500">Connections</p>
            <p className="font-semibold text-blue-500">45</p>
          </div>

          <p className="text-xs font-semibold">Find alumini and classmates</p>

          <div className="flex justify-between pt-2 text-xs">
            <p className="font-semibold text-gray-500">
              Who viewed your profile
            </p>
            <p className="font-semibold text-blue-500">32</p>
          </div>
        </div>

        <div className="group hidden cursor-pointer border-x border-b bg-white p-4 md:block">
          <h3 className="text-xs text-gray-500">
            Access exclusive tools & insights
          </h3>

          <h4 className="flex items-center space-x-2 text-xs">
            <span className="h-3 w-3 rounded-sm bg-gradient-to-tr from-yellow-600 to-yellow-200 " />
            <p className="font-semibold group-hover:text-blue-500">
              Try Premium for free
            </p>
          </h4>
        </div>

        <div className="hidden cursor-pointer rounded-b-lg border-x border-b bg-white p-4 hover:bg-[#eee] md:block">
          <div className="flex space-x-1">
            <BookmarkIcon className="h-5 w-5 text-gray-700" />
            <p className="text-xs font-semibold text-gray-700">My items</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="sticky top-20 mt-2 hidden rounded-lg border bg-white md:block">
        <div className="space-y-3 border-b p-4">
          <p className="text-xs font-semibold text-blue-500 hover:underline">
            Groups
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-blue-500 hover:underline">
              Events
            </p>
            <div className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-gray-100">
              <PlusIcon className="h-4 w-4 cursor-pointer text-gray-600" />
            </div>
          </div>
          <p className="text-xs font-semibold text-blue-500 hover:underline">
            Followed Hastags
          </p>
        </div>

        <div className="cursor-pointer py-4 hover:bg-[#eee]">
          <p className="text-center text-sm font-semibold text-gray-500">
            Discover More
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
