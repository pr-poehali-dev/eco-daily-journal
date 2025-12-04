import Icon from '@/components/ui/icon';

interface DayEntry {
  date: string;
  goal: string;
  notes: string;
  checkedHabits: string[];
}

interface DiaryCalendarProps {
  currentDate: string;
  savedEntries: Record<string, DayEntry>;
  onDateSelect: (date: string) => void;
}

export default function DiaryCalendar({ currentDate, savedEntries, onDateSelect }: DiaryCalendarProps) {
  const getCurrentMonthDays = () => {
    const current = new Date(currentDate);
    const year = current.getFullYear();
    const month = current.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const startPadding = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const isDateFilled = (date: Date | null) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    const entry = savedEntries[dateStr];
    return entry && (entry.goal || entry.notes || entry.checkedHabits.length > 0);
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date | null) => {
    if (!date) return false;
    return date.toISOString().split('T')[0] === currentDate;
  };

  const days = getCurrentMonthDays();
  const monthName = new Date(currentDate).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-white/95 backdrop-blur rounded-lg p-6 shadow-lg border-2 border-primary/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-foreground capitalize flex items-center gap-2">
          <Icon name="Calendar" size={24} className="text-primary" />
          {monthName}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <span>Заполнено</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
            {day}
          </div>
        ))}

        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square"></div>;
          }

          const filled = isDateFilled(date);
          const today = isToday(date);
          const selected = isSelected(date);

          return (
            <button
              key={index}
              onClick={() => onDateSelect(date.toISOString().split('T')[0])}
              className={`
                aspect-square rounded-lg text-sm font-medium transition-all
                flex items-center justify-center relative
                ${selected ? 'bg-primary text-primary-foreground ring-2 ring-primary shadow-md' : ''}
                ${!selected && today ? 'bg-primary/10 text-primary border-2 border-primary' : ''}
                ${!selected && !today ? 'hover:bg-primary/5 text-foreground' : ''}
              `}
            >
              {date.getDate()}
              {filled && (
                <div className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${selected ? 'bg-primary-foreground' : 'bg-accent'}`}></div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-primary/10 text-center">
        <p className="text-sm text-muted-foreground">
          Заполнено дней: <span className="font-bold text-accent">{Object.keys(savedEntries).length}</span>
        </p>
      </div>
    </div>
  );
}
