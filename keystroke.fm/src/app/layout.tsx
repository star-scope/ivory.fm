import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ivory.fm',
  description: 'Piano music player',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div>
        <Link href="/api/login">Login with Spotify</Link>
      </div>
    </>
  );
}