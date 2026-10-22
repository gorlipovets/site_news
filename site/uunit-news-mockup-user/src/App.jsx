import { useMemo, useState } from "react";
import {
  Bell, Search, UserRound, ChevronDown, Plus, Bookmark,
  MoreHorizontal, CalendarDays, Share2, X, Check, Newspaper
} from "lucide-react";

const faculties = [
  "Все", "ИИМРТ", "ИГСН", "ИИГУ", "Институт права", "ИПЧ",
  "ИТМ", "ИХЗЧС", "ИНЭБ", "ИЭТИ", "ФТИ", "ФАДЭТ", "ФФБФиЖ"
];

const initialNews = [
  {
    id: 1, faculty: "УУНиТ", date: "12 мая 2025, 14:32",
    title: "УУНиТ вошёл в топ-10 лучших вузов России по качеству образования",
    text: "Уфимский университет науки и технологий занял 8 место в рейтинге лучших вузов страны по качеству образования, опубликованном агентством RAEX.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=85",
    reactions: { "👍": 124, "❤️": 86, "😂": 34, "😮": 12, "😢": 8, "😡": 4 }
  },
  {
    id: 2, faculty: "ИТМ", date: "10 мая 2025, 16:21",
    title: "Студенты ИТМ разработали приложение для цифровизации студенческих мероприятий",
    text: "Команда студентов Института технологий и программирования создала мобильное приложение, которое помогает студентам быстро находить и посещать мероприятия УУНиТ.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85",
    reactions: { "👍": 98, "❤️": 57, "😂": 21, "😮": 7, "😢": 3, "😡": 1 }
  },
  {
    id: 3, faculty: "ФАДЭТ", date: "9 мая 2025, 11:10",
    title: "Фестиваль «Весна УУНиТ»",
    text: "Приглашаем студентов и сотрудников университета на ежегодный фестиваль «Весна УУНиТ». В программе — концерты, интерактивные площадки, фуд-корты и многое другое.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85",
    event: true, going: 482,
    reactions: { "👍": 136, "❤️": 74, "😂": 19, "😮": 9, "😢": 4, "😡": 2 }
  },
  {
    id: 4, faculty: "ИЭТИ", date: "7 мая 2025, 09:45",
    title: "В УУНиТ прошла лекция о перспективах развития искусственного интеллекта",
    text: "Эксперты в области ИИ рассказали о современных трендах, практическом применении технологий и возможностях для студентов.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=85",
    reactions: { "👍": 76, "❤️": 42, "😂": 16, "😮": 5, "😢": 2, "😡": 1 }
  },
  {
    id: 5, faculty: "ФФБФиЖ", date: "5 мая 2025, 16:20",
    title: "Студенты ФФБФиЖ заняли призовые места на легкоатлетической эстафете",
    text: "Команда факультета физической культуры, безопасности жизнедеятельности и технологий заняла 2 место в городской легкоатлетической эстафете среди вузов.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=85",
    reactions: { "👍": 54, "❤️": 28, "😂": 12, "😮": 4, "😢": 1, "😡": 0 }
  }
];

const reactionEmojis = ["👍", "❤️", "😂", "😮", "😢", "😡"];

