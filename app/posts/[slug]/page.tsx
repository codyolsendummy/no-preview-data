import PostPage from 'components/PostPage'
import { PreviewSuspense } from 'components/PreviewSuspense'
import {
  getAllPostsSlugs,
  getPostAndMoreStories,
  getSettings,
} from 'lib/sanity.client'
import {lazy} from 'react'

const PreviewPostPage = lazy(() => import('components/PreviewPostPage'))

export async function generateStaticParams() {
  return await getAllPostsSlugs()
}

export default async function SlugRoute({
  params,
}: {
  params: { slug: string }
}) {
  // Start fetching settings early, so it runs in parallel with the post query
  const settings = getSettings()
  const data = getPostAndMoreStories(params.slug)
  return <PostPage data={await data} settings={await settings} />
}

// If webhooks isn't setup then attempt to re-generate in 1 minute intervals
export const revalidate = process.env.SANITY_REVALIDATE_SECRET ? false : 60
