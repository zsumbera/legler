import React, { useState, useEffect } from 'react';
import { useParams, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';
import { Modal, Button, Navbar, Container, Carousel } from 'react-bootstrap';
import './App.css';

const products = [
  { id: 1, name: "Miele Mosógép", price: 120000, img: "/6I8B0457-500x692.jpg", description: "Miele mosógép W Meteor3000, használt, szervizünk által felújított , ezért garanciával adunk rá." },
  { id: 2, name: "Miele Kávéfőző", price: 250000, img: "/miele-cm-6160-2.webp", description: "" },
  { id: 3, name: "Miele Kávéfőző", price: 350000, img: "/miele-cm-6160-2.webp", description: "" },
  { id: 4, name: "Miele Mosógép", price: 120000, img: "/6I8B0457-500x692.jpg", description: "Miele mosógép W Meteor3000, használt, szervizünk által felújított , ezért garanciával adunk rá." },
  { id: 5, name: "Miele Kávéfőző", price: 250000, img: "/miele-cm-6160-2.webp", description: "" },
  // További termékek...
];

function App() {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const location = useLocation();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const navigate = useNavigate();

  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  const addToCart = (product) => {
    const isProductAlreadyInCart = cart.some(item => item.id === product.id);

    if (isProductAlreadyInCart) {
      setAddedProduct(product);
      setIsProductInCart(true);
      setShowModal(true);
    } else {
      setCart(prevCart => [...prevCart, product]);
      setAddedProduct(product);
      setIsProductInCart(false);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const backtoproducts = () => {
    navigate('/products');
    handleCloseModal();
  };

  return (
    <>
      <CustomNavbar cart={cart} />
      {location.pathname === '/' && <ProductCarousel />}
      {location.pathname === '/' && <AboutSection />}
      {location.pathname === '/guarantee' && <Guarantee />}
      {location.pathname === '/contact' && <Contact />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route path="/products" element={<ProductList addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
      </Routes>

      <Footer /> {/* Footer hozzáadása */}

      {/* Kosárba helyezve modális ablak */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isProductInCart
              ? `${addedProduct?.name} már a kosárban van`
              : `${addedProduct?.name} sikeresen hozzáadva a kosárhoz`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {isProductInCart
              ? `A(z) ${addedProduct?.name} már a kosárban van.`
              : `A(z) ${addedProduct?.name} sikeresen hozzáadva a kosárhoz!`}
          </p>
        </Modal.Body>
        <Modal.Footer>
          {/* Vásárlás folytatása gomb */}
          {!isProductInCart && (
            <Button variant="secondary" onClick={backtoproducts}>
              Vásárlás folytatása
            </Button>
          )}
          {/* Kosár megtekintése gomb */}
          <Link to="/cart">
            <Button variant="primary" onClick={handleCloseModal}>
              Kosár megtekintése
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const CustomNavbar = ({ cart }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavbar = () => setIsNavOpen(!isNavOpen);

  const closeNavbar = () => setIsNavOpen(false);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img alt="logo" src={logo} style={{ maxWidth: "100%", height: "auto" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
        <Navbar.Collapse id="basic-navbar-nav" in={isNavOpen}>
          <div className="d-flex flex-lg-row flex-column align-items-center w-100">
            <Link className="btn btn-light me-2 mb-2 mb-lg-0" to="/" onClick={() => { closeNavbar(); window.scrollTo(0, 0); }}>
              Kezdőlap
            </Link>
            <Link className="btn btn-light me-2 mb-2 mb-lg-0" to="/products" onClick={() => { closeNavbar(); window.scrollTo(0, 0); }}>
              Termékek
            </Link>
            <Link className="btn btn-light me-2 mb-2 mb-lg-0" to="/guarantee" onClick={() => { closeNavbar(); window.scrollTo(0, 0); }}>
              Garancia
            </Link>
            <Link className="btn btn-light me-2 mb-2 mb-lg-0" to="/contact" onClick={() => { closeNavbar(); window.scrollTo(0, 0); }}>
              Kapcsolat
            </Link>
            <Link to="/cart" className="btn btn-light" onClick={closeNavbar}>
              <img className="sml_logo" src="/shopping-cart.png" alt="kep" />
              Kosár ({cart.length})
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

function ProductCarousel() {
  return (
    <div className="carousel-container mt-4">
      <Carousel>
        <Carousel.Item>
          <img className="d-block mx-auto img-fluid" src="./slide_show_miert_miele.jpg" alt="Hirdetés 1" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block mx-auto img-fluid" src="/slide_show_szerviz.jpg" alt="Hirdetés 2" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block mx-auto img-fluid" src="/slide_show_gepek.jpg" alt="Hirdetés 3" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

function ProductList({ addToCart }) {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Termékek</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card h-100">
              <img src={product.img} className="card-img-top product-image img-fluid" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price} Ft</p>
                <div className="d-flex flex-column">
                  <Link to={`/product/${product.id}`} className="btn btn-secondary mb-2">
                    Részletek
                  </Link>
                  <button onClick={() => addToCart(product)} className="btn btn-danger">
                    Kosárba
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  return (
    <div className="container mt-4">
      {product ? (
        <div className="row">
          <div className="col-md-6">
            <img src={product.img} className="img-fluid" alt={product.name} />
          </div>
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p><strong>{product.price} Ft</strong></p>
            <button className="btn btn-danger" onClick={() => addToCart(product)}>
              Kosárba
            </button>
          </div>
        </div>
      ) : (
        <p>Termék nem található.</p>
      )}
    </div>
  );
}
function AboutSection() {
  return (
    <section className="about-section py-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>Rólunk</h2>
            <p>
              20 éve családi vállalkozásként a Miele márkára specializálódtunk, és prémium háztartási gépek felújításával, értékesítésével és szervizelésével foglalkozunk. Mi minden gépet teljesen felújítunk, mielőtt eladásra kínálnánk őket, és minden termékre 1-2 év teljes körű garanciát vállalunk.
            </p>
            <p>
              A Miele gépek híresek hosszú élettartamukról, mi pedig biztosítjuk, hogy ezek a gépek még hosszú éveken át kifogástalanul működjenek, a legmagasabb minőségű alkatrészekkel és szakértelemmel.
            </p>
            <p>
              Szeretnéd a legjobbat választani? Kínálatunkban csak a legjobban felújított, prémium gépek találhatók, amiket teljes tesztelés után kínálunk eladásra. Fedezd fel most a választékunkat!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cart({ cart, setCart }) {
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId)); // Eltávolítja a terméket a kosárból
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0); // Kosár összesítése

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Kosár</h1>
      <div className="row">
        {/* Bal oldali oszlop: Termékek listája */}
        <div className="col-md-8">
          {cart.length === 0 ? (
            <p>A kosár üres</p>
          ) : (
            <div className="list-group">
              {cart.map((item) => (
                <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={item.img} alt={item.name} className="cart-item-image" style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px" }} />
                    <span>{item.name}</span>
                  </div>
                  <div>
                    <span>{item.price} Ft</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="btn btn-danger btn-sm ms-3"
                    >
                      Törlés
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Jobb oldali oszlop: Összegzés és megrendelés gomb */}
        <div className="col-md-4">
          {cart.length > 0 && (
            <div className="card">
              <div className="card-body">
                <h3>Összesen: {totalPrice} Ft</h3>
                <button className="btn btn-success w-100">Megrendelés</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Guarantee(){
  return(
    <section className="about-section py-5 bg-light">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h2>Garancia</h2>
          <p>
          A háztartási nagy gépekre:mosógép, szárítógép, sütő, hűtőszekrény, stb. 2 év teljeskörű garanciát vállalunk. A kisgépek esetén - porszívó, mikró, kávégép - 1 év a garancia.
          </p>
        </div>
      </div>
    </div>
  </section>
  )
}

function Contact(){
  return(
    <section id="kapcsolat" class="kontakt-section">
  <div class="container">
    <h2>Kapcsolat, elérhetőségek, partnerré válás folyamata</h2>
    <p>Tisztelt leendő partnerünk!</p>
    <p>Amennyiben további információra van szüksége, kérjük keressen minket e-mailben vagy az alábbi elérhetőségeken! Köszönjük.</p>
    
    <div class="contact-details">
      <p><strong>Telefon:</strong> 36-20-514-5941</p>
      <p><strong>Cím:</strong> 9099 Pér, Szent László u. 18.</p>
      <p><strong>Adószám:</strong> 22497884-2-08</p>
      <p><strong>Cég tulajdonos:</strong> Legler Csaba</p>
    </div>
  </div>
</section>

  )
}

function Footer() {
  return (
    <footer className="custom-footer">
      <div className="footer-content">
        <img src="/infoblokk_kedv_final_CMYK_ERFA.jpg" alt="Logo" className="footer-image" />
        <div className="footer-text">
          <p>Európai Uniós támogatásból megvalósuló fejlesztések.</p>
          <p>Projekt: GINOP-9.1.1-21 azonosító jelű Kamatmentes Újraindítási Gyorskölcsön Hitelprogram</p>
          <p>Kedvezményezett: Legler & Társa Korlátolt Felelősségű Társaság</p>
          <p>Projekt címe: Legler & Társa Kft Forgóeszköz finanszírozása</p>
          <p>Projekt célja: Raktárkészlet bővítése, bérek finanszírozása, létszámnövelés</p>
          <p>Hitel összege: 10.000.000.- Forint</p>
          <p>Projekt tervezett befejezése: 2024.01.31</p>
          <p>Azonosító szám: H-EUGY1/091315/2021/445083/001</p>
          <p>Projekt: GINOP-1.2.9-20 HÁTRÁNYOS HELYZETŰ TELEPÜLÉSEKEN MŰKÖDŐ MIKRO- ÉS KISVÁLLALKOZÁSOK FEJLESZTÉSEINEK TÁMOGATÁSA</p>
          <p>Kedvezményezett: Legler & Társa Korlátolt Felelősségű Társaság</p>
          <p>Projekt címe: Legler & Társa Kft infrastrukturális és technológiai fejlesztése</p>
          <p>A projekt tartalmának bemutatása: Telephelyen új műhely kialakítása, öltöző, fürdő és iroda helyiségek kialakítása, épület energetikai korszerűsítése, korszerű fűtés-hűtés rendszer kiépítése. Szemcseszóró kabin beszerzése.</p>
          <p>A szerződött támogatás összege: 10.000...</p>
        </div>
      </div>
    </footer>
  );
}


export default App;
