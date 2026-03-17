// LEAFIT Onboarding Screens
// Each screen is a standalone component designed for phone-frame rendering (260-340px wide)
import { LogoWithLeaf, LeafitInline } from "../common/LeafitLogo";

// Design system colors
const COLORS = {
  lime: '#BEFF0A',
  forest: '#1A3C20',
  chalk: '#F7F5F0',
  offBlack: '#111111',
  neonMint: '#4DFFA6',
  hotCoral: '#FF6B6B',
  butter: '#FFE566',
  smoke: '#2A2A2A',
  mist: '#E8E5DD',
};

// Shared styles
const fonts = {
  logo: "'DM Serif Display', serif",
  body: "'Pretendard', 'Noto Sans KR', -apple-system, sans-serif",
  accent: "'Outfit', 'Pretendard', sans-serif",
};

function CTAButton({ text, onClick, style }) {
  return (
    <div style={{
      background: COLORS.lime,
      color: COLORS.forest,
      padding: '14px 24px',
      borderRadius: '14px',
      fontSize: '14px',
      fontWeight: 700,
      textAlign: 'center',
      cursor: 'pointer',
      fontFamily: fonts.body,
      letterSpacing: '-0.2px',
      ...style,
    }}>
      {text}
    </div>
  );
}

function PageDots({ active }) {
  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: active === i ? '24px' : '8px',
            height: '8px',
            borderRadius: '4px',
            background: active === i ? COLORS.lime : 'rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease',
          }}
        />
      ))}
    </div>
  );
}

// ===== 1. SPLASH SCREEN =====
export function ScreenSplash() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: COLORS.forest,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: fonts.body,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle radial glow behind logo */}
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(190,255,10,0.08) 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }} />

      {/* Logo */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <LogoWithLeaf size={0.8} dark={true} />
      </div>

      {/* Tagline */}
      <div style={{
        color: COLORS.lime,
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '4px',
        textTransform: 'uppercase',
        marginTop: '16px',
        fontFamily: "'Outfit', sans-serif",
        opacity: 0.85,
        position: 'relative',
        zIndex: 1,
      }}>
        SWAP IS THE NEW SHOP
      </div>
    </div>
  );
}

// ===== 2. INTRO 1 — "올리고. 받고. 스왑하고." =====
export function ScreenIntro1() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: COLORS.forest,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: fonts.body,
      padding: '0',
      position: 'relative',
    }}>
      {/* Illustration area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px 0',
      }}>
        {/* Illustration: clothes flow to leaf */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '8px',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{ fontSize: '28px' }}>👕</span>
            <span style={{ fontSize: '22px' }}>👖</span>
            <span style={{ fontSize: '26px' }}>🧥</span>
          </div>
          {/* Arrow */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}>
            <svg width="48" height="24" viewBox="0 0 48 24">
              <path
                d="M4 12 L36 12 M30 6 L36 12 L30 18"
                stroke={COLORS.lime}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {/* Leaf */}
          <div style={{
            fontSize: '52px',
            filter: 'drop-shadow(0 0 12px rgba(190,255,10,0.4))',
          }}>
            🍃
          </div>
        </div>
      </div>

      {/* Content area */}
      <div style={{ padding: '0 28px 24px', textAlign: 'center' }}>
        {/* Title */}
        <div style={{
          fontSize: '22px',
          fontWeight: 800,
          color: '#FFFFFF',
          marginBottom: '12px',
          lineHeight: 1.3,
          letterSpacing: '-0.5px',
        }}>
          올리고. 받고. 스왑하고.
        </div>
        {/* Description */}
        <div style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.6,
          marginBottom: '28px',
        }}>
          안 입는 옷 올리면 리프 GET.<br />
          리프로 다른 옷 스왑.
        </div>

        {/* Page indicator */}
        <div style={{ marginBottom: '20px' }}>
          <PageDots active={0} />
        </div>

        {/* Button */}
        <CTAButton text="다음 →" />
      </div>
    </div>
  );
}

