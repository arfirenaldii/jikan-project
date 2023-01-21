import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [q, setQ] = useState("");

  const getData = async () => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?page=${currentPage}&limit=10&q=${q}`
      );

      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }

      let actualData = await response.json();
      setData(actualData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      getData();
    }
  };

  return (
    <div>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {data && (
        <>
          <label>
            <input
              type="search"
              name="search-anime"
              placeholder="Search anime..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </label>
          <button onClick={getData}>Search</button>
          <div className="grid gap-4 grid-cols-5 mt-3">
            {data.data.map((anime) => (
              <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
                <img
                  className="h-[250px] w-full object-cover rounded-lg"
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                />
                <div className="line-clamp-2">{anime.title}</div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center gap-3 mt-3">
            {data.pagination.current_page !== 1 && (
              <button onClick={() => setCurrentPage(currentPage - 1)}>
                Prev
              </button>
            )}
            {data.pagination.has_next_page && (
              <button
                onClick={() =>
                  data.pagination.has_next_page &&
                  setCurrentPage(currentPage + 1)
                }
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
