
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Sparkles, Brain } from 'lucide-react';
import { UserProfile } from '@/types';
import { getProfileFromStorage } from '@/utils/activities';
import Header from '@/components/Header';

const Home: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  useEffect(() => {
    // ローカルストレージからプロフィールを取得
    const storedProfile = getProfileFromStorage();
    setProfile(storedProfile);
  }, []);
  
  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <Header />
      
      <div className="space-y-6">
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-lg rounded-xl">
          <h1 className="text-2xl font-bold text-center mb-4">新しい体験を発見しよう</h1>
          
          <p className="text-gray-600 text-center mb-6">
            日常から一歩踏み出して、新しい自分に出会いましょう
          </p>
          
          <div className="grid gap-4">
            <Link to={profile ? "/activities" : "/"}>
              <Button className="w-full btn-gradient">
                {profile ? "アクティビティを探す" : "はじめる"}
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
            
            <Link to="/mindfulness">
              <Button variant="outline" className="w-full">
                <Brain className="mr-2 text-purple-500" size={16} />
                心の平穏へ
              </Button>
            </Link>
          </div>
        </Card>
        
        {profile && (
          <Card className="p-6 bg-white shadow rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-purple-500" size={20} />
              <h2 className="text-xl font-semibold">推奨アクティビティ</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              あなたの好みに合わせたアクティビティが見つかります
            </p>
            <Link to="/activities">
              <Button className="w-full">
                アクティビティを見る
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </Card>
        )}
        
        {!profile && (
          <p className="text-center text-sm text-gray-500">
            あなたの好みに合わせたアクティビティを表示するには、プロフィールを設定してください
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
