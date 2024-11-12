import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-4 bg-teal-800 shadow-lg">
      <div className="container flex items-center justify-between px-4 mx-auto">
        <Link href="/" className="text-2xl font-bold">
          Top Ten
        </Link>
        <nav className="flex gap-6">
          <Link href="/movies" className="hover:text-teal-300">
            Movies
          </Link>
          <Link href="/tv" className="hover:text-teal-300">
            TV Seasons
          </Link>
          <Link href="/music" className="hover:text-teal-300">
            Music Albums
          </Link>
        </nav>
      </div>
    </header>
  );
}
