
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import MindfulnessPrompt from '@/components/MindfulnessPrompt';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserProfile } from '@/types';
import { Brain, ArrowLeft } from 'lucide-react';

const Mindfulness = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);

  React.useEffect(() => {
    // ローカルストレージからユーザープロフィールを取得
    const savedProfile = localStorage.getItem('userProfile');
    
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    } else {
      // プロフィールがない場合は登録ページへ
      navigate('/');
    }
  }, [navigate]);

  const handleMindfulnessComplete = () => {
    navigate('/activities');
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto py-6 px-4">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-1"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} />
          <span>ホームに戻る</span>
        </Button>
        
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2">
            <Brain className="text-purple-500" size={24} />
            マインドフルネス
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            新しい体験の前に、今の気持ちを整理して心の準備をしましょう
          </p>
        </div>
        
        <MindfulnessPrompt 
          userProfile={userProfile} 
          onComplete={handleMindfulnessComplete} 
        />
      </div>
    </div>
  );
};

export default Mindfulness;
