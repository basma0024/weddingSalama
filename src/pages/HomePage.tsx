import { useEffect, useRef, useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { useLang } from '../context/LangContext';

import ringHands from '../../public/imgs/Gemini_Generated_Image_sfmuflsfmuflsfmu.jpg'; // Hero
import galleryCandlesVeil from '../../public/imgs/gallery-candles-veil.jpg'; // Promise + countdown
import champagneGlass from '../../public/imgs/champagne-glass.jpg'; // Timeline
import coupleCalendarBg from '../../public/imgs/couple-calendar.png'; // Calendar
import ringHandsClosing from '../../public/imgs/ring-hands.jpg';

// ── Palette: ivory + ink black + sparing champagne ──
const colors = {
  ink: '#161616',
  night: '#0a0a0a',
  paper: '#f5f1ea',
  paperDeep: '#ece6da',
  muted: '#6d6a65',
  champagne: '#b8a27a',
  champagneSoft: '#d9c9a3',
  champagneDeep: '#8c7650',
};

const scriptFont = "'Beau Rivage', cursive";
const eyebrowFont = "'Jost', sans-serif";
const bodyFont = "'Cormorant Garamond', serif";
const displayFont = "'Playfair Display', 'Times New Roman', serif";

const MAP_LINK = 'https://maps.app.goo.gl/XQy32VLRY4N3ux4K8';
// For an exact pin: Google Maps → Share → Embed a map → copy the iframe src and paste it here
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent('Sandy Open Air Edku Beheira Egypt')}&output=embed`;

/** Fades in gently when it enters the viewport */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties }> = ({
  children,
  delay = 0,
  style = {},
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        }),
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(26px)',
        transition: `opacity 1.1s ease ${delay}s, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Classic ornamental divider: hairline – diamond – hairline */
const Ornament: React.FC<{ light?: boolean; style?: React.CSSProperties }> = ({ light = false, style = {} }) => {
  const c = light ? 'rgba(255,255,255,0.6)' : 'rgba(22,22,22,0.5)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', direction: 'ltr', ...style }}>
      <span style={{ width: '70px', height: '1px', background: `linear-gradient(to right, transparent, ${c})` }} />
      <span style={{ width: '7px', height: '7px', transform: 'rotate(45deg)', border: `1px solid ${c}` }} />
      <span style={{ width: '70px', height: '1px', background: `linear-gradient(to left, transparent, ${c})` }} />
    </div>
  );
};

const HomePage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { tr, isRTL } = useLang();

// ── Intro gate ──
const [opened, setOpened] = useState(false);
const [introGone, setIntroGone] = useState(false);
const [introIn, setIntroIn] = useState(false);

useEffect(() => {
  const t = setTimeout(() => setIntroIn(true), 120);
  return () => clearTimeout(t);
}, []);

// Hero animations start only once the invitation is opened
useEffect(() => {
  if (opened) setMounted(true);
}, [opened]);

// Lock scrolling while the intro is showing
useEffect(() => {
  document.body.style.overflow = introGone ? '' : 'hidden';
  return () => {
    document.body.style.overflow = '';
  };
}, [introGone]);

const handleOpen = () => {
  setOpened(true);
  window.scrollTo(0, 0);
  setTimeout(() => setIntroGone(true), 1250);
};

  // ── Countdown ──
  const weddingDate = new Date('2026-11-01T18:00:00').getTime();
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, weddingDate - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        fontFamily: isRTL ? "'Scheherazade New', serif" : displayFont,
        background: colors.paper,
        color: colors.ink,
        direction: isRTL ? 'rtl' : 'ltr',
        overflowX: 'hidden',
      }}
    >



