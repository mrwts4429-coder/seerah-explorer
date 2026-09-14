import { useState } from 'react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب لإنشاء الحساب';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'صيغة البريد الإلكتروني غير صحيحة';
    }
    if (!formData.password) {
      newErrors.password = 'كلمة السر مطلوبة';
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة السر يجب أن تكون 6 أحرف على الأقل';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // نجاح التسجيل
      onLoginSuccess(isLogin ? (formData.email.split('@')[0]) : formData.name);
      setFormData({ name: '', email: '', password: '' });
      setErrors({});
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '450px' }}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2 className="text-center" style={{ marginBottom: '10px', color: 'var(--accent-gold)' }}>
          {isLogin ? 'تسجيل الدخول 🔑' : 'حساب جديد 📝'}
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '20px', fontSize: '14px' }}>
          {isLogin ? 'مرحباً بك، قم بتسجيل الدخول لحفظ مفضلتك' : 'أنشئ حسابك للاستمتاع بكل مميزات الموسوعة'}
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {!isLogin && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>الاسم الكامل:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="أدخل اسمك"
                style={{
                  width: '100%',
                  padding: '11px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-dark)',
                  color: '#fff',
                  outline: 'none'
                }}
              />
              {errors.name && <small style={{ color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.name}</small>}
            </div>
          )}

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>البريد الإلكتروني:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-dark)',
                color: '#fff',
                outline: 'none'
              }}
            />
            {errors.email && <small style={{ color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.email}</small>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>كلمة السر:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-dark)',
                color: '#fff',
                outline: 'none'
              }}
            />
            {errors.password && <small style={{ color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.password}</small>}
          </div>

          <button type="submit" className="submit-btn" style={{ width: '100%', padding: '12px' }}>
            {isLogin ? 'تسجيل الدخول 🚀' : 'إنشاء الحساب ✨'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '14px' }}>
          <span style={{ color: 'var(--text-muted)' }}>
            {isLogin ? 'ليس لديك حساب؟ ' : 'لديك حساب بالفعل؟ '}
          </span>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-gold)',
              cursor: 'pointer',
              fontWeight: 'bold',
              textDecoration: 'underline'
            }}
          >
            {isLogin ? 'سجل الآن' : 'سجل دخولك'}
          </button>
        </div>
      </div>
    </div>
  );
}