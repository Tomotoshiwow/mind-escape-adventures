
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserProfile } from '@/types';
import { mbtiData } from '@/utils/mbtiData';
import { negativeThoughtTypes } from '@/utils/negativeThoughtTypes';
import { User, Heart, X, MapPin, Trash2, ArrowRight, Edit } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    // ローカルストレージからユーザープロフィールを取得
    const savedProfile = localStorage.getItem('userProfile');
    const savedFavorites = localStorage.getItem('favorites');
    
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleResetProfile = () => {
    if (window.confirm('プロフィール情報をリセットしますか？新しく設定し直す必要があります。')) {
      localStorage.removeItem('userProfile');
      setUserProfile(null);
      toast.success('プロフィールをリセットしました');
      navigate('/');
    }
  };

  const handleResetFavorites = () => {
    if (window.confirm('お気に入りをすべて削除しますか？')) {
      localStorage.removeItem('favorites');
      setFavorites([]);
      toast.success('お気に入りをリセットしました');
    }
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-6 max-w-md">
          <p className="text-center mb-4">プロフィール情報が必要です</p>
          <Button onClick={() => navigate('/')} className="w-full">
            ホームに戻る
          </Button>
        </Card>
      </div>
    );
  }

  // MBTIの詳細情報を取得
  const mbtiInfo = mbtiData.find(m => m.type === userProfile.mbti);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <User className="text-purple-500" size={24} />
          マイプロフィール
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* プロフィール情報 */}
          <div className="md:col-span-2">
            <Card className="p-6 shadow-md">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-semibold">基本情報</h2>
                <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                  <Edit size={16} className="mr-1" />
                  編集
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* MBTI */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">MBTIタイプ</h3>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="font-semibold text-lg">{userProfile.mbti}</p>
                    {mbtiInfo && (
                      <p className="text-sm text-gray-600 mt-1">{mbtiInfo.description}</p>
                    )}
                  </div>
                </div>
                
                {/* 好きなもの */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">好きなもの</h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.likes.length > 0 ? (
                      userProfile.likes.map((like, index) => (
                        <div key={index} className="bg-green-50 rounded-full px-3 py-1 text-sm flex items-center gap-1">
                          <Heart size={12} className="text-green-500" />
                          <span>{like.name}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">設定されていません</p>
                    )}
                  </div>
                </div>
                
                {/* 嫌いなもの */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">苦手なもの</h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.dislikes.length > 0 ? (
                      userProfile.dislikes.map((dislike, index) => (
                        <div key={index} className="bg-red-50 rounded-full px-3 py-1 text-sm flex items-center gap-1">
                          <X size={12} className="text-red-500" />
                          <span>{dislike.name}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">設定されていません</p>
                    )}
                  </div>
                </div>
                
                {/* ネガティブ思考タイプ */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">ネガティブ思考のタイプ</h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.negativeThoughtType.length > 0 ? (
                      userProfile.negativeThoughtType.map((type, index) => {
                        const thoughtInfo = negativeThoughtTypes.find(t => t.type === type);
                        return (
                          <div key={index} className="bg-blue-50 rounded-full px-3 py-1 text-sm">
                            {thoughtInfo?.name || type}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-500 text-sm">設定されていません</p>
                    )}
                  </div>
                </div>
                
                {/* 位置情報 */}
                {userProfile.location && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">位置情報</h3>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin size={16} className="text-gray-500" />
                      <span>{userProfile.location}</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
          
          {/* サイドパネル */}
          <div>
            <Card className="p-6 shadow-md mb-6">
              <h2 className="text-lg font-semibold mb-4">活動サマリー</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">お気に入り数</span>
                  <span className="font-semibold">{favorites.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">最後のアクティビティ</span>
                  <span className="font-semibold">
                    {favorites.length > 0 ? '今日' : '-'}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <Button asChild className="w-full">
                  <a href="/activities">
                    アクティビティを探す
                    <ArrowRight className="ml-2" size={16} />
                  </a>
                </Button>
                
                <Button asChild variant="outline" className="w-full">
                  <a href="/activities?tab=favorites">
                    <Heart size={16} className="mr-2" />
                    お気に入りを見る
                  </a>
                </Button>
              </div>
            </Card>
            
            <Card className="p-6 shadow-md bg-gray-50">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">データ管理</h2>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  onClick={handleResetFavorites}
                >
                  <Trash2 size={16} className="mr-2" />
                  お気に入りをリセット
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  onClick={handleResetProfile}
                >
                  <Trash2 size={16} className="mr-2" />
                  プロフィールをリセット
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                ※リセットすると、保存された情報はすべて削除されます
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
