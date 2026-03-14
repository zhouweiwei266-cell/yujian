'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface Mood {
  date: Date;
  score: number;
  hasEntry: boolean;
}

interface MoodDotsProps {
  moods: Mood[];
  onDotClick?: (date: Date) => void;
}

// 情绪等级配置 - 从雾蓝到暖棕的渐变（低落冷色调，愉悦暖色调）
const moodConfig = [
  { label: '', color: '', desc: '' }, // 0 index unused
  { label: '低落', color: '#7A93A4', desc: '需要关爱' },      // 1 - 深雾蓝（低落）
  { label: '一般', color: '#9CAFBE', desc: '有点疲惫' },      // 2 - 雾蓝
  { label: '平静', color: '#B8C5D0', desc: '状态平稳' },      // 3 - 浅雾蓝
  { label: '不错', color: '#C9B8A7', desc: '心情愉悦' },      // 4 - 奶茶色
  { label: '很好', color: '#E8C4A8', desc: '充满活力' },      // 5 - 暖杏色（愉悦）
];

// 空状态颜色
const emptyColor = '#E0DED8';

export function MoodDots({ moods, onDotClick }: MoodDotsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleClick = (mood: Mood, index: number) => {
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 300);
    onDotClick?.(mood.date);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm">
      {/* 标题区 */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-gradient-to-b from-[#D4C5B5] to-[#8BA5B5] rounded-full" />
          <h3 className="text-base font-semibold text-[#5C5346]">
            最近7天心情
          </h3>
        </div>
        <span className="text-xs text-[#A0998F]">
          点击记录今天
        </span>
      </div>

      {/* 情绪圆点 */}
      <div className="flex items-end justify-between px-1 py-2">
        {moods.map((mood, index) => {
          const isToday = index === moods.length - 1;
          const isHovered = hoveredIndex === index;
          const isClicked = clickedIndex === index;
          const config = moodConfig[mood.score];

          // 计算圆点大小 - 有记录的比无记录的大
          const baseSize = mood.hasEntry ? 20 : 14;
          const todaySize = 26;
          const size = isToday ? todaySize : baseSize;

          return (
            <div
              key={index}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleClick(mood, index)}
            >
              {/* 星期标签 */}
              <span
                className={`text-xs mb-3 transition-all duration-200 ${
                  isToday ? 'text-[#5C5346] font-medium' : 'text-[#A0998F]'
                }`}
              >
                {format(mood.date, 'EEE', { locale: zhCN })}
              </span>

              {/* 圆点容器 */}
              <div className="relative h-14 flex items-center justify-center">
                {/* 涟漪动画 */}
                {isClicked && (
                  <div
                    className="absolute rounded-full animate-ping opacity-40"
                    style={{
                      width: size,
                      height: size,
                      backgroundColor: mood.hasEntry ? config.color : emptyColor,
                    }}
                  />
                )}

                {/* 主圆点 */}
                <div
                  className="relative rounded-full cursor-pointer transition-all duration-300 ease-out"
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: mood.hasEntry ? config.color : emptyColor,
                    transform: isHovered ? 'scale(1.25) translateY(-2px)' : 'scale(1)',
                    boxShadow: isToday
                      ? '0 0 0 3px white, 0 0 0 5px #D4C5B5, 0 4px 12px rgba(92, 83, 70, 0.15)'
                      : isHovered
                      ? '0 4px 12px rgba(92, 83, 70, 0.2)'
                      : mood.hasEntry
                      ? '0 2px 6px rgba(92, 83, 70, 0.1)'
                      : 'inset 0 1px 2px rgba(0,0,0,0.08)',
                  }}
                >
                  {/* 空状态虚线装饰 */}
                  {!mood.hasEntry && (
                    <div className="absolute inset-0 rounded-full border border-dashed border-[#B8B3AB] opacity-50" />
                  )}
                </div>

                {/* 今天指示器 */}
                {isToday && (
                  <div className="absolute -bottom-5 flex flex-col items-center">
                    <span className="text-[10px] text-[#8BA5B5] font-medium">今天</span>
                  </div>
                )}
              </div>

              {/* 悬停浮层 */}
              {isHovered && (
                <div
                  className="absolute bottom-full mb-3 px-3 py-2 rounded-xl text-xs z-20 shadow-lg animate-in fade-in slide-in-from-bottom-1 duration-200"
                  style={{
                    backgroundColor: mood.hasEntry ? config.color : '#5C5346',
                    color: mood.hasEntry ? '#5C5346' : '#FAF7F2',
                    minWidth: '80px',
                  }}
                >
                  <div className="text-center">
                    <div className="font-medium opacity-90">
                      {format(mood.date, 'M月d日', { locale: zhCN })}
                    </div>
                    {mood.hasEntry ? (
                      <>
                        <div className="font-semibold mt-0.5">{config.label}</div>
                        <div className="text-[10px] opacity-70 mt-0.5">{config.desc}</div>
                      </>
                    ) : (
                      <div className="text-[10px] opacity-80 mt-0.5">点击记录心情</div>
                    )}
                  </div>
                  {/* 小三角 */}
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                    style={{
                      borderLeft: '5px solid transparent',
                      borderRight: '5px solid transparent',
                      borderTop: `5px solid ${mood.hasEntry ? config.color : '#5C5346'}`,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 渐变色图例 */}
      <div className="mt-6 pt-4 border-t border-[#EFEBE6]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#8B7F6F]">
            <span>低落</span>
            <div
              className="w-20 h-2 rounded-full"
              style={{
                background: `linear-gradient(to right, ${moodConfig[1].color}, ${moodConfig[3].color}, ${moodConfig[5].color})`,
              }}
            />
            <span>愉悦</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#A0998F]">
            <div className="w-2 h-2 rounded-full border border-dashed border-[#B8B3AB] bg-[#E0DED8]" />
            <span>未记录</span>
          </div>
        </div>
      </div>
    </div>
  );
}