// ===== 3. INTRO 2 — "가격 따윈 없어" =====
export function ScreenIntro2() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: COLORS.forest,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: fonts.body,
      position: 'relative',
    }}>
      {/* Illustration area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px 0',
      }}>
        {/* Exchange illustration: leaf <-> shirt */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          {/* Leaf side */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            border: `2px solid ${COLORS.neonMint}`,
            background: 'rgba(77,255,166,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
          }}>
            🍃
          </div>

          {/* Exchange arrows */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
          }}>
            <svg width="40" height="32" viewBox="0 0 40 32">
              <path
                d="M4 10 L30 10 M24 4 L30 10 L24 16"
                stroke={COLORS.neonMint}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M36 22 L10 22 M16 16 L10 22 L16 28"
                stroke={COLORS.neonMint}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Shirt side */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            border: `2px solid ${COLORS.neonMint}`,
            background: 'rgba(77,255,166,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
          }}>
            👕
          </div>
        </div>

        {/* Equals sign */}
        <div style={{
          marginTop: '16px',
          background: 'rgba(77,255,166,0.12)',
          borderRadius: '12px',
          padding: '6px 20px',
          fontSize: '13px',
          fontWeight: 700,
          color: COLORS.neonMint,
          letterSpacing: '1px',
        }}>
          1 LEAF = 1 ITEM
        </div>
      </div>

      {/* Content area */}
      <div style={{ padding: '0 28px 24px', textAlign: 'center' }}>
        <div style={{
          fontSize: '22px',
          fontWeight: 800,
          color: '#FFFFFF',
          marginBottom: '12px',
          lineHeight: 1.3,
          letterSpacing: '-0.5px',
        }}>
          가격 따윈 없어
        </div>
        <div style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.6,
          marginBottom: '28px',
        }}>
          모든 옷 = 리프 1개.<br />
          비싸고 싸고 없이, 그냥 스왑.
        </div>

        <div style={{ marginBottom: '20px' }}>
          <PageDots active={1} />
        </div>

        <CTAButton text="다음 →" />
      </div>
    </div>
  );
}

