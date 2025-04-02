
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity } from '@/types';
import { Heart, Clock, MapPin, CreditCard, Calendar, ExternalLink } from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  onLike: () => void;
  onDislike: () => void;
  showActions?: boolean;
  className?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ 
  activity, 
  onLike, 
  onDislike, 
  showActions = true,
  className = "" 
}) => {
  return (
    <Card className={`overflow-hidden shadow-lg rounded-xl ${className}`}>
      <div className="relative">
        <div 
          className="h-48 bg-cover bg-center" 
          style={{ backgroundImage: `url(${activity.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-semibold">{activity.title}</h3>
          <p className="text-sm opacity-90 mt-1">{activity.category}</p>
        </div>
        
        {activity.isFavorite && (
          <div className="absolute top-3 right-3">
            <Heart className="fill-red-500 text-red-500" size={24} />
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-600">{activity.description}</p>
        
        <div className="p-3 bg-purple-50 rounded-lg">
          <p className="text-sm italic text-purple-800">{activity.personalizedMessage}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <Clock size={14} />
            <span>{activity.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <CreditCard size={14} />
            <span>{activity.price}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Calendar size={14} />
            <span>{activity.schedule}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin size={14} />
            <span>{activity.location}</span>
          </div>
        </div>
        
        {activity.discount && (
          <div className="px-3 py-2 bg-green-50 text-green-700 text-sm rounded-md flex items-center">
            <span className="font-medium">特典:</span>
            <span className="ml-1">{activity.discount}</span>
          </div>
        )}
        
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline"
            asChild
            className="w-full"
          >
            <a href={activity.bookingLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
              <span>詳細・予約</span>
              <ExternalLink size={14} />
            </a>
          </Button>
          
          {activity.mapLink && (
            <Button
              variant="outline"
              asChild
              className="w-full"
            >
              <a href={activity.mapLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                <span>地図を見る</span>
                <MapPin size={14} />
              </a>
            </Button>
          )}
        </div>
        
        {showActions && (
          <div className="flex justify-between gap-3 mt-4">
            <Button
              variant="outline"
              className="w-1/2 border-gray-300"
              onClick={onDislike}
            >
              スキップ
            </Button>
            <Button
              className="w-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white"
              onClick={onLike}
            >
              お気に入り
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ActivityCard;
