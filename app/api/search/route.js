export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}&type=movie`
  );

  const data = await res.json();

  if (data.Response === "False") {
    return Response.json({ error: "No movies found" }, { status: 400 });
  }

  return Response.json(data.Search);
}