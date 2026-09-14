import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import FilterButtons from "./components/FilterButtons";
import EventCard from "./components/EventCard";
import EventModal from "./components/EventModal";
import Favorites from "./components/Favorites";
import QuizForm from "./components/QuizForm";
import AuthModal from "./components/AuthModal"; // 1. استيرادAuthModal
import "./App.css";

export default function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [activeTab, setActiveTab] = useState("home");

  const [favorites, setFavorites] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/seerahData.json")
      .then((res) => {
        if (!res.ok) throw new Error("فشل في جلب البيانات من السيرفر");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.eventName.includes(searchTerm) ||
      event.summary.includes(searchTerm);
    const matchesCategory =
      selectedCategory === "الكل" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const favoriteEventsList = events.filter((event) =>
    favorites.includes(event.id)
  );

  if (loading) {
    return (
      <div className="state-container">
        <div className="spinner"></div>
        <p>جاري تحميل أحداث السيرة النبوية الشريفة...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-container error-box">
        <h2>عذراً، حدث خطأ!</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => setUser(null)}
      />

      {activeTab === "home" && (
        <>
          {/* 1. بنر الهيدر الرئيسي بصورة خلفية عريضة */}
          <header className="hero-header">
            <h2>موسوعة السيرة النبوية الشريفة</h2>
            <p>
              استكشف أحداث المحطات التاريخية لسيد الخلق ﷺ مجمعة وموثقة من أمهات
              كتب السيرة
            </p>
          </header>

          {/* 2. شريط البحث */}
          <div className="search-container">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>

          {/* 3. أزرار الفلترة */}
          <FilterButtons
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* 4. شبكة الكروت */}
          <div className="events-grid">
            {filteredEvents.length === 0 ? (
              <p className="no-results">لا توجد نتائج تطابق بحثك.</p>
            ) : (
              filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onSelect={setSelectedEvent}
                  isFavorite={favorites.includes(event.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))
            )}
          </div>
        </>
      )}

      {activeTab === "favorites" && (
        <Favorites
          favoriteEvents={favoriteEventsList}
          onSelect={setSelectedEvent}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {activeTab === "quiz" && <QuizForm />}

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* 2. إضافةAuthModal في الأسفل */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(userName) => setUser(userName)}
      />

      <footer className="main-footer">
        <p>
          موسوعة السيرة النبوية الشريفة — تم التجميع والدمج من أمهات كتب السيرة:
        </p>
        <small>
          الرحيق المختوم | نور اليقين | سيرة ابن هشام | اللؤلؤ المكنون | السيرة
          النبوية دروس وعبر
        </small>
      </footer>
    </div>
  );
}