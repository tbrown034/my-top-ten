// app/api/getMovies/route.js
export async function GET(request) {
  const apiKey = process.env.TMDB_API_KEY;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;

  // Request movies with pagination and increase the total number of results
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&release_date.gte=2024-01-01&release_date.lte=2024-12-31&sort_by=popularity.desc&page=${page}&language=en-US&include_adult=false`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.results) {
      throw new Error("Invalid API response");
    }

    // Return more movies by not limiting to the first 10
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
