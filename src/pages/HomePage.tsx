import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import LangToggle from '../components/LangToggle';
import { useLang } from '../context/LangContext';

import locationImg from '../../public/imgs/location.jpg';
import ringHands from '../../public/imgs/ring-hands.jpg';               // صورة الخاتم -> الهيرو
import childhoodPhoto from '../../public/imgs/childhood-photo.jpg';     // صورة الطفولة -> قصتنا
import galleryLaceVeil from '../../public/imgs/gallery-lace-veil.jpg';       // الطرحة والورد -> كولاج قصتنا
import galleryDressTrain from '../../public/imgs/gallery-dress-train.jpg';   // ذيل الفستان -> خلفية سكشن المكان
import galleryCandlesVeil from '../../public/imgs/gallery-candles-veil.jpg'; // الطرحة والشموع -> السكشن الجوّي

interface ProgramItem {
  time: string;
  title: string;
  desc: string;
}

// ── الألوان الجديدة: نبيتي غامق دافئ + كريمي + تراكوتا فاتحة + دهبي نحاسي ──
const colors = {
  ink: '#2a1712',
  cream: '#f6ead9',
  wine: '#3c0f1c',
  wineMid: '#6d1b30',
  blush: '#c98a6b',
  gold: '#b9924f',
  textMuted: '#7a6657',
};

const scriptFont = "'Beau Rivage', cursive";
const eyebrowFont = "'Jost', sans-serif";
const bodyFont = "'Cormorant Garamond', serif";

