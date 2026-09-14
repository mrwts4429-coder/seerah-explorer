export default function Navbar({ activeTab, setActiveTab, favoritesCount, user, onOpenAuth, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="brand-icon">🕌</span>
        <h1 className="brand-title">موسوعة السيرة النبوية</h1>
      </div>

      <div className="nav-menu">
        <button
          className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          الرئيسية
        </button>

        <button
          className={`nav-btn ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          ❤️ المفضلة ({favoritesCount})
        </button>

        <button
          className={`nav-btn ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          📝 اختبر معلوماتك
        </button>

        {/* زر اللوجن أو اسم المستخدم */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--accent-gold)', fontSize: '14px' }}>👤 {user}</span>
            <button className="nav-btn" onClick={onLogout} style={{ padding: '6px 12px', fontSize: '12px' }}>
              خروج
            </button>
          </div>
        ) : (
          <button className="nav-btn" onClick={onOpenAuth} style={{ borderColor: 'var(--accent-gold)' }}>
            🔑 دخول / تسجيل
          </button>
        )}
      </div>
    </nav>
  );
}