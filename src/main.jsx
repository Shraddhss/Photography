import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const DB_KEY = "umeshPhotosDatabase";

const seedCategories = [
  {
    key: "wedding",
    title: "Wedding Photography",
    description: "Complete wedding stories with rituals, family portraits, couple sessions, and reception coverage.",
    cover: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    key: "candid",
    title: "Candid Photography",
    description: "Natural frames that capture laughter, emotions, family moments, and real expressions.",
    cover: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=1400&q=85",
    images: [
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    key: "events",
    title: "Functions & Events",
    description: "Birthday parties, school functions, engagement events, corporate events, and family celebrations.",
    cover: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=85",
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    key: "product",
    title: "Product Photography",
    description: "Clean product images for catalogues, ecommerce listings, menus, packaging, and launches.",
    cover: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    key: "model",
    title: "Model Photography",
    description: "Portfolio shoots, studio portraits, fashion looks, reels cover photos, and campaign images.",
    cover: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=1400&q=85",
    images: [
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    key: "brand",
    title: "Business/Brand Photography",
    description: "Professional photos for shops, founders, offices, hotels, restaurants, teams, and online brands.",
    cover: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
    images: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"
    ]
  }
];

const packages = [
  {
    name: "Simple Function",
    price: "Rs. 10,000",
    detail: "Best for small family functions, birthdays, puja, and simple events. Includes 3 hours of coverage and edited digital photos.",
    badge: "Starting price"
  },
  {
    name: "Standard",
    price: "Rs. 25,000",
    detail: "Half-day event or candid coverage with edited gallery, online delivery, and priority selection support.",
    badge: "Most booked"
  },
  {
    name: "Premium",
    price: "Rs. 55,000",
    detail: "Full-day wedding, brand, or model coverage with premium edits, album-ready files, and planning support.",
    badge: "Signature"
  }
];

const testimonials = [
  "Saksham Sharma covered our family function beautifully. The photos felt natural and premium.",
  "Umesh Photos gave our product shoot a clean professional look and delivered everything on time.",
  "The booking was simple, pricing was clear, and the final gallery was excellent."
];

function loadDb() {
  const fallback = {
    users: [],
    currentUser: null,
    favorites: [],
    enquiries: [],
    contacts: [],
    categories: seedCategories
  };
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(DB_KEY) || "{}") };
  } catch {
    return fallback;
  }
}

function saveDb(nextDb) {
  localStorage.setItem(DB_KEY, JSON.stringify(nextDb));
}

