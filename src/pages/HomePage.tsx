import { useEffect, useRef, useState } from 'react';
import { Heart, Calendar, MapPin, Clock } from 'lucide-react';
import { gsap } from 'gsap'; 
import CountdownTimer from '../components/CountdownTimer';
import LangToggle from '../components/LangToggle';
import { useLang } from '../context/LangContext';

// استيراد الصور
import couplePhoto from '../../public/imgs/eman_salama.png';
import curtainImg from '../../public/imgs/cover.jpg'; 
import decorBorder from '../../public/imgs/download.jpg'; 
import bbgg from '../../public/imgs/bbgg.png'; 
import image_e94b47 from '../../public/imgs/image_e94b47.jpg'; 
import image_e8e1b2 from '../../public/imgs/program-white.png'; // استيراد خلفية الفراشات الجديدة لجدول الحفل
import locationImg from '../../public/imgs/location.jpg';

// تعريف أنواع البيانات
interface ProgramItem {
  time: string;
  title: string;
  desc: string;
}

interface Colors {
  bgLight: string;
  primary: string;
  primaryDark: string;
  accent: string;
  textMuted: string;
  borderSoft: string;
}

const emojis: string[] = ['📷', '💍', '🕯️', '🎉'];

const HomePage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [animationComplete, setAnimationComplete] = useState<boolean>(false);
  const { tr, isRTL } = useLang();

  // Refs للستائر
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const curtainContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const tl = gsap.timeline({
      delay: 0.5, 
      onComplete: () => {
        setAnimationComplete(true); 
      }
    });

    if (leftCurtainRef.current && rightCurtainRef.current && curtainContainerRef.current) {
      tl.to(leftCurtainRef.current, {
        duration: 2,
        ease: 'power2.inOut',
        xPercent: -100,
        opacity: 0,
      }, 0)
      
      .to(rightCurtainRef.current, {
        duration: 2,
        ease: 'power2.inOut',
        xPercent: 100,
        opacity: 0,
      }, 0)
      
      .to(curtainContainerRef.current, {
        display: 'none',
        duration: 0
      });
    }

    return () => {
      tl.kill(); 
    };
  }, []);

  const weddingDate: string = '2026-08-07T18:00:00';

  // ثيم الأبيض والبورغاندي فقط الصافي
  const colors: Colors = {
    bgLight: '#ffffff',       // خلفية بيضاء صريحة ومريحة
    primary: '#6b1224',       // لون بورغاندي أساسي للزفاف
    primaryDark: '#4a0a17',   // بورغاندي داكن جداً للفخامة والعناوين
    accent: '#a64b5a',        // بورغاندي متوسط ناعم للتفاصيل والأزرار
    textMuted: '#555555',     // رمادي داكن للنصوص الطويلة لسهولة القراءة فوق الأبيض
    borderSoft: 'rgba(107, 18, 36, 0.2)' // إطار بورغاندي خفيف وشفاف بديل للذهبي
  };

  return (
    <div 
      className="relative" 
      style={{
        fontFamily: isRTL ? "'Scheherazade New', serif" : "'Playfair Display', serif",
        background: colors.bgLight,
        color: colors.primary,
        direction: isRTL ? 'rtl' : 'ltr',
        overflowX: 'hidden'
      }}
    >
      {/* زر تبديل اللغة */}
      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1001 }}>
        <LangToggle />
      </div>

      {/* ── HERO SECTION ── */}
     {/* ── HERO SECTION ── */}
     <section
  className="hero-bg-section"
  style={{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.bgLight,
    padding: '5rem 1.5rem 12rem',
    position: 'relative',
    overflow: 'hidden',
    backgroundImage: `url(${decorBorder})`,
    backgroundSize: '100% auto', // موبايل: تمد على عرض الشاشة كاملة
    backgroundPosition: 'bottom center',
    backgroundRepeat: 'no-repeat',
  }}
