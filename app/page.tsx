import IndexPage from 'components/IndexPage'
import { PreviewSuspense } from 'components/PreviewSuspense'
import { getAllPosts, getSettings } from 'lib/sanity.client'
import { previewData } from 'next/headers'
import {lazy} from 'react'

const PreviewIndexPage = lazy(() => import('components/PreviewIndexPage'))

export default async function IndexRoute() {
  // Fetch queries in parallel
  const [settings, posts] = await Promise.all([getSettings(), getAllPosts()])

  if (previewData()) {
    const token = previewData().token || null
    return (
      <PreviewSuspense
        fallback={<IndexPage loading preview posts={posts} settings={settings} />}
      >
        <PreviewIndexPage token={token} />
      </PreviewSuspense>
    )
  }

  return <IndexPage posts={posts} settings={settings} />
}

// If webhooks isn't setup then attempt to re-generate in 1 minute intervals
export const revalidate = process.env.SANITY_REVALIDATE_SECRET ? false : 60
