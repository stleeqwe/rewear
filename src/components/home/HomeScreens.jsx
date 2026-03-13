import { useState } from "react";
import { LeafitInline } from "../common/LeafitLogo";

// ── Design System Colors ──
const C = {
  lime: "#BEFF0A",
  forest: "#1A3C20",
  chalk: "#F7F5F0",
  offBlack: "#111111",
  neonMint: "#4DFFA6",
  hotCoral: "#FF6B6B",
  butter: "#FFE566",
  smoke: "#2A2A2A",
  mist: "#E8E5DD",
  sponsored: "#F0FFF0",
  forestActive: "#2D5A27",
};

// ── Sample Data ──
const CATEGORIES = ["전체", "상의", "하의", "아우터", "원피스"];

const ITEMS = [
  { id: 1, emoji: "👕", name: "유니클로 린넨 셔츠", size: "M", condition: "새것같음", neighborhood: "마포구", date: "3일 전", category: "상의" },
  { id: 2, emoji: "👖", name: "자라 와이드 팬츠", size: "S", condition: "거의 안입음", neighborhood: "강남구", date: "5일 전", category: "하의" },
  { id: 3, emoji: "🧥", name: "COS 울 블렌드 코트", size: "M", condition: "살짝 사용감", neighborhood: "서초구", date: "1일 전", category: "아우터" },
  { id: 4, emoji: "👗", name: "H&M 플로럴 원피스", size: "S", condition: "새것같음", neighborhood: "용산구", date: "오늘", category: "원피스" },
  { id: 5, emoji: "👚", name: "무인양품 코튼 블라우스", size: "M", condition: "거의 안입음", neighborhood: "마포구", date: "2일 전", category: "상의" },
  { id: 6, emoji: "👖", name: "리바이스 501 데님", size: "28", condition: "빈티지 감성", neighborhood: "성동구", date: "4일 전", category: "하의" },
];

const SPONSORED_ITEM = {
  id: "sp1",
  emoji: "🌿",
  name: "플리츠마마 니트백",
  size: "FREE",
  condition: "새상품",
  brandTag: "친환경 브랜드",
};

const RECENT_SEARCHES = ["유니클로 린넨", "자라 원피스", "COS 코트", "나이키 맨투맨"];
const POPULAR_SEARCHES = ["니트", "자라", "데님", "원피스", "아우터", "무신사", "캐시미어", "빈티지"];

// ── Shared Components ──

function ItemCard({ item, isSponsored }) {
  const bgStyle = isSponsored
    ? { background: C.sponsored, border: `1.5px solid ${C.forest}30` }
    : { background: "#FFF", border: `1px solid ${C.mist}` };

  return (
    <div style={{
      borderRadius: "12px",
      overflow: "hidden",
      ...bgStyle,
    }}>
      {/* Image placeholder */}
      <div style={{
        height: "130px",
        background: isSponsored
          ? "linear-gradient(135deg, #E8F5E2, #D4E8D0)"
          : "#F0EDE5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "40px",
        position: "relative",
      }}>
        {item.emoji}
        {/* Status badge */}
        <div style={{
          position: "absolute",
          top: "6px",
          left: "6px",
          background: isSponsored ? C.forest : "rgba(0,0,0,0.55)",
          color: isSponsored ? C.lime : "#FFF",
          fontSize: "8px",
          fontWeight: 700,
          padding: "2px 7px",
          borderRadius: "6px",
        }}>
          {isSponsored ? "Sponsored" : item.condition}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "8px 10px 10px" }}>
        {isSponsored && (
          <div style={{
            display: "inline-block",
            background: C.forest,
            color: C.lime,
            fontSize: "8px",
            fontWeight: 700,
            padding: "2px 7px",
            borderRadius: "10px",
            marginBottom: "4px",
          }}>
            Sponsored · {item.brandTag}
          </div>
        )}
        <div style={{
          fontSize: "11px",
          fontWeight: 600,
          color: C.offBlack,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginBottom: "3px",
        }}>
          {item.name}
        </div>
        <div style={{
          fontSize: "9px",
          color: "#999",
          marginBottom: "2px",
        }}>
          {item.size} · {isSponsored ? item.condition : item.condition}
        </div>
        {!isSponsored && (
          <div style={{
            fontSize: "9px",
            color: "#BBB",
          }}>
            {item.neighborhood} · {item.date}
          </div>
        )}
      </div>
    </div>
  );
}

