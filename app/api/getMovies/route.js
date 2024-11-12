// app/api/getMovies/route.js
export async function GET(request) {
  const apiKey = process.env.TMDB_API_KEY;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;
  const year = searchParams.get("year") || 2024;

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&year=${year}&page=${page}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    // Check if 'results' exist in the response
    if (!data.results || !Array.isArray(data.results)) {
      throw new Error("Invalid API response");
    }

    // Map the 'results' array
    const movies = data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      releaseDate: movie.release_date,
    }));

    return new Response(
      JSON.stringify({ movies, totalPages: data.total_pages }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch movies" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
