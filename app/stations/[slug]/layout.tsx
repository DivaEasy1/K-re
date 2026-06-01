import { getAllStationPages } from '@/lib/stations'

export async function generateStaticParams() {
  const allStations = await getAllStationPages()
  return allStations.map((station) => ({
    slug: station.slug,
  }))
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
