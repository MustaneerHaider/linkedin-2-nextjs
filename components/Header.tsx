import { SearchIcon } from '@heroicons/react/outline'
import {
  HomeIcon,
  UsersIcon,
  BellIcon,
  ChatAltIcon,
  BriefcaseIcon,
} from '@heroicons/react/solid'
import { signOut, useSession, signIn } from 'next-auth/react'
import HeaderItem from './HeaderItem'

function Header() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 border-b bg-white p-2 shadow-sm md:p-0">
      <div className="mx-2 flex max-w-6xl items-center justify-between lg:mx-auto">
        {/* Left */}
        <div className="flex items-center space-x-2">
          <img
            className="h-9 w-9 cursor-pointer object-contain"
            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            alt=""
          />

          <div className="flex items-center space-x-2 rounded-md bg-gray-100 p-2 lg:min-w-[300px]">
            <SearchIcon className="h-5 w-5 text-gray-400" />
            <input
              className="hidden flex-1 bg-transparent outline-none sm:inline"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <HeaderItem Icon={HomeIcon} title="Home" active />
            <HeaderItem Icon={UsersIcon} title="My Network" />
            <HeaderItem Icon={BriefcaseIcon} title="Jobs" />
            <HeaderItem Icon={ChatAltIcon} title="Messaging" />
            <HeaderItem Icon={BellIcon} title="Notifications" />
          </div>

          <div className="flex flex-col items-center">
            <img
              onClick={() => (session ? signOut() : signIn())}
              className="h-7 w-7 cursor-pointer rounded-full object-cover"
              src={session?.user?.image || 'https://links.papareact.com/gll'}
              alt=""
            />
            {session && (
              <h4 className="hidden text-xs text-gray-700 md:inline">Me</h4>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
