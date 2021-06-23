import Link from 'next/link'

function Home() {
  return (
    <>
      <div>Home</div>
      <Link href="/sobre">
        <a>Página Sobre</a>
      </Link>
    </>
  )
}
export default Home