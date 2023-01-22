import { useState, useEffect, useRef } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";

import Pagination from "../components/Pagination";

function usePrevious(value) {
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

  const pageNumberLimit = 5;
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);

  const getData = async () => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?page=${currentPage}&limit=15&q=${q}`
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // getData();
      setCurrentPage(1);

      // TODO
      // navigate(`/search/anime?page=1&q=${q}`);
      navigate(`/?page=1&q=${q}`);
    }
  };

  const handleClickNext = () => {
    let nextPage;
    if (currentPage) {
      nextPage = parseInt(currentPage) + 1;
    } else {
      nextPage = 2;
    }

    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }

    // if (currentPage + 1 >= 5) {
    //   setMaxPageLimit(currentPage + 1 + 2);
    //   setMinPageLimit(currentPage + 1 - 3);
    // } else {
    //   setMaxPageLimit(5);
    //   setMinPageLimit(0);
    // }

    setCurrentPage(nextPage);

    if (q) {
      navigate(`/?page=${nextPage}&q=${q}`);
      return;
    }

    navigate(`/?page=${nextPage}`);
  };

  const handleClickPrev = () => {
    const prevPage = parseInt(currentPage) - 1;

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }

    // if (currentPage > 5) {
    //   setMaxPageLimit(currentPage - 1 + 2);
    //   setMinPageLimit(currentPage - 1 - 3);
    // } else {
    //   setMaxPageLimit(5);
    //   setMinPageLimit(0);
    // }

    setCurrentPage(prevPage);

    if (q) {
      navigate(`/?page=${prevPage}&q=${q}`);
      return;
    }
    navigate(`/?page=${prevPage}`);
  };

  useEffect(() => {
    if (searchParams.get("q")) {
      setQ(searchParams.get("q"));
    }

    if (searchParams.get("page")) {
      let page = parseInt(searchParams.get("page"));
      setCurrentPage(page);

      // if (currentPage >= 5) {
      //   setMaxPageLimit(currentPage + 2);
      //   setMinPageLimit(currentPage - 3);
      // } else {
      //   setMaxPageLimit(5);
      //   setMinPageLimit(0);
      // }
    }
  }, [searchParams]);

  useEffect(() => {
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

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    // if (pageNumber >= 5) {
    //   setMaxPageLimit(pageNumber + 2);
    //   setMinPageLimit(pageNumber - 3);
    // } else {
    //   setMaxPageLimit(5);
    //   setMinPageLimit(0);
    // }

    if (q) {
      navigate(`/?page=${pageNumber}&q=${q}`);
      return;
    }

    navigate(`/?page=${pageNumber}`);
  };
  return (
    <div>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {data && (
        <>
          {/* <label>
            <input
              type="search"
              name="search-anime"
              placeholder="Search anime..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </label> */}
          {/* <button onClick={getData}>Search</button> */}
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
          <Pagination
            className="mt-3"
            currentPage={currentPage}
            maxPageLimit={maxPageLimit}
            minPageLimit={minPageLimit}
            onPrevClick={handleClickPrev}
            onNextClick={handleClickNext}
            onPageChange={onPageChange}
            totalPages={data.pagination.last_visible_page}
          />
          {/* <div className="flex justify-center gap-3 mt-3">
            {data.pagination.current_page !== 1 && (
              <button onClick={handleClickPrev}>Prev</button>
            )}
            {data.pagination.has_next_page && (
              <button
                onClick={data.pagination.has_next_page && handleClickNext}
              >
                Next
              </button>
            )}
          </div> */}
        </>
      )}
    </div>
  );
}
