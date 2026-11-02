'use client';
import { useCallback, useEffect, useRef } from 'react';

function rnd(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export function usePaintIn() {
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const paintIn = useCallback((pc: HTMLElement, dur = 1500) => {
    const img = pc.querySelector('img') as HTMLImageElement | null;
    if (!img || pc.dataset.done) return;
    pc.dataset.done = '1';

    if (reduce.current) return;

    const cv = document.createElement('canvas');
    pc.appendChild(cv);
    pc.classList.add('painting');

    const d = Math.min(2, devicePixelRatio || 1);
    const W = Math.round(pc.clientWidth * d);
    const H = Math.round(pc.clientHeight * d);
    cv.width = W;
    cv.height = H;

    const x = cv.getContext('2d')!;
    const mk = document.createElement('canvas');
    mk.width = W;
    mk.height = H;
    const m = mk.getContext('2d')!;

    const rows = Math.max(4, Math.round(H / (W * 0.22)));
    const bw = (H / rows) * 1.5;
    const strokes: number[][][] = [];
    for (let r = 0; r < rows; r++) {
      const y = (r + 0.5) * H / rows + rnd(-bw * 0.1, bw * 0.1);
      const ltr = r % 2 === 0;
      const pts: number[][] = [];
      for (let i = 0; i <= 24; i++) {
        const t = i / 24;
        pts.push([
          (ltr ? t : 1 - t) * (W * 1.2) - W * 0.1,
          y + Math.sin(t * Math.PI * 1.3 + r) * bw * 0.12,
        ]);
      }
      strokes.push(pts);
    }

    const bristles = Array.from({ length: 14 }, () => ({
      o: rnd(-0.5, 0.5),
      w: rnd(0.08, 0.22),
      a: rnd(0.6, 1),
    }));

    const T = performance.now();
    const f = (t: number) => {
      const p = Math.min(1, (t - T) / dur);
      const tot = strokes.length;
      m.clearRect(0, 0, W, H);
      m.lineCap = 'round';

      for (let s = 0; s < tot; s++) {
        const sp = Math.max(0, Math.min(1, p * tot * 1.08 - s));
        if (sp <= 0) break;
        const pts = strokes[s];
        const n = Math.max(2, Math.ceil(sp * pts.length));

        for (const b of bristles) {
          m.globalAlpha = b.a;
          m.lineWidth = bw * b.w * 2.2;
          m.beginPath();
          for (let i = 0; i < n; i++) {
            const [px, py] = pts[i];
            if (i) m.lineTo(px, py + b.o * bw);
            else m.moveTo(px, py + b.o * bw);
          }
          m.stroke();
        }
      }

      m.globalAlpha = 1;
      if (p > 0.8) {
        m.globalAlpha = (p - 0.8) / 0.2;
        m.fillRect(0, 0, W, H);
        m.globalAlpha = 1;
      }

      x.clearRect(0, 0, W, H);
      x.drawImage(img, 0, 0, W, H);
      x.globalCompositeOperation = 'destination-in';
      x.drawImage(mk, 0, 0);
      x.globalCompositeOperation = 'source-over';

      if (p < 1) requestAnimationFrame(f);
      else {
        pc.classList.remove('painting');
        cv.remove();
      }
    };
    requestAnimationFrame(f);
  }, []);

  return paintIn;
}
