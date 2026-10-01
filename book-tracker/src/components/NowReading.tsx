import type { CurrentBook } from '../types/app';

interface Props {
  book: CurrentBook;
  page: number;
  onPageChange: (page: number) => void;
}

export function NowReading({ book, page, onPageChange }: Props) {
  const percent = Math.round((page / book.totalPages) * 100);
  const fillVar = { ['--fill' as string]: `${percent}%` };

  return (
    <section className="animate-fade-up bg-[#16181d] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
      {/* Заголовок секции */}
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-[#d4af37]/80 font-medium">
          Сейчас читаю
        </h2>
        <span className="text-[11px] text-white/30 tabular-nums">
          {book.totalPages} стр. в книге
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 sm:gap-7">
        {/* Обложка со свечением */}
        <div className="cover-glow shrink-0 self-center sm:self-start">
          <img
            src={book.coverUrl}
            alt={`Обложка: ${book.title}`}
            className="relative z-10 w-32 sm:w-40 aspect-[2/3] object-cover rounded-lg border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:scale-[1.02]"
          />
        </div>

        {/* Информация и прогресс */}
        <div className="flex-1 min-w-0 flex flex-col justify-between gap-5">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl leading-tight text-[#f5f0e6] font-medium">
              {book.title}
            </h3>
            <p className="mt-1.5 text-sm text-white/45 font-light italic">
              {book.author}
            </p>
          </div>

          <div>
            {/* Прогресс-бар */}
            <div className="flex items-end justify-between mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-light text-[#f5f0e6] tabular-nums">
                  {page}
                </span>
                <span className="text-sm text-white/35">
                  из {book.totalPages} страниц
                </span>
              </div>
              <span className="text-lg font-medium text-[#d4af37] tabular-nums">
                {percent}%
              </span>
            </div>

            <div className="h-1.5 w-full rounded-full bg-white/[0.07] overflow-hidden mb-4">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#d4af37]/70 to-[#d4af37] transition-all duration-300 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>

            {/* Ползунок страницы */}
            <input
              type="range"
              min={0}
              max={book.totalPages}
              value={page}
              onChange={(e) => onPageChange(Number(e.target.value))}
              className="folio-slider"
              style={fillVar}
              aria-label="Текущая страница"
            />
            <div className="mt-2 flex justify-between text-[10px] uppercase tracking-widest text-white/25">
              <span>начало</span>
              <span>перетащите, чтобы отметить страницу</span>
              <span>финал</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
