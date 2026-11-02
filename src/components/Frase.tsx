'use client';
import { useEffect, useRef } from 'react';
import { usePaintIn } from '@/hooks/usePaintIn';

export default function Frase() {
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
    <section className="quote tex">
      <div className="wrap row">
        <div>
          <span className="eyebrow">Sobre su obra «Soltarse»</span>
          <blockquote>
            Manchas que <span className="under" style={{ '--c': 'var(--turq)' } as React.CSSProperties}>hablan</span> y dejan sentir.
          </blockquote>
          <cite>— Mariela</cite>
        </div>
        <div className="frame">
          <div className="pc paintable" ref={pcRef}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/obra-frase.webp" alt="Obra con trazo negro y manchas rosadas sobre blanco" />
          </div>
        </div>
      </div>
    </section>
  );
}
