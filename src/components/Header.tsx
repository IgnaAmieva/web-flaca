'use client';
import { useEffect, useState } from 'react';

export default function Header() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
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
          <a className="brushbtn" href="#contacto">Consultar</a>
        </nav>
      </div>
    </header>
  );
}
