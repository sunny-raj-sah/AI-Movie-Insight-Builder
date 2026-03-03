export async function getMovieData(title) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${title}`
  );

  const data = await res.json();

  if (data.Response === "False") {
    throw new Error("Movie not found");
  }

  return data;
}