function App() {
  const [news, setNews] = useState(initialNews);
  const [activeFaculty, setActiveFaculty] = useState("Все");
  const [search, setSearch] = useState("");
  const [myReactions, setMyReactions] = useState({});
  const [going, setGoing] = useState({});
  const [bookmarks, setBookmarks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", text: "", faculty: "УУНиТ" });
  const [notice, setNotice] = useState("");

  const filteredNews = useMemo(() => news.filter((item) => {
    const facultyMatch = activeFaculty === "Все" || item.faculty === activeFaculty;
    const query = search.trim().toLowerCase();
    const searchMatch = !query || `${item.title} ${item.text} ${item.faculty}`.toLowerCase().includes(query);
    return facultyMatch && searchMatch;
  }), [news, activeFaculty, search]);

  function reactToPost(postId, emoji) {
    const previous = myReactions[postId];
    setNews((items) => items.map((item) => {
      if (item.id !== postId) return item;
      const reactions = { ...item.reactions };
      if (previous) reactions[previous] = Math.max(0, (reactions[previous] || 0) - 1);
      if (previous !== emoji) reactions[emoji] = (reactions[emoji] || 0) + 1;
      return { ...item, reactions };
    }));
    setMyReactions((current) => {
      const next = { ...current };
      if (previous === emoji) delete next[postId];
      else next[postId] = emoji;
      return next;
    });
  }

  function toggleGoing(postId) {
    const wasGoing = Boolean(going[postId]);
    setGoing((current) => ({ ...current, [postId]: !wasGoing }));
    setNews((items) => items.map((item) =>
      item.id === postId ? { ...item, going: Math.max(0, (item.going || 0) + (wasGoing ? -1 : 1)) } : item
    ));
  }

  function submitNews(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.text.trim()) return;
    const newPost = {
      id: Date.now(), faculty: form.faculty, date: "Только что",
      title: form.title.trim(), text: form.text.trim(),
      image: "", reactions: Object.fromEntries(reactionEmojis.map((emoji) => [emoji, 0]))
    };
    setNews((items) => [newPost, ...items]);
    setActiveFaculty("Все");
    setSearch("");
    setForm({ title: "", text: "", faculty: "УУНиТ" });
    setModalOpen(false);
    setNotice("Новость добавлена в макет ленты. В реальном проекте отправляйте её на модерацию.");
    window.setTimeout(() => setNotice(""), 4500);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="УУНиТ — главная">
          <span className="brand-mark">Y</span>
          <span><b>УУНиТ</b><small>Новости</small></span>
        </a>
        <label className="search-box">
          <Search size={17} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск новостей..." />
          {search && <button className="icon-button" onClick={() => setSearch("")} aria-label="Очистить поиск"><X size={15}/></button>}
        </label>
        <div className="top-actions">
          <button className="icon-button notification" aria-label="Уведомления"><Bell size={19}/><i /></button>
          <button className="profile-button" onClick={() => setNotice("Раздел личного кабинета пока представлен как макет.")}>
            <span className="avatar"><UserRound size={19}/></span><span className="login-label">Войти</span><ChevronDown size={15}/>
          </button>
        </div>
      </header>

      <main className="main-content">
        <section className="page-heading">
          <div>
            <p className="eyebrow">УУНиТ · УНИВЕРСИТЕТСКАЯ ЖИЗНЬ</p>
            <h1>Новости</h1>
            <p className="subtitle">Актуальные события, достижения и жизнь УУНиТ</p>
          </div>
          <button className="suggest-link" onClick={() => setModalOpen(true)}><Plus size={17}/> Предложить новость</button>
        </section>

        <nav className="faculty-filters" aria-label="Фильтр по факультетам">
          {faculties.map((faculty) => (
            <button key={faculty} className={`filter-chip ${activeFaculty === faculty ? "active" : ""}`}
              onClick={() => setActiveFaculty(faculty)}>{faculty}</button>
          ))}
        </nav>

        {notice && <div className="notice"><Check size={16}/>{notice}<button onClick={() => setNotice("")} aria-label="Закрыть"><X size={15}/></button></div>}

        <section className="news-list" aria-label="Лента новостей">
          {filteredNews.map((item) => (
            <article className="news-card" key={item.id}>
              {item.image && <img className="news-image" src={item.image} alt="" loading="lazy" />}
              <div className="news-body">
                <div className="news-meta"><span className="faculty-tag">{item.faculty}</span><time>{item.date}</time></div>
                <h2>{item.title}</h2>
                <p className="news-description">{item.text}</p>
                <div className="card-bottom">
                  <div className="reactions" aria-label="Реакции">
                    {reactionEmojis.map((emoji) => (
                      <button key={emoji} className={`reaction ${myReactions[item.id] === emoji ? "selected" : ""}`}
                        onClick={() => reactToPost(item.id, emoji)} aria-label={`Реакция ${emoji}`}>
                        <span>{emoji}</span><small>{item.reactions[emoji] || 0}</small>
                      </button>
                    ))}
                  </div>
                  <div className="card-actions">
                    {item.event && <button className={`going-button ${going[item.id] ? "selected" : ""}`} onClick={() => toggleGoing(item.id)}>
                      <CalendarDays size={15}/>{going[item.id] ? "Пойду" : "Я пойду"}<span>{item.going || 0}</span>
                    </button>}
                    <button className={`icon-button ${bookmarks.includes(item.id) ? "saved" : ""}`} aria-label="Сохранить новость"
                      onClick={() => setBookmarks((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id])}>
                      <Bookmark size={17} fill={bookmarks.includes(item.id) ? "currentColor" : "none"}/>
                    </button>
                    <button className="icon-button" aria-label="Поделиться" onClick={() => {
                      if (navigator.clipboard) navigator.clipboard.writeText(`${item.title}`);
                      setNotice("Заголовок новости скопирован (если браузер разрешил копирование).");
                    }}><Share2 size={17}/></button>
                    <button className="icon-button" aria-label="Другие действия" onClick={() => setNotice("Дополнительные действия появятся в полной версии сайта.")}><MoreHorizontal size={18}/></button>
                  </div>
                </div>
              </div>
            </article>
          ))}
          {filteredNews.length === 0 && <div className="empty-state"><Newspaper size={30}/><h2>Ничего не найдено</h2><p>Попробуйте изменить запрос или выбрать другой факультет.</p><button className="secondary-button" onClick={() => {setSearch(""); setActiveFaculty("Все");}}>Сбросить фильтры</button></div>}
        </section>

        {filteredNews.length > 0 && <nav className="pagination" aria-label="Страницы новостей">
          <button disabled aria-label="Предыдущая страница">‹</button><button className="current">1</button><button onClick={() => setNotice("В демоверсии доступна только первая страница.")}>2</button><button onClick={() => setNotice("В демоверсии доступна только первая страница.")}>3</button><button onClick={() => setNotice("В демоверсии доступна только первая страница.")} aria-label="Следующая страница">›</button>
        </nav>}
        <footer className="footer">© УУНиТ · Новостная лента <span>Демонстрационный макет</span></footer>
      </main>

      {modalOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
        <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-heading"><div><p className="eyebrow">ПУБЛИКАЦИЯ</p><h2 id="modal-title">Предложить новость</h2></div><button className="icon-button" onClick={() => setModalOpen(false)} aria-label="Закрыть"><X size={19}/></button></div>
          <p className="modal-help">Расскажите о событии, достижении или инициативе университета. В полной версии публикация будет отправлена на модерацию.</p>
          <form onSubmit={submitNews}>
            <label>Заголовок<input required maxLength={120} value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="Коротко о главном"/></label>
            <label>Факультет / институт<select value={form.faculty} onChange={(e) => setForm({...form, faculty: e.target.value})}>{faculties.filter((f) => f !== "Все").map((f) => <option key={f}>{f}</option>)}</select></label>
            <label>Текст новости<textarea required rows={5} maxLength={1500} value={form.text} onChange={(e) => setForm({...form, text: e.target.value})} placeholder="Что произошло? Где и когда?"/></label>
            <div className="form-actions"><button type="button" className="secondary-button" onClick={() => setModalOpen(false)}>Отмена</button><button type="submit" className="primary-button">Отправить новость</button></div>
          </form>
        </section>
      </div>}
    </div>
  );
}

export default App;
