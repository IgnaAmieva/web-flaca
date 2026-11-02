export default function Vino() {
  return (
    <section className="vino tex" id="vino">
      <div className="wrap row">
        <div className="imgs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/vino-botella.webp" alt="Botella de Gran Malbec 2018 con la obra Soltarse" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/vino-contra.webp" alt="Contraetiqueta de Claroscuro Bodega de Arte" />
        </div>
        <div>
          <span className="eyebrow">Arte en la etiqueta</span>
          <h2>«Soltarse», en un <i>Gran Malbec</i></h2>
          <p>Su obra «Soltarse» viste la etiqueta del Gran Malbec 2018 de Claroscuro Bodega de Arte, en Vista Flores, Tunuyán.</p>
          <blockquote>«Plasmar una sensación de libertad donde se pueda brillar sin dejar de soñar, elevando el corazón tan alto como se pueda.»</blockquote>
        </div>
      </div>
    </section>
  );
}
