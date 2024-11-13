export async function GET(request) {
  const apiKey = process.env.TMDB_API_KEY;
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const year = searchParams.get("year") || "2024";
  const page = searchParams.get("page") || 1;

  if (!query) {
    return new Response(
      JSON.stringify({ error: "Query parameter is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    query
  )}&language=en-US&include_adult=false&primary_release_year=${year}&page=${page}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.results) {
      throw new Error("Invalid API response");
    }

    const results = data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      releaseDate: movie.release_date,
    }));

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch search results" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
