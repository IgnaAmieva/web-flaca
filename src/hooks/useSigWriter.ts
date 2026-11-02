'use client';
import { useCallback, useEffect, useRef } from 'react';
import SIGPATH from '@/data/firma.json';

interface SigWriterOptions {
  color?: string;
  dur?: number;
  onPoint?: (x: number, y: number, progress: number) => void;
  onDone?: () => void;
}

export function useSigWriter(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  sigImg: HTMLImageElement | null,
  opts: SigWriterOptions = {}
) {
  const { color = '#1f1c1a', dur = 3400, onPoint, onDone } = opts;
  const progressRef = useRef(0);
  const maskRef = useRef<HTMLCanvasElement | null>(null);
  const reduceRef = useRef(false);

  useEffect(() => {
    reduceRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!maskRef.current) {
      maskRef.current = document.createElement('canvas');
    }
  }, []);

  const size = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv || !maskRef.current) return { W: 0, H: 0 };
    const d = Math.min(2, devicePixelRatio || 1);
    const W = Math.round(cv.clientWidth * d);
    const H = Math.round(W * 495 / 1995);
    cv.width = maskRef.current.width = W;
    cv.height = maskRef.current.height = H;
    return { W, H };
  }, [canvasRef]);

  const draw = useCallback((pr: number, W: number, H: number) => {
    const cv = canvasRef.current;
    const mask = maskRef.current;
    if (!cv || !mask || !sigImg) return;
    const ctx = cv.getContext('2d')!;
    const m = mask.getContext('2d')!;
    const S = SIGPATH.strokes;
    const tot = S.reduce((a: number, s: number[][]) => a + s.length, 0);

    m.clearRect(0, 0, W, H);
    m.lineCap = m.lineJoin = 'round';
    m.strokeStyle = '#000';
    m.lineWidth = SIGPATH.thick * W * 2.6;
    let b = pr * tot;
    let head: number[] | null = null;

    for (const s of S) {
      if (b <= 0) break;
      const n = Math.min(s.length, Math.ceil(b));
      m.beginPath();
      m.moveTo(s[0][0] * W, s[0][1] * H);
      for (let i = 1; i < n; i++) m.lineTo(s[i][0] * W, s[i][1] * H);
      m.stroke();
      head = s[Math.max(0, n - 1)];
      b -= s.length;
    }

    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(sigImg, 0, 0, W, H);
    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(mask, 0, 0);
    ctx.globalCompositeOperation = 'source-over';

    if (onPoint && head) onPoint(head[0], head[1], pr);
  }, [canvasRef, sigImg, color, onPoint]);

  const full = useCallback(() => {
    const { W, H } = size();
    if (!W) return;
    progressRef.current = 1;
    draw(1, W, H);
  }, [size, draw]);

  const run = useCallback(() => {
    const { W, H } = size();
    if (!W) return;
    if (reduceRef.current) {
      full();
      onDone?.();
      return;
    }
    const T = performance.now();
    const f = (t: number) => {
      progressRef.current = Math.min(1, (t - T) / dur);
      draw(progressRef.current, W, H);
      if (progressRef.current < 1) requestAnimationFrame(f);
      else onDone?.();
    };
    requestAnimationFrame(f);
  }, [size, draw, full, dur, onDone]);

  // Resize handler
  useEffect(() => {
    const handler = () => {
      if (progressRef.current > 0) {
        const { W, H } = size();
        if (W) draw(progressRef.current, W, H);
      }
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [size, draw]);

  return { run, full };
}
