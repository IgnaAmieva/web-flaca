'use client';
import { useEffect, useRef, useState } from 'react';
import { useSigWriter } from '@/hooks/useSigWriter';

interface FooterProps {
  sigImg: HTMLImageElement | null;
}

export default function Footer({ sigImg }: FooterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [started, setStarted] = useState(false);

  const { run } = useSigWriter(canvasRef, sigImg, { dur: 3000 });

  useEffect(() => {
    const el = canvasRef.current;
    if (!el || !sigImg) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            setStarted(true);
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [sigImg, run, started]);

  return (
    <footer className="tex">
      <div className="wrap">
        <div className="sigbox">
          <canvas
            className="sigw"
            id="sigFoot"
            ref={canvasRef}
            role="img"
            aria-label="Firma de Mariela Gonzalez"
          />
        </div>
        <div className="base">
          <span>
            © 2026 Mariela Gonzalez · Tunuyán, Mendoza ·{' '}
            <a href="https://www.instagram.com/marielagonzalez_arte/" target="_blank" rel="noopener">
              @marielagonzalez_arte
            </a>
          </span>
          <span>
            Web hecha por{' '}
            <a href="https://www.instagram.com/ndsocial_/" target="_blank" rel="noopener">
              NDSocial
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
