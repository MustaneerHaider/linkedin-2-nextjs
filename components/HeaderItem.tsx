import { SVGProps } from 'react'

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  title: string
  active?: boolean
}

function HeaderItem({ Icon, title, active }: Props) {
  return (
    <div
      className={`flex cursor-pointer flex-col items-center text-gray-600 
    hover:text-black ${
      active && 'border-black text-black md:border-b-2 md:p-1'
    }`}
    >
      <Icon className="h-6 w-6" />
      <p className="hidden text-sm md:inline">{title}</p>
    </div>
  )
}

export default HeaderItem
