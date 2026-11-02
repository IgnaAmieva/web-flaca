'use client';
import { useRef, useEffect, useCallback, useState } from 'react';
import { usePaintIn } from '@/hooks/usePaintIn';
import SIGPATH from '@/data/firma.json';

interface HeroProps {
  sigImg: HTMLImageElement | null;
  started: boolean;
}

export default function Hero({ sigImg, started }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawnRef = useRef(false);
  const [signed, setSigned] = useState(false);
  const [lit, setLit] = useState(false);
  const paintIn = usePaintIn();

  // Draw full signature statically (no animation) once sigImg is available
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv || !sigImg || drawnRef.current) return;
    drawnRef.current = true;

    const d = Math.min(2, devicePixelRatio || 1);
    const W = Math.round(cv.clientWidth * d);
    const H = Math.round(W * 495 / 1995);
    cv.width = W;
    cv.height = H;

    const mask = document.createElement('canvas');
    mask.width = W;
    mask.height = H;
    const m = mask.getContext('2d')!;
    m.lineCap = m.lineJoin = 'round';
    m.strokeStyle = '#000';
    m.lineWidth = SIGPATH.thick * W * 2.6;

    for (const s of SIGPATH.strokes) {
      m.beginPath();
      m.moveTo(s[0][0] * W, s[0][1] * H);
      for (let i = 1; i < s.length; i++) m.lineTo(s[i][0] * W, s[i][1] * H);
      m.stroke();
    }

    const ctx = cv.getContext('2d')!;
    ctx.drawImage(sigImg, 0, 0, W, H);
    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = '#1f1c1a';
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(mask, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
  }, [sigImg]);

  // Handle resize — redraw static signature
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv || !sigImg) return;
    const handler = () => {
      if (!drawnRef.current) return;
      const d = Math.min(2, devicePixelRatio || 1);
      const W = Math.round(cv.clientWidth * d);
      const H = Math.round(W * 495 / 1995);
      cv.width = W;
      cv.height = H;

      const mask = document.createElement('canvas');
      mask.width = W;
      mask.height = H;
      const m = mask.getContext('2d')!;
      m.lineCap = m.lineJoin = 'round';
      m.strokeStyle = '#000';
      m.lineWidth = SIGPATH.thick * W * 2.6;
      for (const s of SIGPATH.strokes) {
        m.beginPath();
        m.moveTo(s[0][0] * W, s[0][1] * H);
        for (let i = 1; i < s.length; i++) m.lineTo(s[i][0] * W, s[i][1] * H);
        m.stroke();
      }
      const ctx = cv.getContext('2d')!;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(sigImg, 0, 0, W, H);
      ctx.globalCompositeOperation = 'source-in';
      ctx.fillStyle = '#1f1c1a';
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'destination-in';
      ctx.drawImage(mask, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [sigImg]);

  const startHero = useCallback(() => {
    setSigned(true);
    setTimeout(() => {
      setLit(true);
      document.querySelectorAll<HTMLElement>('.hero .paintable').forEach((pc, i) => {
        setTimeout(() => paintIn(pc, 1400), i * 260);
      });
    }, 200);
  }, [paintIn]);

  useEffect(() => {
    if (started) {
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
