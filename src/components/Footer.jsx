export default function Footer() {
  return (
    <footer className="foot">
      <p style={{ margin: '0 0 12px' }}>
        Informazioni nutrizionali a scopo divulgativo. Non sostituiscono una valutazione professionale personalizzata.
      </p>
      <a
        href="https://www.instagram.com/gustoscopio/"
        target="_blank"
        rel="noopener noreferrer"
        className="instagram-badge"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
        </svg>
        @gustoscopio
      </a>
    </footer>
  );
}
