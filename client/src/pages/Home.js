import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/PriceFilter";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";

const Home = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [visible, setVisible] = useState(5);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  //get all catagory
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  //Load more
  const loadMoreItems = () => {
    setVisible((prev) => prev + 5);
  };

  return (
    <Layout title={"All Products- Home"}>
      <div className="row">
        <div className="col-md-2 m-4 mt-3">
          <h4 className="text-center">Filter by category</h4>
          <div className="d-flex flex-column">
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* Price Filter       */}
          <h4 className="text-left mt-4">Filter by price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger mt-4"
              onClick={() => window.location.reload()}
            >
              {" "}
              Rest Filter
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h2 className="text-center">All products</h2>

          {products?.splice(0, visible).map((pd) => (
            <section style={{ backgroundColor: "#eee" }}>
              <div className="container py-1">
                <div className="row justify-content-center mb-3">
                  <div className="col-md-12 col-xl-10">
                    <div className="card shadow-0 border rounded-3">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                            <div className="bg-image hover-zoom ripple rounded ripple-surface">
                              <img
                                style={{ height: "150px" }}
                                src={`/api/v1/product/product-photo/${pd._id}`}
                                className="w-100"
                                alt={pd.name}
                              />
                              <a href="#!">
                                <div className="hover-overlay">
                                  <div
                                    className="mask"
                                    style={{
                                      backgroundColor:
                                        "rgba(253, 253, 253, 0.15)",
                                    }}
                                  />
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6 col-xl-6">
                            <h5>{pd.name}</h5>

                            <div className="mt-1 mb-0 text-muted small">
                              <span>In stock: {pd.quantity}</span>
                              <br />
                            </div>

                            <p className="text-truncate mb-4 mb-md-0">
                              {pd.description.substring(0, 50)}....
                            </p>
                          </div>
                          <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                            <div className="d-flex flex-row align-items-center mb-1">
                              <h4 className="mb-1 me-1">${pd.price}</h4>
                            </div>
                            <h6 className="text-success">Free shipping</h6>
                            <div className="d-flex flex-column mt-4">
                              <button
                                className="btn btn-primary btn-sm"
                                type="button"
                                onClick={() => navigate(`/product/${pd.slug}`)}
                              >
                                Details
                              </button>
                              <button
                                className="btn btn-outline-primary btn-sm mt-2"
                                type="button"
                                onClick={() => {
                                  setCart([...cart, pd]);
                                  localStorage.setItem(
                                    "cart",
                                    JSON.stringify([...cart, pd])
                                  );

                                  toast.success("Item added successfully");
                                }}
                              >
                                Add to cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
          <div className="text-left my-2">
            {loading ? (
              <button className="btn btn-primary">Loading....</button>
            ) : (
              <button className="btn btn-primary" onClick={loadMoreItems}>
                Load more
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
