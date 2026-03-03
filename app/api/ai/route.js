 import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, plot } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Missing GROQ API Key" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
           model: "llama-3.1-8b-instant",
        //   llama-3.1-8b-instant",
          // messages: [
          //   {
          //     role: "system",
          //     content: "You are a movie recommendation assistant.",
          //   },
          //   {
          //     role: "user",
          //     content: `Suggest 5 movies similar to "${title}". Here is the plot: ${plot}`,
          //   },
          // ],

          messages: [
  {
    role: "system",
    content: "You are an intelligent movie analysis assistant.",
  },
  {
    role: "user",
    content: `
Analyze the following movie and provide structured insights.

Title: ${title}

Plot: ${plot}

Please provide:

1. A short 3-4 line summary.
2. Main themes of the movie.
3. Overall tone or mood.
4. Target audience type.
5. 3 key insights about the story.
6. 3 similar movies with a short reason for each.

Keep the response clean and well structured.
    `,
  },
],

 
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    // 🔎 Log error from Groq if exists
    if (!response.ok) {
      console.error("Groq API Error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Groq API failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      suggestion:
        data.choices?.[0]?.message?.content ||
        "No suggestions received.",
    });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}