>
        {/* حاوية الستائر */}
        <div 
          ref={curtainContainerRef}
          style={{
            position: 'absolute', 
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 999,
            pointerEvents: animationComplete ? 'none' : 'auto', 
            display: 'flex',
            overflow: 'hidden'
          }}
        >
          <div 
            ref={leftCurtainRef}
            style={{
              width: '50%',
              height: '100%',
              backgroundImage: `url(${curtainImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'left center',
              boxShadow: '10px 0 30px rgba(0,0,0,0.3)',
              willChange: 'transform, opacity'
            }}
          ></div>
          
          <div 
            ref={rightCurtainRef}
            style={{
              width: '50%',
              height: '100%',
              backgroundImage: `url(${curtainImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'right center',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.3)',
              willChange: 'transform, opacity'
            }} 
          ></div>
        </div>

        {/* قلوب متساقطة */}
        {[8, 22, 38, 52, 68, 78, 92].map((left: number, i: number) => (
          <div
            key={i}
            style={{
              position: 'fixed',
              left: `${left}%`,
              top: '-30px',
              fontSize: i % 2 === 0 ? '20px' : '16px',
              color: colors.accent,
              opacity: 0.25,
              animation: `fall ${6 + i}s linear infinite`,
              animationDelay: `${i * 0.8}s`,
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 95,
            }}
          >
            ♥
          </div>
        ))}

        {/* حاوية المحتوى الداخلي لضمان ثبات النص في المنتصف وبحجم مثالي دائماً */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          marginTop: '-4rem', // رفع النص قليلاً ليعطي مساحة أكبر للورد في الأسفل
          zIndex: 11
        }}>
   <p
  style={{
    fontSize: '18px',
    fontStyle: 'italic',
    color: colors.primary,
    marginBottom: '0.4rem',
    textAlign: 'center',
    maxWidth: '300px',
    margin: '0 auto 4.5rem',
    position: 'relative',
    zIndex: 999,
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(25px)',
    transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
  }}
>
  {tr.home.invitation}
  <br />
