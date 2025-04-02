
import React, { useState, useRef } from 'react';
import { Activity } from '@/types';
import ActivityCard from './ActivityCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { X, Heart, RotateCcw, Check } from 'lucide-react';

interface ActivitySwiperProps {
  activities: Activity[];
  onLike: (activity: Activity) => void;
  onDislike: (activity: Activity) => void;
  onEmpty: () => void;
}

const ActivitySwiper: React.FC<ActivitySwiperProps> = ({ 
  activities, 
  onLike,
  onDislike,
  onEmpty
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setOffsetX(diff);
    
    // 方向を決定
    if (diff > 50) {
      setDirection('right');
    } else if (diff < -50) {
      setDirection('left');
    } else {
      setDirection(null);
    }
  };

  const handleTouchEnd = () => {
    if (direction === 'right') {
      handleLike();
    } else if (direction === 'left') {
      handleDislike();
    }
    setOffsetX(0);
    setDirection(null);
  };

  const handleLike = () => {
    if (currentIndex < activities.length) {
      toast.success('お気に入りに追加しました！');
      onLike(activities[currentIndex]);
      goToNext();
    }
  };

  const handleDislike = () => {
    if (currentIndex < activities.length) {
      onDislike(activities[currentIndex]);
      goToNext();
    }
  };

  const goToNext = () => {
    if (currentIndex < activities.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // すべてのカードを見終わった
      onEmpty();
    }
  };

  if (activities.length === 0 || currentIndex >= activities.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] p-4">
        <p className="text-xl font-medium text-gray-600 mb-4">
          すべてのアクティビティを見終えました
        </p>
        <Button onClick={() => onEmpty()}>
          <RotateCcw className="mr-2" size={16} />
          新しいアクティビティを見る
        </Button>
      </div>
    );
  }

  const currentActivity = activities[currentIndex];
  const nextActivity = currentIndex < activities.length - 1 ? activities[currentIndex + 1] : null;
  const nextNextActivity = currentIndex < activities.length - 2 ? activities[currentIndex + 2] : null;

  // スワイプ時のスタイル
  const getCardStyle = () => {
    if (!direction) {
      return {
        transform: `translateX(${offsetX}px) rotate(${offsetX * 0.1}deg)`,
        transition: offsetX === 0 ? 'transform 0.5s ease' : 'none'
      };
    }
    
    if (direction === 'right') {
      return {
        transform: 'translateX(1000px) rotate(30deg)',
        transition: 'transform 0.5s ease'
      };
    }
    
    if (direction === 'left') {
      return {
        transform: 'translateX(-1000px) rotate(-30deg)',
        transition: 'transform 0.5s ease'
      };
    }
  };

  return (
    <div className="relative h-[70vh] w-full max-w-md mx-auto">
      {/* 後ろのカード（スタック効果用） */}
      {nextNextActivity && (
        <div className="absolute inset-0 swiper-card swiper-card-nextplus">
          <ActivityCard
            activity={nextNextActivity}
            onLike={() => {}}
            onDislike={() => {}}
            showActions={false}
            className="opacity-70 pointer-events-none"
          />
        </div>
      )}
      
      {nextActivity && (
        <div className="absolute inset-0 swiper-card swiper-card-next">
          <ActivityCard
            activity={nextActivity}
            onLike={() => {}}
            onDislike={() => {}}
            showActions={false}
            className="opacity-90 pointer-events-none"
          />
        </div>
      )}
      
      {/* メインのカード（スワイプ可能） */}
      <div
        ref={cardRef}
        className="absolute inset-0 swiper-card swiper-card-active"
        style={getCardStyle()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ActivityCard
          activity={currentActivity}
          onLike={handleLike}
          onDislike={handleDislike}
        />
        
        {direction === 'right' && (
          <div className="absolute top-10 right-10 bg-green-500 text-white p-3 rounded-full">
            <Check size={32} />
          </div>
        )}
        
        {direction === 'left' && (
          <div className="absolute top-10 left-10 bg-red-500 text-white p-3 rounded-full">
            <X size={32} />
          </div>
        )}
      </div>
      
      {/* スワイプコントロール */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-8">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-14 w-14 rounded-full border-2 border-gray-300 bg-white shadow-md" 
          onClick={handleDislike}
        >
          <X size={24} className="text-gray-600" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-14 w-14 rounded-full border-2 border-pink-500 bg-white shadow-md" 
          onClick={handleLike}
        >
          <Heart size={24} className="text-pink-500" />
        </Button>
      </div>
    </div>
  );
};

export default ActivitySwiper;