// ===== 4. INTRO 3 — "스왑할수록 레벨업" =====
export function ScreenIntro3() {
  const badges = [
    { emoji: '🌱', label: '새싹', color: COLORS.neonMint },
    { emoji: '🌿', label: '그린', color: '#66FF99' },
    { emoji: '🌳', label: '트리', color: COLORS.lime },
    { emoji: '🌍', label: '어스', color: COLORS.butter },
    { emoji: '🪐', label: '유니버스', color: COLORS.hotCoral },
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: COLORS.forest,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: fonts.body,
      position: 'relative',
    }}>
      {/* Illustration area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px 0',
      }}>
        {/* Badge progression */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          {badges.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: `rgba(${hexToRgb(b.color)}, 0.12)`,
                  border: `2px solid ${b.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  boxShadow: `0 0 16px ${b.color}30`,
                }}>
                  {b.emoji}
                </div>
                <span style={{
                  fontSize: '8px',
                  fontWeight: 600,
                  color: b.color,
                  opacity: 0.8,
                }}>
                  {b.label}
                </span>
              </div>
              {/* Arrow between badges */}
              {i < badges.length - 1 && (
                <span style={{
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.25)',
                  marginBottom: '16px',
                }}>
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div style={{ padding: '0 28px 24px', textAlign: 'center' }}>
        <div style={{
          fontSize: '22px',
          fontWeight: 800,
          color: '#FFFFFF',
          marginBottom: '12px',
          lineHeight: 1.3,
          letterSpacing: '-0.5px',
        }}>
          스왑할수록 레벨업
        </div>
        <div style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.6,
          marginBottom: '28px',
        }}>
          새싹에서 유니버스까지.<br />
          네 순환이 곧 네 레벨.
        </div>

        <div style={{ marginBottom: '20px' }}>
          <PageDots active={2} />
        </div>

        <CTAButton text="시작하기 🔥" />
      </div>
    </div>
  );
}

// ===== 5. LOGIN SCREEN =====
export function ScreenLogin() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: COLORS.chalk,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: fonts.body,
      position: 'relative',
    }}>
      {/* Top spacing + Logo */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '20px',
      }}>
        <LogoWithLeaf size={0.7} dark={false} />
        <div style={{
          fontSize: '12px',
          color: '#999',
          marginTop: '8px',
          fontWeight: 500,
        }}>
          버리지 마, 리핏해.
        </div>
      </div>

      {/* Login buttons */}
      <div style={{
        padding: '0 28px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        {/* Kakao */}
        <div style={{
          background: '#FEE500',
          color: '#191919',
          padding: '15px 20px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: 600,
          textAlign: 'center',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 1C4.58 1 1 3.8 1 7.24c0 2.22 1.48 4.17 3.7 5.27l-.95 3.47c-.08.29.25.53.5.36l4.13-2.74c.2.01.41.02.62.02 4.42 0 8-2.8 8-6.24S13.42 1 9 1z" fill="#191919"/>
          </svg>
          카카오로 시작하기
        </div>

        {/* Apple */}
        <div style={{
          background: '#000000',
          color: '#FFFFFF',
          padding: '15px 20px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: 600,
          textAlign: 'center',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}>
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
            <path d="M13.1 9.5c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7C4.5 4.7 3.1 5.6 2.3 7c-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6 0 0-2.4-1-2.4-3.2zM10.8 3.5c.7-.8 1.1-1.9 1-3-.9 0-2.1.7-2.7 1.5-.6.7-1.1 1.8-1 2.9 1.1.1 2.1-.5 2.7-1.4z" fill="#FFF"/>
          </svg>
          Apple로 시작하기
        </div>

        {/* Phone */}
        <div style={{
          background: '#FFFFFF',
          color: COLORS.offBlack,
          padding: '15px 20px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: 600,
          textAlign: 'center',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          border: `1.5px solid ${COLORS.mist}`,
        }}>
          <span style={{ fontSize: '16px' }}>📱</span>
          전화번호로 시작하기
        </div>
      </div>

      {/* Browse without login */}
      <div style={{
        textAlign: 'center',
        padding: '14px 28px 0',
      }}>
        <span style={{
          fontSize: '13px',
          color: '#999',
          cursor: 'pointer',
          textDecoration: 'underline',
          textDecorationColor: '#CCC',
          textUnderlineOffset: '3px',
        }}>
          둘러보기
        </span>
      </div>

      {/* Terms */}
      <div style={{
        padding: '14px 28px 28px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '10px',
          color: '#AAA',
          lineHeight: 1.6,
        }}>
          가입 시{' '}
          <span style={{ textDecoration: 'underline', color: '#888' }}>이용약관</span>
          {' '}및{' '}
          <span style={{ textDecoration: 'underline', color: '#888' }}>개인정보처리방침</span>
          에 동의합니다
        </div>
      </div>
    </div>
  );
}

// ===== 6. LOCATION SCREEN =====
export function ScreenLocation() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: COLORS.chalk,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: fonts.body,
      position: 'relative',
    }}>
      {/* Header */}
      <div style={{
        padding: '24px 24px 16px',
      }}>
        <div style={{
          fontSize: '20px',
          fontWeight: 800,
          color: COLORS.offBlack,
          lineHeight: 1.4,
          letterSpacing: '-0.5px',
        }}>
          동네 인증하고<br />바로 시작 🏃
        </div>
      </div>

      {/* Map placeholder */}
      <div style={{
        margin: '0 24px',
        height: '160px',
        borderRadius: '16px',
        background: '#E8E8E0',
        border: `1px solid ${COLORS.mist}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid lines for map feel */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.15,
          background: `
            linear-gradient(0deg, transparent 49%, #999 49%, #999 51%, transparent 51%),
            linear-gradient(90deg, transparent 49%, #999 49%, #999 51%, transparent 51%)
          `,
          backgroundSize: '40px 40px',
        }} />
        {/* Pin */}
        <div style={{ fontSize: '32px', position: 'relative', zIndex: 1 }}>📍</div>
        <div style={{
          fontSize: '10px',
          color: '#888',
          marginTop: '6px',
          fontWeight: 500,
          position: 'relative',
          zIndex: 1,
        }}>
          현재 위치를 찾고 있어요...
        </div>
      </div>

      {/* Detected location card */}
      <div style={{
        margin: '16px 24px 0',
        background: '#FFFFFF',
        borderRadius: '14px',
        padding: '16px 18px',
        border: `2px solid ${COLORS.lime}`,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: `${COLORS.lime}18`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          flexShrink: 0,
        }}>
          📍
        </div>
        <div>
          <div style={{
            fontSize: '15px',
            fontWeight: 700,
            color: COLORS.offBlack,
            marginBottom: '2px',
          }}>
            마포구 연남동
          </div>
          <div style={{
            fontSize: '10px',
            color: '#999',
          }}>
            GPS로 감지된 위치
          </div>
        </div>
        <div style={{
          marginLeft: 'auto',
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: COLORS.lime,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          color: COLORS.forest,
          fontWeight: 700,
        }}>
          ✓
        </div>
      </div>

      {/* Bottom actions */}
      <div style={{ marginTop: 'auto', padding: '0 24px 28px' }}>
        <CTAButton text="여기로 정했어!" />
        <div style={{
          textAlign: 'center',
          marginTop: '14px',
          fontSize: '12px',
          color: '#999',
          cursor: 'pointer',
          textDecoration: 'underline',
          textDecorationColor: '#CCC',
          textUnderlineOffset: '3px',
        }}>
          검색으로 변경하기
        </div>
      </div>
    </div>
  );
}

