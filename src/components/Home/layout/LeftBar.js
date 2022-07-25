import { Link } from "react-router-dom";
const LeftBar = ({ subcats, subCat, leftad, leftadlink, location }) => {
  const redirectUser = (id) => {
    window.location = `/search?subcat=${id}&lat=${location.lat}&lng=${location.lng}`;
  };
  return (
    <>
      {subcats && (
        <>
          <b>{subcats.category}</b>
          {subcats.sucategories &&
            subcats.sucategories.map((sub) => (
              <li
                key={sub.id}
                style={{
                  marginLeft: "15px",
                }}
              >
                <Link
                  onClick={(e) => {
                    redirectUser(sub.id);
                  }}
                  to="#"
                  style={
                    subCat == sub.id
                      ? {
                          color: "blue",
                          textDecoration: "none",
                          fontWeight: "bold",
                        }
                      : {}
                  }
                >
                  {sub.name}
                </Link>
              </li>
            ))}
        </>
      )}
      <br />
      {leftad && <img src={leftadlink} alt="leftBar" className="img-fluid" />}
    </>
  );
};

export default LeftBar;
