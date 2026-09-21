import { useState, Fragment } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MockReadingLog } from '../types';

interface MediaCalendarProps {
  logs: MockReadingLog[];
  onDayClick?: (date: string, logs: MockReadingLog[]) => void;
}

export function MediaCalendar({ logs, onDayClick }: MediaCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { locale: ru });
  const calendarEnd = endOfWeek(monthEnd, { locale: ru });

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const weeks: Date[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  const getLogsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return logs.filter(log => log.date === dateStr);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDayClick = (date: Date) => {
    if (onDayClick) {
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayLogs = logs.filter(log => log.date === dateStr);
      onDayClick(dateStr, dayLogs);
    }
  };

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {format(currentMonth, 'LLLL yyyy', { locale: ru })}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div
            key={day}
            className="text-center text-sm font-medium text-zinc-500 dark:text-zinc-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weeks.map((week, weekIndex) => (
          <Fragment key={weekIndex}>
            {week.map((day, dayIndex) => {
              const dayLogs = getLogsForDate(day);
              const hasPhoto = dayLogs.some(log => log.photoUrl);
              const hasPages = dayLogs.length > 0;
              const totalPageRead = dayLogs.reduce((sum, log) => sum + log.pagesRead, 0);
              const isCurrentMonth = isSameMonth(day, currentMonth);

              return (
                <button
                  key={dayIndex}
                  onClick={() => handleDayClick(day)}
                  className={`
                    aspect-square p-2 rounded-xl transition-all relative
                    ${!isCurrentMonth ? 'opacity-30' : ''}
                    ${isToday(day) ? 'ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-zinc-900' : ''}
                    ${hasPhoto 
                      ? 'hover:scale-105 hover:shadow-lg' 
                      : 'hover:bg-zinc-50 dark:hover:bg-zinc-800'}
                  `}
                >
                  <div className="h-full flex flex-col items-center justify-center">
                    {hasPhoto ? (
                      <div className="w-full h-full rounded-lg overflow-hidden relative">
                        <img
                          src={dayLogs.find(log => log.photoUrl)?.photoUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs font-medium">
                            {totalPageRead} стр.
                          </span>
                        </div>
                      </div>
                    ) : hasPages ? (
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-sm font-medium ${isCurrentMonth ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}`}>
                          {format(day, 'd')}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                          +{totalPageRead} стр.
                        </span>
                      </div>
                    ) : (
                      <span className={`text-sm ${isCurrentMonth ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-400'}`}>
                        {format(day, 'd')}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