</p>

          <div
            style={{
              textAlign: 'center',
              marginBottom: '1.8rem',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(25px)',
              transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
            }}
          >
            <h1
              style={{
                fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : "'Playfair Display', serif",
                lineHeight: isRTL ? 1.9 : 1.1,
                fontSize: 'clamp(46px, 6vw, 70px)', // تقليل الحد الأقصى للمتصفحات الكبيرة لتظل أنيقة
                fontStyle: 'italic',
                fontWeight: 700,
                color: colors.primaryDark,
                margin: 0,
                textShadow: '1px 1px 1px rgba(255,255,255,0.8)'
              }}
            >
              {tr.home.ahmed}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', margin: '14px 0' }}>
              <span style={{ 
                width: '50px', 
                height: '1.2px', 
                background: `linear-gradient(${isRTL ? 'to left' : 'to right'}, transparent, ${colors.accent})` 
              }} />
              <Heart style={{ 
                width: '18px', 
                height: '18px', 
                color: colors.primary, 
                fill: colors.primary, 
                animation: 'pulse 2s infinite' 
              }} />
              <span style={{ 
                width: '50px', 
                height: '1.2px', 
                background: `linear-gradient(${isRTL ? 'to right' : 'to left'}, transparent, ${colors.accent})` 
              }} />
            </div>
            <h1
              style={{
                fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : "'Playfair Display', serif",
                lineHeight: isRTL ? 1.9 : 1.1,
                fontSize: 'clamp(46px, 6vw, 70px)',
                fontStyle: 'italic',
                fontWeight: 700,
                color: colors.primaryDark,
                margin: 0,
                textShadow: '1px 1px 1px rgba(255,255,255,0.8)'
              }}
            >
              {tr.home.asmaa}
            </h1>
          </div>

          <div
            style={{
              textAlign: 'center',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(25px)',
              transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.9s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px', fontWeight: 800 }}>
              <Calendar style={{ width: '15px', height: '15px', color: colors.primary }} />
              <p style={{ fontSize: '12.5px', letterSpacing: '0.2em', color: colors.primary, textTransform: 'uppercase', margin: 0 }}>
                {tr.home.mindate}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 800 }}>
              <MapPin style={{ width: '15px', height: '15px', color: colors.primary }} />
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  fontSize: '12.5px', 
                  letterSpacing: '0.2em', 
                  color: colors.primary, 
                  textTransform: 'uppercase', 
                  textDecoration: 'none', 
                  // borderBottom: `1px dashed ${colors.accent}` 
                }}
              >
                {tr.home.location}
              </a>
            </div>
          </div>
        </div>

        {/* إضافة Media Query خفيف عبر الـ tag style لضمان الحفاظ على حجم الـ background مثالي في الشاشات الكبيرة جداً */}
         <style>{`
    @media (min-width: 1024px) {
      .hero-bg-section {
        background-size: auto 35vh !important; /* ديسكتوب: ارتفاع ثابت، العرض يتبع نفسه */
      }
    }
    @media (min-width: 1600px) {
      .hero-bg-section {
        background-size: auto 30vh !important; /* شاشات أكبر من كمان، نقلل شوية عشان مش يكبر زيادة */
      }
    }
  `}</style>
      </section>

      {/* ── SECTION: COUNTDOWN ── */}
      <section style={{ 
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
        padding: '60px 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
          pointerEvents: 'none'
        }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
            <Clock style={{ width: '24px', height: '24px', color: 'rgba(255,255,255,0.7)' }} />
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(20px, 4vw, 28px)',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
              margin: 0,
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}>
              {isRTL ? 'العد التنازلي للزفاف' : 'Countdown to Wedding'}
            </h2>
          </div>
          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '10px' }}>
            <CountdownTimer targetDate={weddingDate} />
          </div>
        </div>
      </section>

      {/* ── SECTION: COUPLE PHOTO WITH POLAROID FRAME ── */}
      <section style={{ 
        backgroundImage: `url(${bbgg})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '100px 1.5rem', 
        textAlign: 'center', 
        position: 'relative' 
      }}>
        {/* الحاوية الخارجية - الباك جراوند النبيتي (إطار البولارويد) */}
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '310px', 
          margin: '0 auto 40px',
          backgroundColor: colors.primary, 
          padding: '16px 16px 45px 16px', 
          borderRadius: '4px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          
          {/* الحاوية الداخلية - الباك جراوند البيضاء */}
          <div style={{
            width: '100%',
            backgroundColor: '#ffffff', 
            padding: '12px',
            boxShadow: 'inset 0 0 5px rgba(0,0,0,0.05)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            
            {/* صورة العروسين */}
            <img
              src={couplePhoto}
              alt="Eman & Salama"
              style={{ 
                width: '100%', 
                height: 'auto', 
                aspectRatio: '1 / 1', 
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* عرض أسماء العروسين وتفاصيل الفرح */}
        <h2 style={{ 
          fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : "'Playfair Display', serif", 
          fontStyle: isRTL ? 'normal' : 'italic', 
          fontSize: '28px', 
          color: colors.primaryDark, 
          margin: '0 0 12px 0', 
          lineHeight: isRTL ? 2.2 : 1.4, 
          fontWeight: 600 
        }}>
          {/* {tr.home.salama_num_eman || tr.home.salama_eman} */}
        </h2>
        <p style={{ 
          fontSize: '13px', 
          letterSpacing: '0.25em', 
          color: colors.accent, 
          fontWeight: 800,
          textTransform: 'uppercase',
          margin: 0
        }}>
          {tr.home.date}
        </p>
      </section>

      {/* ── SECTION: DEAR GUESTS ── */}
      <section style={{ 
        backgroundImage: `url(${image_e94b47})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '80px 1.5rem', 
        textAlign: 'center', 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* حاوية داخلية بيضاء ناعمة لضمان وضوح النص فوق الصورة */}
        <div
  style={{
    width: '100%',
    maxWidth: '600px',
    boxSizing: 'border-box',
    margin: '0 auto',
    position: 'relative',
    padding: '40px 30px',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  }}
>
         
          <p style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontSize: '19px', 
            lineHeight: 1.9, 
            color: colors.primary, 
            maxWidth: '560px', 
            margin: '0 auto 40px', 
            textAlign: 'center', 
            fontWeight: 500 
          }}>
            {tr.home.guestMessage}
          </p>

          {/* عرض شهر أغسطس بالثيم الجديد */}
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <span style={{ position: 'absolute', top: '-15px', left: '10%', fontSize: '24px', color: colors.accent, opacity: 0.4 }}>✦</span>
            <span style={{ position: 'absolute', top: '10px', right: '10%', fontSize: '18px', color: colors.accent, opacity: 0.3 }}>✦</span>
            <h3 style={{ 
              fontFamily: isRTL ? "'Scheherazade New', serif" : "'Playfair Display', serif", 
              fontSize: 'clamp(38px, 10vw, 46px)', 
              fontWeight: 700, 
              color: colors.primaryDark, 
              letterSpacing: '0.05em', 
              margin: 0, 
              lineHeight: 1.2,
              textTransform: 'uppercase'
            }}>
              {tr.home.august}
            </h3>
            <p style={{ 
              fontStyle: 'italic', 
              fontSize: '15px', 
              color: colors.accent, 
              letterSpacing: '0.15em', 
              margin: '4px 0 0 0', 
              fontWeight: 600 
            }}>
              {tr.home.twoThousandTwentySix}
            </p>
          </div>

          {/* شبكة الأرقام الدائرية باللون البورغاندي والأبيض */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            gap: '10px', 
            maxWidth: '340px', 
            margin: '30px auto 10px',
            alignItems: 'center'
          }}>
            {[5, 6, 7, 8, 9, 10].map((d: number) => (
              <div key={d} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {d === 7 ? (
                  <div style={{ 
                    width: '42px', 
                    height: '42px', 
                    borderRadius: '50%', 
                    background: colors.primary, 
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '18px',
                    boxShadow: `0 0 0 2px #fff, 0 0 0 4px ${colors.accent}`,
                    fontFamily: "'Playfair Display', serif",
                    position: 'relative',
                    zIndex: 2
                  }}>
                    {d}
                  </div>
                ) : (
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '50%', 
                    border: `1px dashed ${colors.borderSoft}`,
                    color: colors.primary, 
                    opacity: 0.4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '15px'
                  }}>
                    {d}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* ── SECTION: LOCATION ── */}
     <section
  style={{
    background: colors.bgLight,
    padding: '90px 1.5rem',
    textAlign: 'center',
    position: 'relative',
  }}
>
  <h2
    style={{
      fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : "'Playfair Display', serif",
      fontStyle: 'italic',
      fontSize: 'clamp(28px, 6vw, 38px)',
      color: colors.primaryDark,
      marginBottom: '36px',
    }}
  >
    {isRTL ? 'موقع الحفل' : 'Open Location'}
  </h2>

  <div
    style={{
      maxWidth: '420px',
      margin: '0 auto',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
    }}
  >
    <img
      src={locationImg}
      alt={isRTL ? 'موقع الحفل' : 'Wedding Venue'}
      style={{
        width: '100%',
        height: '260px',
        objectFit: 'cover',
        display: 'block',
      }}
    />
  </div>

  <a
    href="https://maps.google.com"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginTop: '28px',
      padding: '14px 32px',
      background: colors.primary,
      color: '#fff',
      borderRadius: '30px',
      textDecoration: 'none',
      fontSize: '13px',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      fontWeight: 700,
      boxShadow: '0 8px 20px rgba(107,18,36,0.25)',
    }}
  >
    <MapPin style={{ width: '16px', height: '16px' }} />
    {isRTL ? 'افتح الموقع' : 'Open Location'}
  </a>
