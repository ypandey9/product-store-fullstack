import { useEffect, useState } from "react";
import API from "../api/axios";

function Products() {

  const [products, setProducts] = useState([]);
  cosnt [page,setPage]=useState(1);
  const [total,setTotal]=useState(1);
  const [search,setSearch]=useState("");
  const limit=5;

  useEffect(() => {
    fetchProducts();
  }, [page,search]);

  const fetchProducts = async () => {
    try {
      const res = await API.get(`/products?page=${page}$limit=${limit}&search=${search}`);
      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div>

    <input
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e)=>{
      setPage(1); // reset page
      setSearch(e.target.value);
    }}
    />

      <h2>Products</h2>

      {products.map((p) => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>₹ {p.price}</p>
          <p>{p.category}</p>
          <hr />
        </div>
      ))}

    </div>
  );
}

export default Products;