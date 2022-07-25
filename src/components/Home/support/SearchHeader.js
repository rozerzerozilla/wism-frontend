import { Link } from "react-router-dom";
const SearchHeader = ({ listView, setListView }) => {
  return (
    <>
      <div
        className="row mt-5 mx-5"
        style={{ border: "1px solid #ccc", borderRadius: "4px" }}
      >
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "10px" }}
        >
          <div style={{ flexGrow: 2, textAlign: "center" }}>
            {/* <button
              type="button"
              className="btn btn-info"
              style={{ marginRight: "5px" }}
            >
              <i
                className="lni-arrow-down"
                style={{ fontSize: "13px", fontWeight: "bold", margin: "5px" }}
              ></i>
              Popularity
            </button>
            <button
              type="button"
              className="btn btn-info"
              style={{ marginRight: "15px" }}
            >
              <i
                className="lni-arrow-down"
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  margin: "5px",
                }}
              ></i>
              Ratings
            </button> */}
          </div>
          <div
            style={{ flexGrow: 1, textAlign: "center", marginBottom: "10px" }}
          >
            <Link
              to="#"
              style={
                listView
                  ? {
                      marginRight: "10px",
                      textDecoration: "underline",
                      color: "blue",
                    }
                  : {}
              }
              onClick={(e) => setListView(!listView)}
            >
              List View
            </Link>
            <Link
              to="#"
              style={
                !listView
                  ? {
                      marginLeft: "15px",
                      textDecoration: "underline",
                      color: "blue",
                    }
                  : {}
              }
              onClick={(e) => setListView(!listView)}
            >
              Map & List View
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchHeader;
