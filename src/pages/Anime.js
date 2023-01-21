import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);

      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }

      let actualData = await response.json();
      setData(actualData.data);
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
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {data && (
        <div>
          <h1>{data.title}</h1>
          <div className="flex gap-3">
            <img
              className="h-[250px] rounded-lg"
              src={data.images.jpg.image_url}
              alt={data.title}
            />
            <div>
              <div>{data.type}</div>
              <div>{data.genres.map((genre) => genre.name).join(", ")}</div>
              <div>{data.episodes} Episode</div>
            </div>
          </div>
          <div>{data.synopsis}</div>
        </div>
      )}
    </div>
  );
}