{/* ══════════════ INTRO GATE ══════════════ */}
{!introGone && (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'radial-gradient(ellipse at 50% 0%, #ffffff 0%, #f6f6f4 70%, #efeeea 100%)',
      color: colors.ink,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 1.5rem',
      direction: isRTL ? 'rtl' : 'ltr',
      transform: opened ? 'translateY(-100%)' : 'translateY(0)',
      transition: 'transform 1.1s cubic-bezier(0.76, 0, 0.24, 1)',
    }}
  >
    {/* Classic double frame */}
    <div style={{ position: 'absolute', inset: '14px' , opacity: 0.7, pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', inset: '22px', opacity: 0.25, pointerEvents: 'none' }} />

    {/* Monogram */}
    <p
      style={{
        position: 'absolute',
        top: 'clamp(46px, 8vh, 70px)',
        margin: 0,
        fontFamily: eyebrowFont,
        fontSize: '0.7rem',
        letterSpacing: '0.42em',
        paddingLeft: '0.42em',
        color: colors.muted,
        direction: 'ltr',
        opacity: introIn ? 1 : 0,
        transition: 'opacity 1.2s ease 0.1s',
      }}
    >
      S &nbsp;&amp;&nbsp; E &nbsp;·&nbsp; 2026
    </p>

    {/* You are invited */}
    <p
      style={{
        margin: 0,
        fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : scriptFont,
        fontSize: isRTL ? 'clamp(30px, 8vw, 44px)' : 'clamp(44px, 12vw, 70px)',
        lineHeight: isRTL ? 1.9 : 1.1,
        color: colors.ink,
        opacity: introIn ? 1 : 0,
        transform: introIn ? 'translateY(0)' : 'translateY(18px)',
        transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s',
      }}
    >
      {isRTL ? 'أنتم مدعوون' : 'You are invited'}
    </p>

    <div
      style={{
        opacity: introIn ? 1 : 0,
        transition: 'opacity 1.2s ease 0.6s',
        width: '100%',
        margin: '26px 0',
      }}
    >
    </div>

    {/* Save the date */}
    <h1
      style={{
        margin: 0,
        fontFamily: isRTL ? "'Scheherazade New', serif" : displayFont,
        fontWeight: 500,
        fontSize: isRTL ? 'clamp(2.2rem, 9vw, 3.4rem)' : 'clamp(2rem, 8vw, 3.2rem)',
        letterSpacing: isRTL ? 'normal' : '0.2em',
        paddingLeft: isRTL ? 0 : '0.2em',
        textTransform: 'uppercase',
        lineHeight: 1.25,
        color: colors.ink,
        opacity: introIn ? 1 : 0,
        transform: introIn ? 'translateY(0)' : 'translateY(18px)',
        transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1) 0.8s',
      }}
    >
      {isRTL ? 'احفظوا الموعد' : 'Save the Date'}
    </h1>

    {/* Date */}
    <p
      style={{
        margin: '22px 0 0',
        fontFamily: bodyFont,
        fontSize: 'clamp(1.1rem, 4vw, 1.4rem)',
        fontWeight: 600,
        letterSpacing: '0.38em',
        paddingLeft: '0.38em',
        color: colors.ink,
        direction: 'ltr',
        opacity: introIn ? 1 : 0,
        transition: 'opacity 1.2s ease 1.05s',
      }}
    >
      1 · 11 · 2026
    </p>

    {/* Button */}
    <button
      type="button"
      onClick={handleOpen}
      style={{
        marginTop: '48px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        background: colors.ink,
        color: '#ffffff',
        border: `1px solid ${colors.ink}`,
        borderRadius: '999px',
        padding: '17px 40px',
        fontFamily: isRTL ? bodyFont : eyebrowFont,
        fontSize: isRTL ? '1.05rem' : '0.74rem',
        letterSpacing: isRTL ? '0.04em' : '0.3em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        opacity: introIn ? 1 : 0,
        transform: introIn ? 'translateY(0)' : 'translateY(14px)',
        transition: 'opacity 1.2s ease 1.3s, transform 1.2s cubic-bezier(0.16,1,0.3,1) 1.3s, background 0.4s ease, color 0.4s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = colors.ink;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = colors.ink;
        e.currentTarget.style.color = '#ffffff';
      }}
    >
      {isRTL ? 'افتح الدعوة' : 'Open Invitation'}
      <ArrowRight style={{ width: '15px', height: '15px', transform: isRTL ? 'scaleX(-1)' : 'none' }} />
    </button>
  </div>
)}




      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Beau+Rivage&family=Jost:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Playfair+Display:wght@400;500;600&family=Noto+Nastaliq+Urdu:wght@400..700&family=Scheherazade+New:wght@400;700&display=swap');

        html { scroll-behavior: smooth; }
        ::selection { background: ${colors.ink}; color: ${colors.paper}; }

        @keyframes heroScrollLine {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 0.2; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0.2; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section
        style={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: colors.night,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${ringHands})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%)',
            transform: 'scale(1.05)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.55) 45%, rgba(8,8,8,0.85) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Classic double frame */}
        <div style={{ position: 'absolute', inset: '12px',  pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: '20px', pointerEvents: 'none', zIndex: 1 }} />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto',
            padding: '0 36px',
            textAlign: 'center',
            color: '#ffffff',
          }}
        >
          <p
            style={{
              fontFamily: eyebrowFont,
              fontSize: '0.7rem',
              letterSpacing: isRTL ? '0.1em' : '0.38em',
              textTransform: 'uppercase',
              fontWeight: 500,
              marginBottom: '22px',
              color: colors.champagneSoft,
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(18px)',
              transition: 'all 1.1s ease .2s',
            }}
          >
            {tr.home.invitation}
          </p>

          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1) 0.45s',
            }}
          >
            <h1
              style={{
                fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : scriptFont,
                fontSize: isRTL ? 'clamp(46px,8vw,74px)' : 'clamp(58px,11vw,100px)',
                fontWeight: isRTL ? 700 : 400,
                lineHeight: isRTL ? 1.7 : 1.15,
                margin: 0,
                color: '#fff',
                textShadow: '0 2px 22px rgba(0,0,0,0.55)',
              }}
            >
              {tr.home.ahmed}
            </h1>

            <div style={{ margin: '10px 0' }}>
              <span style={{ fontFamily: scriptFont, fontSize: '1.7rem', color: colors.champagneSoft, lineHeight: 1 }}>&amp;</span>
            </div>

            <h1
              style={{
                fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : scriptFont,
                fontSize: isRTL ? 'clamp(46px,8vw,74px)' : 'clamp(58px,11vw,100px)',
                fontWeight: isRTL ? 700 : 400,
                lineHeight: isRTL ? 1.7 : 1.15,
                margin: 0,
                color: '#fff',
                textShadow: '0 2px 22px rgba(0,0,0,0.55)',
              }}
            >
              {tr.home.asmaa}
            </h1>
          </div>


          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '18px',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(18px)',
              transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1) 0.8s',
              marginTop:'40px'
            }}
          >
            <span
              style={{
                fontFamily: eyebrowFont,
                fontSize: '0.9rem',
                letterSpacing: isRTL ? '0.1em' : '0.34em',
                textTransform: 'uppercase',
                fontWeight: 500,
                color: '#ffffff',
              }}
            >
              {tr.home.mindate}
            </span>

            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: colors.champagneSoft,
                textDecoration: 'none',
                fontFamily: eyebrowFont,
                fontSize: '0.72rem',
                letterSpacing: isRTL ? '0.08em' : '0.28em',
                textTransform: 'uppercase',
              }}
            >
              <MapPin style={{ width: '13px', height: '13px' }} />
              {tr.home.location}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 1.4s ease 1.2s',
          }}
        >
          <span style={{ fontFamily: eyebrowFont, fontSize: '0.6rem', letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
            Scroll
          </span>
          <span style={{ width: '1px', height: '44px', background: 'rgba(255,255,255,0.7)', animation: 'heroScrollLine 2.4s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ══════════════ DATE ══════════════ */}
      <section
        style={{
          background: colors.paper,
          padding: '100px 24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          direction: 'ltr',
        }}
      >
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', gap: '22px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontFamily: bodyFont,
                fontWeight: 700,
                fontSize: 'clamp(72px, 20vw, 120px)',
                lineHeight: 1,
                letterSpacing: '0.02em',
                color: colors.ink,
                unicodeBidi: 'isolate',
              }}
            >
              01
            </div>

            <div style={{ width: '1px', alignSelf: 'stretch', minHeight: '150px', background: colors.ink, opacity: 0.55 }} />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '10px',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                fontFamily: bodyFont,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: 'clamp(15px, 4vw, 20px)', fontWeight: 600, letterSpacing: '0.42em', color: colors.ink }}>November</span>
              <span style={{ fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.4em', color: colors.muted }}>2026</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══════════════ PROMISE + COUNTDOWN ══════════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '90px 1.5rem',
          background: colors.night,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${galleryCandlesVeil})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) contrast(1.05)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,5,5,0.78) 0%, rgba(5,5,5,0.88) 100%)' }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'absolute', inset: '14px', border: '1px solid rgba(255,255,255,0.28)', pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: '22px', border: '1px solid rgba(255,255,255,0.12)', pointerEvents: 'none', zIndex: 1 }} />

        <Reveal style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px', width: '100%' }}>
          <p
            style={{
              fontFamily: eyebrowFont,
              fontSize: '0.68rem',
              letterSpacing: isRTL ? '0.1em' : '0.38em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '20px',
            }}
          >
            {isRTL ? 'وعد' : 'A Promise'}
          </p>

          <p
            style={{
              fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : scriptFont,
              fontSize: 'clamp(30px, 6vw, 50px)',
              color: '#ffffff',
              maxWidth: '640px',
              margin: '0 auto 44px',
              lineHeight: isRTL ? 1.9 : 1.45,
              textShadow: '0 2px 20px rgba(0,0,0,0.6)',
            }}
          >
            {isRTL ? '"من النهاردة، حياتنا هتبقى واحدة"' : '"From this day, our lives become one"'}
          </p>


          <p
            style={{
              fontFamily: eyebrowFont,
              fontSize: '0.68rem',
              letterSpacing: isRTL ? '0.1em' : '0.36em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '34px',
            }}
          >
            {isRTL ? 'العد التنازلي' : 'Counting down to our forever'}
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'clamp(10px, 4vw, 40px)',
              flexWrap: 'wrap',
              direction: 'ltr',
            }}
          >
            {[
              { v: time.d, l: isRTL ? 'يوم' : 'Days' },
              { v: time.h, l: isRTL ? 'ساعة' : 'Hours' },
              { v: time.m, l: isRTL ? 'دقيقة' : 'Minutes' },
              { v: time.s, l: isRTL ? 'ثانية' : 'Seconds' },
            ].map((c, i, arr) => (
              <div key={c.l} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px, 4vw, 40px)' }}>
                <div style={{ textAlign: 'center', minWidth: '64px' }}>
                  <div
                    style={{
                      fontFamily: displayFont,
                      fontWeight: 400,
                      fontSize: 'clamp(2.6rem, 7vw, 4.2rem)',
                      color: '#ffffff',
                      fontVariantNumeric: 'tabular-nums',
                      lineHeight: 1,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {String(c.v).padStart(2, '0')}
                  </div>
                  <div
                    style={{
                      fontFamily: isRTL ? bodyFont : eyebrowFont,
                      fontSize: isRTL ? '0.85rem' : '0.6rem',
                      letterSpacing: isRTL ? 'normal' : '0.28em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.65)',
                      marginTop: '12px',
                    }}
                  >
                    {c.l}
                  </div>
                </div>
                {i < arr.length - 1 && <span style={{ width: '1px', height: '48px', background: 'rgba(255,255,255,0.3)' }} />}
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: '44px',
              fontFamily: bodyFont,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '1.1rem',
              letterSpacing: '0.12em',
            }}
          >
            {isRTL ? '١ نوفمبر ٢٠٢٦' : '1 November 2026'}
          </p>
        </Reveal>
      </section>

      {/* ══════════════ SAVE THE DATE / CALENDAR ══════════════ */}
      <section
        style={{
          padding: '100px 1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: colors.paper,
          direction: 'ltr',
        }}
      >
        <Reveal style={{ width: '100%', maxWidth: '420px', textAlign: 'center' }}>
          <p
            dir={isRTL ? 'rtl' : 'ltr'}
            style={{
              fontFamily: bodyFont,
              fontStyle: 'italic',
              fontSize: 'clamp(1.15rem, 4vw, 1.45rem)',
              lineHeight: 1.6,
              color: '#2a2a2a',
              margin: '0 auto 34px',
              maxWidth: '340px',
            }}
          >
            {isRTL
              ? 'احفظوا الموعد، واحتفلوا معنا ببداية رحلتنا إلى الأبد.'
              : 'Save the date, and celebrate the start of our forever with us.'}
          </p>

          <div style={{ padding: '7px', border: `1px solid ${colors.ink}`, background: colors.paper }}>
            <div style={{ position: 'relative', overflow: 'hidden', border: `1px solid ${colors.ink}`, background: colors.night }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${coupleCalendarBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 30%',
                  filter: 'grayscale(100%) contrast(1.05)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.45) 45%, rgba(5,5,5,0.72) 100%)',
                }}
              />
              <div style={{ position: 'absolute', inset: '8px', border: '1px solid rgba(255,255,255,0.3)', pointerEvents: 'none', zIndex: 1 }} />

              <div style={{ position: 'relative', zIndex: 2, padding: '46px 28px 40px' }}>
                <h2
                  style={{
                    fontFamily: bodyFont,
                    fontWeight: 500,
                    fontSize: 'clamp(1.7rem, 7vw, 2.4rem)',
                    letterSpacing: isRTL ? 'normal' : '0.4em',
                    paddingLeft: isRTL ? 0 : '0.4em',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    margin: 0,
                    lineHeight: 1.2,
                    textShadow: '0 2px 14px rgba(0,0,0,0.6)',
                  }}
                >
                  {isRTL ? 'نوفمبر' : 'November'}
                </h2>
                <p
                  style={{
                    fontFamily: bodyFont,
                    fontSize: '0.72rem',
                    letterSpacing: '0.45em',
                    paddingLeft: '0.45em',
                    color: 'rgba(255,255,255,0.8)',
                    margin: '10px 0 22px',
                  }}
                >
                  2026
                </p>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.5)', marginBottom: '20px' }} />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '14px' }}>
                  {(isRTL ? ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'] : ['S', 'M', 'T', 'W', 'T', 'F', 'S']).map((d, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: bodyFont,
                        fontSize: '0.78rem',
                        letterSpacing: '0.1em',
                        color: 'rgba(255,255,255,0.7)',
                        textAlign: 'center',
                      }}
                    >
                      {d}
                    </span>
                  ))}
                </div>

                {/* November 2026 starts on a Sunday and has 30 days */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: '10px' }}>
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                    const active = day === 1;
                    return (
                      <div key={day} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <span
                          style={{
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: bodyFont,
                            fontSize: active ? '1.15rem' : '1.05rem',
                            fontWeight: active ? 700 : 500,
                            color: '#ffffff',
                            border: active ? '1px solid rgba(255,255,255,0.95)' : '1px solid transparent',
                            borderRadius: '50%',
                            boxShadow: active ? '0 0 0 4px rgba(255,255,255,0.4)' : 'none',
                            textShadow: '0 1px 8px rgba(0,0,0,0.6)',
                          }}
                        >
                          {isRTL ? day.toLocaleString('ar-EG') : day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

  

    

      {/* ══════════════ TIMELINE OF THE DAY ══════════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '100px 1.5rem',
          background: '#050505',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${champagneGlass})`,
            backgroundSize: 'auto 100%',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
            filter: 'grayscale(100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(5,5,5,0.94) 0%, rgba(5,5,5,0.72) 48%, rgba(5,5,5,0.12) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(5,5,5,0.7) 0%, transparent 25%, transparent 75%, rgba(5,5,5,0.7) 100%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '520px', margin: '0 auto', direction: 'ltr' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p
              style={{
                fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : scriptFont,
                fontSize: 'clamp(26px, 6vw, 38px)',
                color: 'rgba(255,255,255,0.9)',
                margin: 0,
                lineHeight: isRTL ? 1.9 : 1.2,
              }}
            >
              {isRTL ? 'برنامج' : 'Order of the'}
            </p>
            <h2
              style={{
                fontFamily: isRTL ? "'Scheherazade New', serif" : displayFont,
                fontWeight: 400,
                fontSize: 'clamp(2.2rem, 7vw, 3.2rem)',
                letterSpacing: isRTL ? 'normal' : '0.14em',
                textTransform: 'uppercase',
                color: '#ffffff',
                margin: '4px 0 0',
                lineHeight: 1.2,
              }}
            >
              {isRTL ? 'اليوم' : 'Day'}
            </h2>
          </Reveal>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '8px', bottom: '8px', left: '118px', width: '1px', background: 'rgba(255,255,255,0.5)' }} />

            {[
              { t: '8:30', ap: 'pm', l: isRTL ? 'استقبال الضيوف' : 'Guest Arrival' },
              { t: '9:30', ap: 'pm', l: isRTL ? 'عقد القران' : 'Wedding Ceremony' },
              { t: '10:00', ap: 'pm', l: isRTL ? 'العشاء والاحتفال' : 'Dinner & Celebration' },
              { t: '10:30', ap: 'pm', l: isRTL ? 'الرقص والحفلة' : 'Dancing & Party' },
            ].map((it, i) => (
              <Reveal key={i} delay={i * 0.1} style={{ marginBottom: i === 4 ? 0 : '46px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '104px', textAlign: 'right', lineHeight: 1 }}>
                    <div style={{ fontFamily: displayFont, fontWeight: 400, fontSize: '1.9rem', color: '#ffffff', letterSpacing: '0.02em' }}>
                      {it.t}
                    </div>
                    <div style={{ fontFamily: scriptFont, fontSize: '1.15rem', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
                      {it.ap}
                    </div>
                  </div>

                  <div style={{ width: '30px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                    <span
                      style={{
                        width: '13px',
                        height: '13px',
                        borderRadius: '50%',
                        background: colors.champagne,
                        boxShadow: '0 0 0 4px rgba(184,162,122,0.18)',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    />
                  </div>

                  <div
                    dir={isRTL ? 'rtl' : 'ltr'}
                    style={{
                      flex: 1,
                      paddingLeft: '14px',
                      textAlign: isRTL ? 'right' : 'left',
                      fontFamily: isRTL ? bodyFont : eyebrowFont,
                      fontSize: isRTL ? '1.1rem' : '0.74rem',
                      letterSpacing: isRTL ? 'normal' : '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.92)',
                    }}
                  >
                    {it.l}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>



    {/* ══════════════ WHERE ══════════════ */}
      <section
        style={{
          background: colors.paperDeep,
          padding: '100px 1.5rem',
          display: 'flex',
          justifyContent: 'center',
          direction: 'ltr',
        }}
      >
        <Reveal style={{ width: '100%', maxWidth: '620px', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : scriptFont,
              fontSize: 'clamp(40px, 9vw, 60px)',
              lineHeight: isRTL ? 1.8 : 1.1,
              color: colors.ink,
              margin: '0 0 22px',
            }}
          >
            {isRTL ? 'المكان' : 'Where'}
          </p>

          <h2
            dir={isRTL ? 'rtl' : 'ltr'}
            style={{
              fontFamily: bodyFont,
              fontWeight: 500,
              fontSize: 'clamp(1.3rem, 5vw, 1.8rem)',
              letterSpacing: isRTL ? 'normal' : '0.32em',
              textTransform: 'uppercase',
              color: colors.ink,
              margin: '0 0 14px',
              lineHeight: 1.4,
            }}
          >
            {isRTL ? 'قاعة ساندي أوبن إير' : 'Sandy Open Air Hall'}
          </h2>

          <p
            dir={isRTL ? 'rtl' : 'ltr'}
            style={{
              fontFamily: isRTL ? bodyFont : eyebrowFont,
              fontSize: isRTL ? '1rem' : '0.78rem',
              letterSpacing: isRTL ? 'normal' : '0.2em',
              color: colors.muted,
              margin: '0 0 30px',
            }}
          >
            {isRTL ? 'إدكو، البحيرة' : 'Edku, Beheira'}
          </p>


          <div style={{ padding: '6px', border: `1px solid ${colors.ink}`, marginBottom: '38px', marginTop:'30px' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 3',
                background: '#e2dccf',
                // border: '1px solid rgba(22,22,22,0.35)',
                overflow: 'hidden',
              }}
            >
              <iframe
                title="Venue map"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                  filter: 'grayscale(100%) contrast(1.05)',
                }}
              />
            </div>
          </div>

          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: colors.ink,
              color: colors.paper,
              textDecoration: 'none',
              fontFamily: isRTL ? bodyFont : eyebrowFont,
              fontSize: isRTL ? '0.95rem' : '0.72rem',
              letterSpacing: isRTL ? '0.06em' : '0.34em',
              textTransform: 'uppercase',
              padding: '18px 44px',
              border: `1px solid ${colors.ink}`,
              transition: 'all 0.4s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = colors.ink;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = colors.ink;
              e.currentTarget.style.color = colors.paper;
            }}
          >
            {isRTL ? 'افتح في الخريطة' : 'Open in Maps'}
          </a>
        </Reveal>
      </section>



 {/* ══════════════ CLOSING ══════════════ */}
