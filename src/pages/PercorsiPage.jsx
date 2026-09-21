import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import PercorsiModal from '../components/PercorsiModal';
import Footer from '../components/Footer';
import { getIncludedContent } from '../percorsiBonus';
import { PACKAGES, MODALITA_LABEL, perMonth, packageFeatures } from '../percorsiData';

const TRUST_POINTS = [
  { icon: '🎯', label: 'Su misura per te' },
  { icon: '🔄', label: 'Si adatta nel tempo' },
  { icon: '🤝', label: 'Accompagnamento reale' },
  { icon: '🏋️', label: 'Con scheda di allenamento' },
  { icon: '📍', label: 'A Roma o online' },
];

const PHASES = [
  { num: '01', title: 'Analizziamo', desc: 'Partiamo dalla tua situazione reale: abitudini, obiettivi, vincoli di tempo e di vita quotidiana.' },
  { num: '02', title: 'Costruiamo', desc: 'Un percorso pensato su di te, non un modello standard applicato a chiunque.' },
  { num: '03', title: 'Adattiamo', desc: 'Il percorso si aggiusta nel tempo, in base a come risponde la tua vita reale, non solo la teoria.' },
  { num: '04', title: 'Consolidiamo', desc: 'L\'obiettivo non è un risultato temporaneo, ma un cambiamento che regge nel tempo.' },
];

const INCLUDES = [
  'Analisi della tua situazione e dei tuoi obiettivi reali',
  'Piano nutrizionale costruito su di te, non un modello standard',
  'Aggiustamenti del percorso nel tempo, non un piano rigido e fisso',
  'Un punto di riferimento diretto per le tue domande',
  'Scheda di allenamento personalizzata',
  { text: 'Guide PDF esclusive di approfondimento', to: '/guide', linkLabel: 'Scopri le guide →' },
  'Accesso ai videocorsi di Gustoscopio',
];

const TESTIMONIALS = [
  { name: 'Marco, 34 anni', text: 'Avevo già provato diete rigide che duravano poche settimane. Qui il percorso si è adattato a me, non il contrario.' },
  { name: 'Giulia, 41 anni', text: 'Quello che mi ha convinta è stato non sentirmi giudicata per nessuna scelta alimentare, solo accompagnata.' },
  { name: 'Luca, 28 anni', text: 'Utile soprattutto la parte di adattamento: la mia vita è cambiata a metà percorso e il piano si è aggiustato con me.' },
  { name: 'Sara, 37 anni', text: 'Tra lavoro e famiglia non ho mai tempo. Qui i pasti sono pensati per essere veloci da preparare, non per un mondo ideale che non esiste.' },
  { name: 'Alessandro, 45 anni', text: 'La scheda di allenamento inclusa mi ha fatto capire come far andare insieme palestra e alimentazione, cosa che da solo non ero mai riuscito a fare.' },
  { name: 'Chiara, 29 anni', text: 'Avevo un rapporto complicato col cibo. Il tono usato durante il percorso non mi ha mai fatto sentire sbagliata per come mangiavo prima.' },
  { name: 'Davide, 52 anni', text: 'Ho abitudini radicate da vent\'anni. Non mi hanno chiesto di stravolgere tutto, ma di cambiare un pezzo alla volta.' },
  { name: 'Federica, 33 anni', text: 'Dopo la maternità cercavo qualcosa di realistico, non un piano da rivista. Qui si parte da dove sei davvero.' },
  { name: 'Andrea, 39 anni', text: 'Viaggio spesso per lavoro. Il percorso ha tenuto conto anche di questo, con alternative pratiche per quando sono fuori casa.' },
  { name: 'Valentina, 26 anni', text: 'Prima ho sempre fatto da sola, seguendo consigli trovati online. Avere un confronto reale ha fatto la differenza.' },
  { name: 'Roberto, 48 anni', text: 'I video del corso incluso mi hanno aiutato a capire il perché delle scelte, non solo il cosa fare — questo mi ha convinto a restare costante.' },
  { name: 'Elena, 31 anni', text: 'Quello che apprezzo di più è che il percorso si aggiorna con me: quando qualcosa non funziona, lo diciamo e si cambia.' },
];

const TESTIMONIALS_ROW_1 = TESTIMONIALS.slice(0, 6);
const TESTIMONIALS_ROW_2 = TESTIMONIALS.slice(6, 12);

