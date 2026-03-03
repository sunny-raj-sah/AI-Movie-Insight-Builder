 import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, plot ,rating} = await req.json();

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


          messages: [
  {
    role: "system",
    content: "You are an intelligent movie analysis assistant.",
  },
  {
    role: "user",
    content: `
 
Based on the movie plot and IMDb rating (${rating,plot, title}),
do the following:

1. Summarize audience sentiment in 4-5 lines.
2. Classify overall sentiment as one of:
   Positive, Mixed, or Negative.
3. Then provide key themes and insights.

 
 
4. Overall tone or mood.
5. Target audience type.
6. 3 key insights about the story.
7. 3 similar movies with a short reason for each.

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