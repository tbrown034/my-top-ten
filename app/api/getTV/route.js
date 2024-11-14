// File: app/api/getTV/route.js

export async function GET(request) {
  const bearerToken = process.env.TMDB_API_TOKEN;
  const apiKey = process.env.TMDB_API_KEY;

  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;
  const year = searchParams.get("year") || "2024";
  const region = searchParams.get("region") || "US";
  const voteCount = searchParams.get("vote_count") || "500";

  const url = `https://api.themoviedb.org/3/discover/tv?first_air_date_year=${year}&sort_by=vote_average.desc&page=${page}&region=${region}&vote_count.gte=${voteCount}&include_adult=false&language=en-US`;

  console.log(`[INFO] Fetching TV shows from TMDB: ${url}`);

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
      return processTVData(fallbackData);
    }

    if (!res.ok) {
      throw new Error(`TMDB API request failed with status: ${res.status}`);
    }

    const data = await res.json();
    return processTVData(data);
  } catch (error) {
    console.error(`[ERROR] Unexpected error: ${error.message}`);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch TV shows due to an unexpected error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Helper function to process TV show data
function processTVData(data) {
  if (!data || !Array.isArray(data.results)) {
    throw new Error("Invalid API response format");
  }

  const shows = data.results.map((show) => ({
    id: show.id,
    title: show.name,
    posterPath: show.poster_path
      ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
      : null,
    firstAirDate: show.first_air_date || "Unknown",
    rating: show.vote_average || "N/A",
    voteCount: show.vote_count || 0, // Number of reviews
  }));

  console.log(`[INFO] Successfully fetched ${shows.length} TV shows from TMDB`);

  return new Response(JSON.stringify({ shows, totalPages: data.total_pages }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