export default function PercorsiPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPackage, setModalPackage] = useState(null);
  const openModal = (pkgId = null) => { setModalPackage(pkgId); setModalOpen(true); };
  const inc = getIncludedContent();

  return (
    <div>
      <Nav />

      <header className="hero percorsi-hero" style={{ paddingTop: 64, paddingBottom: 10 }}>
        <div className="percorsi-kicker">IL METODO</div>
        <h1 style={{ fontSize: 'clamp(38px, 7vw, 68px)' }}>
          Non ti serve<br />un'altra <span className="percorsi-highlight">dieta</span>.
        </h1>
        <p className="sub">Ti serve un metodo che riesca a entrare nella tua vita e rimanerci.</p>

        <div className="trust-row">
          {TRUST_POINTS.map((t) => (
            <div className="trust-pill" key={t.label}>
              <span>{t.icon}</span> {t.label}
            </div>
          ))}
        </div>
      </header>

      <div className="section" style={{ maxWidth: 920 }}>
        <div className="section-head">
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 46px)' }}>Il percorso, in 4 fasi.</h2>
        </div>
        <div className="phases-timeline">
          {PHASES.map((p, i) => (
            <div className="phase-card phase-card-v2" key={p.num}>
              <div className="phase-num-circle">{p.num}</div>
              {i < PHASES.length - 1 && <div className="phase-connector" />}
              <div className="phase-title">{p.title}</div>
              <div className="phase-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section includes-section" style={{ maxWidth: 980 }}>
        <div className="includes-grid">
          <div>
            <div className="section-head" style={{ textAlign: 'left', marginBottom: 24 }}>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)' }}>Cosa include il percorso.</h2>
            </div>
            <div className="includes-list">
              {INCLUDES.map((item) => {
                const text = typeof item === 'string' ? item : item.text;
                return (
                  <div className="includes-row" key={text}>
                    <span className="includes-check">✓</span>
                    <span>
                      {text}
                      {typeof item !== 'string' && (
                        <>
                          {' '}
                          <Link to={item.to} style={{ color: '#3155FF', fontWeight: 600, whiteSpace: 'nowrap' }}>{item.linkLabel}</Link>
                        </>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="includes-visual">
            <div className="includes-visual-num">4</div>
            <div className="includes-visual-label">fasi pensate per durare<br />oltre il percorso stesso</div>
          </div>
        </div>
      </div>

      <div className="section bonus-section" style={{ maxWidth: 1080 }}>
        <div className="section-head" style={{ marginBottom: 8 }}>
          <div className="percorsi-kicker">INCLUSO NEL PERCORSO</div>
          <h2 style={{ fontSize: 'clamp(30px, 5vw, 44px)' }}>Il percorso, e tutto il resto.</h2>
          <p className="sub" style={{ maxWidth: 560, margin: '12px auto 0' }}>
            Fin dalla prima visita ricevi anche i contenuti di Gustoscopio, senza costi aggiuntivi.
          </p>
        </div>

        <div className="bonus-grid">
          <div className="bonus-card">
            <div className="bonus-card-top">
              <span className="bonus-icon">🏋️</span>
              <span className="bonus-tag">INCLUSA</span>
            </div>
            <h3>Scheda di allenamento</h3>
            <ul className="bonus-list">
              <li><strong>Costruita sui tuoi obiettivi</strong></li>
              <li>Pensata insieme al piano nutrizionale</li>
              <li>Ti arriva già con la prima visita</li>
            </ul>
            <div className="bonus-value">
              <span className="bonus-value-num bonus-value-word">Su misura</span>
              <span className="bonus-value-label">non è un modello uguale per tutti: parte da ciò che vuoi ottenere</span>
            </div>
          </div>

          <div className="bonus-card">
            <div className="bonus-card-top">
              <span className="bonus-icon">🎬</span>
              <span className="bonus-tag">INCLUSO</span>
            </div>
            <h3>Videocorsi</h3>
            <ul className="bonus-list">
              {inc.courses.map((c) => (
                <li key={c.id}>
                  <strong>{c.title}</strong>
                  {c.totalPlannedVideos ? ` · ${c.totalPlannedVideos} video brevi` : ''}
                </li>
              ))}
            </ul>
            {inc.coursesValue && (
              <div className="bonus-value">
                {inc.strike ? (
                  <>
                    <span className="bonus-value-num"><s className="bonus-strike">{inc.coursesTotal}€</s> {inc.coursesPathTotal}€</span>
                    <span className="bonus-value-label">con il percorso, incluso nel prezzo. Da solo costa {inc.coursesTotal}€</span>
                  </>
                ) : (
                  <>
                    <span className="bonus-value-num">{inc.coursesTotal}€</span>
                    <span className="bonus-value-label">{inc.courses.length === 1 ? 'il prezzo, se lo acquisti da solo' : 'il prezzo, se li acquisti da soli'}. Con il percorso è incluso</span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="bonus-card">
            <div className="bonus-card-top">
              <span className="bonus-icon">📘</span>
              <span className="bonus-tag">INCLUSO</span>
            </div>
            <h3>Guide PDF esclusive</h3>
            <ul className="bonus-list">
              {inc.guides.slice(0, 4).map((g) => (
                <li key={g.id}><strong>{g.title}</strong> · {g.pages} pagine</li>
              ))}
              {inc.guides.length > 4 && <li>…e altre guide di approfondimento</li>}
            </ul>
            <Link to="/guide" style={{ color: '#3155FF', fontWeight: 600, fontSize: 14, marginBottom: 18 }}>Scopri le guide →</Link>
            <div className="bonus-value">
              <span className="bonus-value-num">{inc.guidesValue}€</span>
              <span className="bonus-value-label">il valore delle guide: non sono in vendita, le ricevi con la prima visita e con ogni percorso</span>
            </div>
          </div>
        </div>
        <p className="bonus-total">In tutto, <strong>{inc.totalValue}€</strong> di contenuti, più la scheda di allenamento, inclusi fin dalla prima visita.</p>
      </div>

      <div className="section" style={{ maxWidth: 1100, paddingLeft: 0, paddingRight: 0 }}>
        <div className="section-head" style={{ paddingLeft: 20, paddingRight: 20 }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 38px)' }}>Chi lo ha provato</h2>
        </div>
        <div className="testimonial-marquee">
          <div className="testimonial-track">
            {[...TESTIMONIALS_ROW_1, ...TESTIMONIALS_ROW_1].map((t, i) => (
              <div className="testimonial-mini-card" key={i}>
                <div className="testimonial-text-mini">{t.text}</div>
                <div className="testimonial-footer">
                  <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                  <div className="testimonial-name">{t.name}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-track testimonial-track-reverse">
            {[...TESTIMONIALS_ROW_2, ...TESTIMONIALS_ROW_2].map((t, i) => (
              <div className="testimonial-mini-card" key={i}>
                <div className="testimonial-text-mini">{t.text}</div>
                <div className="testimonial-footer">
                  <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                  <div className="testimonial-name">{t.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="percorsi-cta-block">
        <div className="percorsi-cta-inner percorsi-cta-wide">
          <div className="kicker" style={{ color: 'rgba(255,255,255,0.6)' }}>PERCORSI E PREZZI</div>
          <h2 style={{ color: 'white' }}>Scegli da dove partire.</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 620, marginLeft: 'auto', marginRight: 'auto' }}>
            Fin dalla prima visita hai anche i videocorsi{inc.coursesValue ? ` (${inc.coursesValue})` : ''}, le guide PDF esclusive e la scheda di allenamento, senza costi aggiuntivi.
            La prima visita è compresa in ogni percorso: non la paghi due volte. Qui sotto trovi tutto ciò che è incluso in ciascuna opzione.
          </p>
          <div className="price-modality price-modality-dark">📍 {MODALITA_LABEL}</div>

          <div className="price-grid">
            {PACKAGES.map((p) => (
              <div className="price-card" key={p.id}>
                <span className="price-icon">{p.icon}</span>
                <h3>{p.label}</h3>
                <div className="price-amount">{p.price}€</div>
                <div className="price-sub">{perMonth(p) ? `≈ ${perMonth(p)}€ al mese` : 'una tantum'}</div>
                <p className="price-desc">{p.desc}</p>
                <ul className="price-features">
                  {packageFeatures(p).map((f) => (
                    <li key={f.label} className={f.on ? '' : 'off'}>
                      <span className="pf-mark">{f.on ? '✓' : '–'}</span>
                      <span>
                        {f.label}
                        {f.on && f.note ? <span className="pf-note">{f.note}</span> : null}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className="add-btn price-btn" onClick={() => openModal(p.id)}>Richiedi informazioni</button>
              </div>
            ))}
          </div>
          <p className="cta-note">
            Nessun impegno: la richiesta serve solo a capire da dove partire. Le guide PDF restano tue; il videocorso resta accessibile per il tempo indicato.
          </p>
        </div>
      </div>

      <Footer />

      <PercorsiModal isOpen={modalOpen} onClose={() => setModalOpen(false)} initialPackage={modalPackage} />
    </div>
  );
}
