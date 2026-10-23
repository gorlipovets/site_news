import React, { useMemo, useState } from 'react';
import { Search, Menu, Send, UserRound, Heart, Star, Pencil, Camera, X, ShieldCheck, GraduationCap, FilePenLine, Bell, Sparkles, CalendarDays, ArrowLeft, Users, Eye, UserCog } from 'lucide-react';

const faculties = [
  'Институт гуманитарных и социальных наук / ИГСН',
  'Институт информатики, математики и робототехники / ИИМРТ',
  'Институт истории и государственного управления / ИИГУ',
  'Институт права / ИП',
  'Институт природы и человека / ИПЧ',
  'Институт технологий и материалов / ИТМ',
  'Институт химии и защиты в чрезвычайных ситуациях / ИХЗЧС',
  'Институт экономики, управления и бизнеса / ИНЭБ',
  'Институт электротехнического инжиниринга / ИЭТИ',
  'Физико-технический институт / ФТИ',
  'Факультет авиационных двигателей, энергетики и транспорта / ФАДЭТ',
  'Факультет башкирской филологии, востоковедения и журналистики / ФБФВиЖ',
  'Факультет подготовки инженерных кадров при ПАО «ОДК-УМПО» / ФПИК',
  'Передовая инженерная школа «Моторы будущего»',
  'Военный учебный центр / ВУЦ',
  'Весь университет'
];
const studyTypes = ['Бакалавриат', 'Магистратура', 'Аспирантура', 'Специалитет'];
const initialNews = [
  { id: 1, date: '22 октября 2026', minutes: 3, category: 'Образование', faculty: 'Институт химии и защиты в чрезвычайных ситуациях / ИХЗЧС', course: 1, studyType: 'Бакалавриат', icon: '🧪', bg: 'linear-gradient(135deg,#bfeafa,#6cb9dc)', title: 'Умные каникулы: пробуй, исследуй, создавай', text: 'Научные эксперименты, мастер-классы и новые открытия для будущих инженеров.', tags: ['наука', 'мастер-класс', 'каникулы'], counts: { plane: 128, heart: 45, star: 12 }, userReactions: {} },
  { id: 2, date: '20 октября 2026', minutes: 2, category: 'События', faculty: 'Институт гуманитарных и социальных наук / ИГСН', course: 2, studyType: 'Бакалавриат', icon: '🎓', bg: 'linear-gradient(135deg,#bce8f7,#84b9db)', title: 'Студенческий фестиваль: встречаемся в кампусе', text: 'Музыка, знакомства, команды и целый день впечатлений. Присоединяйся к маршруту!', tags: ['фестиваль', 'студенты', 'кампус'], counts: { plane: 96, heart: 27, star: 8 }, userReactions: {} },
  { id: 3, date: '17 октября 2026', minutes: 4, category: 'Возможности', faculty: 'Институт информатики, математики и робототехники / ИИМРТ', course: 3, studyType: 'Бакалавриат', icon: '🚀', bg: 'linear-gradient(135deg,#d0f0ff,#9ec9e6)', title: 'Собери свою траекторию развития', text: 'Проекты, стажировки и студенческие инициативы, которые помогут подняться на новый уровень.', tags: ['стажировка', 'проекты', 'карьера'], counts: { plane: 143, heart: 52, star: 19 }, userReactions: {} },
  { id: 4, date: '15 октября 2026', minutes: 2, category: 'Достижения', faculty: 'Институт экономики, управления и бизнеса / ИНЭБ', course: 4, studyType: 'Специалитет', icon: '🏆', bg: 'linear-gradient(135deg,#f8e3b4,#a7d9ee)', title: 'Студенческие команды — новые победы', text: 'Рассказываем о ребятах, которые воплощают смелые идеи и вдохновляют других.', tags: ['победа', 'команда', 'конкурс'], counts: { plane: 89, heart: 31, star: 7 }, userReactions: {} },
  { id: 5, date: '12 октября 2026', minutes: 3, category: 'Объявления', faculty: 'Факультет авиационных двигателей, энергетики и транспорта / ФАДЭТ', course: 5, studyType: 'Магистратура', icon: '🛩️', bg: 'linear-gradient(135deg,#c5edfa,#77b8da)', title: 'Открыта запись в авиационную лабораторию', text: 'Попробуй себя в проектировании, познакомься с лабораторией и командой наставников.', tags: ['авиация', 'запись', 'лаборатория'], counts: { plane: 72, heart: 38, star: 15 }, userReactions: {} },
  { id: 6, date: '10 октября 2026', minutes: 2, category: 'События', faculty: 'Институт информатики, математики и робототехники / ИИМРТ', course: 2, studyType: 'Аспирантура', icon: '💻', bg: 'linear-gradient(135deg,#d5f4fb,#8bc8e4)', title: 'Ночной код: командный хакатон', text: 'Собирай команду, придумывай решение и покажи, на что способен твой код.', tags: ['IT', 'хакатон', 'команда'], counts: { plane: 110, heart: 64, star: 23 }, userReactions: {} }
];
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function App() {
  const [page, setPage] = useState('home');
  const [news, setNews] = useState(initialNews);
  const [facultyFilter, setFacultyFilter] = useState('Все факультеты');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [aiFeedback, setAiFeedback] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const [profileForm, setProfileForm] = useState({ name: '', surname: '', email: '', avatar: '' });
  const [mediaFiles, setMediaFiles] = useState([]);
  const [authRole, setAuthRole] = useState('Студент');
  const [editingId, setEditingId] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [form, setForm] = useState({ title:'', text:'', faculty:'', course:'', studyType:'', category:'События', tags:'', author:'', eventDate:'' });

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setToast(''), 2400);
  };
  const navigate = (next) => {
    setPage(next); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const visibleNews = useMemo(() => news.filter(n =>
    (facultyFilter === 'Все факультеты' || !n.faculty || n.faculty === facultyFilter || n.faculty === 'Весь университет' || n.isPublic) &&
    `${n.title} ${n.text} ${n.tags.join(' ')} ${n.faculty} ${n.studyType}`.toLowerCase().includes(search.toLowerCase())
  ), [news, facultyFilter, search]);

  function reactTo(id, type) {
    const targetNews = news.find(n => n.id === id);
    const wasReacted = !!targetNews?.userReactions?.[type];
    setNews(old => old.map(n => {
      if (n.id !== id) return n;
      const was = !!n.userReactions[type];
      return { ...n, counts: { ...n.counts, [type]: n.counts[type] + (was ? -1 : 1) }, userReactions: { ...n.userReactions, [type]: !was } };
    }));
    if (type === 'plane' && !wasReacted && targetNews) {
      const eventDate = targetNews.eventDate ? new Date(`${targetNews.eventDate}T12:00:00`).toLocaleDateString('ru-RU', { day:'numeric', month:'long', year:'numeric' }) : (targetNews.date || new Date().toLocaleDateString('ru-RU', { day:'numeric', month:'long', year:'numeric' }));
      const message = `Мероприятие «${targetNews.title}»: ${eventDate}.`;
      if (currentUser) setNotifications(old => [{ id: Date.now(), title: 'Напоминание о мероприятии', message, newsId: id, createdAt: new Date().toLocaleString('ru-RU'), read: false, userId: currentUser.email }, ...old]);
      notify(currentUser ? '✈ Напоминание о мероприятии добавлено в уведомления' : `✈ ${message}`);
    } else notify('Реакция обновлена ✈️');
  }
  function updateForm(key, value) { setForm(old => ({ ...old, [key]: value })); }
  function resetForm() { setForm({ title:'', text:'', faculty:'', course:'', studyType:'', category:'События', tags:'', author: currentUser?.name || '', eventDate:'' }); setEditingId(null); setMediaFiles([]); }
  function readFile(file) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve({ name: file.name, type: file.type, url: String(reader.result) }); reader.onerror = reject; reader.readAsDataURL(file); }); }
  async function addMedia(e) { const selected = Array.from(e.target.files || []); const remaining = 3 - mediaFiles.length; if (selected.length > remaining) notify('К одной новости можно прикрепить не более 3 медиафайлов'); const valid = selected.slice(0, Math.max(0, remaining)); try { const loaded = await Promise.all(valid.map(readFile)); setMediaFiles(old => [...old, ...loaded].slice(0, 3)); } catch { notify('Не удалось загрузить один из файлов'); } e.target.value = ''; }
  function saveProfile(e) { e.preventDefault(); const name = profileForm.name.trim(); const surname = profileForm.surname.trim(); const email = profileForm.email.trim().toLowerCase(); if (!name || !email) { notify('Имя и почта обязательны'); return; } setCurrentUser(old => ({ ...old, name, surname, email, avatar: profileForm.avatar })); setUsers(old => old.map(u => u.email === currentUser.email ? { ...u, name, surname, email, avatar: profileForm.avatar } : u)); setForm(old => ({ ...old, author: name + (surname ? ' ' + surname : '') })); setSuggestions(old => old.map(item => item.userId === currentUser.email ? { ...item, userId: email } : item)); notify('Профиль сохранён ✈'); }
  function submitSuggestion(e) {
    e.preventDefault();
    if (!currentUser) { notify('Сначала войди в аккаунт'); navigate('auth'); return; }
    const hasAudienceDetails = Boolean((form.faculty && form.faculty !== 'Весь университет') || form.course || form.studyType);
    const item = { ...form, id: editingId ?? Date.now(), userId: (editingId !== null ? suggestions.find(s => s.id === editingId)?.userId : null) || currentUser.email, status: 'На редактуре', course: form.course ? Number(form.course) : '', eventDate: form.eventDate || '', submittedAt: new Date().toISOString(), media: mediaFiles, tags: form.tags.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean), author: form.author.trim() || currentUser.name || 'Студент', isPublic: !hasAudienceDetails, audience: hasAudienceDetails ? 'Для выбранной аудитории' : 'Публичная' };
    if (editingId !== null) {
      setSuggestions(old => old.map(s => s.id === editingId ? { ...item, status: 'Повторно отправлено на редактуру' } : s));
      notify('Изменения отправлены редакции на повторную проверку ✈');
    } else {
      setSuggestions(old => [item, ...old]);
      notify('Новость отправлена на редактуру ✈');
    }
    resetForm();
  }
  function editSuggestion(id) {
    const s = suggestions.find(item => item.id === id);
    if (!s || (s.userId !== currentUser?.email && !['Редактор','Модератор'].includes(currentUser?.role))) return;
    setForm({ title:s.title, text:s.text, faculty:s.faculty || '', course:s.course ? String(s.course) : '', studyType:s.studyType || '', category:s.category, tags:s.tags.join(', '), author:s.author, eventDate:s.eventDate || '' });
    setMediaFiles(s.media || []); setEditingId(id); navigate('suggest');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function signIn(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get('email') || '').trim().toLowerCase();
    const enteredName = String(data.get('name') || '').trim();
    const surname = String(data.get('surname') || '').trim();
    const existing = users.find(u => u.email.toLowerCase() === email);
    if (authMode === 'register' && existing) { notify('Аккаунт с такой почтой уже существует. Войди в него.'); return; }
    if (authMode === 'login' && existing) {
      const user = existing;
      setCurrentUser(user); setProfileForm({ name:user.name, surname:user.surname || '', email:user.email, avatar:user.avatar || '' });
      setForm(old => ({ ...old, author: old.author || user.name }));
      notify('Вход выполнен.');
    } else {
      const user = { email, name: enteredName || email.split('@')[0] || 'Студент', surname, role: authRole, avatar: '' };
      setUsers(old => [...old.filter(u => u.email.toLowerCase() !== email), user]);
      setCurrentUser(user); setProfileForm({ name:user.name, surname:user.surname, email:user.email, avatar:'' });
      setForm(old => ({ ...old, author: old.author || user.name }));
      notify(authMode === 'register' ? 'Демо-аккаунт создан.' : 'Создан демо-пользователь для входа.');
    }
    setPage('profile'); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function changeUserRole(email, role) {
    if (currentUser?.role !== 'Модератор') return;
    setUsers(old => old.map(user => user.email === email ? { ...user, role } : user));
    if (currentUser.email === email) setCurrentUser(old => ({ ...old, role }));
    notify(`Роль пользователя обновлена: ${role}`);
  }

  function openNews(id) { setSelectedNewsId(id); navigate('news-detail'); }

  return <>
    <div className="skyline" aria-hidden="true"><div className="cloud c1"/><div className="cloud c2"/><div className="cloud c3"/><div className="cloud c4"/></div>
    <div className="intro-flight" aria-hidden="true"><div className="intro-logo">✈ УУНиТ<small>Новости на высоте</small></div><div className="intro-plane">✈️</div></div>
    <header className="site-header">
      <button className="brand" onClick={() => navigate('home')}><span className="brand-mark">✈</span><span>Уфимский университет<br/>науки и технологий</span></button>
      <button className="icon-btn mobile-menu" aria-label="Меню" onClick={() => setMobileOpen(v => !v)}><Menu/></button>
      <nav className={mobileOpen ? 'nav open' : 'nav'}>
        <button className={page==='home'?'nav-link active':'nav-link'} onClick={() => navigate('home')}>Главная</button>
        <button className={page==='suggest'?'nav-link active':'nav-link'} onClick={() => navigate('suggest')}>Предложка</button>
        {currentUser ? <><button className={page==='profile'?'nav-link active':'nav-link'} onClick={() => navigate('profile')}>Личный кабинет</button><button className={page==='notifications'?'nav-link active':'nav-link'} onClick={() => navigate('notifications')}>Уведомления ({notifications.filter(n=>n.userId===currentUser.email&&!n.read).length})</button>{['Редактор','Модератор'].includes(currentUser.role) && <button className={page==='suggest'?'nav-link active':'nav-link'} onClick={() => navigate('suggest')}>Редактура</button>}{currentUser.role === 'Модератор' && <button className={page==='users'?'nav-link active':'nav-link'} onClick={() => navigate('users')}>Пользователи</button>}<button className="nav-link" onClick={() => { setCurrentUser(null); resetForm(); notify('Вы вышли из аккаунта'); navigate('home'); }}>Выйти ({currentUser.name})</button></> : <button className={page==='auth'?'nav-link active':'nav-link'} onClick={() => navigate('auth')}>Вход / регистрация</button>}
      </nav>
      <div className="header-actions">{currentUser && <button className="icon-btn notification-trigger" aria-label="Уведомления" onClick={() => navigate('notifications')}><Bell/><span className="notification-count">{notifications.filter(n=>n.userId===currentUser.email&&!n.read).length}</span></button>}<button className="icon-btn" aria-label="Поиск" onClick={() => { navigate('home'); document.getElementById('news-search')?.focus(); }}><Search/></button><button className="avatar-mini" aria-label="Профиль" onClick={() => navigate(currentUser ? 'profile' : 'auth')}>{currentUser?.avatar ? <img className="avatar-image" src={currentUser.avatar} alt="Аватар"/> : <UserRound size={18}/>}</button></div>
    </header>

    <main>
      {page === 'home' && <section className="page active">
        <div className="layout">
          <div className="main-column">
            <article className="hero"><div className="hero-copy"><span className="eyebrow">✦ Главная новость</span><h1>Твоя университетская жизнь — на высоте</h1><p>Новости, события и возможности УУНиТ. Лови свой маршрут, открывай новое и не пропускай самое важное.</p><div className="hero-bottom"><span className="hero-date">23 октября 2026</span><button className="primary" onClick={() => document.getElementById('news-feed')?.scrollIntoView({behavior:'smooth'})}>Взлетаем к новостям ↗</button></div></div><div className="hero-plane">🛫</div><div className="hero-cloud"/></article>
            <div className="section-head" id="news-feed"><h2><span>✈</span> Новости университета</h2><button className="subtle-link" onClick={() => {setFacultyFilter('Все факультеты');setSearch('');}}>Сбросить фильтры ↗</button></div>
            <div className="search-wrap"><Search size={18}/><input id="news-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Найти новость по названию или тегу…"/></div>
            <div className="filters">{['Все факультеты', ...faculties.filter(f => f !== 'Весь университет')].map(f => <button key={f} className={facultyFilter===f?'filter active':'filter'} onClick={()=>setFacultyFilter(f)}>{f==='Все факультеты'?'Все факультеты':f}</button>)}</div>
            <div className="feed">{visibleNews.length ? visibleNews.map(n => <article className="post" key={n.id}>
              <div className="post-art" style={{background:n.bg}}><span className="art-label">{n.category.toUpperCase()}</span><span className="big-emoji">{n.icon}</span></div>
              <div className="post-body"><div className="post-meta"><span>{n.date}</span><span>{n.minutes} мин</span></div><h3><button className="news-title-button" onClick={()=>openNews(n.id)}>{n.title}</button></h3>{(n.eventDate || n.date) && <div className="event-date-label"><CalendarDays size={14}/> Мероприятие: {n.eventDate ? new Date(`${n.eventDate}T12:00:00`).toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'}) : n.date}</div>}<p>{n.text}</p>{n.media?.length > 0 && <div className="media-preview public-media">{n.media.map((file,index)=><div className="media-item" key={index}>{file.type.startsWith('image/') ? <img src={file.url} alt={file.name}/> : file.type.startsWith('video/') ? <video src={file.url} controls/> : <audio src={file.url} controls/>}</div>)}</div>}<div className="post-facts">{n.isPublic || (!n.faculty && !n.course && !n.studyType) ? <span>Публичная новость</span> : <>{n.faculty && <span>{n.faculty}</span>}{n.course && <span>{n.course} курс</span>}{n.studyType && <span>{n.studyType}</span>}</>}</div>
              <div className="tags">{n.tags.map((tag,i)=><span className="tag" key={`${tag}-${i}`}>#{tag}</span>)}</div>
              <div className="post-card-actions"><button className="small-btn edit-btn" onClick={()=>openNews(n.id)}><Eye size={14}/> Читать новость полностью</button></div><div className="reactions">
                <button className={n.userReactions.plane?'react active':'react'} onClick={()=>reactTo(n.id,'plane')}><span>✈️</span><span>{n.counts.plane}</span></button>
                <button className={n.userReactions.heart?'react active':'react'} onClick={()=>reactTo(n.id,'heart')}><Heart size={15}/><span>{n.counts.heart}</span></button>
                <button className={n.userReactions.star?'react active':'react'} onClick={()=>reactTo(n.id,'star')}><Star size={15}/><span>{n.counts.star}</span></button>
              </div></div>
            </article>) : <div className="empty">☁️ По этому запросу ничего не найдено. Попробуй другой фильтр.</div>}</div>
          </div>
          <aside className="sidebar">
            <div className="speech"><div className="speech-head">🛩️ <strong>Есть новость?</strong></div>Предложи идею, расскажи о событии или поделись достижением — мы поможем ему взлететь.<button className="primary full" onClick={()=>navigate('suggest')}>{currentUser ? 'Предложить новость ↗' : 'Войти и предложить новость ↗'}</button></div>
            <section className="widget"><h3>✈ Лента реакций</h3><div className="reaction-note"><span>✈️</span><p>Отличная новость! 🚀<small>Поддержи интересные события</small></p></div><div className="reaction-note"><span>❤️</span><p>Класс! Так держать!<small>Вдохновляй других студентов</small></p></div><div className="reaction-note"><span>⭐</span><p>В избранное<small>Сохраняй важное для себя</small></p></div></section>
            <div className="doodle-note">Покоряй новые высоты<br/>вместе с нами!<span>〰 ✈</span></div>
          </aside>
        </div>
      </section>}

      {page === 'suggest' && !currentUser && <section className="page active"><div className="auth-wrap panel guest-gate"><div className="gate-icon"><UserRound size={34}/></div><h1>Предложка доступна после входа ✈</h1><p>Войди или зарегистрируйся, чтобы предложить новость университетскому сообществу.</p><button className="primary full" onClick={()=>{setAuthMode('login');navigate('auth')}}>Войти в аккаунт ↗</button><button className="secondary full" onClick={()=>{setAuthMode('register');navigate('auth')}}>Создать аккаунт</button></div></section>}
      {page === 'suggest' && currentUser && <section className="page active">
        <div className="signed-in-note">Вы вошли как <strong>{currentUser.name}</strong>. Отправленные новости проходят редактуру: самостоятельно опубликовать их нельзя.</div>
        <div className="page-heading"><h1>Предложка новостей ✈</h1><p>Заполни данные, добавь теги и отправь новость в редакцию.</p></div>
        <div className="suggest-grid">
          {(currentUser.role === 'Студент' || currentUser.role === 'Модератор' || editingId !== null) && <div className="panel"><h2 className="form-title">{editingId===null?'Новая новость':'Редактирование предложения'}</h2><form onSubmit={submitSuggestion}>
            <div className="field"><label>Заголовок новости</label><input required maxLength="100" value={form.title} onChange={e=>updateForm('title',e.target.value)} placeholder="Например, студенческий хакатон"/></div>
            <div className="field"><label>Факультет / институт (необязательно)</label><select value={form.faculty} onChange={e=>updateForm('faculty',e.target.value)}><option value="">Не указывать — новость будет публичной</option>{faculties.map(f=><option key={f}>{f}</option>)}</select></div>
            <div className="form-row">
              <div className="field"><label>Курс (необязательно)</label><select value={form.course} onChange={e=>updateForm('course',e.target.value)}><option value="">Не указывать</option>{[1,2,3,4,5].map(c=><option key={c} value={c}>{c} курс</option>)}</select></div>
              <div className="field"><label>Тип обучения (необязательно)</label><select value={form.studyType} onChange={e=>updateForm('studyType',e.target.value)}><option value="">Не указывать</option>{studyTypes.map(t=><option key={t}>{t}</option>)}</select></div>
            </div>
            <p className="hint audience-hint">Оставь факультет, курс и тип обучения пустыми — новость будет публичной и не ограничится выбранной аудиторией. Публикация всё равно требует одобрения модератора.</p>
            <div className="field"><label>Рубрика новости</label><select value={form.category} onChange={e=>updateForm('category',e.target.value)}>{['События','Образование','Возможности','Достижения','Объявления'].map(t=><option key={t}>{t}</option>)}</select></div>
            <div className="field"><label>Дата мероприятия (необязательно)</label><input type="date" value={form.eventDate} onChange={e=>updateForm('eventDate',e.target.value)}/><small className="hint">Если дата не указана, напоминание будет использовать дату публикации новости.</small></div>
            <div className="field"><label>Текст новости</label><textarea required maxLength="1200" value={form.text} onChange={e=>updateForm('text',e.target.value)} placeholder="Что произошло? Где и когда? Почему это важно?"/></div>
            <div className="field"><label>Теги поста — отдельно через запятую</label><input value={form.tags} onChange={e=>updateForm('tags',e.target.value)} placeholder="студенты, конкурс, регистрация"/><small className="hint">Каждый тег появится отдельной меткой под опубликованной новостью. Если факультет, курс и тип обучения не указаны, новость считается публичной.</small></div>
            <div className="field"><label>Медиафайлы — до 3 файлов</label><input type="file" accept="image/*,video/*,audio/*" multiple onChange={addMedia} disabled={mediaFiles.length >= 3}/><small className="hint">Можно добавить фотографии, видео или аудио. Прикреплено: {mediaFiles.length} из 3.</small>{mediaFiles.length > 0 && <div className="media-preview">{mediaFiles.map((file,index)=><div className="media-item" key={`${file.name}-${index}`}>{file.type.startsWith('image/') ? <img src={file.url} alt={file.name}/> : file.type.startsWith('video/') ? <video src={file.url} controls/> : file.type.startsWith('audio/') ? <audio src={file.url} controls/> : <span>📎</span>}<span className="media-name">{file.name}</span><button type="button" className="remove-media" aria-label="Удалить файл" onClick={()=>setMediaFiles(old=>old.filter((_,i)=>i!==index))}><X size={14}/></button></div>)}</div>}</div>
            <div className="field"><label>Имя автора (необязательно)</label><input value={form.author} onChange={e=>updateForm('author',e.target.value)} placeholder="Как к тебе обращаться"/></div>
            <div className="form-actions"><button className="primary" type="submit"><Send size={16}/>{editingId===null?'Отправить на редактуру':'Сохранить и повторно отправить на редактуру'}</button>{editingId!==null&&<button type="button" className="secondary" onClick={resetForm}>Отмена</button>}</div>
          </form></div>}
          <div className="panel"><h2 className="form-title">{['Редактор','Модератор'].includes(currentUser.role) ? 'Все предложенные новости' : 'Мои предложения'}</h2><p className="hint intro-hint">{['Редактор','Модератор'].includes(currentUser.role) ? 'Общая очередь редакции.' : 'Здесь отображаются только твои предложения. После каждого изменения отправляй новость на повторную редактуру.'}</p>
            {!( ['Редактор','Модератор'].includes(currentUser.role) ? suggestions.length : suggestions.some(s => s.userId === currentUser.email)) ? <div className="empty">Пока нет предложений.<br/>Добавь первую новость через форму ✈</div> : suggestions.filter(s => ['Редактор','Модератор'].includes(currentUser.role) || s.userId === currentUser.email).map(s=><article className="suggestion-card" key={s.id}><h3>{s.title}</h3><p>{s.isPublic ? 'Публичная новость' : [s.faculty, s.course ? `${s.course} курс` : '', s.studyType].filter(Boolean).join(' · ')}<br/>{s.category}{s.eventDate && <><br/>Дата мероприятия: {new Date(`${s.eventDate}T12:00:00`).toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'})}</>}</p><span className="status-pill">{s.status}</span><p>{s.text}</p><button className="small-btn edit-btn" onClick={()=>openNews(s.id)}><Eye size={14}/> Предпросмотр</button>{aiFeedback[s.id] && <div className="ai-feedback"><Sparkles size={16}/><span>{aiFeedback[s.id]}</span></div>}{s.media?.length > 0 && <div className="media-preview">{s.media.map((file,index)=><div className="media-item" key={index}>{file.type.startsWith('image/') ? <img src={file.url} alt={file.name}/> : file.type.startsWith('video/') ? <video src={file.url} controls/> : <audio src={file.url} controls/>}<span className="media-name">{file.name}</span></div>)}</div>}<div className="tags">{s.tags.map((t,j)=><span className="tag" key={j}>#{t}</span>)}</div><div className="suggestion-actions">{(s.userId === currentUser.email || ['Редактор','Модератор'].includes(currentUser.role)) && <button className="small-btn edit-btn" onClick={()=>editSuggestion(s.id)}><Pencil size={14}/> Редактировать</button>}{['Редактор','Модератор'].includes(currentUser.role) && <button className="small-btn ai-btn" onClick={()=>setAiFeedback(old=>({...old,[s.id]: old[s.id] ? '' : `ИИ-помощник (демо): проверь точность даты${s.eventDate ? ' мероприятия' : ' публикации'}, добавь конкретное место проведения и проверь орфографию. Заголовок: ${s.title.length > 65 ? 'можно сократить' : 'достаточно краткий'}.`}))}><Sparkles size={14}/> ИИ-помощник</button>}{currentUser.role === 'Модератор' && <><button className="small-btn send-btn" onClick={()=>{setNews(old=>[{...s,id:Date.now(),date:new Date().toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'}),minutes:Math.max(1,Math.ceil(s.text.length/450)),icon:'📰',bg:'linear-gradient(135deg,#bfeafa,#6cb9dc)',counts:{plane:0,heart:0,star:0},userReactions:{}} ,...old]);setSuggestions(old=>old.filter(x=>x.id!==s.id));notify('Новость опубликована');}}>Опубликовать</button><button className="small-btn reject-btn" onClick={()=>{setSuggestions(old=>old.filter(x=>x.id!==s.id));notify('Предложение удалено');}}>Отклонить / удалить</button></>}</div></article>)}
          </div>
        </div>
      </section>}

      {page === 'news-detail' && (() => { const item = news.find(n => n.id === selectedNewsId) || suggestions.find(n => n.id === selectedNewsId); if (!item) return <section className="page active"><div className="empty">Новость не найдена.<button className="secondary" onClick={()=>navigate('home')}>К новостям</button></div></section>; return <section className="page active news-detail-page"><button className="secondary" onClick={()=>navigate(suggestions.some(s=>s.id===item.id) && currentUser ? 'suggest' : 'home')}><ArrowLeft size={16}/> Назад</button><article className="panel news-detail"><div className="detail-category">{item.category || 'Новость'}{item.isPublic || (!item.faculty && !item.course && !item.studyType) ? ' · Публичная' : ''}</div><h1>{item.title}</h1><div className="post-meta"><span>Опубликовано: {item.date || new Date(item.submittedAt || Date.now()).toLocaleDateString('ru-RU')}</span><span>{item.author || 'Редакция'}</span></div>{(item.eventDate || item.date) && <div className="event-date-label"><CalendarDays size={16}/> Мероприятие: {item.eventDate ? new Date(`${item.eventDate}T12:00:00`).toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'}) : item.date}</div>}<p className="detail-text">{item.text}</p>{item.media?.length > 0 && <div className="media-preview public-media">{item.media.map((file,index)=><div className="media-item" key={index}>{file.type.startsWith('image/') ? <img src={file.url} alt={file.name}/> : file.type.startsWith('video/') ? <video src={file.url} controls/> : <audio src={file.url} controls/>}<span className="media-name">{file.name}</span></div>)}</div>}<div className="post-facts">{item.isPublic || (!item.faculty && !item.course && !item.studyType) ? <span>Публичная новость</span> : <>{item.faculty && <span>{item.faculty}</span>}{item.course && <span>{item.course} курс</span>}{item.studyType && <span>{item.studyType}</span>}</>}</div><div className="tags">{(item.tags || []).map((tag,i)=><span className="tag" key={`${tag}-${i}`}>#{tag}</span>)}</div>{news.some(n=>n.id===item.id) && <div className="reactions"><button className={item.userReactions?.plane?'react active':'react'} onClick={()=>reactTo(item.id,'plane')}>✈️ {item.counts?.plane || 0}</button><button className={item.userReactions?.heart?'react active':'react'} onClick={()=>reactTo(item.id,'heart')}><Heart size={15}/> {item.counts?.heart || 0}</button><button className={item.userReactions?.star?'react active':'react'} onClick={()=>reactTo(item.id,'star')}><Star size={15}/> {item.counts?.star || 0}</button></div>}</article></section>; })()}

      {page === 'users' && currentUser?.role === 'Модератор' && <section className="page active"><div className="page-heading"><h1>Пользователи УУНиТ</h1><p>Список всех пользователей, зарегистрированных в текущем демо-сеансе. Назначай роли редактора и модератора.</p></div><div className="panel"><div className="users-toolbar"><h2 className="form-title">Всего пользователей: {users.length}</h2><span className="role-chip">Управление доступом</span></div>{users.length ? <div className="users-list">{users.map(user=><article className="user-row" key={user.email}><div className="user-row-avatar">{user.avatar ? <img src={user.avatar} alt=""/> : <UserRound size={22}/>}</div><div className="user-row-info"><strong>{user.name} {user.surname}</strong><span>{user.email}</span><small>Текущая роль: {user.role}</small></div><div className="user-row-controls"><label className="hint" htmlFor={`role-${user.email}`}>Изменить роль</label><select id={`role-${user.email}`} value={user.role} onChange={e=>changeUserRole(user.email,e.target.value)}><option>Студент</option><option>Редактор</option><option>Модератор</option></select></div></article>)}</div> : <div className="empty">Пользователей пока нет. Создай демо-аккаунт через регистрацию, чтобы он появился в списке.</div>}</div></section>}

      {page === 'notifications' && currentUser && <section className="page active">
        <div className="page-heading"><h1>Уведомления ✈</h1><p>Напоминания о мероприятиях, которые ты отметил самолётиком.</p></div>
        <div className="panel"><div className="notification-toolbar"><h2 className="form-title">Твои уведомления</h2><button className="secondary" onClick={()=>setNotifications(old=>old.map(n=>n.userId===currentUser.email?{...n,read:true}:n))}>Отметить все прочитанными</button></div>
          {notifications.filter(n=>n.userId===currentUser.email).length ? notifications.filter(n=>n.userId===currentUser.email).map(n=><article className={n.read?'notification-card read':'notification-card'} key={n.id}><div className="notification-icon"><CalendarDays size={20}/></div><div className="notification-copy"><strong>{n.title}</strong><p>{n.message}</p><small>{n.createdAt}</small></div><div className="notification-actions">{!n.read&&<span className="unread-dot" title="Новое уведомление"/>}<button className="small-btn edit-btn" onClick={()=>{setNotifications(old=>old.map(x=>x.id===n.id?{...x,read:true}:x));navigate('home')}}>К новости ↗</button></div></article>) : <div className="empty">Пока нет уведомлений.<br/>Нажми ✈ под интересной новостью, чтобы получить напоминание о мероприятии.</div>}
        </div>
      </section>}

      {page === 'profile' && currentUser && <section className="page active">
        <div className="page-heading"><h1>Личный кабинет ✈</h1><p>Управляй личными данными и профилем.</p></div>
        <div className="profile-layout"><div className="panel profile-card"><div className="profile-avatar-large">{profileForm.avatar ? <img src={profileForm.avatar} alt="Аватар пользователя"/> : <UserRound size={42}/>}</div><h2>{currentUser.name} {currentUser.surname}</h2><p>{currentUser.email}</p><span className="role-chip">{currentUser.role || 'Студент'}</span><button className="secondary" onClick={()=>navigate('suggest')}>{['Редактор','Модератор'].includes(currentUser.role) ? 'Открыть редактуру' : 'Мои предложения'} ↗</button>{currentUser.role === 'Модератор' && <button className="secondary" onClick={()=>navigate('users')}><Users size={15}/> Управление пользователями</button>}</div>
          <div className="panel"><h2 className="form-title">Настройки профиля</h2><form onSubmit={saveProfile}><div className="field"><label>Аватарка</label><div className="avatar-upload"><div className="profile-avatar-small">{profileForm.avatar ? <img src={profileForm.avatar} alt="Предпросмотр аватара"/> : <UserRound/>}</div><label className="secondary upload-button"><Camera size={16}/> Выбрать изображение<input type="file" accept="image/*" hidden onChange={async e=>{const file=e.target.files?.[0];if(file){try{const result=await readFile(file);setProfileForm(old=>({...old,avatar:result.url}));}catch{notify('Не удалось загрузить аватар');}}}}/></label>{profileForm.avatar && <button type="button" className="small-btn reject-btn" onClick={()=>setProfileForm(old=>({...old,avatar:''}))}>Удалить аватар</button>}</div><small className="hint">Рекомендуется квадратное изображение.</small></div><div className="form-row"><div className="field"><label>Имя</label><input required value={profileForm.name} onChange={e=>setProfileForm(old=>({...old,name:e.target.value}))}/></div><div className="field"><label>Фамилия</label><input value={profileForm.surname} onChange={e=>setProfileForm(old=>({...old,surname:e.target.value}))}/></div></div><div className="field"><label>Электронная почта</label><input type="email" required value={profileForm.email} onChange={e=>setProfileForm(old=>({...old,email:e.target.value}))}/></div><button className="primary" type="submit">Сохранить изменения ↗</button></form></div></div>
      </section>}

      {page === 'auth' && <section className="page active">
        <div className="page-heading"><h1>Твой бортовой журнал ✈</h1><p>Войди, чтобы сохранять любимые новости и предлагать свои.</p></div>
        <div className="auth-wrap panel"><div className="auth-tabs"><button className={authMode==='login'?'auth-tab active':'auth-tab'} onClick={()=>setAuthMode('login')}>Вход</button><button className={authMode==='register'?'auth-tab active':'auth-tab'} onClick={()=>setAuthMode('register')}>Регистрация</button></div>
          <form onSubmit={signIn}>
            {authMode==='register'&&<><div className="field"><label>Имя</label><input name="name" required placeholder="Твоё имя"/></div><div className="field"><label>Фамилия</label><input name="surname" placeholder="Твоя фамилия"/></div></>}
            <div className="field"><label>Роль</label><select value={authRole} onChange={e=>setAuthRole(e.target.value)}><option>Студент</option><option>Редактор</option><option>Модератор</option></select><small className="hint">В демо-режиме роль выбирается здесь. В рабочей системе её должен назначать сервер.</small></div>
            <div className="field"><label>Электронная почта</label><input name="email" type="email" required placeholder="name@example.com"/></div>
            <div className="field"><label>Пароль</label><input type="password" required minLength="6" placeholder="Не менее 6 символов"/></div>
            <button className="primary full" type="submit">{authMode==='login'?'Войти на борт ↗':'Создать аккаунт ↗'}</button>
          </form><p className="auth-note">Демонстрационный режим: форма имитирует вход и регистрацию в рамках текущего сеанса. Для реальных аккаунтов нужен backend.</p>
        </div>
      </section>}
    </main>
    <footer><div className="footer-inner"><div className="footer-brand"><span className="footer-plane">✈</span><span>Уфимский университет<br/>науки и технологий</span></div><div className="footer-links"><button onClick={()=>navigate('home')}>Новости</button><button onClick={()=>navigate('suggest')}>Предложка</button>{currentUser ? <><button onClick={()=>navigate('profile')}>Личный кабинет</button><button onClick={()=>{setCurrentUser(null);resetForm();notify('Вы вышли из аккаунта');navigate('home')}}>Выйти</button></> : <button onClick={()=>navigate('auth')}>Вход / регистрация</button>}<button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Наверх ↑</button></div><span>Лети к своим целям ☁</span></div></footer>
    {toast&&<div className="toast" role="status">{toast}</div>}
  </>;
}
export default App;