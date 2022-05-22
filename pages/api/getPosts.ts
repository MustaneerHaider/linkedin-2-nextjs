// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import { Post } from '../../typings'
import sanityClient from '../../util/sanity'

const feedQuery = groq`
  *[_type == 'post'] | order(_createdAt desc) {
    _id,
    ...
  }
`

type Data = {
  posts: Post[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const posts: Post[] = await sanityClient.fetch(feedQuery)

  res.status(200).json({ posts })
}
