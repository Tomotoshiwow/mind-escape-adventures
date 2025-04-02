
import React from 'react';
import { Activity } from '@/types';
import ActivityCard from './ActivityCard';
import { Button } from '@/components/ui/button';
import { Heart, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface FavoritesSectionProps {
  favorites: Activity[];
  onRemoveFavorite: (activityId: string) => void;
}

const FavoritesSection: React.FC<FavoritesSectionProps> = ({ favorites, onRemoveFavorite }) => {
  const handleRemove = (activityId: string) => {
    onRemoveFavorite(activityId);
    toast.success('お気に入りから削除しました');
  };

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <Heart className="text-gray-300 mb-4" size={48} />
        <h3 className="text-xl font-medium text-gray-600 mb-2">お気に入りがありません</h3>
        <p className="text-gray-500 text-center max-w-sm">
          アクティビティを探索して、興味のあるものをお気に入りに追加してみましょう。
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Heart className="text-pink-500" size={24} />
        お気に入りアクティビティ
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favorites.map(activity => (
          <div key={activity.id} className="relative">
            <ActivityCard
              activity={activity}
              onLike={() => {}}
              onDislike={() => {}}
              showActions={false}
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full"
              onClick={() => handleRemove(activity.id)}
            >
              <Trash2 className="text-red-500" size={18} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesSection;
