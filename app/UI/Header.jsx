import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 py-8">
      <h1 className="text-5xl font-extrabold text-teal-100">Top Ten</h1>
      <p className="text-lg text-gray-300">
        Select your favorite categories to get started.
      </p>
      <div className="grid w-full max-w-3xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/movies"
          className="p-6 text-center transition-transform transform bg-teal-700 rounded-lg shadow-lg hover:bg-teal-600 hover:scale-105"
        >
          <h2 className="text-2xl font-semibold text-teal-100">Movies</h2>
        </Link>
        <Link
          href="/tv"
          className="p-6 text-center transition-transform transform bg-teal-700 rounded-lg shadow-lg hover:bg-teal-600 hover:scale-105"
        >
          <h2 className="text-2xl font-semibold text-teal-100">TV Seasons</h2>
        </Link>
      </div>
    </div>
  );
}
