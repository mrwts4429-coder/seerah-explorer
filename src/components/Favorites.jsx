import EventCard from './EventCard';

export default function Favorites({ favoriteEvents, onSelect, favorites, onToggleFavorite }) {
  if (favoriteEvents.length === 0) {
    return (
      <div className="empty-favorites">
        <h3>لا توجد أحداث في المفضلة بعد ❤️</h3>
        <p>اضغط على علامة القلب في أي حدث بالصفحة الرئيسية لإضافته هنا.</p>
      </div>
    );
  }

  return (
    <div className="events-grid">
      {favoriteEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onSelect={onSelect}
          isFavorite={favorites.includes(event.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}