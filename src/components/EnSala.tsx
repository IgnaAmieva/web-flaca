const fotos = [
  { src: '/img/sala-01.webp', alt: 'Mariela junto a una obra vertical en una muestra', caption: 'en muestra', r: '-1.5deg' },
  { src: '/img/sala-02.webp', alt: 'Mariela hablando en una bodega', caption: 'presentación en bodega', r: '1.2deg' },
  { src: '/img/sala-03.webp', alt: 'Mariela frente a una de sus obras', caption: 'frente a la obra', r: '-.8deg' },
  { src: '/img/sala-04.webp', alt: 'Retrato de Mariela sentada', caption: 'retrato', r: '1.6deg' },
  { src: '/img/sala-05.webp', alt: 'Retrato de Mariela en blanco y negro', caption: 'retrato', r: '-1.2deg' },
];

export default function EnSala() {
  return (
    <section className="sala tex">
      <div className="wrap">
        <div className="head">
          <h2>En <span className="under" style={{ '--c': 'var(--rose)' } as React.CSSProperties}>sala</span></h2>
          <p>Muestras, presentaciones y la obra en su lugar. Deslizá para ver más.</p>
        </div>
        <div className="strip">
          {fotos.map((f, i) => (
            <figure key={i} style={{ '--r': f.r } as React.CSSProperties}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt={f.alt} />
              <figcaption>{f.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
