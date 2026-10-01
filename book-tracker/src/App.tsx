import { useState } from 'react';
import { Header } from './components/Header';
import { NowReading } from './components/NowReading';
import { QuickLogForm, type QuickLogData } from './components/QuickLogForm';
import { MediaCalendar } from './components/MediaCalendar';
import { DayDetailModal } from './components/DayDetailModal';
import { RecentLogs } from './components/RecentLogs';
import { currentBook, initialLogs } from './data/mock';
import type { LogEntry } from './types/app';

const todayKey = () => new Date().toISOString().split('T')[0];

function App() {
  const [page, setPage] = useState(currentBook.currentPage);
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [selectedDay, setSelectedDay] = useState<{
    date: string;
    logs: LogEntry[];
  } | null>(null);

  // Сохранение новой записи из формы быстрой фиксации
  const handleSaveLog = (data: QuickLogData) => {
    const entry: LogEntry = {
      id: `log-${Date.now()}`,
      date: todayKey(),
      bookTitle: currentBook.title,
      author: currentBook.author,
      coverUrl: currentBook.coverUrl,
      pagesRead: data.pagesRead,
      quote: data.quote || undefined,
      note: data.note || undefined,
      photoUrl: data.photoUrl,
    };
    setLogs((prev) => [entry, ...prev]);
    // Страницы сегодняшнего чтения сдвигают текущую позицию в книге
    setPage((p) => Math.min(currentBook.totalPages, p + data.pagesRead));
  };

  return (
    <div className="min-h-screen bg-[#0d0e11] text-[#e8e6e3]">
      {/* Тонкое кинематографичное свечение сверху */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 h-[420px] z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% -10%, rgba(212,175,55,0.07), transparent 70%)',
        }}
      />

      <Header />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8 pb-20">
        {/* Герой-подпись */}
        <div className="animate-fade-up text-center sm:text-left pt-2">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30">
            ваш книжный дневник
          </p>
          <h1 className="mt-2 font-serif text-2xl sm:text-4xl font-medium text-[#f5f0e6] leading-tight">
            Тишина, свет и&nbsp;несколько сотен страниц
          </h1>
          <div className="hairline mt-6 max-w-xs mx-auto sm:mx-0 sm:hidden" />
        </div>

        {/* 1. Текущая книга */}
        <NowReading book={currentBook} page={page} onPageChange={setPage} />

        {/* 2. Форма быстрой фиксации */}
        <QuickLogForm book={currentBook} onSave={handleSaveLog} />

        {/* 3. Календарь + лента */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(340px,5fr)_7fr] gap-6 sm:gap-8 items-start">
          <MediaCalendar
            logs={logs}
            onDayClick={(date, dayLogs) => setSelectedDay({ date, logs: dayLogs })}
          />
          <RecentLogs logs={logs} />
        </div>

        {/* Подвал */}
        <footer className="pt-6 text-center">
          <div className="hairline max-w-sm mx-auto mb-6" />
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/20">
            FOLIO · читай медленно · записывай красиво
          </p>
        </footer>
      </main>

      {/* Модальное окно дня */}
      {selectedDay && (
        <DayDetailModal
          date={selectedDay.date}
          logs={selectedDay.logs}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  );
}

export default App;
