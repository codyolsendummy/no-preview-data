import IndexPage from 'components/IndexPage'
import { PreviewSuspense } from 'components/PreviewSuspense'
import { getAllPosts, getSettings } from 'lib/sanity.client'
import {lazy} from 'react'

const PreviewIndexPage = lazy(() => import('components/PreviewIndexPage'))

export default async function IndexRoute() {
  // Fetch queries in parallel
  const [settings, posts] = await Promise.all([getSettings(), getAllPosts()])

  return <IndexPage posts={posts} settings={settings} />
}

// If webhooks isn't setup then attempt to re-generate in 1 minute intervals
export const revalidate = process.env.SANITY_REVALIDATE_SECRET ? false : 60
