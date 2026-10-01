import { BookOpen } from 'lucide-react';

export function Header() {
  const now = new Date();
  const dayNames = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ];
  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  const dateLabel = `${now.getDate()} ${monthNames[now.getMonth()]}, ${dayNames[now.getDay()]}`;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0d0e11]/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Логотип */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d4af37]/25 to-[#d4af37]/5 border border-[#d4af37]/30 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-[#d4af37]" strokeWidth={1.75} />
          </div>
          <div className="leading-none">
            <span className="block text-lg font-semibold tracking-[0.3em] text-[#f5f0e6]">
              FOLIO
            </span>
            <span className="hidden sm:block mt-1 text-[10px] uppercase tracking-[0.25em] text-white/35">
              книжный дневник
            </span>
          </div>
        </div>

        {/* Дата + аватар */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden md:block text-sm text-white/45 font-light">
            {dateLabel}
          </span>
          <button
            className="relative w-9 h-9 rounded-full ring-1 ring-white/15 hover:ring-[#d4af37]/50 transition-all duration-300 overflow-hidden group"
            aria-label="Профиль"
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces"
              alt="Аватар"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <span className="absolute inset-0 rounded-full bg-[#d4af37]/0 group-hover:bg-[#d4af37]/10 transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
}
