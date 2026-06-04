import React, { useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export function GlobalLoader() {
  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "96px", height: "96px", borderRadius: "50%", border: "2px solid transparent", borderTopColor: "#fbbf24", borderBottomColor: "#f59e0b", animation: "spin 1.5s linear infinite" }}></div>
        <span style={{ position: "absolute", fontFamily: "Montserrat, sans-serif", fontSize: "12px", color: "#fbbf24", letterSpacing: "0.3em", textTransform: "uppercase" }}>JAYDRIZ</span>
      </div>
      <p style={{ marginTop: "32px", fontFamily: "Montserrat, sans-serif", fontSize: "9px", color: "rgba(245,158,11,0.6)", letterSpacing: "0.4em", textTransform: "uppercase" }}>
        Luxury Artistry Loading...
      </p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section style={{ position: "relative", height: "90vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", backgroundColor: "black", color: "white" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img
          src="https://res.cloudinary.com/dehvk3bre/image/upload/v1780415231/20260331_085939_0000_npvhz9.png"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.7 }}
          alt="Jaydriz Cosmetics Hero Model"
        />
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)" }}></div>
      </div>

      <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: "896px", padding: "24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "11px", color: "#fbbf24", letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: "16px" }}>
          Premium Professional Range
        </span>
        <h1 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "48px", fontWeight: "bold", letterSpacing: "0.2em", textTransform: "uppercase", lineHeight: 1, marginBottom: "24px", color: "white" }}>
          JAYDRIZ
        </h1>
        <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: "20px", color: "rgba(254,243,199,0.9)", maxWidth: "672px", letterSpacing: "0.05em", marginBottom: "48px" }}>
          "Redefining Professional Beauty & Radiant Artistry"
        </p>
        
        <a
          href="https://res.cloudinary.com/dehvk3bre/image/upload/v1780420189/SkFZRFJJWl9DQVRBTE9HLWNvbXByZXNzZWRfZWdkbTg0/JAYDRIZ_CATALOG-compressed_egdm84.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", backgroundColor: "white", color: "black", fontFamily: "Montserrat, sans-serif", fontSize: "10px", letterSpacing: "0.3em", fontWeight: "bold", padding: "20px 48px", border: "1px solid white", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s ease" }}
        >
          View Catalogue →
        </a>
      </div>
    </section>
  );
}

