import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { Article, Post } from '../typings'
import { fetchPosts } from '../util/fetchPosts'

interface Props {
  articles: Article[]
  posts: Post[]
}

const Home = ({ articles, posts }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Linkedin 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster />

      <Header />

      <main className="mx-auto mt-8 grid grid-cols-1 sm:max-w-xl md:max-w-3xl md:grid-cols-10 lg:max-w-6xl">
        <Sidebar />

        <Feed posts={posts} />

        <Widgets articles={articles} />
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  const results = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  ).then((res) => res.json())

  const posts = await fetchPosts()

  return {
    props: { session, articles: results.articles, posts },
  }
}

export default Home
