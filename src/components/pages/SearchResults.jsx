import { useLocation, Link } from "react-router-dom";

export default function SearchResults(props) {
  const parkInfo = props.parkInfo;

    //   useLocation allows up to use the object sent down from home in the handle click function 
  const location = useLocation();
  const foundParks = location.state?.foundParks;
  console.log(foundParks);

  return (
    <div className="container">
      <div className="searchBar"></div>
      <h2>Here are your search results</h2>
      {foundParks &&
    //   i added the original index to the object that way we can reference it  when we send it over
        foundParks.map(({ park, originalIndex }) => (
          <Link
            to={{
              pathname: `/parks/${park.fullName}/${originalIndex}`, 
            }}
            key={park.id}
          >
            <div className="parkContainer" key={park.id}>
              <div>
                <img
                  src={park.images[0]?.url}
                  className="parkImage"
                  alt={park.fullName}
                />
              </div>
              <div className="parkText">
                <h3>{park.fullName}</h3>
                <p>
                  {park.addresses[0]?.city}, {park.addresses[0]?.stateCode}
                </p>
                <p>
                  Activities: {park.activities[0]?.name},{" "}
                  {park.activities[1]?.name}, {park.activities[2]?.name},{" "}
                  {park.activities[3]?.name}, {park.activities[4]?.name}
                </p>
                <p>More Info...</p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}