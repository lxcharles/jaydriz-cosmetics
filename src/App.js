import React, { useState, useEffect } from "react";
import { productsList } from "./ProductData";
import { GlobalLoader, HeroSection, Shop, ProductDetail } from "./Components";
import { ShoppingBag, X, MessageSquare, ArrowUp } from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    setCurrentView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (product, selectedShade, quantity) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedShade === selectedShade
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, selectedShade, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (idx, isPlus) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      if (isPlus) {
        updated[idx].quantity += 1;
      } else {
        if (updated[idx].quantity > 1) {
          updated[idx].quantity -= 1;
        } else {
          updated.splice(idx, 1);
        }
      }
      return updated;
    });
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  };

  const handleCheckoutCartViaWhatsApp = () => {
    if (cart.length === 0) return;

    let itemsString = "";
    cart.forEach((item, index) => {
      const shadeDetail = item.selectedShade ? ` (Shade: ${item.selectedShade})` : "";
      itemsString += `${index + 1}. *${item.product.name}*${shadeDetail}%0A   _Qty: ${item.quantity}_ x ₦${item.product.price.toLocaleString("en-NG")}%0A%0A`;
    });

    const totalStr = `₦${calculateSubtotal().toLocaleString("en-NG")}`;
    const message = `🛍️ JAYDRIZ COSMETICS - MASTER ORDER%0A%0A*Items Selected:*%0A${itemsString}*Total Bag Value:* ${totalStr}%0A%0AKindly confirm availability, share bank details, and coordinate swift courier dispatch. Thanks!`;
    
    window.open(`https://wa.me/2348035399521?text=${message}`, "_blank");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF7F5", color: "black", fontFamily: "sans-serif", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      {isLoading && <GlobalLoader />}

      <header style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(4px)", borderBottom: "1px solid #f3f4f6", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button
          onClick={() => {
            setCurrentView("home");
            setSelectedProduct(null);
          }}
          style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Montserrat, sans-serif", fontWeight: "900", fontSize: "18px", letterSpacing: "0.25em", color: "black", textTransform: "uppercase" }}
        >
          JAYDRIZ
        </button>

        <nav style={{ display: "flex", gap: "48px" }}>
          <button
            onClick={() => {
              setCurrentView("home");
              setSelectedProduct(null);
            }}
            style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Montserrat, sans-serif", fontSize: "10px", letterSpacing: "0.25em", fontWeight: "bold", textTransform: "uppercase", color: currentView === "home" ? "black" : "#9ca3af" }}
          >
            Home
          </button>
          <button
            onClick={() => {
              setCurrentView("shop");
              setSelectedProduct(null);
            }}
            style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Montserrat, sans-serif", fontSize: "10px", letterSpacing: "0.25em", fontWeight: "bold", textTransform: "uppercase", color: currentView === "shop" ? "black" : "#9ca3af" }}
          >
            The shop
          </button>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <button
            onClick={() => setIsCartOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "8px", color: "black" }}
          >
            <ShoppingBag size={20} />
            {cart.length > 0 && (
              <span style={{ position: "absolute", top: "-4px", right: "-4px", backgroundColor: "black", color: "white", fontFamily: "monospace", fontWeight: "bold", fontSize: "8px", height: "16px", width: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      <main style={{ flexGrow: 1 }}>
        {currentView === "home" && (
          <div>
            <HeroSection />
            <Shop
              products={productsList}
              onSelectProduct={handleSelectProduct}
            />
          </div>
        )}

        {currentView === "shop" && (
          <Shop
            products={productsList}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === "detail" && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => {
              setCurrentView("shop");
              setSelectedProduct(null);
            }}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>

      {isCartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
          <div
            onClick={() => setIsCartOpen(false)}
            style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          ></div>

          <div style={{ position: "relative", width: "100%", maxWidth: "448px", height: "100%", backgroundColor: "white", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", display: "flex", flexDirection: "column", justifyContent: "space-between", zIndex: 10 }}>
            <div style={{ padding: "24px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <ShoppingBag size={18} style={{ color: "#806B5F" }} />
                <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "12px", letterSpacing: "0.2em", fontWeight: "extrabold", textTransform: "uppercase", color: "black" }}>
                  My Shopping Bag
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "grey" }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ flexGrow: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
              {cart.length === 0 ? (
                <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "16px" }}>
                  <ShoppingBag size={24} style={{ color: "grey" }} />
                  <div>
                    <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "10px", letterSpacing: "0.1em", fontWeight: "bold", textTransform: "uppercase", color: "black" }}>
                      Your bag is empty
                    </h3>
                    <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>
                      Curate beauty items from our premium cosmetics collections.
                    </p>
                  </div>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedShade}`}
                    style={{ display: "flex", gap: "16px", borderBottom: "1px solid #f9fafb", paddingBottom: "24px" }}
                  >
                    <div style={{ width: "80px", height: "96px", backgroundColor: "#f3f4f6", overflow: "hidden", flexShrink: 0 }}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <h4 style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: "extrabold", color: "black", fontFamily: "Montserrat, sans-serif", letterSpacing: "0.05em" }}>
                          {item.product.name}
                        </h4>
                        {item.selectedShade && (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                            <span style={{ fontSize: "8px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em" }}>Shade:</span>
                            <span
                              style={{ width: "12px", height: "12px", borderRadius: "50%", border: "1px solid #e5e7eb", backgroundColor: item.selectedShade }}
                            ></span>
                            <span style={{ fontSize: "8px", fontFamily: "monospace", color: "#6b7280" }}>{item.selectedShade}</span>
                          </div>
                        )}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", border: "1px solid #e5e7eb" }}>
                          <button
                            onClick={() => handleUpdateCartQty(idx, false)}
                            style={{ border: "none", background: "none", cursor: "pointer", padding: "4px 10px", fontSize: "10px" }}
                          >
                            -
                          </button>
                          <span style={{ padding: "0 10px", fontSize: "10px", fontWeight: "bold", fontFamily: "monospace" }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateCartQty(idx, true)}
                            style={{ border: "none", background: "none", cursor: "pointer", padding: "4px 10px", fontSize: "10px" }}
                          >
                            +
                          </button>
                        </div>
                        <span style={{ fontSize: "12px", fontWeight: "600", color: "#1f2937" }}>
                          ₦{(item.product.price * item.quantity).toLocaleString("en-NG")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: "24px", borderTop: "1px solid #f3f4f6", backgroundColor: "#FAF7F5", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7280" }}>
                    Est. Subtotal
                  </span>
                  <span style={{ fontSize: "16px", fontWeight: "bold", color: "black", fontFamily: "monospace" }}>
                    ₦{calculateSubtotal().toLocaleString("en-NG")}
                  </span>
                </div>
                
                <button
                  onClick={handleCheckoutCartViaWhatsApp}
                  style={{
                    width: "100%",
                    backgroundColor: "#14532d",
                    color: "white",
                    padding: "16px",
                    fontSize: "10px",
                    fontFamily: "Montserrat, sans-serif",
                    letterSpacing: "0.25em",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    border: "none",
                    borderRadius: "2px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease"
                  }}
                >
                  Order Bag via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <a
        href="https://wa.me/2348035399521?text=Hello%20JAYDRIZ%20COSMETICS,%20I'm%20writing%20to%20inquire%20about%20your%20professional%20beauty%20line%20and%20makeup%20products."
        target="_blank"
        rel="noopener noreferrer"
        style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 50, backgroundColor: "#25d366", color: "white", padding: "16px", borderRadius: "50%", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}
        aria-label="Contact JAYDRIZ on WhatsApp"
      >
        <MessageSquare size={24} />
      </a>

      <footer style={{ backgroundColor: "black", color: "white", padding: "64px 24px 48px 24px", borderTop: "1px solid #111827" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "48px" }}>
          <div>
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "14px", fontWeight: "900", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "16px" }}>
              JAYDRIZ COSMETICS
            </h2>
            <p style={{ fontSize: "11px", color: "#6b7280", lineHeight: "1.6" }}>
              An elite professional beauty studio providing luxury, long-wear cosmetic formulas. Specially customized high pigments, flawless foundations, and pro tools crafted for absolute artistic excellence.
            </p>
          </div>

          <div>
            <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "10px", letterSpacing: "0.3em", fontWeight: "bold", textTransform: "uppercase", color: "#f59e0b", marginBottom: "16px" }}>
              Support & Inquiries
            </h3>
            <p style={{ fontSize: "11px", color: "#9ca3af", lineHeight: "1.6" }}>
              WhatsApp: <a href="https://wa.me/2348035399521" style={{ color: "#fbbf24", fontWeight: "bold", textDecoration: "underline", fontFamily: "monospace" }}>+234 803 539 9521</a>
              <br />
              Location: Trade Fair Lagos, Nigeria
              <br />
              Hours: Mon - Sat, 9 AM - 6 PM
            </p>
          </div>
        </div>

        <div style={{ maxWidth: "1100px", margin: "48px auto 0 auto", borderTop: "1px solid #111827", paddingTop: "24px", textAlign: "center" }}>
          <p style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#4b5563", textTransform: "uppercase" }}>
            © 2026 JAYDRIZ COSMETICS. All Luxury Rights Reserved.
          </p>
        </div>
      </footer>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ position: "fixed", bottom: "96px", right: "32px", zIndex: 49, backgroundColor: "white", color: "black", padding: "8px", borderRadius: "50%", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #f3f4f6", cursor: "pointer" }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} />
        </button>
      )}
    </div>
  );
}
