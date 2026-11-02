'use client';
import { useEffect, useRef, useCallback } from 'react';
import { obras } from '@/data/obras';

interface VisorProps {
  current: number;
  open: boolean;
  onClose: () => void;
  onNav: (index: number) => void;
}

export default function Visor({ current, open, onClose, onNav }: VisorProps) {
  const sxRef = useRef<number | null>(null);

  const show = useCallback(
    (delta: number) => {
      onNav((current + delta + obras.length) % obras.length);
    },
    [current, onNav]
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') show(1);
      if (e.key === 'ArrowLeft') show(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose, show]);

  const obra = obras[current];

  return (
    <div
      id="lb"
      hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Obra ampliada"
      onTouchStart={(e) => { sxRef.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (sxRef.current == null) return;
        const dx = e.changedTouches[0].clientX - sxRef.current;
        if (Math.abs(dx) > 50) show(dx < 0 ? 1 : -1);
        sxRef.current = null;
      }}
    >
      <div className="tb">
        <span>Mariela Gonzalez</span>
        <button id="lbx" aria-label="Cerrar" onClick={onClose}>✕</button>
      </div>
      <div className="im">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img id="lbi" src={obra?.imagen} alt={obra?.titulo || ''} />
      </div>
      <div className="nv">
        <button id="lbp" aria-label="Obra anterior" onClick={() => show(-1)}>←</button>
        <a
          className="brushbtn"
          href="https://wa.me/5492622464637?text=%C2%A1Hola%20Mariela%21%20Vi%20una%20obra%20en%20tu%20web%20y%20quiero%20consultar%20disponibilidad%2C%20medidas%20y%20precio."
          target="_blank"
          rel="noopener"
          id="lba"
          onClick={onClose}
        >
          Consultar por esta obra
        </a>
        <button id="lbnx" aria-label="Obra siguiente" onClick={() => show(1)}>→</button>
      </div>
    </div>
  );
}
