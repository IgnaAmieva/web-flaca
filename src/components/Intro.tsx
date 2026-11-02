'use client';
import { useRef, useCallback, useEffect, useState } from 'react';
import { useSigWriter } from '@/hooks/useSigWriter';

interface IntroProps {
  sigImg: HTMLImageElement | null;
  onDone: () => void;
}

export default function Intro({ sigImg, onDone }: IntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);
  const [signed, setSigned] = useState(false);
  const [flyClass, setFlyClass] = useState('');

  const fly = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const from = canvasRef.current?.getBoundingClientRect();
    const toEl = document.getElementById('sigHero');
    const to = toEl?.getBoundingClientRect();

    if (reduce || !to?.width || !from) {
      setFlyClass('gone');
      onDone();
      return;
    }

    const c = canvasRef.current!;
    const s = to.width / from.width;
    c.style.transformOrigin = '0 0';
    c.style.transition = 'transform 1.1s cubic-bezier(.65,0,.25,1)';
    setFlyClass('fly');
    requestAnimationFrame(() => {
      c.style.transform = `translate(${to.left - from.left}px,${to.top - from.top}px) scale(${s})`;
    });
    setTimeout(() => {
      setFlyClass('gone');
      onDone();
    }, 1150);
  }, [onDone]);

  const { run, full } = useSigWriter(canvasRef, sigImg, {
    dur: 3600,
    onDone: () => {
      setSigned(true);
      setTimeout(fly, 900);
    },
  });

  const skip = useCallback(() => {
    if (doneRef.current) return;
    full();
    setSigned(true);
    fly();
  }, [full, fly]);

  useEffect(() => {
    if (!sigImg) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo(0, 0);
    if (reduce) {
      full();
      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => {
        setFlyClass('gone');
        onDone();
      }, 0);
    } else {
      setTimeout(() => run(), 350);
    }
  }, [sigImg, run, full, onDone]);

  const cn = ['tex', signed ? 'signed' : '', flyClass].filter(Boolean).join(' ');

  return (
    <div
      id="intro"
      ref={introRef}
      className={cn}
      role="button"
      tabIndex={0}
      aria-label="Saltar la presentación"
      onClick={skip}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') skip(); }}
    >
      <div className="box">
        <canvas
          className="sigw"
          id="sigIntro"
          ref={canvasRef}
          role="img"
          aria-label="Firma de Mariela Gonzalez"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="art" src="/img/art-label.webp" alt="" />
      </div>
      <div className="skip">Tocá para entrar</div>
    </div>
  );
}
