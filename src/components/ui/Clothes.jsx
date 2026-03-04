import "./Clothes.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext";
const products = [
  { id: 1, name: "T-shirt for men", price: "$10.30", img: "../assets/Layout/alibaba/Image/cloth/Bitmap.png "},
  { id: 2, name: "Winter Jacket", price: "$10.30", img: "../assets/Layout/alibaba/Image/cloth/2 1.png" },
  { id: 3, name: "Brown Winter Coat", price: "$12.50", img: "../assets/Layout/alibaba/Image/cloth/Bitmap.png" },
  { id: 4, name: "Leather Wallet", price: "$34.00", img: "../assets/Layout/alibaba/Image/cloth/image 24.png" },
  { id: 5, name: "Travel Backpack", price: "$99.00", img: "../assets/Layout/alibaba/Image/cloth/image 26.png" },
  { id: 6, name: "Jeans Shorts", price: "$9.99", img: "../assets/Layout/alibaba/Image/cloth/Bitmap (2).png" },
];

export default function Clothes() {
  const sendInquiry = () => {
    alert("Inquiry sent to suppliers!");
  };

  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    const price = parseFloat(product.price.replace('$', ''));
    addToCart({
      id: product.id,
      title: product.name,
      price: price,
      image: product.img,
      qty: 1,
    });
    alert(`${product.name} added to cart!`);
  };

  const handlePageClick = (n) => {
    if (n === 1) {
      navigate(-1);
    } else if (n === 2) {
      navigate("/productPage");
    } else {
      navigate(`/productPage?page=${n}`);
    }
  };

  return (
    <div className="home">

      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-left">
          <h1>An easy way to send requests to all suppliers</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <div className="hero-form">
          <h3>Send quote to suppliers</h3>
          <input placeholder="What item you need?" />
          <textarea placeholder="Type more details" />
          <div className="form-row">
            <input type="number" placeholder="Quantity" />
            <select>
              <option>Pcs</option>
              <option>Kg</option>
            </select>
          </div>
          <button onClick={sendInquiry}>Send inquiry</button>
        </div>
      </div>

      {/* PRODUCTS */}
      <h2 className="section-title">Recommended items</h2>
      <div className="product-grid">
        {products.map((p, index) => (
          <div className="product-card" key={`${p.id}-${index}`} onClick={() => handleAddToCart(p)} style={{ cursor: 'pointer' }}>
            <img src={p.img} alt={p.name} />
            <h4>{p.price}</h4>
            <p>{p.name}</p>
            <button onClick={(e) => { e.stopPropagation(); handleAddToCart(p); }}>Add-to-Cart</button>
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <h2 className="section-title">Our extra services</h2>
      <div className="services">
        <button onClick={() => alert("Sourcing from hubs")}>Source from Industry Hubs</button>
        <button onClick={() => alert("Customization service")}>Customize Your Products</button>
        <button onClick={() => alert("Shipping service")}>Fast Shipping</button>
        <button onClick={() => alert("Inspection service")}>Product Inspection</button>
      </div>
           
           <div>
                 {/* Pagination */}
          <div style={{alignContent:"center",marginLeft:'780px',marginTop:'40px'}}>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className="px-3 py-1 border rounded hover:bg-gray-100"
                onClick={() => handlePageClick(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
    </div>



  );
}
