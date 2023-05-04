import { useLocation } from "react-router-dom";

export default function SearchResults() {
  const location = useLocation();
  const foundParks = location.state?.foundParks;

  return (
    <>
      <h2>Here are your search results</h2>
      {foundParks &&
        foundParks.map((park) => (
          <div key={park.id}>
            <h3>{park.fullName}</h3>
            <p>
              {park.addresses[0].city}, {park.addresses[0].stateCode}
            </p>
          </div>
        ))}
    </>
  );
}