 "use client";
import { useState ,useEffect } from "react";

export default function Home() {
  const [movie, setMovie] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
const [aiLoading, setAiLoading] = useState(false);

useEffect(() => {
  // Clear AI insight whenever selected movie changes
  setAiSuggestion("");
  setAiLoading(false);
  setShowFullDetails(false);
}, [selected]);
  // 🔍 Search Movies
  const handleSearch = async () => {
    if (!movie.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);
    setSelected(null);
    setShowFullDetails(false);

     // 🔥 CLEAR OLD AI DATA
  // setAiSuggestion("");
  // setAiLoading(false);

    try {
      const res = await fetch(`/api/search?query=${movie}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        const unique = Array.from(
          new Map(data.map(item => [item.imdbID, item])).values()
        );
        setResults(unique);
      }
    } catch (err) {
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  // ✅ Choose Movie
  const handleChoose = async (title) => {
    setLoading(true);
    setError("");
    setShowFullDetails(false);

  //    // 🔥 CLEAR OLD AI DATA
  // setAiSuggestion("");
  // setAiLoading(false);


    try {
      const res = await fetch(`/api/movie?title=${title}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setSelected(data);
        setResults([]);
      }
    } catch (err) {
      setError("Failed to load movie.");
    }

    setLoading(false);
  };

  // 📖 Show Full Details
  const handleReadMore = () => {
     if (!selected) return;
    setShowFullDetails(true);
    // Only fetch AI if not already fetched
  if (!aiSuggestion) {
    getAISuggestion(selected.Title, selected.Plot);
  }
  };

  // ⬅ Back Button Logic
  const handleBack = () => {

  //    // 🔥 CLEAR OLD AI DATA
  // setAiSuggestion("");
  // setAiLoading(false);

    if (selected) {
      // If movie is selected → go back to search results
      setSelected(null);
      setShowFullDetails(false);
      handleSearch(); // re-run search
    } else if (results.length > 0) {
      // If search results shown → go back to initial state
      setResults([]);
      setMovie("");
    }
  };

  const getAISuggestion = async (title, plot) => {
  setAiLoading(true);

  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, plot }),
    });

    const data = await res.json();
    setAiSuggestion(data.suggestion);
  } catch (err) {
    setAiSuggestion("Failed to get AI suggestions.");
  }

  setAiLoading(false);
};

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
  <h1 className="text-4xl font-bold text-center mb-10 tracking-wide">
    🎬 AI Movie Insight Builder
  </h1>

  {/* Search Section */}
  <div className="flex justify-center gap-3 mb-10">
    <input
      type="text"
      placeholder="Enter movie name..."
      value={movie}
      onChange={(e) => setMovie(e.target.value)}
      className="px-4 py-3 rounded-lg text-black w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={handleSearch}
      className="bg-blue-600 px-5 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
    >
      Search
    </button>
  </div>

  {/* Back Button */}
  {(results.length > 0 || selected) && (
    <div className="flex justify-center mb-8">
      <button
        onClick={handleBack}
        className="bg-gray-700 px-5 py-2 rounded-lg hover:bg-gray-600 transition"
      >
        ⬅ Back
      </button>
    </div>
  )}

  {loading && <p className="text-center text-blue-400">Loading...</p>}
  {error && <p className="text-center text-red-500">{error}</p>}

  {/* Search Results */}
  {results.length > 0 && (
    <div className="grid gap-5 max-w-3xl mx-auto">
      {results.map((item) => (
        <div
          key={item.imdbID + item.Year}
          className="bg-gray-800 p-5 rounded-xl flex justify-between items-center hover:bg-gray-700 transition duration-300 shadow-md"
        >
          <div>
            <h2 className="font-bold text-lg">{item.Title}</h2>
            <p className="text-gray-400">{item.Year}</p>
          </div>

          <button
            onClick={() => handleChoose(item.Title)}
            className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Choose
          </button>
        </div>
      ))}
    </div>
  )}

  {/* Selected Movie */}
  {selected && (
    <div className="max-w-4xl mx-auto mt-12 bg-gray-800 p-8 rounded-2xl shadow-xl">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={selected.Poster}
          alt={selected.Title}
          className="w-60 rounded-xl shadow-lg"
        />

        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{selected.Title}</h2>
          <p className="text-gray-400">{selected.Year}</p>

          <p className="mt-4 leading-relaxed">{selected.Plot}</p>

          {!showFullDetails && (
            <button
              onClick={handleReadMore}
              className="bg-yellow-500 text-black px-5 py-2 rounded-lg mt-6 hover:bg-yellow-600 transition"
            >
              Read More
            </button>
          )}
        </div>
      </div>

      {/* Full Details */}
      {showFullDetails && (
        <div className="mt-8 border-t border-gray-700 pt-6 space-y-2">
          <p><strong>Genre:</strong> {selected.Genre}</p>
          <p><strong>Director:</strong> {selected.Director}</p>
          <p><strong>Actors:</strong> {selected.Actors}</p>
          <p><strong>IMDb Rating:</strong> ⭐ {selected.imdbRating}</p>
          <p><strong>Awards:</strong> {selected.Awards}</p>
          <p><strong>Box Office:</strong> {selected.BoxOffice}</p>

          {/* AI Suggestion UI */}
          {aiLoading && (
            <div className="mt-6 bg-gray-900 p-4 rounded-xl animate-pulse">
              <p className="text-blue-400 font-medium">
                🤖 Generating AI Movie Recommendations...
              </p>
            </div>
          )}

          {aiSuggestion && (
            <div className="mt-6 bg-gradient-to-r from-purple-800 to-indigo-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-4">
                🎥 AI Recommended Movies
              </h2>
              <p className="whitespace-pre-line text-gray-200 leading-relaxed">
                {aiSuggestion}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )}
</main>
  );
 }


//     <main className="min-h-screen bg-gray-900 text-white p-6">
//       <h1 className="text-4xl font-bold text-center mb-8">
//         🎬 AI Movie Insight Builder
//       </h1>

//       {/* Search Section */}
//       <div className="flex justify-center gap-2 mb-8">
//         <input
//           type="text"
//           placeholder="Enter movie name..."
//           value={movie}
//           onChange={(e) => setMovie(e.target.value)}
//           className="px-4 py-2 rounded text-black w-64"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Search
//         </button>
//       </div>

//       {/* Back Button */}
//       {(results.length > 0 || selected) && (
//         <div className="flex justify-center mb-6">
//           <button
//             onClick={handleBack}
//             className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
//           >
//             ⬅ Back
//           </button>
//         </div>
//       )}

//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {/* Search Results */}
//       {results.length > 0 && (
//         <div className="grid gap-4 max-w-3xl mx-auto">
//           {results.map((item) => (
//             <div
//               key={item.imdbID + item.Year}
//               className="bg-gray-800 p-4 rounded flex justify-between items-center"
//             >
//               <div>
//                 <h2 className="font-bold">{item.Title}</h2>
//                 <p className="text-gray-400">{item.Year}</p>
//               </div>

//               <button
//                 onClick={() => handleChoose(item.Title)}
//                 className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
//               >
//                 Choose
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Selected Movie */}
//       {selected && (
//         <div className="max-w-3xl mx-auto mt-10 bg-gray-800 p-6 rounded">
//           <div className="flex flex-col md:flex-row gap-6">
//             <img
//               src={selected.Poster}
//               alt={selected.Title}
//               className="w-48 rounded"
//             />

//             <div>
//               <h2 className="text-2xl font-bold">{selected.Title}</h2>
//               <p className="text-gray-400">{selected.Year}</p>
//               <p className="mt-4">{selected.Plot}</p>

//               {!showFullDetails && (
//                 <button
//                   onClick={handleReadMore}
//                   className="bg-yellow-600 px-4 py-2 rounded mt-4 hover:bg-yellow-700"
//                 >
//                   Read More
//                 </button>
                
//               )}
              
//             </div>
//           </div>

//           {/* Full Details */}
//           {showFullDetails && (
//             <div className="mt-6 border-t border-gray-700 pt-6">
//               <p><strong>Genre:</strong> {selected.Genre}</p>
//               <p><strong>Director:</strong> {selected.Director}</p>
//               <p><strong>Actors:</strong> {selected.Actors}</p>
//               <p><strong>IMDb Rating:</strong> {selected.imdbRating}</p>
//               <p><strong>Awards:</strong> {selected.Awards}</p>
//               <p><strong>Box Office:</strong> {selected.BoxOffice}</p>
//             </div>
//           )}
//         </div>
//       )}
//     </main>
//   );
// }