import { useParams } from "react-router-dom";

export default function Home() {
  let { id } = useParams();

  return (
    <div>
      <h1>Anime page</h1>
      <p>{id}</p>
    </div>
  );
}
