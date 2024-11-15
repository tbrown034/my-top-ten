import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-teal-800">
      <div className="container flex flex-col items-center gap-4 px-4 mx-auto md:flex-row md:justify-between">
        <p className="text-sm text-gray-300">
          &copy; 2024 Top Ten. All rights reserved.
        </p>
        <nav className="flex gap-6">
          <Link href="/" className="text-sm text-teal-100 hover:text-teal-300">
            Home
          </Link>
          <Link
            href="/movies"
            className="text-sm text-teal-100 hover:text-teal-300"
          >
            Movies
          </Link>
          <Link
            href="/tv"
            className="text-sm text-teal-100 hover:text-teal-300"
          >
            TV Seasons
          </Link>
        </nav>
      </div>
    </footer>
  );
}
