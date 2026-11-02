'use client';
import { useEffect, useRef } from 'react';
import { obras } from '@/data/obras';
import EaselSvg from './EaselSvg';

interface MuestraProps {
  onOpenVisor: (index: number) => void;
}

export default function Muestra({ onOpenVisor }: MuestraProps) {
  const salonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const veiled = salonRef.current?.querySelectorAll<HTMLElement>('.veiled');
    if (!veiled) return;

    if (reduce) {
      veiled.forEach((v) => v.querySelector('.cloth')?.remove());
      return;
    }

    const vio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const v = e.target as HTMLElement;
            setTimeout(() => v.classList.add('open'), 120);
            vio.unobserve(v);
          }
        });
      },
      { threshold: 0.45 }
    );
    veiled.forEach((v) => vio.observe(v));
    return () => vio.disconnect();
  }, []);

  return (
    <section className="muestra tex" id="muestra">
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">Obras</span>
            <h2>La <span className="under">muestra</span></h2>
          </div>
          <p>Cada obra en su atril, como el día de la inauguración. Tocá una para verla completa y consultar disponibilidad, medidas y envío.</p>
        </div>
        <div className="salon" id="salon" ref={salonRef}>
          {obras.map((obra, i) => (
            <figure
              key={obra.id}
              className="work"
              style={{ '--pw': `${obra.pw}px`, '--pwm': obra.pwm } as React.CSSProperties}
              tabIndex={0}
              onClick={() => onOpenVisor(i)}
              onKeyDown={(e) => { if (e.key === 'Enter') onOpenVisor(i); }}
            >
              <div className="easel">
                <EaselSvg />
                <div className="pc veiled">
                  <div className="cloth" aria-hidden="true" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={obra.imagen} alt="Obra abstracta de Mariela Gonzalez" />
                </div>
                <div className="ledge" />
                <div className="shadow" />
              </div>
              <figcaption className="cartela" style={{ '--dot': `var(--${obra.dot})` } as React.CSSProperties}>
                <i /><b>Mariela Gonzalez</b> · {obra.titulo}
                {obra.tecnica && <> · {obra.tecnica}</>}
                {obra.medidas && <> · {obra.medidas}</>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="floor" aria-hidden="true" />
    </section>
  );
}
