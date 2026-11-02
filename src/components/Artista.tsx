export default function Artista() {
  return (
    <section className="artista tex" id="artista">
      <div className="wrap row">
        <div className="frame">
          <div className="pc">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/mariela-artista.webp" alt="Mariela Gonzalez en su espacio junto a una de sus obras" />
          </div>
        </div>
        <div>
          <span className="eyebrow">La artista</span>
          <h2>Pintar para llenar los <span className="under" style={{ '--c': 'var(--verm)' } as React.CSSProperties}>espacios</span></h2>
          <span className="hand">Tunuyán, 1975</span>
          <p>Mariela Gonzalez nació en Tunuyán, Mendoza. Para ella, a través de los colores y de las formas se llenan muchos espacios: por eso pintar le provoca tanta satisfacción y la impulsa a crear obra de manera permanente.</p>
          <p>Trabaja la abstracción desde el gesto y la mancha, con capas que dejan ver lo que hay debajo. Participó en muestras colectivas e individuales.</p>
        </div>
      </div>
    </section>
  );
}