function App() {
  const [db, setDb] = useState(loadDb);
  const [theme, setTheme] = useState("dark");
  const [activeCategory, setActiveCategory] = useState(db.categories[0].key);
  const [lightbox, setLightbox] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [booking, setBooking] = useState({
    name: db.currentUser?.name || "",
    email: db.currentUser?.email || "",
    phone: "",
    type: "Functions & Events",
    budget: "10000",
    date: "",
    package: "Simple Function",
    custom: false
  });

  const activeGallery = db.categories.find((category) => category.key === activeCategory) || db.categories[0];
  const discount = useMemo(() => calculateDiscount(booking), [booking]);

  function persist(updater) {
    setDb((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      saveDb(next);
      return next;
    });
  }

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function updateBooking(field, value) {
    setBooking((current) => ({ ...current, [field]: value }));
  }

  function saveFavorite(src) {
    if (!db.currentUser) {
      setAuthOpen(true);
      showToast("Please login to save favourite photos.");
      return;
    }
    persist((current) => {
      const exists = current.favorites.includes(src);
      return { ...current, favorites: exists ? current.favorites.filter((item) => item !== src) : [...current.favorites, src] };
    });
    showToast(db.favorites.includes(src) ? "Removed from favourites." : "Photo saved to favourites.");
  }

  function submitBooking(event) {
    event.preventDefault();
    const enquiry = {
      ...booking,
      id: Date.now(),
      status: "New enquiry",
      discount,
      finalEstimate: Math.max(0, Number(booking.budget || 0) * (1 - discount.percent / 100))
    };
    persist((current) => ({ ...current, enquiries: [enquiry, ...current.enquiries] }));
    showToast("Enquiry saved in the local database.");
    document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
  }

  function submitContact(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = {
      id: Date.now(),
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message")
    };
    persist((current) => ({ ...current, contacts: [message, ...current.contacts] }));
    event.currentTarget.reset();
    showToast("Contact message saved.");
  }

  function addPhoto(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const url = String(data.get("url") || "").trim();
    const categoryKey = data.get("category");
    if (!url) return;
    persist((current) => ({
      ...current,
      categories: current.categories.map((item) =>
        item.key === categoryKey ? { ...item, images: [url, ...item.images], cover: item.cover || url } : item
      )
    }));
    event.currentTarget.reset();
    showToast("Photo added to the gallery database.");
  }

  function deleteEnquiry(id) {
    persist((current) => ({ ...current, enquiries: current.enquiries.filter((item) => item.id !== id) }));
    showToast("Enquiry removed.");
  }

  return (
    <main className={theme}>
      <Navbar theme={theme} setTheme={setTheme} user={db.currentUser} setAuthOpen={setAuthOpen} persist={persist} />
      <Hero />
      <Portfolio
        categories={db.categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeGallery={activeGallery}
        favorites={db.favorites}
        onFavorite={saveFavorite}
        onOpen={setLightbox}
      />
      <Services packages={packages} setBookingPackage={(name) => updateBooking("package", name)} />
      <Booking booking={booking} updateBooking={updateBooking} discount={discount} submitBooking={submitBooking} />
      <About />
      {db.currentUser && (
        <Dashboard
          user={db.currentUser}
          favorites={db.favorites}
          enquiries={db.enquiries}
          contacts={db.contacts}
          categories={db.categories}
          addPhoto={addPhoto}
          deleteEnquiry={deleteEnquiry}
          setLightbox={setLightbox}
        />
      )}
      <Contact submitContact={submitContact} />
      <Footer />
      {authOpen && <AuthModal setAuthOpen={setAuthOpen} persist={persist} showToast={showToast} />}
      {lightbox && <Lightbox image={lightbox} onClose={() => setLightbox(null)} />}
      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}

function Navbar({ theme, setTheme, user, setAuthOpen, persist }) {
  const links = ["Home", "Portfolio", "Services", "About", "Contact"];
  return (
    <header className="nav-wrap">
      <a className="brand" href="#home" aria-label="Umesh Photos home">
        <span>UP</span>
        <strong>Umesh Photos</strong>
      </a>
      <nav>
        {links.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`}>
            {link}
          </a>
        ))}
        <button className="link-button" onClick={() => (user ? document.getElementById("dashboard")?.scrollIntoView() : setAuthOpen(true))}>
          {user ? "Dashboard" : "Login"}
        </button>
      </nav>
      <div className="nav-actions">
        <button className="icon-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
          {theme === "dark" ? "L" : "D"}
        </button>
        {user && (
          <button className="ghost small" onClick={() => persist((current) => ({ ...current, currentUser: null }))}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-bg" />
      <div className="hero-content">
        <p className="eyebrow">Professional photography by Saksham Sharma</p>
        <h1>Umesh Photos</h1>
        <p className="hero-copy">
          Clean, premium photography for weddings, simple functions, products, models, and business brands. Owned and
          photographed by Saksham Sharma.
        </p>
        <div className="hero-actions">
          <a className="primary" href="#portfolio">
            View Portfolio
          </a>
          <a className="secondary" href="#booking">
            Book Now
          </a>
        </div>
      </div>
      <div className="hero-stat">
        <strong>Rs. 10K</strong>
        <span>starting charges for simple function photography</span>
      </div>
    </section>
  );
}

function Portfolio({ categories, activeCategory, setActiveCategory, activeGallery, favorites, onFavorite, onOpen }) {
  return (
    <section id="portfolio" className="section">
      <div className="section-head">
        <p className="eyebrow">Portfolio</p>
        <h2>Photography work by category</h2>
        <p>Open any photo in a lightbox, switch categories, and login to save your favourite photos.</p>
      </div>
      <div className="tabs" role="tablist">
        {categories.map((category) => (
          <button className={activeCategory === category.key ? "active" : ""} key={category.key} onClick={() => setActiveCategory(category.key)}>
            {category.title}
          </button>
        ))}
      </div>
      <div className="gallery-intro">
        <img src={activeGallery.cover} alt={activeGallery.title} loading="lazy" />
        <div>
          <h3>{activeGallery.title}</h3>
          <p>{activeGallery.description}</p>
        </div>
      </div>
      <div className="gallery-grid">
        {activeGallery.images.map((image, index) => (
          <article className="photo-card" key={image}>
            <button onClick={() => onOpen(image)} aria-label={`Open ${activeGallery.title} image ${index + 1}`}>
              <img src={image} alt={`${activeGallery.title} ${index + 1}`} loading="lazy" />
            </button>
            <button className="favorite" onClick={() => onFavorite(image)} aria-label="Save favourite">
              {favorites.includes(image) ? "Saved" : "Save"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Services({ packages, setBookingPackage }) {
  return (
    <section id="services" className="section alt">
      <div className="section-head">
        <p className="eyebrow">Services</p>
        <h2>INR packages for every shoot</h2>
        <p>All packages include planning, edited digital delivery, online gallery support, and clear quotation before booking.</p>
      </div>
      <div className="service-grid">
        {packages.map((item) => (
          <article className="package-card" key={item.name}>
            <span>{item.badge}</span>
            <h3>{item.name}</h3>
            <strong>{item.price}</strong>
            <p>{item.detail}</p>
            <a
              href="#booking"
              onClick={() => {
                setBookingPackage(item.name);
              }}
            >
              Request package
            </a>
          </article>
        ))}
      </div>
      <div className="offer-strip">
        <strong>Current offers:</strong> 5% off weekday functions, 10% off bookings above Rs. 25,000, and custom discounts for multiple events.
      </div>
    </section>
  );
}

function Booking({ booking, updateBooking, discount, submitBooking }) {
  return (
    <section id="booking" className="section booking-section">
      <div className="booking-copy">
        <p className="eyebrow">Enquiry & booking</p>
        <h2>Send your photography requirement</h2>
        <p>Fill the form and your enquiry is saved into the local database. The estimated offer changes with budget, date, and package needs.</p>
        <div className="discount-panel">
          <span>Estimated discount</span>
          <strong>{discount.percent}%</strong>
          <p>{discount.reason}</p>
        </div>
      </div>
      <form className="form-card" onSubmit={submitBooking}>
        <label>
          Name
          <input required value={booking.name} onChange={(e) => updateBooking("name", e.target.value)} placeholder="Your full name" />
        </label>
        <label>
          Email
          <input required type="email" value={booking.email} onChange={(e) => updateBooking("email", e.target.value)} placeholder="you@example.com" />
        </label>
        <label>
          Phone
          <input required value={booking.phone} onChange={(e) => updateBooking("phone", e.target.value)} placeholder="+91 98765 43210" />
        </label>
        <label>
          Type of Photography
          <select value={booking.type} onChange={(e) => updateBooking("type", e.target.value)}>
            {seedCategories.map((category) => (
              <option key={category.key}>{category.title}</option>
            ))}
          </select>
        </label>
        <label>
          Package
          <select value={booking.package} onChange={(e) => updateBooking("package", e.target.value)}>
            {packages.map((item) => (
              <option key={item.name}>{item.name}</option>
            ))}
          </select>
        </label>
        <label>
          Budget in INR
          <input type="number" min="10000" value={booking.budget} onChange={(e) => updateBooking("budget", e.target.value)} />
        </label>
        <label>
          Date
          <input required type="date" value={booking.date} onChange={(e) => updateBooking("date", e.target.value)} />
        </label>
        <label className="checkbox">
          <input type="checkbox" checked={booking.custom} onChange={(e) => updateBooking("custom", e.target.checked)} />
          Request custom package
        </label>
        <button className="primary full" type="submit">
          Send Enquiry
        </button>
      </form>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-grid">
      <div>
        <p className="eyebrow">About</p>
        <h2>Saksham Sharma, owner and photographer</h2>
        <p>
          Umesh Photos is owned by Saksham Sharma, a professional photographer focused on clean composition, natural
          expressions, and reliable event delivery. The studio handles simple functions, weddings, candid moments,
          product photos, model portfolios, and business branding shoots.
        </p>
        <div className="achievements">
          <span>Simple functions from Rs. 10,000</span>
          <span>Fast digital delivery</span>
          <span>Client dashboard enabled</span>
        </div>
      </div>
      <div className="testimonial-stack">
        {testimonials.map((item) => (
          <blockquote key={item}>{item}</blockquote>
        ))}
      </div>
    </section>
  );
}

function Dashboard({ user, favorites, enquiries, contacts, categories, addPhoto, deleteEnquiry, setLightbox }) {
  const isAdmin = user.email.toLowerCase().includes("admin");
  return (
    <section id="dashboard" className="section alt dashboard">
      <div className="section-head">
        <p className="eyebrow">Dashboard</p>
        <h2>Welcome, {user.name}</h2>
        <p>Saved photos, enquiries, contact messages, and admin gallery uploads are stored in the local browser database.</p>
      </div>
      <div className="dashboard-grid">
        <article className="panel">
          <h3>Favourite photos</h3>
          <div className="mini-gallery">
            {favorites.length ? favorites.map((image) => <img key={image} src={image} alt="Favourite photography" onClick={() => setLightbox(image)} />) : <p>No favourites saved yet.</p>}
          </div>
        </article>
        <article className="panel">
          <h3>Recent enquiries</h3>
          {enquiries.length ? (
            enquiries.map((item) => (
              <div className="record" key={item.id}>
                <p>
                  {item.type} on {item.date} | {item.discount.percent}% offer | Estimate Rs. {Math.round(item.finalEstimate).toLocaleString("en-IN")}
                </p>
                <button className="ghost small" onClick={() => deleteEnquiry(item.id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>Send an enquiry to see it here.</p>
          )}
        </article>
        <article className="panel">
          <h3>Contact messages</h3>
          {contacts.length ? contacts.map((item) => <p key={item.id}>{item.name}: {item.message}</p>) : <p>No contact messages yet.</p>}
        </article>
        {isAdmin && (
          <article className="panel admin-panel">
            <h3>Admin photo manager</h3>
            <form onSubmit={addPhoto}>
              <select name="category">
                {categories.map((category) => (
                  <option key={category.key} value={category.key}>
                    {category.title}
                  </option>
                ))}
              </select>
              <input name="url" placeholder="Paste Cloudinary, S3, or image URL" />
              <button className="secondary" type="submit">
                Upload Photo
              </button>
            </form>
          </article>
        )}
      </div>
    </section>
  );
}

function Contact({ submitContact }) {
  return (
    <section id="contact" className="section contact-grid">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Contact Umesh Photos</h2>
        <p>Email umeshphotos@example.com or call +91 98765 43210. Follow new work on Instagram, Facebook, and YouTube.</p>
        <form className="contact-form" onSubmit={submitContact}>
          <input name="name" placeholder="Name" required />
          <input name="email" type="email" placeholder="Email" required />
          <textarea name="message" placeholder="Tell us about your project" required />
          <button className="primary" type="submit">
            Send Message
          </button>
        </form>
      </div>
      <iframe title="Umesh Photos location" src="https://www.google.com/maps?q=India%20Photography%20Studio&output=embed" loading="lazy" />
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <strong>Umesh Photos</strong>
      <span>Instagram | Facebook | YouTube | WhatsApp</span>
      <small>Front end is ready for Spring Boot, JWT, MongoDB/MySQL, and Cloudinary/S3. Current prototype uses a local browser database.</small>
    </footer>
  );
}

function AuthModal({ setAuthOpen, persist, showToast }) {
  const [mode, setMode] = useState("login");
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email")).toLowerCase();
    const nextUser = {
      id: Date.now(),
      name: data.get("name") || "Client",
      email
    };
    persist((current) => {
      const existingUser = current.users.find((item) => item.email === email);
      return {
        ...current,
        users: existingUser || mode === "login" ? current.users : [nextUser, ...current.users],
        currentUser: existingUser || nextUser
      };
    });
    showToast(mode === "login" ? "Logged in successfully." : "Account created and saved.");
    setAuthOpen(false);
  }
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <form className="auth-modal" onSubmit={submit}>
        <button className="close" type="button" onClick={() => setAuthOpen(false)} aria-label="Close login">
          X
        </button>
        <p className="eyebrow">{mode === "login" ? "Customer login" : "Create account"}</p>
        <h2>{mode === "login" ? "Access your dashboard" : "Create your client dashboard"}</h2>
        {mode === "signup" && <input name="name" placeholder="Name" required />}
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button className="primary full" type="submit">
          {mode === "login" ? "Login" : "Sign Up"}
        </button>
        <button className="link-button center" type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
          {mode === "login" ? "Need an account? Sign up" : "Already registered? Login"}
        </button>
        <small>Use an email containing admin to open the admin photo manager.</small>
      </form>
    </div>
  );
}

function Lightbox({ image, onClose }) {
  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button onClick={onClose} aria-label="Close lightbox">
        X
      </button>
      <img src={image} alt="Expanded portfolio work" />
    </div>
  );
}

function calculateDiscount(booking) {
  const budget = Number(booking.budget || 0);
  const date = booking.date ? new Date(booking.date) : null;
  const day = date ? date.getDay() : -1;
  let percent = 0;
  let reason = "Simple transparent pricing with no discount yet.";
  if (budget >= 25000) {
    percent = 10;
    reason = "Bulk booking discount for budgets above Rs. 25,000.";
  } else if (booking.custom) {
    percent = 5;
    reason = "Custom package discount applied.";
  } else if (day > 0 && day < 5) {
    percent = 5;
    reason = "Weekday function offer applied.";
  }
  return { percent, reason };
}

createRoot(document.getElementById("root")).render(<App />);
