import Icon from '@/components/ui/icon';
import { habits } from '@/data/ecoContent';

interface DayEntry {
  date: string;
  goal: string;
  notes: string;
  checkedHabits: string[];
}

interface HabitsStatisticsProps {
  savedEntries: Record<string, DayEntry>;
}

export default function HabitsStatistics({ savedEntries }: HabitsStatisticsProps) {
  const calculateHabitStats = () => {
    const stats = habits.map(habit => {
      const count = Object.values(savedEntries).filter(entry => 
        entry.checkedHabits.includes(habit.id)
      ).length;
      
      const totalDays = Object.keys(savedEntries).length;
      const percentage = totalDays > 0 ? Math.round((count / totalDays) * 100) : 0;
      
      return {
        ...habit,
        count,
        percentage
      };
    });
    
    return stats.sort((a, b) => b.count - a.count);
  };

  const stats = calculateHabitStats();
  const totalDays = Object.keys(savedEntries).length;
  const totalHabits = stats.reduce((sum, stat) => sum + stat.count, 0);

  return (
    <div className="bg-white/95 backdrop-blur rounded-lg p-6 shadow-lg border-2 border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Icon name="BarChart3" size={28} className="text-primary" />
          Статистика привычек
        </h3>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Всего действий</p>
          <p className="text-3xl font-bold text-accent">{totalHabits}</p>
        </div>
      </div>

      {totalDays === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Inbox" size={48} className="mx-auto mb-3 opacity-50" />
          <p>Начните заполнять ежедневник, чтобы увидеть статистику</p>
        </div>
      ) : (
        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name={stat.icon as any} size={20} className="text-primary" />
                  <span className="font-medium text-sm">{stat.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-accent">{stat.count} раз</span>
                  <span className="text-xs text-muted-foreground min-w-[45px] text-right">
                    {stat.percentage}%
                  </span>
                </div>
              </div>
              
              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-500"
                  style={{ width: `${stat.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalDays > 0 && (
        <div className="mt-6 pt-6 border-t border-primary/10 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">{totalDays}</p>
            <p className="text-xs text-muted-foreground">Дней заполнено</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent">{totalHabits}</p>
            <p className="text-xs text-muted-foreground">Всего действий</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-secondary">
              {totalDays > 0 ? Math.round(totalHabits / totalDays) : 0}
            </p>
            <p className="text-xs text-muted-foreground">В среднем/день</p>
          </div>
        </div>
      )}

      {totalDays >= 7 && (
        <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/30">
          <div className="flex items-start gap-3">
            <Icon name="TrendingUp" size={24} className="text-accent flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-sm text-foreground mb-1">
                Отличная работа!
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Вы ведёте ежедневник уже {totalDays} дней. 
                {totalHabits >= totalDays * 3 && ' Вы отлично справляетесь с выполнением экологических привычек! 🌟'}
                {totalHabits < totalDays * 3 && totalHabits >= totalDays && ' Продолжайте в том же духе! 💪'}
                {totalHabits < totalDays && ' Попробуйте добавить больше привычек в свой день. 🌱'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
