import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="mb-4 text-5xl font-extrabold">Top Ten</h1>
      <p className="mb-8 text-lg text-gray-300">It's time to make your list.</p>
      <div className="grid w-full grid-cols-1 gap-8 px-6 md:grid-cols-3">
        <Link
          href="/movies"
          className="p-6 transition bg-teal-700 rounded-lg shadow-lg hover:bg-teal-600"
        >
          <h2 className="text-2xl font-semibold text-center">Movies</h2>
        </Link>
        <Link
          href="/tv"
          className="p-6 transition bg-teal-700 rounded-lg shadow-lg hover:bg-teal-600"
        >
          <h2 className="text-2xl font-semibold text-center">TV Seasons</h2>
        </Link>
        <Link
          href="/music"
          className="p-6 transition bg-teal-700 rounded-lg shadow-lg hover:bg-teal-600"
        >
          <h2 className="text-2xl font-semibold text-center">Music Albums</h2>
        </Link>
      </div>
    </div>
  );
}