function HomeTabBar({ active }) {
  const tabs = [
    { icon: "\u{1F3E0}", label: "홈", id: 0 },
    { icon: "\u{1F4AC}", label: "채팅", id: 1 },
    { icon: "\u{1F464}", label: "MY", id: 2 },
  ];

  return (
    <div style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "50px",
      background: C.chalk,
      borderTop: `1px solid ${C.mist}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    }}>
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <div key={t.id} style={{
            textAlign: "center",
            position: "relative",
            cursor: "default",
          }}>
            <div style={{
              fontSize: "18px",
              lineHeight: 1,
              filter: isActive ? "none" : "grayscale(1)",
              opacity: isActive ? 1 : 0.4,
            }}>
              {t.icon}
            </div>
            <div style={{
              fontSize: "8px",
              fontWeight: isActive ? 700 : 400,
              color: isActive ? C.forest : C.mist,
              marginTop: "2px",
            }}>
              {t.label}
            </div>
            {isActive && (
              <div style={{
                position: "absolute",
                bottom: "-4px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: C.lime,
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 1. ScreenHome — Main Home Feed
// ════════════════════════════════════════════════════════════
export function ScreenHome() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hasUnread] = useState(true);

  // Filter items by category
  const filteredItems = activeCategory === 0
    ? ITEMS
    : ITEMS.filter((it) => it.category === CATEGORIES[activeCategory]);

  // Build feed: 2 items, sponsored, then remaining
  const feedBefore = filteredItems.slice(0, 2);
  const feedAfter = filteredItems.slice(2, 4);
  const showSponsored = filteredItems.length > 0;
  const isEmpty = filteredItems.length === 0;

  return (
    <div style={{
      background: C.chalk,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    }}>
      {/* ── Header ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 14px",
        background: C.chalk,
        borderBottom: `1px solid ${C.mist}`,
        flexShrink: 0,
      }}>
        {/* Logo */}
        <LeafitInline fontSize={17} dark={false} />
        {/* Right icons */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          {/* Search */}
          <span style={{ fontSize: "15px", cursor: "default" }}>
            {"\u{1F50D}"}
          </span>
          {/* Notification bell with red dot */}
          <span style={{ fontSize: "15px", position: "relative", cursor: "default" }}>
            {"\u{1F514}"}
            {hasUnread && (
              <span style={{
                position: "absolute",
                top: "-2px",
                right: "-3px",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: C.hotCoral,
              }} />
            )}
          </span>
          {/* Leaf balance */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            background: `${C.neonMint}20`,
            padding: "3px 8px",
            borderRadius: "12px",
          }}>
            <span style={{ fontSize: "12px" }}>{"\u{1F343}"}</span>
            <span style={{
              fontSize: "11px",
              fontWeight: 700,
              color: C.forest,
            }}>3</span>
          </div>
        </div>
      </div>

      {/* ── Category Filter + Sort ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 14px",
        gap: "6px",
        flexShrink: 0,
      }}>
        <div style={{
          display: "flex",
          gap: "6px",
          overflowX: "auto",
          flex: 1,
        }}>
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat}
              onClick={() => setActiveCategory(i)}
              style={{
                padding: "5px 12px",
                borderRadius: "20px",
                background: activeCategory === i ? C.forestActive : "#F0EDE5",
                color: activeCategory === i ? "#FFF" : "#666",
                fontSize: "10px",
                fontWeight: 600,
                whiteSpace: "nowrap",
                cursor: "default",
                flexShrink: 0,
              }}
            >
              {cat}
            </div>
          ))}
        </div>
        {/* Sort button */}
        <div style={{
          fontSize: "9px",
          color: "#888",
          fontWeight: 500,
          whiteSpace: "nowrap",
          flexShrink: 0,
          cursor: "default",
        }}>
          최신순 ▾
        </div>
      </div>

      {/* ── Item Grid ── */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "0 10px 60px",
      }}>
        {isEmpty ? (
          /* Empty State */
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
            gap: "6px",
          }}>
            <div style={{
              fontSize: "18px",
              fontWeight: 700,
              color: C.offBlack,
            }}>
              여긴 아직 텅 비었어
            </div>
            <div style={{
              fontSize: "12px",
              color: C.mist,
            }}>
              다른 카테고리 둘러봐
            </div>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
          }}>
            {/* First 2 items */}
            {feedBefore.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}

            {/* Sponsored item (spans full width) */}
            {showSponsored && (
              <div style={{ gridColumn: "1 / -1" }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                }}>
                  <ItemCard item={SPONSORED_ITEM} isSponsored />
                  {/* Fill second column with next item if available */}
                  {feedAfter.length > 0 ? (
                    <ItemCard item={feedAfter[0]} />
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            )}

            {/* Remaining items */}
            {feedAfter.slice(1).map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* ── FAB ── */}
      <div style={{
        position: "absolute",
        bottom: "62px",
        right: "14px",
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        background: C.lime,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(190, 255, 10, 0.3)",
        zIndex: 10,
        cursor: "default",
      }}>
        <span style={{
          fontSize: "28px",
          color: C.forest,
          lineHeight: 1,
          fontWeight: 700,
        }}>+</span>
      </div>

      {/* ── Tab Bar ── */}
      <HomeTabBar active={0} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 2. ScreenSearch — Search Screen
// ════════════════════════════════════════════════════════════
export function ScreenSearch() {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([...RECENT_SEARCHES]);

  const isTyping = query.length > 0;

  // Simulate search results: filter items by query
  const searchResults = isTyping
    ? ITEMS.filter(
        (it) =>
          it.name.includes(query) ||
          it.category.includes(query) ||
          it.condition.includes(query)
      )
    : [];

  const handleDeleteRecent = (idx) => {
    setRecentSearches((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleClearAll = () => {
    setRecentSearches([]);
  };

  return (
    <div style={{
      background: C.chalk,
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* ── Header: Back + Search + Cancel ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 12px",
        borderBottom: `1px solid ${C.mist}`,
        flexShrink: 0,
      }}>
        {/* Back arrow */}
        <span style={{
          fontSize: "16px",
          cursor: "default",
          flexShrink: 0,
        }}>
          ←
        </span>
        {/* Search input */}
        <div style={{
          flex: 1,
          background: "#F0EDE5",
          border: `1.5px solid ${C.forestActive}`,
          borderRadius: "10px",
          padding: "7px 10px",
          fontSize: "11px",
          color: isTyping ? C.offBlack : "#AAA",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}>
          <span style={{ fontSize: "12px" }}>{"\u{1F50D}"}</span>
          <span>{isTyping ? query : "브랜드, 아이템 검색..."}</span>
          <span style={{
            marginLeft: "auto",
            width: "2px",
            height: "14px",
            background: C.forestActive,
            animation: "none",
          }} />
        </div>
        {/* Cancel */}
        <span style={{
          fontSize: "11px",
          color: "#888",
          fontWeight: 500,
          cursor: "default",
          flexShrink: 0,
        }}>
          취소
        </span>
      </div>

      {/* ── Content ── */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "12px 14px",
      }}>
        {!isTyping ? (
          /* Before typing: Recent + Popular */
          <>
            {/* Recent searches */}
            {recentSearches.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}>
                  <span style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: C.offBlack,
                  }}>
                    최근 검색어
                  </span>
                  <span
                    onClick={handleClearAll}
                    style={{
                      fontSize: "10px",
                      color: "#BBB",
                      cursor: "default",
                    }}
                  >
                    전체 삭제
                  </span>
                </div>
                {recentSearches.map((term, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 0",
                      borderBottom: `1px solid ${C.mist}50`,
                    }}
                  >
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}>
                      <span style={{ fontSize: "12px", color: "#CCC" }}>
                        {"\u{1F50D}"}
                      </span>
                      <span style={{
                        fontSize: "11px",
                        color: C.offBlack,
                      }}>
                        {term}
                      </span>
                    </div>
                    <span
                      onClick={() => handleDeleteRecent(i)}
                      style={{
                        fontSize: "12px",
                        color: "#CCC",
                        cursor: "default",
                        padding: "0 4px",
                      }}
                    >
                      ✕
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Popular searches */}
            <div>
              <div style={{
                fontSize: "12px",
                fontWeight: 700,
                color: C.offBlack,
                marginBottom: "10px",
              }}>
                인기 검색어
              </div>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
              }}>
                {POPULAR_SEARCHES.map((term, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "20px",
                      background: "#F0EDE5",
                      fontSize: "10px",
                      fontWeight: 500,
                      color: "#555",
                      cursor: "default",
                    }}
                  >
                    {term}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : searchResults.length > 0 ? (
          /* Search results grid */
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
          }}>
            {searchResults.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          /* Empty search results */
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
            gap: "6px",
          }}>
            <div style={{
              fontSize: "18px",
              fontWeight: 700,
              color: C.offBlack,
            }}>
              못 찾겠어
            </div>
            <div style={{
              fontSize: "12px",
              color: C.mist,
            }}>
              다른 키워드로 다시
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
