 # 🎬 AI Movie Insight Builder

An AI-powered movie analysis platform built with **Next.js 16**, **OMDb API**, and **Groq LLM**.  
This app allows users to search movies, explore detailed information, and generate AI-driven insights including summaries, themes, tone, audience targeting, and similar recommendations.

---

## 🚀 Live Demo

🔗 Live App:  https://ai-movie-insight-builder-rosy.vercel.app/
🔗 GitHub Repo: https://github.com/sunny-raj-sah/AI-Movie-Insight-Builder.git

---

## ✨ Features

- 🔍 Movie Search with suggestions
- 🎬 Movie Selection with Poster & Basic Details
- 📖 Expandable Full Details View
- 🤖 AI-Powered Movie Insights:
  - Summary
  - Themes
  - Tone / Mood
  - Target Audience
  - Key Insights
  - Similar Movies with reasons
- 🔄 Smart State Management (No stale AI data)
- ⬅ Back Navigation
- ⚡ Fast API routes using Next.js App Router
- 🌍 Deployed on Vercel

---

## 🧠 AI Insight Engine

This project integrates Groq’s LLM model:

Model Used: llama-3.1-8b-instant


The AI analyzes the selected movie’s title and plot to generate structured insights.

---

## 🛠 Tech Stack

### Frontend
- Next.js 16 (App Router)
- React (Hooks, useState, useEffect)
- Tailwind CSS

### Backend
- Next.js API Routes
- Groq LLM API
- OMDb API

### Deployment
- Vercel

---

## 📂 Project Structure
app/
├── page.js
├── api/
│ ├── search/route.js
│ ├── movie/route.js
│ └── ai/route.js
.env.local



---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

GROQ_API_KEY=your_groq_api_key_here
OMDB_API_KEY=your_omdb_api_key_here


⚠ Never commit `.env.local` to GitHub.

---

## 🧪 Run Locally

Clone the project:

```bash
git clone  https://github.com/sunny-raj-sah/AI-Movie-Insight-Builder.git
cd AI-Movie-Insight-Builder

Install dependencies: npm install

Run development server:  npm run dev

Open:  http://localhost:3000

🚀 Deployment

This project is deployed using Vercel.

Steps:

Push to GitHub

Import project in Vercel

Add environment variables

Deploy

🎯 What This Project Demonstrates

Full-stack development with Next.js

AI API integration (Groq LLM)

Prompt engineering

Clean state management

Dynamic UI rendering

Production deployment workflow

Error handling & API safety checks

🧑‍💻 Author

Sunny Raj
B.Tech CSE (2021–2025)
Backend-Focused Full-Stack Developer

LinkedIn: https://www.linkedin.com/in/sunny-raj-885588313/

GitHub: https://github.com/sunny-raj-sah


⭐ Future Improvements

IMDb Rating Badge UI

Favorites System (LocalStorage)

Streaming Platform Suggestions

Structured JSON AI response rendering

Advanced UI animations

Authentication & user profiles

📜 License

This project is for educational and portfolio purposes.


---