<section
  style={{
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    background: colors.night,
    textAlign: 'center',
    padding: '90px 1.5rem 90px',
  }}
>
  {/* Photo: black & white, clearly visible */}
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: `url(${ringHandsClosing})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
      filter: 'grayscale(100%) contrast(1.08)',
    }}
  />

  {/* Light dark wash over the whole photo */}
  <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,5,0.22)' }} />

  {/* Top fade (for the quote) + bottom fade (for the names), rings stay clear in the middle */}
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background:
        'linear-gradient(180deg, rgba(5,5,5,0.78) 0%, rgba(5,5,5,0.5) 16%, rgba(5,5,5,0) 32%, rgba(5,5,5,0.35) 48%, rgba(5,5,5,0.88) 72%, rgba(5,5,5,0.96) 100%)',
    }}
  />

  {/* Vignette */}
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)',
      pointerEvents: 'none',
    }}
  />

  {/* Classic double frame */}
  <div style={{ position: 'absolute', inset: '14px',  pointerEvents: 'none', zIndex: 1 }} />
  <div style={{ position: 'absolute', inset: '22px',  pointerEvents: 'none', zIndex: 1 }} />

  {/* ── TOP: the quote ── */}
  <Reveal style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '560px' }}>
    <p
      style={{
        fontFamily: bodyFont,
        fontSize: 'clamp(1.15rem, 4.2vw, 1.5rem)',
        fontStyle: 'italic',
        color: 'rgba(255,255,255,0.92)',
        maxWidth: '520px',
        margin: '0 auto',
        lineHeight: 1.7,
        textShadow: '0 2px 16px rgba(0,0,0,0.75)',
      }}
    >
      {tr.home.closingQuote}
    </p>
    {/* <Ornament light style={{ margin: '24px auto 0' }} /> */}
  </Reveal>

  {/* ── BOTTOM: with love + names + date ── */}
  <Reveal delay={0.15} style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '620px' }}>
    

    <p
      style={{
        fontFamily: bodyFont,
        fontSize: '1.05rem',
        fontStyle: 'italic',
        color: 'rgba(255,255,255,0.75)',
        margin: '0 0 6px',
        letterSpacing: '0.06em',
      }}
    >
      {isRTL ? 'بكل الحب' : 'with love'}
    </p>

    <h2
      style={{
        fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : scriptFont,
        fontWeight: 400,
        fontSize: 'clamp(38px, 11vw, 64px)',
        color: '#ffffff',
        lineHeight: isRTL ? 1.9 : 1.3,
        margin: '0 0 18px',
        textShadow: '0 2px 22px rgba(0,0,0,0.6)',
      }}
    >
      {tr.home.salama_eman}
    </h2>

    <p
      style={{
        fontFamily: bodyFont,
        fontSize: '0.95rem',
        letterSpacing: '0.34em',
        paddingLeft: '0.34em',
        color: 'rgba(255,255,255,0.85)',
        fontWeight: 600,
        textTransform: 'uppercase',
        margin: 0,
      }}
    >
      {isRTL ? '١ نوفمبر ٢٠٢٦' : '1 · 11 · 2026'}
    </p>
  </Reveal>
</section>


    </div>
  );
};

export default HomePage;