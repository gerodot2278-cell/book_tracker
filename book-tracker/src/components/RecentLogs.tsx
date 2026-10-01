import { BookOpen, Quote } from 'lucide-react';
import { formatDateRu } from '../data/mock';
import type { LogEntry } from '../types/app';

interface Props {
  logs: LogEntry[];
}

export function RecentLogs({ logs }: Props) {
  const recent = [...logs]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 6);

  return (
    <section className="animate-fade-up bg-[#16181d] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-[#d4af37]/80 font-medium">
          Недавние записи
        </h2>
        <span className="text-[11px] text-white/25 tabular-nums">
          {recent.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recent.map((log) => (
          <article
            key={log.id}
            className="group rounded-xl border border-white/[0.07] bg-[#0d0e11]/60 p-4 flex gap-4 hover:border-[#d4af37]/25 transition-colors duration-300"
          >
            {/* Обложка */}
            <img
              src={log.coverUrl}
              alt=""
              className="w-14 shrink-0 aspect-[2/3] object-cover rounded-lg border border-white/10 group-hover:scale-[1.03] transition-transform duration-300"
            />

            {/* Содержание */}
            <div className="min-w-0 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-[#f5f0e6] font-medium truncate">
                  {log.bookTitle}
                </p>
                <span className="shrink-0 text-[10px] text-white/30 capitalize pt-0.5">
                  {formatDateRu(log.date)}
                </span>
              </div>

              <p className="mt-0.5 text-xs text-white/30 italic truncate">
                {log.author}
              </p>

              {/* Цитата */}
              {log.quote && (
                <p className="mt-2 flex gap-1.5 font-serif italic text-[13px] leading-snug text-[#f5f0e6]/75 line-clamp-2">
                  <Quote className="w-3 h-3 shrink-0 mt-0.5 text-[#d4af37]/60" />
                  <span className="truncate">{log.quote}</span>
                </p>
              )}

              {/* Превью фото + страницы */}
              <div className="mt-auto pt-3 flex items-center justify-between gap-3">
                {log.photoUrl ? (
                  <img
                    src={log.photoUrl}
                    alt="Превью разворота"
                    className="w-16 h-11 object-cover rounded-md border border-white/10 grayscale-[35%] group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                ) : (
                  <span className="w-16 h-11 rounded-md border border-dashed border-white/10 flex items-center justify-center text-white/20">
                    <BookOpen className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </span>
                )}
                <span className="text-xs text-[#d4af37]/90 tabular-nums font-medium">
                  +{log.pagesRead} стр.
                </span>
              </div>
            </div>
          </article>
        ))}

        {recent.length === 0 && (
          <p className="col-span-full text-center text-sm text-white/30 py-10">
            Пока нет записей — зафиксируйте первое чтение выше ✦
          </p>
        )}
      </div>
    </section>
  );
}
