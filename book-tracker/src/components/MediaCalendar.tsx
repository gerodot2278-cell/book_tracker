import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { monthNamesRu, weekdayShortRu } from '../data/mock';
import type { LogEntry } from '../types/app';

interface Props {
  logs: LogEntry[];
  onDayClick: (dateStr: string, dayLogs: LogEntry[]) => void;
}

const toKey = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

export function MediaCalendar({ logs, onDayClick }: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // Группируем логи по датам
  const byDate = new Map<string, LogEntry[]>();
  logs.forEach((log) => {
    const arr = byDate.get(log.date) ?? [];
    arr.push(log);
    byDate.set(log.date, arr);
  });

  const firstWeekday = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // Пн=0
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  return (
    <section className="animate-fade-up bg-[#16181d] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
      {/* Заголовок календаря */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-[#d4af37]/80 font-medium">
          Медиа-календарь
        </h2>
        <div className="flex items-center gap-1.5">
          <button
            onClick={prevMonth}
            className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-[#d4af37] hover:border-[#d4af37]/40 transition-colors"
            aria-label="Предыдущий месяц"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="min-w-[130px] sm:min-w-[150px] text-center text-sm text-[#f5f0e6] font-light">
            {monthNamesRu[viewMonth]} {viewYear}
          </span>
          <button
            onClick={nextMonth}
            className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-[#d4af37] hover:border-[#d4af37]/40 transition-colors"
            aria-label="Следующий месяц"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Дни недели */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2">
        {weekdayShortRu.map((w) => (
          <div
            key={w}
            className="text-center text-[10px] uppercase tracking-wider text-white/25 py-1"
          >
            {w}
          </div>
        ))}
      </div>

      {/* Сетка дней */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {cells.map((day, idx) => {
          if (day === null) return <div key={`empty-${idx}`} />;

          const dateKey = toKey(viewYear, viewMonth, day);
          const dayLogs = byDate.get(dateKey) ?? [];
          const hasPhoto = dayLogs.some((l) => l.photoUrl);
          const photo = dayLogs.find((l) => l.photoUrl)?.photoUrl;
          const isToday =
            day === today.getDate() &&
            viewMonth === today.getMonth() &&
            viewYear === today.getFullYear();
          const clickable = dayLogs.length > 0;

          return (
            <button
              key={dateKey}
              disabled={!clickable}
              onClick={() => clickable && onDayClick(dateKey, dayLogs)}
              className={[
                'relative aspect-square rounded-xl flex items-center justify-center transition-all duration-300',
                clickable
                  ? 'cursor-pointer hover:scale-105'
                  : 'cursor-default',
                !clickable && isToday
                  ? 'border border-[#d4af37]/40'
                  : '',
                clickable
                  ? 'border border-transparent hover:border-[#d4af37]/40'
                  : 'border border-transparent',
              ].join(' ')}
              title={
                clickable
                  ? `${dayLogs.reduce((s, l) => s + l.pagesRead, 0)} стр.`
                  : undefined
              }
            >
              {hasPhoto && photo ? (
                // Круглая миниатюра фотографии вместо цифры
                <span className="relative block w-3/4 h-3/4 rounded-full overflow-hidden ring-1 ring-[#d4af37]/40 shadow-[0_4px_14px_rgba(0,0,0,0.5)]">
                  <img
                    src={photo}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {dayLogs.length > 1 && (
                    <span className="absolute bottom-0 right-0 px-1 text-[8px] leading-tight bg-black/70 text-[#d4af37] rounded-tl-md">
                      +{dayLogs.length - 1}
                    </span>
                  )}
                </span>
              ) : (
                <span
                  className={[
                    'text-xs tabular-nums',
                    isToday
                      ? 'text-[#d4af37] font-semibold'
                      : dayLogs.length > 0
                        ? 'text-[#f5f0e6] font-medium'
                        : 'text-white/25',
                  ].join(' ')}
                >
                  {day}
                </span>
              )}

              {/* Точка-индикатор, если есть записи без фото */}
              {dayLogs.length > 0 && !hasPhoto && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#d4af37]/70" />
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-[10px] text-white/20 text-center uppercase tracking-widest">
        Нажмите на день с фотографией, чтобы открыть детали
      </p>
    </section>
  );
}
