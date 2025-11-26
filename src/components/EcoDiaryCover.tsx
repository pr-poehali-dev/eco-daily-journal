import Icon from '@/components/ui/icon';

export default function EcoDiaryCover() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6B8E23] via-[#8BA888] to-[#5B9AA9] p-8 diary-page flex items-center justify-center" style={{ breakAfter: 'page' }}>
      <div className="text-center text-white max-w-2xl">
        <div className="mb-8 flex justify-center gap-4">
          <Icon name="Leaf" size={80} className="text-white/90 animate-pulse" />
          <Icon name="Sprout" size={80} className="text-white/90 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 drop-shadow-lg">
          Экологический
          <br />
          ежедневник
        </h1>
        
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-1 w-16 bg-white/60 rounded"></div>
          <Icon name="Flower2" size={32} className="text-white/80" />
          <div className="h-1 w-16 bg-white/60 rounded"></div>
        </div>
        
        <p className="text-2xl font-light mb-12 text-white/90">
          30 дней к устойчивому образу жизни
        </p>
        
        <div className="space-y-4 text-lg text-white/80 mb-12">
          <div className="flex items-center justify-center gap-3">
            <Icon name="Target" size={24} />
            <span>Ставьте экологичные цели</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Icon name="ListChecks" size={24} />
            <span>Отслеживайте зелёные привычки</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Icon name="Lightbulb" size={24} />
            <span>Узнавайте новое каждый день</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
          <Icon name="Heart" size={20} />
          <p>Каждый маленький шаг имеет значение для нашей планеты</p>
          <Icon name="Globe" size={20} />
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/30">
          <p className="text-sm text-white/60">
            {new Date().getFullYear()} • Начните своё экологическое путешествие сегодня
          </p>
        </div>
      </div>
    </div>
  );
}
