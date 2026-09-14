export default function EventModal({ event, onClose }) {
  if (!event) return null;

  // تحويل الدروس المجمعة بـ | إلى مصفوفة لسهولة العرض
  const lessonsList = event.lessons ? event.lessons.split('|') : [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        {event.image && (
          <img src={event.image} alt={event.eventName} className="modal-image" />
        )}

        <h2>{event.eventName}</h2>
        <span className="modal-date">📅 {event.date}</span>
        
        {/* الملخص التفصيلي الموثوق */}
        <div className="modal-section">
          <h3>📌 الملخص والتفاصيل الكاملة:</h3>
          <p>{event.details || event.summary}</p>
        </div>

        {/* الدروس والعبر المستفادة */}
        <div className="modal-section">
          <h3>💡 الدروس والعبر المستفادة:</h3>
          <ul>
            {lessonsList.map((lesson, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>{lesson.trim()}</li>
            ))}
          </ul>
        </div>

        {/* المصادر */}
        <div className="modal-sources">
          <small>📖 المصادر المعتمدة: {event.sources ? event.sources.join(' | ') : 'أمهات كتب السيرة'}</small>
        </div>
      </div>
    </div>
  );
}