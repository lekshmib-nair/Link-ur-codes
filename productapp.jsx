import { useState } from "react";

function ProductForm({ onAddProduct }) {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    mfgDate: "",
    expiry: "",
    manufacturer: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(product);
    setProduct({ name: "", category: "", price: "", mfgDate: "", expiry: "", manufacturer: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={product.category} onChange={handleChange} required />
      <input name="price" type="number" placeholder="Price" value={product.price} onChange={handleChange} required />
      <input name="mfgDate" type="date" value={product.mfgDate} onChange={handleChange} required />
      <input name="expiry" type="date" value={product.expiry} onChange={handleChange} required />
      <input name="manufacturer" placeholder="Manufacturer" value={product.manufacturer} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
}

function ProductSearch({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input type="text" placeholder="Search Product" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={() => onSearch(query)}>Search</button>
    </div>
  );
}

function ProductCart({ products }) {
  return (
    <div>
      {products.slice(0, 10).map((product, index) => (
        <div key={index}>
          <h3>{product.name}</h3>
          <p>Category: {product.category}</p>
          <p>Price: ₹{product.price}</p>
          <p>Manufacturer: {product.manufacturer}</p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
    setFilteredProducts([...products, product]);
  };

  const searchProduct = (query) => {
    setFilteredProducts(products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())));
  };

  return (
    <div>
      <h1>Product App</h1>
      <ProductForm onAddProduct={addProduct} />
      <ProductSearch onSearch={searchProduct} />
      <ProductCart products={filteredProducts} />
    </div>
  );
}
