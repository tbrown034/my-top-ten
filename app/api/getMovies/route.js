// File: app/api/getMovies/route.js

export async function GET(request) {
  const bearerToken = process.env.TMDB_API_TOKEN;
  const apiKey = process.env.TMDB_API_KEY;

  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;
  const year = searchParams.get("year") || "2024";
  const region = searchParams.get("region") || "US";
  const voteCount = searchParams.get("vote_count") || "1000";

  const url = `https://api.themoviedb.org/3/discover/movie?primary_release_year=${year}&sort_by=vote_average.desc&page=${page}&region=${region}&vote_count.gte=${voteCount}&include_adult=false&language=en-US`;

  console.log(`[INFO] Fetching movies from TMDB: ${url}`);

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        Accept: "application/json",
      },
    });

    if (res.status === 401) {
      console.error("[ERROR] Bearer token failed, trying API key fallback...");
      const fallbackRes = await fetch(`${url}&api_key=${apiKey}`, {
        headers: { Accept: "application/json" },
      });
      if (!fallbackRes.ok) {
        throw new Error(
          `Fallback API request failed with status: ${fallbackRes.status}`
        );
      }
      const fallbackData = await fallbackRes.json();
      return processMovieData(fallbackData);
    }

    if (!res.ok) {
      throw new Error(`TMDB API request failed with status: ${res.status}`);
    }

    const data = await res.json();
    return processMovieData(data);
  } catch (error) {
    console.error(`[ERROR] Unexpected error: ${error.message}`);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch movies due to an unexpected error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Helper function to process movie data
function processMovieData(data) {
  if (!data || !Array.isArray(data.results)) {
    throw new Error("Invalid API response format");
  }

  const movies = data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    posterPath: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
    releaseDate: movie.release_date || "Unknown",
    rating: movie.vote_average || "N/A",
    voteCount: movie.vote_count || 0, // Number of reviews
  }));

  console.log(`[INFO] Successfully fetched ${movies.length} movies from TMDB`);

  return new Response(
    JSON.stringify({ movies, totalPages: data.total_pages }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
