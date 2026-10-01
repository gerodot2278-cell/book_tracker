import { useRef, useState } from 'react';
import { ImageIcon, Minus, Plus, Quote, Save, X } from 'lucide-react';
import type { CurrentBook } from '../types/app';

export interface QuickLogData {
  pagesRead: number;
  quote: string;
  note: string;
  photoUrl?: string;
}

interface Props {
  book: CurrentBook;
  onSave: (data: QuickLogData) => void;
}

const inputCls =
  'w-full bg-[#0d0e11] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#f5f0e6] placeholder:text-white/25 outline-none transition-all duration-300 focus:border-[#d4af37]/50 focus:ring-2 focus:ring-[#d4af37]/10';

export function QuickLogForm({ book, onSave }: Props) {
  const [pages, setPages] = useState(30);
  const [quote, setQuote] = useState('');
  const [note, setNote] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    // Мгновенное локальное превью через Object URL
    if (photoUrl && photoUrl.startsWith('blob:')) {
      URL.revokeObjectURL(photoUrl);
    }
    setPhotoUrl(URL.createObjectURL(file));
  };

  const changePages = (delta: number) => {
    setPages((p) => Math.max(0, Math.min(book.totalPages, p + delta)));
  };

  const handleSubmit = () => {
    if (pages === 0 && !quote.trim() && !note.trim()) return;
    onSave({ pagesRead: pages, quote: quote.trim(), note: note.trim(), photoUrl });
    setQuote('');
    setNote('');
    if (photoUrl?.startsWith('blob:')) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(undefined);
    setPages(30);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <section className="animate-fade-up bg-[#16181d] border border-white/10 rounded-2xl p-5 sm:p-7 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
      <h2 className="text-[11px] uppercase tracking-[0.3em] text-[#d4af37]/80 font-medium mb-5 sm:mb-6">
        Зафиксировать чтение
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {/* Левая колонка */}
        <div className="space-y-5">
          {/* Страницы за сегодня */}
          <div>
            <label className="block text-xs text-white/40 mb-2.5 uppercase tracking-wider">
              Прочитано страниц сегодня
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => changePages(-5)}
                className="w-10 h-10 shrink-0 rounded-xl border border-white/10 bg-[#0d0e11] flex items-center justify-center text-white/50 hover:text-[#d4af37] hover:border-[#d4af37]/40 transition-colors"
                aria-label="Минус 5 страниц"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                min={0}
                max={book.totalPages}
                value={pages}
                onChange={(e) =>
                  setPages(Math.max(0, Math.min(book.totalPages, Number(e.target.value) || 0)))
                }
                className="flex-1 bg-[#0d0e11] border border-white/10 rounded-xl py-2.5 px-4 text-center text-2xl font-light text-[#f5f0e6] tabular-nums outline-none focus:border-[#d4af37]/50 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                onClick={() => changePages(5)}
                className="w-10 h-10 shrink-0 rounded-xl border border-white/10 bg-[#0d0e11] flex items-center justify-center text-white/50 hover:text-[#d4af37] hover:border-[#d4af37]/40 transition-colors"
                aria-label="Плюс 5 страниц"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <input
              type="range"
              min={0}
              max={200}
              value={Math.min(pages, 200)}
              onChange={(e) => setPages(Number(e.target.value))}
              className="folio-slider mt-4"
              style={{ ['--fill' as string]: `${(Math.min(pages, 200) / 200) * 100}%` }}
              aria-label="Слайдер страниц"
            />
          </div>

          {/* Цитата дня — выделенный блок */}
          <div className="rounded-xl border border-[#d4af37]/25 bg-gradient-to-br from-[#d4af37]/[0.07] to-transparent p-4 relative">
            <div className="flex items-center gap-2 mb-2.5">
              <Quote className="w-4 h-4 text-[#d4af37]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37]/90">
                Цитата дня
              </span>
            </div>
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              rows={2}
              placeholder="Выпишите фразу, которая запомнилась…"
              className="w-full bg-transparent outline-none resize-none font-serif italic text-[15px] leading-relaxed text-[#f5f0e6] placeholder:text-white/20 placeholder:not-italic"
            />
          </div>
        </div>

        {/* Правая колонка */}
        <div className="space-y-5">
          {/* Заметка */}
          <div>
            <label className="block text-xs text-white/40 mb-2.5 uppercase tracking-wider">
              Заметка / мысли по главе
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="Что зацепило? О чём хочется подумать дальше?"
              className={inputCls + ' resize-none leading-relaxed'}
            />
          </div>

          {/* Фото разворота */}
          <div>
            <label className="block text-xs text-white/40 mb-2.5 uppercase tracking-wider">
              Фотография разворота
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            {photoUrl ? (
              <div className="relative group rounded-xl overflow-hidden border border-white/10">
                <img
                  src={photoUrl}
                  alt="Превью разворота"
                  className="w-full h-32 sm:h-36 object-cover"
                />
                <button
                  onClick={() => {
                    if (photoUrl.startsWith('blob:')) URL.revokeObjectURL(photoUrl);
                    setPhotoUrl(undefined);
                    if (fileRef.current) fileRef.current.value = '';
                  }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-colors"
                  aria-label="Удалить фото"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full h-32 sm:h-36 rounded-xl border border-dashed border-white/15 bg-[#0d0e11]/50 flex flex-col items-center justify-center gap-2 text-white/30 hover:text-[#d4af37]/80 hover:border-[#d4af37]/35 transition-colors duration-300"
              >
                <ImageIcon className="w-6 h-6" strokeWidth={1.5} />
                <span className="text-xs">Выбрать фото с компьютера</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Кнопка сохранения */}
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleSubmit}
          className={`flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 ${
            saved
              ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40'
              : 'bg-[#d4af37] text-[#0d0e11] hover:bg-[#e6c55e] hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] active:scale-[0.98]'
          }`}
        >
          {saved ? (
            <>Запись сохранена ✓</>
          ) : (
            <>
              <Save className="w-4 h-4" strokeWidth={2} />
              Сохранить запись
            </>
          )}
        </button>
        <span className="hidden sm:block text-xs text-white/25 font-light">
          Запись появится в ленте и в календаре на сегодня · {book.title}
        </span>
      </div>
    </section>
  );
}