// ===== 6b. PHONE LOGIN SCREEN =====
export function ScreenPhoneLogin() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: COLORS.chalk,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: fonts.body,
      position: 'relative',
    }}>
      {/* Header */}
      <div style={{
        padding: '24px 24px 16px',
      }}>
        <div style={{ fontSize: '16px', cursor: 'pointer', marginBottom: '16px' }}>←</div>
        <div style={{
          fontSize: '20px',
          fontWeight: 800,
          color: COLORS.offBlack,
          lineHeight: 1.4,
          letterSpacing: '-0.5px',
        }}>
          전화번호로 시작하기
        </div>
        <div style={{
          fontSize: '12px',
          color: '#999',
          marginTop: '4px',
        }}>
          인증번호를 보내드릴게요
        </div>
      </div>

      {/* Phone number input */}
      <div style={{ padding: '0 24px', marginBottom: '20px' }}>
        <div style={{
          fontSize: '10px',
          fontWeight: 600,
          color: '#666',
          marginBottom: '6px',
        }}>
          전화번호
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{
            background: '#F0EDE5',
            border: `1.5px solid ${COLORS.mist}`,
            borderRadius: '10px',
            padding: '12px 14px',
            fontSize: '13px',
            color: COLORS.offBlack,
            fontWeight: 600,
            flexShrink: 0,
          }}>
            +82
          </div>
          <div style={{
            flex: 1,
            background: '#FFF',
            border: `1.5px solid ${COLORS.forest}40`,
            borderRadius: '10px',
            padding: '12px 14px',
            fontSize: '13px',
            color: '#AAA',
          }}>
            010-0000-0000
          </div>
        </div>
      </div>

      {/* OTP input */}
      <div style={{ padding: '0 24px', marginBottom: '20px' }}>
        <div style={{
          fontSize: '10px',
          fontWeight: 600,
          color: '#666',
          marginBottom: '6px',
        }}>
          인증번호 6자리
        </div>
        <div style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
        }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{
              width: '40px',
              height: '48px',
              borderRadius: '10px',
              border: i === 0 ? `2px solid ${COLORS.forest}` : `1.5px solid ${COLORS.mist}`,
              background: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 700,
              color: COLORS.offBlack,
              fontFamily: "'Outfit', sans-serif",
            }}>
              {i === 0 ? '|' : ''}
            </div>
          ))}
        </div>
        <div style={{
          textAlign: 'center',
          marginTop: '10px',
          fontSize: '11px',
          color: '#999',
        }}>
          <span style={{ color: COLORS.hotCoral, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>2:59</span> 남음 · <span style={{ textDecoration: 'underline', color: '#888', cursor: 'pointer' }}>재전송</span>
        </div>
      </div>

      {/* Verify button */}
      <div style={{ marginTop: 'auto', padding: '0 24px 28px' }}>
        <CTAButton text="인증하기" />
      </div>
    </div>
  );
}

// ===== 7. FIRST LEAF SCREEN =====
export function ScreenFirstLeaf() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: COLORS.forest,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: fonts.body,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        width: '240px',
        height: '240px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${COLORS.neonMint}15 0%, transparent 70%)`,
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }} />

      {/* Large leaf icon */}
      <div style={{
        fontSize: '72px',
        marginBottom: '20px',
        position: 'relative',
        zIndex: 1,
        filter: `drop-shadow(0 0 20px ${COLORS.neonMint}50)`,
      }}>
        🍃
      </div>

      {/* Main text */}
      <div style={{
        fontFamily: fonts.accent,
        fontSize: '28px',
        fontWeight: 800,
        color: COLORS.lime,
        letterSpacing: '1px',
        marginBottom: '4px',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        lineHeight: 1.2,
      }}>
        <span style={{ fontSize: '20px', verticalAlign: 'middle' }}>🍃</span>{' '}
        1 LEAF GET!
      </div>

      {/* Sub text */}
      <div style={{
        fontSize: '13px',
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 1.7,
        textAlign: 'center',
        marginTop: '16px',
        padding: '0 32px',
        position: 'relative',
        zIndex: 1,
      }}>
        이 리프 하나로 옷 1벌 스왑 가능.<br />
        더 벌고 싶으면? 올려.
      </div>

      {/* Button */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        marginTop: '40px',
        width: 'calc(100% - 56px)',
      }}>
        <CTAButton text="스왑하러 가기 →" />
      </div>
    </div>
  );
}

// Utility: convert hex to rgb string for rgba usage
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
  }
  return '0, 0, 0';
}
