import { useEffect, useState } from "react";
import API from "../api/axios";

function Products() {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const[name,setName]=useState("");
  const[price,setPrice]=useState("");
  const[category,setCategory]=useState("");


  const limit = 5;

  const fetchProducts = async () => {
    try {
      const res = await API.get(
        `/products?page=${page}&limit=${limit}&search=${debouncedSearch}`
      );

      setProducts(res.data.products);
      setTotal(res.data.total);

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };


  const handleAddProduct=async()=>{
    try {
      const res=await API.post("/products",{name,price,category});
    }  catch(err){
      console.log(err.response?.data || err.message);
    }
    setName("");
    setPrice("");
    setCategory("");
    setPage(1);
    fetchProducts();
  }


  // API call trigger
  useEffect(() => {
    fetchProducts();
  }, [page, debouncedSearch]);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      <h2>Add New Product</h2>
      
      <input 
      type="text"
      placeholder="Name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />

      <input 
      type="number"
      placeholder="Price"
      value={price}
      onChange={(e)=>setPrice(e.target.value)}
      />

      <input 
      type="text"
      placeholder="Category"
      value={category}
      onChange={(e)=>setCategory(e.target.value)}
      />

      <button onClick={handleAddProduct}>Add Product</button>

      <h2>Products</h2>

      {/* 📦 Product List */}
      {products.map((p) => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>₹ {p.price}</p>
          <p>{p.category}</p>
          <hr />
        </div>
      ))}

      {/* 📄 Pagination */}
      <div>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span> Page {page} of {totalPages || 1} </span>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default Products;