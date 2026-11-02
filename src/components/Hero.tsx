'use client';
import { useRef, useEffect, useCallback, useState } from 'react';
import { useSigWriter } from '@/hooks/useSigWriter';
import { usePaintIn } from '@/hooks/usePaintIn';

interface HeroProps {
  sigImg: HTMLImageElement | null;
  started: boolean;
}

export default function Hero({ sigImg, started }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [signed, setSigned] = useState(false);
  const [lit, setLit] = useState(false);
  const paintIn = usePaintIn();

  const { full } = useSigWriter(canvasRef, sigImg);

  const startHero = useCallback(() => {
    setSigned(true);
    full();
    setTimeout(() => {
      setLit(true);
      document.querySelectorAll<HTMLElement>('.hero .paintable').forEach((pc, i) => {
        setTimeout(() => paintIn(pc, 1400), i * 260);
      });
    }, 200);
  }, [full, paintIn]);

  useEffect(() => {
    if (started) {
      // Defer to avoid synchronous setState in effect
      const id = requestAnimationFrame(() => startHero());
      return () => cancelAnimationFrame(id);
    }
  }, [started, startHero]);

  const cn = `hero tex${signed ? ' signed' : ''}${lit ? ' lit' : ''}`;

  return (
    <section className={cn} id="hero">
      <div className="wrap">
        <div className="sigbox">
          <canvas
            className="sigw"
            id="sigHero"
            ref={canvasRef}
            role="img"
            aria-label="Firma de Mariela Gonzalez"
          />
        </div>
        <div className="hang">
          <div className="frame p2">
            <div className="spot" />
            <div className="pc paintable">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/mariela-hero.webp" alt="Mariela Gonzalez sonriendo frente a una de sus obras" />
            </div>
          </div>
        </div>
        <div className="herocta">
          <a className="brushbtn" href="#muestra" style={{ '--rot': '-4deg' } as React.CSSProperties}>
            Ver las obras
          </a>
          <a
            className="textbtn"
            href="https://wa.me/5492622464637?text=%C2%A1Hola%20Mariela%21%20Vi%20tu%20web%20y%20quiero%20consultar%20por%20una%20obra."
            target="_blank"
            rel="noopener"
            style={{ '--rot': '2.5deg' } as React.CSSProperties}
          >
            Escribile a Mariela <span className="ar">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
