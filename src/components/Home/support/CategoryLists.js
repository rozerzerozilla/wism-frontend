import noImage from "../../../assets/img/no.png";
import { Link } from "react-router-dom";
const CategoryLists = ({ categories }) => {
  return (
    <section id="categories" className="d-none d-sm-block d-md-block">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 col-md-12 col-xs-12">
            <div
              style={{ display: "flex" }}
              className="categories-wrapper owl-carousel owl-theme"
            >
              {categories &&
                categories.map((cat) => (
                  <div className="item" style={{ width: "130px" }} key={cat.id}>
                    <Link to={`/categories/${cat.id}`}>
                      <div className="category-icon-item">
                        <div className="icon-box">
                          <div className="icon">
                            <img
                              src={cat.image ? cat.image : noImage}
                              alt=""
                              width="80"
                            />
                          </div>
                          <h4>{cat.name}</h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryLists;