/** يظهر بلطف لما يدخل الشاشة */
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
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }),
      { threshold: 0.15 }
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
        transition: `opacity 1s ease ${delay}s, transform 1s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const HomePage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const { tr, isRTL } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // نافبار يظهر بعد ما نعدّي الهيرو
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setNavVisible(!entry.isIntersecting), { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── كاونتر مبني يدويًا (مش مكتبة خارجية) عشان يبقى شكله مختلف تمامًا ──
  const weddingDate = new Date('2026-09-26T18:00:00').getTime();
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
  }, []);

  return (
    <div
      style={{
        fontFamily: isRTL ? "'Scheherazade New', serif" : "'Playfair Display', serif",
        background: colors.cream,
        color: colors.ink,
        direction: isRTL ? 'rtl' : 'ltr',
        overflowX: 'hidden',
      }}
    >
    

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${ringHands})`, backgroundSize: 'cover', backgroundPosition: 'center 30%', transform: 'scale(1.05)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(30,10,16,0.18) 0%, rgba(30,10,16,0.08) 32%, rgba(20,7,11,0.68) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '900px', margin: '0 auto', padding: '0 24px 90px', textAlign: 'center', color: '#fbf6f1' }}>
          <p style={{ fontFamily: eyebrowFont, fontSize: '0.72rem', letterSpacing: '0.32em', textTransform: 'uppercase', fontWeight: 500, color: '#f0e4dd', marginBottom: '18px', opacity: mounted ? 0.92 : 0, transform: mounted ? 'translateY(0)' : 'translateY(18px)', transition: 'all 1.1s ease .2s' }}>
            {tr.home.invitation}
          </p>

          <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)', transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1) 0.45s' }}>
            <h1 style={{ fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : scriptFont, fontSize: isRTL ? 'clamp(46px,8vw,74px)' : 'clamp(58px,11vw,100px)', fontWeight: isRTL ? 700 : 400, lineHeight: isRTL ? 1.7 : 1.15, margin: 0, textShadow: '0 2px 18px rgba(0,0,0,0.35)' }}>
              {tr.home.ahmed}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', margin: '14px 0' }}>
              <span style={{ width: '46px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(251,246,241,0.6))' }} />
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f0e4dd', opacity: 0.85 }} />
              <span style={{ width: '46px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(251,246,241,0.6))' }} />
            </div>
            <h1 style={{ fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : scriptFont, fontSize: isRTL ? 'clamp(46px,8vw,74px)' : 'clamp(58px,11vw,100px)', fontWeight: isRTL ? 700 : 400, lineHeight: isRTL ? 1.7 : 1.15, margin: 0, textShadow: '0 2px 18px rgba(0,0,0,0.35)' }}>
              {tr.home.asmaa}
            </h1>
          </div>

          <div style={{ marginTop: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '22px', flexWrap: 'wrap', opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(18px)', transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1) 0.7s' }}>
            <span style={{ fontFamily: eyebrowFont, fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{tr.home.mindate}</span>
            <a href="https://maps.app.goo.gl/XQy32VLRY4N3ux4K8" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbf6f1', textDecoration: 'none', fontFamily: eyebrowFont, fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              <MapPin style={{ width: '14px', height: '14px' }} />
              {tr.home.location}
            </a>
          </div>
        </div>
      </section>

      {/* ── سطر انتقالي ── */}
      <section style={{ padding: '90px 1.5rem 50px', textAlign: 'center' }}>
        <Reveal>
          <p style={{ fontFamily: eyebrowFont, fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: colors.gold, marginBottom: '22px' }}>
            {isRTL ? 'بكل حب' : 'With love'}
          </p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(22px, 3.6vw, 32px)', color: colors.wine, maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
            {isRTL ? 'اتنين قلب اتقابلوا من زمان… ودلوقتي بيقولوا "نعم" لبعض' : 'Two hearts that found each other long ago — now saying yes, together.'}
          </p>
        </Reveal>
      </section>

    {/* ── قصتنا: كولاج صور بدل الفريم الواحد ── */}
<section id="story" style={{ padding: '70px 1.5rem 130px', overflow: 'hidden' }}>
  <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '70px', alignItems: 'center' }} className="story-grid">
    <Reveal style={{ order: isRTL ? 2 : 1 }}>
      {/* Container خارجي بيضمن إن الكولاج بالكامل يفضل جوة حدود الشاشة في الموبايل */}
      <div style={{ 
        position: 'relative', 
        maxWidth: '340px', // صغرنا العرض سنة صغيرة جداً للموبايل عشان الكولاج يركب مرتاح
        margin: isRTL ? '0 10px 0 auto' : '0 auto 0 10px',
        paddingBottom: '30px', // مساحة تحتية عشان الصورة التانية لما تنزل سالب متتقصش
      }}>
        {/* الصورة الأساسية */}
        <img
          src={childhoodPhoto}
          alt={isRTL ? 'صورة من الطفولة' : 'A photo from childhood'}
          style={{ 
            width: '100%', 
            aspectRatio: '4/5', 
            objectFit: 'cover', 
            objectPosition: 'center 25%', 
            filter: 'saturate(0.95) contrast(0.98)', 
            boxShadow: '0 22px 40px rgba(42,23,18,0.22)',
            borderRadius: '2px'
          }}
        />

        {/* الصورة الثانية المائلة (الطرحة) */}
        <img
          src={galleryLaceVeil}
          alt={isRTL ? 'تفصيلة من الطرحة' : 'Veil detail'}
          style={{
            position: 'absolute',
            width: '52%',
            aspectRatio: '4/5',
            objectFit: 'cover',
            bottom: '0px', // نزلناها سنة بسيطة بدلاً من -38px عشان تحتفظ بالطول الكامل
            [isRTL ? 'left' : 'right']: '-15px', // قللنا البروز السالبي عشان تفضل جوة إطار شاشة الموبايل
            border: `5px solid ${colors.cream || '#F8F3EB'}`,
            boxShadow: '0 18px 34px rgba(42,23,18,0.28)',
            transform: 'rotate(4deg)',
            zIndex: 2
          } as React.CSSProperties}
        />
      </div>
    </Reveal>

    <Reveal delay={0.15} style={{ order: isRTL ? 1 : 2 }}>
      <p style={{ fontFamily: eyebrowFont, fontSize: '0.72rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: colors.gold, marginBottom: '18px' }}>
        {isRTL ? 'قصتنا' : 'Our Story'}
      </p>
      <p style={{ fontFamily: bodyFont, fontSize: '1.25rem', lineHeight: 1.9, color: colors.ink, marginBottom: '20px' }}>
        {isRTL
          ? 'من زمان، ومن يوم ما كنا صغيرين، وإحنا مع بعض. صداقة كبرت معانا سنة ورا سنة، لحد ما اتحولت لوعد ولحظة نستنّاها بشوق.'
          : "It started long before either of us knew what it meant — two children who grew up beside one another, year after year, until friendship quietly became a promise."}
      </p>
      <p style={{ fontFamily: bodyFont, fontSize: '1.25rem', lineHeight: 1.9, color: colors.textMuted, marginBottom: '26px' }}>
        {isRTL
          ? 'ودلوقتي إحنا مبسوطين جدًا ندعوكم تكونوا معانا في بداية حكايتنا الجديدة.'
          : "Now, we're overjoyed to invite you to be with us as we begin this next chapter, together."}
      </p>
      <p style={{ fontFamily: scriptFont, fontSize: '2.1rem', color: colors.wineMid }}>Mohammed &amp; Rahma</p>
    </Reveal>
  </div>
</section>
   {/* ── سكشن مدمج: عهد + العد التنازلي فوق خلفية الطرحة والشموع ── */}
<section style={{ 
  position: 'relative', 
  minHeight: '85vh', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  overflow: 'hidden',
  padding: '80px 1.5rem'
}}>
  {/* خلفية الصورة */}
  <div style={{ 
    position: 'absolute', 
    inset: 0, 
    backgroundImage: `url(${galleryCandlesVeil})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center' 
  }} />

  {/* طبقة تظليل داكنة شفافة لضمان وضوح الكلام والعداد فوق الصورة */}
  <div style={{ 
    position: 'absolute', 
    inset: 0, 
    background: 'linear-gradient(180deg, rgba(30,8,15,0.65) 0%, rgba(30,8,15,0.82) 100%)' 
  }} />

  {/* هالة إضاءة دافئة لخلق عمق بصري خلف العداد */}
  <div className="glow-pulse" style={{ 
    position: 'absolute', 
    bottom: '20%', 
    left: '50%', 
    transform: 'translateX(-50%)', 
    width: '450px', 
    height: '450px', 
    borderRadius: '50%', 
    background: 'radial-gradient(circle, rgba(185,146,79,0.2), transparent 70%)', 
    pointerEvents: 'none',
    zIndex: 1
  }} />

  <Reveal style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px', width: '100%' }}>
    
    {/* ── الجزء الأول: الوعد ── */}
    <p style={{ fontFamily: eyebrowFont, fontSize: '0.68rem', letterSpacing: '0.34em', textTransform: 'uppercase', color: '#e9c9a6', marginBottom: '16px' }}>
      {isRTL ? 'وعد' : 'A Promise'}
    </p>
    <p style={{ fontFamily: scriptFont, fontSize: 'clamp(30px, 6vw, 50px)', color: '#fbf6f1', maxWidth: '640px', margin: '0 auto 50px', lineHeight: 1.4 }}>
      {isRTL ? '"من النهاردة، حياتنا هتبقى واحدة"' : '"From this day, our lives become one"'}
    </p>

    {/* خط فاصل أنيق بين الوعد والعداد */}
    <div style={{ width: '60px', height: '1px', background: 'rgba(233, 201, 166, 0.3)', margin: '0 auto 50px' }} />

    {/* ── الجزء الثاني: العد التنازلي ── */}
    <p style={{ 
      fontFamily: eyebrowFont, 
      fontSize: '0.68rem', 
      letterSpacing: '0.32em', 
      textTransform: 'uppercase', 
      color: colors.gold || '#e9c9a6', 
      marginBottom: '36px' 
    }}>
      {isRTL ? 'العد التنازلي' : 'Counting down'}
    </p>

    {/* الأرقام والعدادات */}
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'clamp(10px, 4vw, 40px)', flexWrap: 'wrap' }}>
      {[
        { v: time.d, l: isRTL ? 'يوم' : 'Days' },
        { v: time.h, l: isRTL ? 'ساعة' : 'Hours' },
        { v: time.m, l: isRTL ? 'دقيقة' : 'Minutes' },
        { v: time.s, l: isRTL ? 'ثانية' : 'Seconds' },
      ].map((c, i, arr) => (
        <div key={c.l} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px, 4vw, 40px)' }}>
          <div style={{ textAlign: 'center' }}>
            <div className="candle-flicker" style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontWeight: 300, 
              fontSize: 'clamp(2.6rem, 7vw, 4.2rem)', 
              color: '#fbf6f1', // لون أبيض عاجي ناصع وواضح فوق الخلفية
              fontVariantNumeric: 'tabular-nums', 
              lineHeight: 1 
            }}>
              {String(c.v).padStart(2, '0')}
            </div>
            <div style={{ 
              fontFamily: eyebrowFont, 
              fontSize: '0.6rem', 
              letterSpacing: '0.24em', 
              textTransform: 'uppercase', 
              color: '#e9c9a6', 
              marginTop: '10px' 
            }}>
              {c.l}
            </div>
          </div>

          {/* الفواصل بين الأرقام */}
          {i < arr.length - 1 && (
            <span style={{ 
              width: '1px', 
              height: '44px', 
              background: 'rgba(233, 201, 166, 0.25)' 
            }} />
          )}
        </div>
      ))}
    </div>

    {/* تاريخ المناسبة السفلي */}
    <p style={{ 
      marginTop: '40px', 
      fontFamily: bodyFont, 
      fontStyle: 'italic', 
      color: '#e9c9a6', 
      fontSize: '1.05rem',
      opacity: 0.9
    }}>
      {isRTL ? '٢٠ أغسطس ٢٠٢٦' : '26 September 2026'}
    </p>

  </Reveal>
</section>
      {/* ── المكان: صورة ذيل الفستان فل بليد + كارت زجاجي واحد ── */}
      <section id="details" style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${galleryDressTrain})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(20,7,11,0.72) 0%, rgba(20,7,11,0.1) 55%)' }} />
        <Reveal style={{ position: 'relative', zIndex: 2, width: '100%', padding: '0 24px 64px', display: 'flex', justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
          <div style={{ maxWidth: '360px', background: 'rgba(246,234,217,0.94)', backdropFilter: 'blur(6px)', padding: '32px 30px', textAlign: isRTL ? 'right' : 'left' }}>
            <p style={{ fontFamily: eyebrowFont, fontSize: '0.66rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: colors.gold, marginBottom: '14px' }}>
              {isRTL ? 'مكان الحفل' : 'The Venue'}
            </p>
            <h3 style={{ fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.5rem', color: colors.wine, margin: '0 0 10px' }}>
              {isRTL ? 'يوم السبت، ٢٠ أغسطس ٢٠٢٦' : 'Saturday, 26 September 2026'}
            </h3>
            <p style={{ fontFamily: bodyFont, fontSize: '1.05rem', color: colors.textMuted, margin: 0 }}>
              {tr.home.location}
            </p>
            <a
              href="https://maps.app.goo.gl/XQy32VLRY4N3ux4K8"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', marginTop: '20px', fontFamily: eyebrowFont, fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: colors.wine, borderBottom: `1px solid ${colors.gold}`, paddingBottom: '3px', textDecoration: 'none' }}
            >
              {isRTL ? 'افتحي الموقع' : 'Open Location'}
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── رسالة للضيوف + التاريخ ── */}
   <section style={{ padding: '110px 1.5rem', textAlign: 'center' }}>
  <Reveal>
    <p style={{ fontFamily: bodyFont, fontSize: '1.2rem', lineHeight: 1.9, color: colors.ink, maxWidth: '560px', margin: '0 auto 50px' }}>
      {tr.home.guestMessage}
    </p>

    {/* Calendar */}
<div
  style={{
    maxWidth: '350px',
    margin: '0 auto',
    backgroundColor: '#FAF7F2',
    padding: '28px 20px 40px',
    borderRadius: '4px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    transform: 'rotate(-2deg)',
    position: 'relative',
    clipPath:
      'polygon(0 0, 100% 0, 100% calc(100% - 12px), 96.4% 100%, 92.8% calc(100% - 12px), 89.2% 100%, 85.6% calc(100% - 12px), 82% 100%, 78.4% calc(100% - 12px), 74.8% 100%, 71.2% calc(100% - 12px), 67.6% 100%, 64% calc(100% - 12px), 60.4% 100%, 56.8% calc(100% - 12px), 53.2% 100%, 49.6% calc(100% - 12px), 46% 100%, 42.4% calc(100% - 12px), 38.8% 100%, 35.2% calc(100% - 12px), 31.6% 100%, 28% calc(100% - 12px), 24.4% 100%, 20.8% calc(100% - 12px), 17.2% 100%, 13.6% calc(100% - 12px), 10% 100%, 6.4% calc(100% - 12px), 2.8% 100%, 0 calc(100% - 12px))'
  }}
>
  {/* Month */}
  <p
    style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.6rem',
      color: colors.wine,
      marginBottom: '24px',
      letterSpacing: '0.03em',
      direction: 'ltr'
    }}
  >
    September 2026
  </p>

  {/* Days */}
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '5px',
      marginBottom: '14px',
      direction: 'ltr'
    }}
  >
    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
      <div
        key={day}
        style={{
          fontFamily: eyebrowFont || 'sans-serif',
          fontSize: '0.75rem',
          color: colors.wine,
          fontWeight: '600',
          opacity: 0.85
        }}
      >
        {day}
      </div>
    ))}
  </div>

  {/* Dates */}
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '8px',
      direction: 'ltr'
    }}
  >
    {/* September 1, 2026 = Tuesday
        Sunday = 0 → Monday = 1 → Tuesday = 2
        لذلك 3 خانات فاضية */}
    {[...Array(2)].map((_, i) => (
      <div key={'empty-' + i} />
    ))}

    {[...Array(30)].map((_, i) => {
      const dayNumber = i + 1;
      const isTargetDay = dayNumber === 26;

      return (
        <div
          key={dayNumber}
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '34px'
          }}
        >
          {/* Highlight September 26 */}
          {isTargetDay && (
            <div
              style={{
                position: 'absolute',
                width: '32px',
                height: '32px',
                backgroundColor: colors.wine,
                borderRadius: '50%',
                zIndex: 0
              }}
            />
          )}

          {/* Date number */}
          <div
            style={{
              position: 'relative',
              fontFamily: "'Playfair Display', serif",
              fontSize: '0.95rem',
              color: isTargetDay ? '#FFF' : colors.ink,
              zIndex: 1,
              fontWeight: isTargetDay ? '700' : '400',
              opacity: isTargetDay ? 1 : 0.75
            }}
          >
            {dayNumber}
          </div>
        </div>
      );
    })}
  </div>
</div>
  </Reveal>
</section>



      {/* ── البرنامج ── */}
      <section id="program" style={{ padding: '40px 1.5rem 120px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Reveal>
            <h2 style={{ fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : "'Playfair Display', serif", fontStyle: 'italic', fontSize: '32px', color: colors.wine, textAlign: 'center', marginBottom: '70px' }}>
              {tr.home.program}
            </h2>
          </Reveal>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: isRTL ? 'auto' : '6px', right: isRTL ? '6px' : 'auto', top: '8px', bottom: '8px', width: '1px', background: colors.blush, opacity: 0.35 }} />
            {tr.home.programItems.map((item: ProgramItem, i: number) => (
              <Reveal key={i} delay={i * 0.08} style={{ position: 'relative', paddingLeft: isRTL ? '0' : '34px', paddingRight: isRTL ? '34px' : '0', marginBottom: '48px', textAlign: isRTL ? 'right' : 'left' }}>
                <span style={{ position: 'absolute', left: isRTL ? 'auto' : '0px', right: isRTL ? '0px' : 'auto', top: '6px', width: '13px', height: '13px', background: colors.cream, border: `2px solid ${colors.gold}`, transform: 'rotate(45deg)' }} />
                <span style={{ fontFamily: eyebrowFont, fontSize: '0.68rem', letterSpacing: '0.18em', color: colors.gold, textTransform: 'uppercase' }}>{item.time}</span>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '22px', color: colors.wine, margin: '6px 0 8px', fontWeight: 500 }}>{item.title}</h4>
                <p style={{ fontFamily: bodyFont, fontSize: '1.05rem', color: colors.textMuted, margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── الموقع بالخريطة ── */}
      {/* <section style={{ padding: '0 0 120px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }} className="story-grid">
          <Reveal>
            <img src={locationImg} alt={isRTL ? 'موقع الحفل' : 'Wedding Venue'} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', boxShadow: '0 20px 40px rgba(42,23,18,0.2)' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontFamily: eyebrowFont, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: colors.gold, marginBottom: '16px' }}>
              {isRTL ? 'إزاي توصل' : 'Getting There'}
            </p>
            <p style={{ fontFamily: bodyFont, fontSize: '1.15rem', lineHeight: 1.85, color: colors.ink, marginBottom: '22px' }}>
              {tr.home.location}
            </p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: eyebrowFont, fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: colors.wine, borderBottom: `1px solid ${colors.gold}`, paddingBottom: '3px', textDecoration: 'none' }}>
              {isRTL ? 'افتحي الموقع' : 'Open Location'}
            </a>
          </Reveal>
        </div>
      </section> */}

      {/* ── الخاتمة ── */}
     <section style={{ 
  background: '#3A2E2B', // درجة بني دافئة بدلاً من النبيتي
  padding: '110px 1rem 90px', 
  textAlign: 'center', 
  position: 'relative', 
  overflow: 'hidden' 
}}>
  {/* ── التمويجة العلوية الانسيابية بنفس لون خلفية البيج ── */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    lineHeight: 0
  }}>
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: '100%', height: '45px', display: 'block' }}>
      <path 
        d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z" 
        fill={colors.cream || '#F8F3EB'} 
      />
    </svg>
  </div>

  <Reveal style={{ position: 'relative', zIndex: 2 }}>
    {/* الجملة الختامية */}
    <p style={{ 
      fontSize: '16px', 
      fontStyle: 'italic', 
      color:'white', 
      marginBottom: '8px', 
      fontWeight: 500 
    }}>
      {tr.home.closingQuote}
    </p>

    {/* الديكور الأوسط (الخواتم والخطوط) */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '32px 0' }}>
      <span style={{ width: '40px', height: '1px', background: colors.gold || '#C69B56', opacity: 0.8 }} />
      <div style={{ position: 'relative', width: '40px', height: '30px' }}>
        <div style={{ position: 'absolute', left: 0, top: '4px', width: '22px', height: '22px', borderRadius: '50%', border: `1.5px solid ${colors.gold || '#C69B56'}` }} />
        <div style={{ position: 'absolute', left: '12px', top: '4px', width: '22px', height: '22px', borderRadius: '50%', border: `1.5px solid ${colors.gold || '#C69B56'}` }} />
      </div>
      <span style={{ width: '40px', height: '1px', background: colors.gold || '#C69B56', opacity: 0.8 }} />
    </div>

    {/* with love */}
    <p style={{ 
      fontSize: '15px', 
      fontStyle: 'italic', 
      color: colors.cream || '#F8F3EB', 
      marginBottom: '8px', 
      fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : "'Playfair Display', serif",
      opacity: 0.9 
    }}>
      with love
    </p>

    {/* أسماء العروسين */}
    <h2 style={{ 
      fontFamily: scriptFont, 
      fontWeight: 400, 
      fontSize: 'clamp(34px, 11vw, 48px)', 
      color: colors.cream || '#F8F3EB', 
      lineHeight: 1.4, 
      margin: '0 0 16px' 
    }}>
      {tr.home.salama_eman}
    </h2>

    {/* التاريخ */}
    <p style={{ 
      fontSize: '13px', 
      letterSpacing: '0.2em', 
      color: colors.gold || '#C69B56', 
      fontWeight: 600, 
      fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : "'Playfair Display', serif" 
    }}>
      {isRTL ? '٢٠ أغسطس ٢٠٢٦' : '26 September 2026'}
    </p>
  </Reveal>
</section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400..700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Beau+Rivage&family=Jost:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');

        .candle-flicker { animation: flicker 4.5s ease-in-out infinite; }
        @keyframes flicker {
          0%, 100% { text-shadow: 0 0 14px rgba(185,146,79,0.25); }
          50% { text-shadow: 0 0 22px rgba(185,146,79,0.5); }
        }
        .glow-pulse { animation: pulseGlow 5s ease-in-out infinite; }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.08); }
        }
        @media (max-width: 820px) {
          .story-grid { grid-template-columns: 1fr !important; }
          .story-grid > div { order: initial !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;