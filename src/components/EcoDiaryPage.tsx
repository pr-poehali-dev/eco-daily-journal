import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { habits } from '@/data/ecoContent';

interface EcoDiaryPageProps {
  date: string;
  quote: { text: string; author: string };
  fact: string;
  tip: string;
  dayNumber: number;
}

export default function EcoDiaryPage({ date, quote, fact, tip, dayNumber }: EcoDiaryPageProps) {
  return (
    <div className="min-h-screen bg-white p-8 diary-page" style={{ breakAfter: 'page' }}>
      <Card className="p-6 shadow-none border-2 border-primary/20 bg-white">
        <div className="mb-4 pb-4 border-b-2 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Calendar" size={22} className="text-primary" />
              <div className="text-base font-semibold text-foreground">
                <div className="border-b-2 border-dashed border-muted pb-1 mb-1 min-w-[200px]">
                  {date}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <Icon name="Sun" size={18} />
              <span className="text-sm font-medium">День {dayNumber}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-accent/5 rounded-lg p-4 border-2 border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Target" size={20} className="text-accent" />
              <h2 className="text-base font-bold text-foreground">Цель дня</h2>
            </div>
            <div className="border-b-2 border-dashed border-muted pb-2 min-h-[40px]"></div>
          </div>

          <div className="bg-primary/5 rounded-lg p-4 border-2 border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="ListChecks" size={20} className="text-primary" />
              <h2 className="text-base font-bold text-foreground">Трекер экологических привычек</h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {habits.map((habit) => (
                <div key={habit.id} className="flex items-center gap-2 p-2">
                  <div className="w-4 h-4 border-2 border-primary rounded"></div>
                  <Icon name={habit.icon as any} size={16} className="text-primary" />
                  <span className="text-xs font-medium">{habit.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-secondary/5 rounded-lg p-4 border-2 border-secondary/20">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Quote" size={20} className="text-secondary" />
              <h2 className="text-base font-bold text-foreground">Вдохновляющая цитата</h2>
            </div>
            <blockquote className="italic text-sm leading-relaxed border-l-4 border-secondary pl-3">
              "{quote.text}"
              <footer className="mt-1 text-xs font-semibold text-secondary">— {quote.author}</footer>
            </blockquote>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#8BA888]/10 rounded-lg p-4 border-2 border-[#8BA888]/30">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Lightbulb" size={18} className="text-[#6B8E23]" />
                <h2 className="text-sm font-bold text-foreground">Интересный факт</h2>
              </div>
              <p className="text-xs leading-relaxed">{fact}</p>
            </div>

            <div className="bg-[#5B9AA9]/10 rounded-lg p-4 border-2 border-[#5B9AA9]/30">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Sparkles" size={18} className="text-secondary" />
                <h2 className="text-sm font-bold text-foreground">Полезный совет</h2>
              </div>
              <p className="text-xs leading-relaxed">{tip}</p>
            </div>
          </div>

          <div className="bg-muted/20 rounded-lg p-4 border-2 border-muted">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Feather" size={20} className="text-primary" />
              <h2 className="text-base font-bold text-foreground">Заметки дня</h2>
            </div>
            <div className="space-y-2">
              <div className="border-b border-dashed border-muted h-6"></div>
              <div className="border-b border-dashed border-muted h-6"></div>
              <div className="border-b border-dashed border-muted h-6"></div>
              <div className="border-b border-dashed border-muted h-6"></div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t-2 border-primary/20 text-center">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Icon name="Heart" size={16} />
            <p className="text-xs font-medium">Каждый маленький шаг имеет значение для нашей планеты 🌍</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
