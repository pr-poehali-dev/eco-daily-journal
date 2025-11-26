import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import EcoDiaryPage from '@/components/EcoDiaryPage';
import EcoDiaryCover from '@/components/EcoDiaryCover';
import { quotes, facts, tips, habits } from '@/data/ecoContent';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Index() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [goal, setGoal] = useState('');
  const [notes, setNotes] = useState('');
  const [checkedHabits, setCheckedHabits] = useState<string[]>([]);
  const [randomQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);
  const [randomFact] = useState(facts[Math.floor(Math.random() * facts.length)]);
  const [randomTip] = useState(tips[Math.floor(Math.random() * tips.length)]);
  const [isGenerating, setIsGenerating] = useState(false);
  const diaryPagesRef = useRef<HTMLDivElement>(null);

  const handleHabitToggle = (habitId: string) => {
    setCheckedHabits(prev =>
      prev.includes(habitId)
        ? prev.filter(id => id !== habitId)
        : [...prev, habitId]
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const generate30Days = () => {
    const days = [];
    const startDate = new Date();
    
    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dateStr = currentDate.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      days.push({
        date: dateStr,
        quote: quotes[i % quotes.length],
        fact: facts[i % facts.length],
        tip: tips[i % tips.length],
        dayNumber: i + 1
      });
    }
    
    return days;
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pages = diaryPagesRef.current?.querySelectorAll('.diary-page');
      
      if (!pages) {
        setIsGenerating(false);
        return;
      }

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;
        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = 210;
        const pdfHeight = 297;
        
        if (i > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }
      
      pdf.save('eco-diary-30-days.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-background to-[#C8D5BB] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 print:mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 flex items-center justify-center gap-3 flex-wrap">
            <Icon name="Leaf" size={40} className="text-accent" />
            Экологический ежедневник
            <Icon name="Sprout" size={40} className="text-accent" />
          </h1>
          <p className="text-muted-foreground">Каждый день — шаг к устойчивому будущему</p>
        </div>

        <div className="mb-6 print:hidden flex justify-center gap-4 flex-wrap">
          <Button onClick={handlePrint} size="lg" className="gap-2">
            <Icon name="FileText" size={20} />
            Печать текущей страницы
          </Button>
          <Button onClick={generatePDF} size="lg" className="gap-2" disabled={isGenerating}>
            <Icon name="Download" size={20} />
            {isGenerating ? 'Генерация...' : 'Скачать 30-дневный ежедневник (PDF)'}
          </Button>
        </div>

        <Card className="p-6 md:p-8 shadow-lg bg-white/95 backdrop-blur print:shadow-none print:bg-white">
          <div className="mb-6 pb-6 border-b-2 border-primary/20">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Icon name="Calendar" size={24} className="text-primary" />
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="text-lg font-semibold border-2 border-primary/30 focus:border-primary max-w-xs"
                />
              </div>
              <div className="flex items-center gap-2 text-primary">
                <Icon name="Sun" size={20} />
                <span className="text-sm font-medium">День {new Date(date).getDate()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-accent/5 rounded-lg p-5 border-2 border-accent/20">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Target" size={24} className="text-accent" />
                <h2 className="text-xl font-bold text-foreground">Цель дня</h2>
              </div>
              <Input
                placeholder="Например: Не использовать одноразовую посуду..."
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="text-base border-2 border-accent/30 focus:border-accent bg-white"
              />
            </div>

            <div className="bg-primary/5 rounded-lg p-5 border-2 border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="ListChecks" size={24} className="text-primary" />
                <h2 className="text-xl font-bold text-foreground">Трекер экологических привычек</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {habits.map((habit) => (
                  <div
                    key={habit.id}
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-primary/10 transition-colors cursor-pointer"
                    onClick={() => handleHabitToggle(habit.id)}
                  >
                    <Checkbox
                      checked={checkedHabits.includes(habit.id)}
                      onCheckedChange={() => handleHabitToggle(habit.id)}
                      className="w-5 h-5"
                    />
                    <Icon name={habit.icon as any} size={20} className="text-primary" />
                    <span className="text-sm font-medium">{habit.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary/5 rounded-lg p-5 border-2 border-secondary/20">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Quote" size={24} className="text-secondary" />
                <h2 className="text-xl font-bold text-foreground">Вдохновляющая цитата</h2>
              </div>
              <blockquote className="italic text-base leading-relaxed border-l-4 border-secondary pl-4">
                "{randomQuote.text}"
                <footer className="mt-2 text-sm font-semibold text-secondary">— {randomQuote.author}</footer>
              </blockquote>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#8BA888]/10 rounded-lg p-5 border-2 border-[#8BA888]/30">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Lightbulb" size={22} className="text-[#6B8E23]" />
                  <h2 className="text-lg font-bold text-foreground">Интересный факт</h2>
                </div>
                <p className="text-sm leading-relaxed">{randomFact}</p>
              </div>

              <div className="bg-[#5B9AA9]/10 rounded-lg p-5 border-2 border-[#5B9AA9]/30">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Sparkles" size={22} className="text-secondary" />
                  <h2 className="text-lg font-bold text-foreground">Полезный совет</h2>
                </div>
                <p className="text-sm leading-relaxed">{randomTip}</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-5 border-2 border-muted">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Feather" size={24} className="text-primary" />
                <h2 className="text-xl font-bold text-foreground">Заметки дня</h2>
              </div>
              <Textarea
                placeholder="Ваши мысли, наблюдения за природой, идеи..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-32 text-base border-2 border-muted resize-none bg-white"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-primary/20 text-center">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Icon name="Heart" size={20} />
              <p className="text-sm font-medium">Каждый маленький шаг имеет значение для нашей планеты 🌍</p>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground print:hidden">
          <p>Совет: для печати текущей страницы используйте альбомную ориентацию и масштаб 80-90%</p>
        </div>
        
        <div ref={diaryPagesRef} className="hidden">
          <EcoDiaryCover />
          {generate30Days().map((day, index) => (
            <EcoDiaryPage
              key={index}
              date={day.date}
              quote={day.quote}
              fact={day.fact}
              tip={day.tip}
              dayNumber={day.dayNumber}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:mb-4 {
            margin-bottom: 1rem;
          }
          .print\\:shadow-none {
            box-shadow: none;
          }
          .print\\:bg-white {
            background: white;
          }
          @page {
            size: A4;
            margin: 15mm;
          }
        }
      `}</style>
    </div>
  );
}