export function Shop({ products, onSelectProduct }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Face", "Eyes", "Artistry"];

  const filtered = products.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <section style={{ backgroundColor: "#FAF7F5", padding: "96px 24px" }}>
      <div style={{ textAlign: "center", maxWidth: "768px", margin: "0 auto 64px auto" }}>
        <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.3em", color: "#806B5F", fontWeight: "bold" }}>The Collection</span>
        <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "32px", color: "black", fontWeight: "bold", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "8px", marginBottom: "16px" }}>
          SHOP PRODUCTS
        </h2>
        <div style={{ width: "64px", height: "2px", backgroundColor: "rgba(128,107,95,0.3)", margin: "0 auto" }}></div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "64px", overflowX: "auto", padding: "8px 0" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "14px 32px",
              fontSize: "10px",
              letterSpacing: "0.25em",
              fontWeight: "bold",
              textTransform: "uppercase",
              border: "1px solid rgba(0,0,0,0.05)",
              borderRadius: "2px",
              cursor: "pointer",
              backgroundColor: activeCategory === cat ? "black" : "white",
              color: activeCategory === cat ? "white" : "grey",
              transition: "all 0.3s ease"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "32px", maxWidth: "1200px", margin: "0 auto" }}>
        {filtered.map((prod) => (
          <div
            key={prod.id}
            onClick={() => onSelectProduct(prod)}
            style={{
              cursor: "pointer",
              backgroundColor: "white",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: "4px",
              border: "1px solid rgba(0,0,0,0.05)",
              transition: "transform 0.3s ease"
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "300px", backgroundColor: "#f3f4f6", overflow: "hidden" }}>
              <img
                src={prod.image}
                alt={prod.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
              />
            </div>

            <div style={{ padding: "20px" }}>
              <span style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#806B5F", fontWeight: "bold", fontFamily: "Montserrat, sans-serif" }}>
                {prod.category}
              </span>
              <h3 style={{ fontSize: "14px", color: "black", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {prod.name}
              </h3>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", borderTop: "1px solid #f3f4f6", paddingTop: "12px" }}>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#806B5F" }}>
                  ₦{prod.price.toLocaleString("en-NG")}
                </span>
                {prod.shades && prod.shades.length > 0 && (
                  <span style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9ca3af", backgroundColor: "#f9fafb", padding: "2px 8px", border: "1px solid #f3f4f6" }}>
                    {prod.shades.length} Shades
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProductDetail({ product, onBack, onAddToCart }) {
  const [selectedShade, setSelectedShade] = useState(
    product.shades && product.shades.length > 0 ? product.shades[0] : ""
  );
  const [quantity, setQuantity] = useState(1);
  const businessNumber = "2348035399521";

  const handleOrderViaWhatsApp = () => {
    const formattedPrice = `₦${(product.price * quantity).toLocaleString("en-NG")}`;
    const shadeText = selectedShade ? `%0A*Selected Shade:* ${selectedShade}` : "";
    const message = `🛍️ JAYDRIZ COSMETICS ORDER%0A%0A*Product:* ${product.name}${shadeText}%0A*Quantity:* ${quantity}%0A*Total Order Price:* ${formattedPrice}%0A%0AKindly process my order, provide me with your bank details, and share payment confirmation. Thank you!`;
    const waUrl = `https://wa.me/${businessNumber}?text=${message}`;
    window.open(waUrl, "_blank");
  };

  const handleMinus = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  return (
    <section style={{ backgroundColor: "white", padding: "64px 24px" }}>
      <button
        onClick={onBack}
        style={{ background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.25em", color: "#9ca3af", marginBottom: "48px" }}
      >
        <ArrowLeft size={12} />
        <span>← Back to Shop</span>
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "64px", maxWidth: "1100px", margin: "0 auto", alignItems: "start" }}>
        <div style={{ height: "450px", backgroundColor: "#f9fafb", border: "1px solid #f3f4f6", overflow: "hidden", position: "relative" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <div>
            <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.3em", fontWeight: "bold", color: "#806B5F" }}>
              {product.category}
            </span>
            <h1 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "28px", color: "black", fontWeight: "800", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "8px", marginBottom: "16px" }}>
              {product.name}
            </h1>
            <span style={{ fontSize: "20px", fontWeight: "bold", color: "#806B5F" }}>
              ₦{product.price.toLocaleString("en-NG")}
            </span>
          </div>

          <div style={{ height: "1px", backgroundColor: "#f3f4f6" }}></div>

          <div>
            <h3 style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "bold", color: "#9ca3af", marginBottom: "12px" }}>
              Product Overview
            </h3>
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: "1.6" }}>
              {product.description}
            </p>
          </div>

          {product.shades && product.shades.length > 0 && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "bold", color: "#9ca3af" }}>
                  Select Accent Shade
                </h3>
                <span style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", backgroundColor: "#fffbeb", color: "#806B5F", fontWeight: "bold", padding: "2px 8px" }}>
                  {selectedShade}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {product.shades.map((shade) => (
                  <button
                    key={shade}
                    onClick={() => setSelectedShade(shade)}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "1px solid",
                      borderColor: selectedShade === shade ? "#806B5F" : "#e5e7eb",
                      backgroundColor: shade,
                      transform: selectedShade === shade ? "scale(1.1)" : "scale(1)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease"
                    }}
                    title={shade}
                  >
                    {selectedShade === shade && (
                      <span style={{ width: "6px", height: "6px", backgroundColor: "#806B5F", borderRadius: "50%" }}></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "bold", color: "#9ca3af", marginBottom: "12px" }}>
              Configure Quantity
            </h3>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #e5e7eb", width: "fit-content" }}>
              <button
                onClick={handleMinus}
                style={{ border: "none", background: "none", cursor: "pointer", padding: "8px 16px", fontWeight: "bold" }}
              >
                -
              </button>
              <span style={{ padding: "8px 24px", fontSize: "14px", fontWeight: "bold", fontFamily: "monospace" }}>
                {quantity}
              </span>
              <button
                onClick={handlePlus}
                style={{ border: "none", background: "none", cursor: "pointer", padding: "8px 16px", fontWeight: "bold" }}
              >
                +
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px", paddingTop: "16px" }}>
            <button
              onClick={handleOrderViaWhatsApp}
              style={{
                flex: 1,
                backgroundColor: "#065f46",
                color: "white",
                padding: "20px",
                fontSize: "10px",
                fontFamily: "Montserrat, sans-serif",
                letterSpacing: "0.2em",
                fontWeight: "bold",
                border: "none",
                borderRadius: "2px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                transition: "background-color 0.3s ease"
              }}
            >
              Order via WhatsApp
            </button>

            <button
              onClick={() => onAddToCart(product, selectedShade, quantity)}
              style={{
                padding: "20px 32px",
                border: "1px solid black",
                background: "none",
                cursor: "pointer",
                fontSize: "10px",
                fontWeight: "bold",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                transition: "all 0.3s ease"
              }}
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
