export interface Obra {
  id: number;
  imagen: string;
  titulo: string;
  tecnica: string;
  medidas: string;
  disponible: boolean;
  /** Ancho del atril en px (desktop) */
  pw: number;
  /** Ancho del atril en vw (mobile) */
  pwm: string;
  /** Color del punto: turq | verm | ochre | rose */
  dot: string;
}

export const obras: Obra[] = [
  { id: 1,  imagen: '/img/obra-01.webp', titulo: 'Sin título', tecnica: '', medidas: '', disponible: true, pw: 360, pwm: '84vw', dot: 'turq' },
  { id: 2,  imagen: '/img/obra-02.webp', titulo: 'Sin título', tecnica: '', medidas: '', disponible: true, pw: 250, pwm: '64vw', dot: 'verm' },
  { id: 3,  imagen: '/img/obra-03.webp', titulo: 'Sin título', tecnica: '', medidas: '', disponible: true, pw: 440, pwm: '88vw', dot: 'ochre' },
  { id: 4,  imagen: '/img/obra-04.webp', titulo: 'Sin título', tecnica: '', medidas: '', disponible: true, pw: 250, pwm: '64vw', dot: 'rose' },
  { id: 5,  imagen: '/img/obra-05.webp', titulo: 'Sin título', tecnica: '', medidas: '', disponible: true, pw: 440, pwm: '88vw', dot: 'turq' },
  { id: 6,  imagen: '/img/obra-06.webp', titulo: 'Sin título', tecnica: '', medidas: '', disponible: true, pw: 250, pwm: '64vw', dot: 'verm' },
  { id: 7,  imagen: '/img/obra-07.webp', titulo: 'Sin título', tecnica: '', medidas: '', disponible: true, pw: 440, pwm: '88vw', dot: 'ochre' },
  { id: 8,  imagen: '/img/obra-08.webp', titulo: 'Sin título', tecnica: '', medidas: '', disponible: true, pw: 440, pwm: '88vw', dot: 'rose' },
  { id: 9,  imagen: '/img/obra-09.webp', titulo: 'Sin título', tecnica: '', medidas: '', disponible: true, pw: 250, pwm: '64vw', dot: 'turq' },
  { id: 10, imagen: '/img/obra-10.webp', titulo: 'Sin título', tecnica: '', medidas: '', disponible: true, pw: 440, pwm: '88vw', dot: 'verm' },
  { id: 11, imagen: '/img/obra-11.webp', titulo: 'Sin título', tecnica: '', medidas: '', disponible: true, pw: 440, pwm: '88vw', dot: 'ochre' },
  { id: 12, imagen: '/img/obra-12.webp', titulo: 'Sin título', tecnica: '', medidas: '', disponible: true, pw: 360, pwm: '84vw', dot: 'rose' },
  { id: 13, imagen: '/img/obra-13.webp', titulo: 'Sin título', tecnica: '', medidas: '', disponible: true, pw: 440, pwm: '88vw', dot: 'turq' },
  { id: 14, imagen: '/img/obra-14.webp', titulo: 'Sin título', tecnica: '', medidas: '', disponible: true, pw: 440, pwm: '88vw', dot: 'verm' },
  { id: 15, imagen: '/img/obra-15.webp', titulo: 'Sin título', tecnica: '', medidas: '', disponible: true, pw: 440, pwm: '88vw', dot: 'ochre' },
  { id: 16, imagen: '/img/obra-16.webp', titulo: 'Sin título', tecnica: '', medidas: '', disponible: true, pw: 440, pwm: '88vw', dot: 'rose' },
  { id: 17, imagen: '/img/obra-17.webp', titulo: 'Sin título', tecnica: '', medidas: '', disponible: true, pw: 440, pwm: '88vw', dot: 'turq' },
  { id: 18, imagen: '/img/obra-18.webp', titulo: 'Sin título', tecnica: '', medidas: '', disponible: true, pw: 440, pwm: '88vw', dot: 'verm' },
];
