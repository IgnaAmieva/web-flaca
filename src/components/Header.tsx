'use client';
import { useEffect, useState } from 'react';

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <header className={`top${solid ? ' solid' : ''}`} id="top">
      <div className="wrap">
        <a href="#inicio" aria-label="Mariela Gonzalez, inicio">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="mini" src="/img/firma-mini.webp" alt="Mariela Gonzalez" />
        </a>
        <nav>
          <a href="#muestra">Obras</a>
          <a className="h" href="#artista">La artista</a>
          <a className="h" href="#vino">Soltarse</a>
          <a
            className="nav-consultar"
            href="https://wa.me/5492622464637?text=%C2%A1Hola%20Mariela%21%20Vi%20tu%20web%20y%20quiero%20consultar%20por%20una%20obra."
            target="_blank"
            rel="noopener"
            style={{ opacity: heroVisible ? 0 : 1, pointerEvents: heroVisible ? 'none' : 'auto' }}
          >
            Consultar
          </a>
        </nav>
      </div>
    </header>
  );
}
