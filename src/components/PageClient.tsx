'use client';
import { useState, useEffect, useCallback } from 'react';
import Intro from './Intro';
import Header from './Header';
import Hero from './Hero';
import Frase from './Frase';
import Muestra from './Muestra';
import Artista from './Artista';
import EnSala from './EnSala';
import Vino from './Vino';
import Contacto from './Contacto';
import Footer from './Footer';
import Visor from './Visor';

export default function PageClient() {
  const [sigImg, setSigImg] = useState<HTMLImageElement | null>(null);
  const [heroStarted, setHeroStarted] = useState(false);
  const [visorOpen, setVisorOpen] = useState(false);
  const [visorIndex, setVisorIndex] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setSigImg(img);
    img.src = '/img/firma-full.png';
  }, []);

  const handleIntroDone = useCallback(() => {
    setHeroStarted(true);
  }, []);

  const handleOpenVisor = useCallback((index: number) => {
    setVisorIndex(index);
    setVisorOpen(true);
  }, []);

  return (
    <>
      <Intro sigImg={sigImg} onDone={handleIntroDone} />
      <Header />
      <main id="inicio">
        <Hero sigImg={sigImg} started={heroStarted} />
        <Frase />
        <Muestra onOpenVisor={handleOpenVisor} />
        <Artista />
        <EnSala />
        <Vino />
        <Contacto />
      </main>
      <Footer sigImg={sigImg} />
      <Visor
        current={visorIndex}
        open={visorOpen}
        onClose={() => setVisorOpen(false)}
        onNav={setVisorIndex}
      />
    </>
  );
}
