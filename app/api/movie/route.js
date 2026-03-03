import { getMovieData } from "@/lib/omdb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");

  try {
    const movie = await getMovieData(title);
    return Response.json(movie);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}