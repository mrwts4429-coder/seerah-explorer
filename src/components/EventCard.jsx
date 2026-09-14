export default function EventCard({ event, onSelect, isFavorite, onToggleFavorite }) {
  return (
    <div className="event-card" onClick={() => onSelect(event)}>
      {event.image && (
        <img src={event.image} alt={event.eventName} className="card-image" />
      )}

      <div className="card-header">
        <span className="category-badge">{event.category}</span>
        <button 
          className="fav-btn"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(event.id);
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <h2>{event.eventName}</h2>
      <span className="event-date">📅 {event.date}</span>
      <p className="summary-text">{event.summary}</p>

      <button className="details-btn" onClick={() => onSelect(event)}>
        عرض التفاصيل والدروس 📖
      </button>
    </div>
  );
}