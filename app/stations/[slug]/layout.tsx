import { getAllStationPages } from '@/lib/stations'

export async function generateStaticParams() {
  try {
    const allStations = await getAllStationPages()
    return allStations.map((station) => ({
      slug: station.slug,
    }))
  } catch (e) {
    return []
  }
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
