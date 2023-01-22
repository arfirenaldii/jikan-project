/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";

import LoadingAnime from "../components/LoadingAnime";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page")) : 1
  );
  const [q, setQ] = useState(
    searchParams.get("q") ? searchParams.get("q") : ""
  );

  const navigate = useNavigate();
  const location = useLocation();

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

  const handleClickNext = () => {
    let nextPage;
    if (currentPage) {
      nextPage = parseInt(currentPage) + 1;
    } else {
      nextPage = 2;
    }

    setCurrentPage(nextPage);

    if (q) {
      navigate(`/?page=${nextPage}&q=${q}`);
      return;
    }

    navigate(`/?page=${nextPage}`);
  };

  const handleClickPrev = () => {
    const prevPage = parseInt(currentPage) - 1;
    setCurrentPage(prevPage);

    if (q) {
      navigate(`/?page=${prevPage}&q=${q}`);
      return;
    }
    navigate(`/?page=${prevPage}`);
  };

  useEffect(() => {
    if (searchParams.get("q") !== null) {
      setQ(searchParams.get("q"));
    }

    if (searchParams.get("page")) {
      let page = parseInt(searchParams.get("page"));
      setCurrentPage(page);
    }
  }, [searchParams]);

  const resetData = () => {
    setLoading(true);
    setData(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    resetData();
    getData();
  }, [currentPage, q]);

  const previousState = usePrevious({ location });
  useEffect(() => {
    if (location !== previousState?.location && previousState?.location) {
      if (!location.search) {
        setCurrentPage(1);
        setQ("");
      }
    }
  }, [location]);

  const handleClickGoHome = () => {
    navigate("/");
  };

  return (
    <div>
      {loading && <LoadingAnime />}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {data && (
        <>
          {data.data.length === 0 && (
            <div>
              <div className="text-xl font-medium">{`Anime not found`}</div>
              <div className="mt-3 text-center">
                <button
                  className="p-2 w-fit rounded-lg bg-blue-600 text-white"
                  onClick={handleClickGoHome}
                >
                  Go Home
                </button>
              </div>
            </div>
          )}
          <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mt-3">
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
          {data.data.length > 0 && (
            <div className="flex justify-center gap-3 mt-6">
              <button
                className="p-2 w-[100px] rounded-lg bg-blue-600 disabled:bg-gray-600 text-white"
                onClick={handleClickPrev}
                disabled={data.pagination.current_page === 1}
              >
                Prev
              </button>
              <button
                className="p-2 w-[100px] rounded-lg bg-blue-600 disabled:bg-gray-600 text-white"
                onClick={handleClickNext}
                disabled={!data.pagination.has_next_page}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
