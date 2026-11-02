'use client';
import { useEffect, useRef } from 'react';
import { usePaintIn } from '@/hooks/usePaintIn';

export default function Contacto() {
  const pcRef = useRef<HTMLDivElement>(null);
  const paintIn = usePaintIn();

  useEffect(() => {
    const el = pcRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            paintIn(e.target as HTMLElement, 1600);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [paintIn]);

  return (
    <section className="contacto tex" id="contacto">
      <div className="wrap">
        <span className="eyebrow">Obras y encargos</span>
        <h2>¿Te gustó una <span className="under" style={{ '--c': 'var(--ochre)' } as React.CSSProperties}>obra</span>?</h2>
        <div className="row">
          <div>
            <p>Escribile a Mariela para consultar disponibilidad, medidas, precio y envío, o para una obra pensada para tu espacio.</p>
            <div className="btns" style={{ marginTop: 30 }}>
              <a
                className="brushbtn turq"
                href="https://wa.me/5492622464637?text=%C2%A1Hola%20Mariela%21%20Vi%20tu%20web%20y%20quiero%20consultar%20por%20una%20obra."
                target="_blank"
                rel="noopener"
                style={{ '--rot': '-3deg' } as React.CSSProperties}
              >
                Escribir por WhatsApp
              </a>
              <a
                className="textbtn"
                href="https://www.instagram.com/marielagonzalez_arte/"
                target="_blank"
                rel="noopener"
                style={{ '--c': 'var(--rose)', '--rot': '2deg' } as React.CSSProperties}
              >
                Instagram <span className="ar">→</span>
              </a>
            </div>
            <div className="data">
              WhatsApp <b>+54 9 2622 46-4637</b> · Instagram <b>@marielagonzalez_arte</b>
            </div>
          </div>
          <div className="frame cframe">
            <div className="spot" />
            <div className="pc paintable" ref={pcRef}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/obra-contacto.webp" alt="Obra en rojos y turquesas de Mariela Gonzalez" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
