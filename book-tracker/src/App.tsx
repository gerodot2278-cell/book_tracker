import { useState } from 'react';
import { BookOpen, Calendar, Users, User } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { MediaCalendar } from './components/MediaCalendar';
import { ReadingForm } from './components/ReadingForm';
import { DayDetailModal } from './components/DayDetailModal';
import { mockUserBooks, mockReadingLogs, calculateStats } from './data/mockData';
import type { MockReadingLog, ReadingFormData } from './types';

type Tab = 'dashboard' | 'calendar' | 'feed' | 'profile';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showReadingForm, setShowReadingForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<{ date: string; logs: MockReadingLog[] } | null>(null);
  
  const stats = calculateStats();

  const handleAddReading = (data: ReadingFormData) => {
    console.log('New reading entry:', data);
    setShowReadingForm(false);
  };

  const handleDayClick = (date: string, logs: MockReadingLog[]) => {
    setSelectedDate({ date, logs });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            userBooks={mockUserBooks}
            totalPagesRead={stats.totalPagesReadAllTime}
            readingStreak={stats.readingStreak}
            onAddReading={() => setShowReadingForm(true)}
          />
        );
      case 'calendar':
        return (
          <MediaCalendar
            logs={mockReadingLogs}
            onDayClick={handleDayClick}
          />
        );
      case 'feed':
        return (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Лента сообщества
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-center py-12">
              Социальная лента будет доступна на Этапе 4
            </p>
          </div>
        );
      case 'profile':
        return (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Профиль
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-center py-12">
              Авторизация будет доступна на Этапе 2
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-24 md:pb-8">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Книжный дневник
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Ваш персональный трекер чтения
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowReadingForm(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Записать чтение
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {renderContent()}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 md:hidden z-40">
        <div className="grid grid-cols-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center py-3 px-2 transition-colors ${
              activeTab === 'dashboard'
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            <BookOpen className="w-6 h-6 mb-1" />
            <span className="text-xs">Дневник</span>
          </button>
          
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex flex-col items-center py-3 px-2 transition-colors ${
              activeTab === 'calendar'
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            <Calendar className="w-6 h-6 mb-1" />
            <span className="text-xs">Календарь</span>
          </button>
          
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex flex-col items-center py-3 px-2 transition-colors ${
              activeTab === 'feed'
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            <Users className="w-6 h-6 mb-1" />
            <span className="text-xs">Лента</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center py-3 px-2 transition-colors ${
              activeTab === 'profile'
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs">Профиль</span>
          </button>
        </div>
      </nav>

      {/* Modals */}
      {showReadingForm && (
        <ReadingForm
          userBooks={mockUserBooks}
          onSubmit={handleAddReading}
          onCancel={() => setShowReadingForm(false)}
        />
      )}

      {selectedDate && (
        <DayDetailModal
          date={selectedDate.date}
          logs={selectedDate.logs}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}

export default App;
