import { useEffect } from 'react';
import { BookOpen, Quote, X } from 'lucide-react';
import { formatDateRu } from '../data/mock';
import type { LogEntry } from '../types/app';

interface Props {
  date: string;
  logs: LogEntry[];
  onClose: () => void;
}

export function DayDetailModal({ date, logs, onClose }: Props) {
  // Закрытие по Esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const totalPages = logs.reduce((s, l) => s + l.pagesRead, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-backdrop-in bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-modal-in w-full max-w-lg max-h-[85vh] overflow-y-auto bg-[#16181d] border border-white/10 rounded-2xl shadow-[0_40px_120px_-30px_rgba(0,0,0,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка модалки */}
        <div className="sticky top-0 z-10 bg-[#16181d]/95 backdrop-blur px-5 sm:px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div>
            <h3 className="text-lg text-[#f5f0e6] font-medium capitalize">
              {formatDateRu(date)}
            </h3>
            <p className="text-xs text-[#d4af37]/80 mt-0.5 tabular-nums">
              {totalPages} страниц прочитано · {logs.length}{' '}
              {logs.length === 1 ? 'запись' : 'записи'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Детали записей */}
        <div className="p-5 sm:p-6 space-y-6">
          {logs.map((log) => (
            <article key={log.id} className="space-y-3">
              {/* Книга */}
              <div className="flex items-center gap-3">
                <img
                  src={log.coverUrl}
                  alt=""
                  className="w-9 h-13 object-cover rounded-md border border-white/10"
                  style={{ height: '3.4rem' }}
                />
                <div className="min-w-0">
                  <p className="text-sm text-[#f5f0e6] font-medium truncate">
                    {log.bookTitle}
                  </p>
                  <p className="text-xs text-white/35 italic truncate">
                    {log.author}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-[#d4af37]/90 tabular-nums">
                    <BookOpen className="w-3.5 h-3.5" strokeWidth={1.75} />
                    {log.pagesRead} страниц
                  </p>
                </div>
              </div>

              {/* Фото во весь размер */}
              {log.photoUrl && (
                <figure className="rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={log.photoUrl}
                    alt={`Разворот — ${log.bookTitle}`}
                    className="w-full max-h-80 object-cover"
                  />
                </figure>
              )}

              {/* Цитата */}
              {log.quote && (
                <blockquote className="relative rounded-xl border border-[#d4af37]/25 bg-gradient-to-br from-[#d4af37]/[0.07] to-transparent px-4 py-3 pl-10">
                  <Quote className="absolute left-3.5 top-4 w-4 h-4 text-[#d4af37]/70" />
                  <p className="font-serif italic text-[15px] leading-relaxed text-[#f5f0e6]/90">
                    {log.quote}
                  </p>
                </blockquote>
              )}

              {/* Заметка */}
              {log.note && (
                <p className="text-sm text-white/50 leading-relaxed pl-1 border-l border-white/10">
                  {log.note}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
