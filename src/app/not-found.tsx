import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        minHeight: '100vh',
        background: 'var(--wall)',
        fontFamily: 'var(--display)',
        color: 'var(--ink)',
        textAlign: 'center',
        padding: 40,
      }}
    >
      <div>
        <Image
          src="/img/firma-mini.webp"
          alt="Mariela Gonzalez"
          width={220}
          height={55}
          style={{ margin: '0 auto 40px', filter: 'brightness(0)', opacity: 0.8 }}
        />
        <h1 style={{ fontSize: 'clamp(48px,8vw,96px)', margin: 0, lineHeight: 1 }}>404</h1>
        <p style={{ fontFamily: 'var(--hand)', fontSize: 28, color: 'var(--soft)', marginTop: 12 }}>
          Esta página no existe
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            marginTop: 32,
            fontFamily: 'var(--display)',
            fontSize: 22,
            color: 'var(--turq)',
            textDecoration: 'none',
          }}
        >
          Volver al inicio →
        </Link>
      </div>
    </div>
  );
}