</section>


      {/* ── SECTION: WEDDING PROGRAM ── */}
      <section style={{ 
        backgroundImage: `url(${image_e8e1b2})`, // تعيين صورة الفراشات كخلفية هنا
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '100px 2rem', 
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ 
            fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : "'Playfair Display', serif", 
            fontSize: '32px', 
            color: colors.primaryDark, 
            textAlign: 'center', 
            marginBottom: '60px' 
          }}>
            {tr.home.program}
          </h2>

          <div style={{ position: 'relative', padding: '10px 0' }}>
            {/* خط التايم لاين بالبورغاندي الناعم */}
            <div style={{ 
              position: 'absolute', 
              left: isRTL ? 'auto' : '25px', 
              right: isRTL ? '25px' : 'auto', 
              top: 0, 
              bottom: 0, 
              width: '1px', 
              background: colors.accent, 
              opacity: 0.3 
            }} />

            {tr.home.programItems.map((item: ProgramItem, i: number) => (
              <div key={i} style={{ 
                position: 'relative',
                paddingLeft: isRTL ? '0' : '70px',
                paddingRight: isRTL ? '70px' : '0',
                marginBottom: '45px',
                textAlign: isRTL ? 'right' : 'left'
              }}>
                <div style={{ 
                  position: 'absolute',
                  left: isRTL ? 'auto' : '10px',
                  right: i === i ? (isRTL ? '10px' : 'auto') : 'auto',
                  top: '0px',
                  width: '32px',
                  height: '32px',
                  background: colors.bgLight,
                  border: `1px solid ${colors.accent}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  zIndex: 2
                }}>
                  {emojis[i]}
                </div>

                <div>
                  <span style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontSize: '13px', 
                    color: colors.accent, 
                    fontWeight: 600,
                    letterSpacing: '0.1em'
                  }}>{item.time}</span>
                  
                  <h4 style={{ 
                    fontSize: '20px', 
                    color: colors.primaryDark, 
                    margin: '4px 0 8px',
                    fontWeight: 500
                  }}>{item.title}</h4>
                  
                  <p style={{ 
                    fontSize: '14px', 
                    color: colors.textMuted, 
                    margin: 0, 
                    lineHeight: 1.6 
                  }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: CLOSING MESSAGE ── */}
      <section style={{ 
        background: colors.bgLight, 
        padding: '110px 1rem', 
        textAlign: 'center', 
        position: 'relative',
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ 
            fontSize: '16px', 
            fontStyle: 'italic', 
            color: colors.accent, 
            marginBottom: '8px', 
            fontWeight: 600 
          }}>{tr.home.closingQuote}</p>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '12px', 
            margin: '32px 0' 
          }}>
            <span style={{ width: '40px', height: '1px', background: colors.accent }} />
            <div style={{ position: 'relative', width: '40px', height: '30px' }}>
              <div style={{ 
                position: 'absolute', 
                left: 0, 
                top: '4px', 
                width: '22px', 
                height: '22px', 
                borderRadius: '50%', 
                border: `2px solid ${colors.primary}` 
              }} />
              <div style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '4px', 
                width: '22px', 
                height: '22px', 
                borderRadius: '50%', 
                border: `2px solid ${colors.primary}` 
              }} />
            </div>
            <span style={{ width: '40px', height: '1px', background: colors.accent }} />
          </div>

          <p style={{ 
            fontSize: '16px', 
            fontStyle: 'italic', 
            color: colors.primary, 
            marginBottom: '8px', 
            fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : "'Playfair Display', serif" 
          }}>with love</p>
          <h2 style={{ 
            fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : "'Playfair Display', serif", 
            fontWeight: 700, 
            fontSize: 'clamp(22px, 11vw, 24px)', 
            color: colors.primaryDark, 
            lineHeight: 1.5, 
            margin: '0 0 16px' 
          }}>{tr.home.salama_eman}</h2>
          <p style={{ 
            fontSize: '13px', 
            letterSpacing: '0.2em', 
            color: colors.accent, 
            fontWeight: 700, 
            fontFamily: isRTL ? "'Noto Nastaliq Urdu', serif" : "'Playfair Display', serif" 
          }}>{tr.home.date}</p>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400..700&display=swap');
        
        @keyframes fall {
          0% { transform: translateY(-30px) rotate(0deg); opacity: 0.4; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;