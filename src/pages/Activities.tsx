
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ActivitySwiper from '@/components/ActivitySwiper';
import FavoritesSection from '@/components/FavoritesSection';
import BridgeStory from '@/components/BridgeStory';
import MindfulnessPrompt from '@/components/MindfulnessPrompt';
import Onboarding from '@/components/Onboarding';
import { UserProfile, Activity } from '@/types';
import { generateSampleActivities } from '@/utils/activities';
import { RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

const Activities = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [favorites, setFavorites] = useState<Activity[]>([]);
  const [showMindfulness, setShowMindfulness] = useState(false);
  const [showBridgeStory, setShowBridgeStory] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');
  const [cycle, setCycle] = useState(1);

  // ローカルストレージからユーザープロフィールを取得
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const savedFavorites = localStorage.getItem('favorites');
    
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // アクティビティを生成
  useEffect(() => {
    if (userProfile) {
      // 本来はAPIリクエストを行いますが、ここではサンプルデータを使用
      const newActivities = generateSampleActivities(`user-${Date.now()}`);
      setActivities(newActivities);
    }
  }, [userProfile, cycle]);

  // プロフィール設定完了時の処理
  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setShowMindfulness(true);
  };

  // マインドフルネス完了時の処理
  const handleMindfulnessComplete = () => {
    setShowMindfulness(false);
    setShowBridgeStory(true);
  };

  // ブリッジストーリー完了時の処理
  const handleBridgeStoryComplete = () => {
    setShowBridgeStory(false);
  };

  // お気に入り追加処理
  const handleLike = (activity: Activity) => {
    const liked = { ...activity, isFavorite: true };
    setFavorites(prev => {
      // 重複チェック
      if (!prev.some(fav => fav.id === liked.id)) {
        const updated = [...prev, liked];
        localStorage.setItem('favorites', JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  };

  // スキップ処理
  const handleDislike = (activity: Activity) => {
    // 必要に応じてスキップしたアクティビティを記録
  };

  // お気に入り削除処理
  const handleRemoveFavorite = (activityId: string) => {
    setFavorites(prev => {
      const updated = prev.filter(fav => fav.id !== activityId);
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  // すべてのアクティビティを見終わった時の処理
  const handleEmpty = () => {
    toast.info('新しいアクティビティを生成しています...');
    setCycle(prev => prev + 1); // 新しいサイクルを開始
  };

  // リフレッシュボタン処理
  const handleRefresh = () => {
    toast.info('新しいアクティビティを生成しています...');
    setCycle(prev => prev + 1);
  };

  // マインドフルネスに戻る処理
  const handleBackToMindfulness = () => {
    setShowMindfulness(true);
  };

  if (!userProfile) {
    return <Onboarding onComplete={handleProfileComplete} />;
  }

  if (showMindfulness) {
    return <MindfulnessPrompt userProfile={userProfile} onComplete={handleMindfulnessComplete} />;
  }

  if (showBridgeStory) {
    return <BridgeStory userProfile={userProfile} onComplete={handleBridgeStoryComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">アクティビティ</h1>
            <p className="text-sm text-gray-500">サイクル {cycle}</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleBackToMindfulness}>
              マインドフルネスに戻る
            </Button>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCcw size={16} className="mr-1" />
              リフレッシュ
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-6">
            <TabsTrigger value="discover" className="flex-1">発見する</TabsTrigger>
            <TabsTrigger value="favorites" className="flex-1">お気に入り</TabsTrigger>
          </TabsList>
          
          <TabsContent value="discover" className="min-h-[70vh]">
            <ActivitySwiper 
              activities={activities}
              onLike={handleLike}
              onDislike={handleDislike}
              onEmpty={handleEmpty}
            />
          </TabsContent>
          
          <TabsContent value="favorites">
            <FavoritesSection
              favorites={favorites}
              onRemoveFavorite={handleRemoveFavorite}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Activities;
