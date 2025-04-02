
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserProfile, MBTIType, NegativeThoughtType, UserPreference } from '@/types';
import { mbtiData, mbtiTestLink } from '@/utils/mbtiData';
import { negativeThoughtTypes } from '@/utils/negativeThoughtTypes';
import { activityCategories } from '@/utils/activities';
import { toast } from 'sonner';
import { ArrowRight, ExternalLink, Check, X, PlusCircle, HelpCircle } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    mbti: null,
    likes: [],
    dislikes: [],
    negativeThoughts: '',
    negativeThoughtType: [],
    location: '',
  });

  const [newLike, setNewLike] = useState('');
  const [newDislike, setNewDislike] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dislikedCategories, setDislikedCategories] = useState<string[]>([]);

  const addLike = () => {
    if (newLike.trim()) {
      const newPreference: UserPreference = {
        id: `like-${Date.now()}`,
        name: newLike.trim(),
        category: 'custom',
      };
      setProfile(prev => ({
        ...prev,
        likes: [...prev.likes, newPreference]
      }));
      setNewLike('');
      toast.success('好きなものを追加しました');
    }
  };

  const addDislike = () => {
    if (newDislike.trim()) {
      const newPreference: UserPreference = {
        id: `dislike-${Date.now()}`,
        name: newDislike.trim(),
        category: 'custom',
      };
      setProfile(prev => ({
        ...prev,
        dislikes: [...prev.dislikes, newPreference]
      }));
      setNewDislike('');
      toast.success('嫌いなものを追加しました');
    }
  };

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
      
      // 好きなカテゴリーに選んだ場合、嫌いなカテゴリーから削除
      if (dislikedCategories.includes(categoryId)) {
        setDislikedCategories(dislikedCategories.filter(id => id !== categoryId));
      }
    }
  };

  const toggleDislikedCategory = (categoryId: string) => {
    if (dislikedCategories.includes(categoryId)) {
      setDislikedCategories(dislikedCategories.filter(id => id !== categoryId));
    } else {
      setDislikedCategories([...dislikedCategories, categoryId]);
      
      // 嫌いなカテゴリーに選んだ場合、好きなカテゴリーから削除
      if (selectedCategories.includes(categoryId)) {
        setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
      }
    }
  };

  const handleMBTISelect = (value: string) => {
    setProfile(prev => ({
      ...prev,
      mbti: value as MBTIType
    }));
  };

  const toggleNegativeThoughtType = (type: NegativeThoughtType) => {
    const isSelected = profile.negativeThoughtType.includes(type);
    
    if (isSelected) {
      setProfile(prev => ({
        ...prev,
        negativeThoughtType: prev.negativeThoughtType.filter(t => t !== type)
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        negativeThoughtType: [...prev.negativeThoughtType, type]
      }));
    }
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // カテゴリの選択をプロフィールに反映
      const categoryLikes = selectedCategories.map(catId => {
        const category = activityCategories.find(c => c.id === catId);
        return {
          id: `cat-${catId}`,
          name: category?.name || catId,
          category: 'category'
        };
      });
      
      const categoryDislikes = dislikedCategories.map(catId => {
        const category = activityCategories.find(c => c.id === catId);
        return {
          id: `cat-${catId}`,
          name: category?.name || catId,
          category: 'category'
        };
      });
      
      const updatedProfile = {
        ...profile,
        likes: [...profile.likes, ...categoryLikes],
        dislikes: [...profile.dislikes, ...categoryDislikes]
      };
      
      onComplete(updatedProfile);
      toast.success('プロフィールを設定しました！');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">あなたのMBTIタイプを教えてください</h2>
            <p className="text-sm text-gray-600">
              MBTIは性格診断のひとつで、あなたに合ったアクティビティを提案する際の参考にします。
            </p>
            
            <div className="flex flex-col gap-2">
              <Select onValueChange={handleMBTISelect} value={profile.mbti || undefined}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="MBTIタイプを選択" />
                </SelectTrigger>
                <SelectContent>
                  {mbtiData.map((mbti) => (
                    <SelectItem key={mbti.type} value={mbti.type}>
                      {mbti.type} - {mbti.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="text-sm text-gray-500 flex items-center gap-1 mt-2">
                <HelpCircle size={14} />
                <span>自分のMBTIがわからない場合は</span>
                <a 
                  href={mbtiTestLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary flex items-center gap-1"
                >
                  こちら <ExternalLink size={12} />
                </a>
                <span>で診断できます</span>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">好きなものを教えてください</h2>
            <p className="text-sm text-gray-600">
              あなたの好きなアクティビティ、趣味、興味のあるカテゴリーを選んでください。
              自由に入力することもできます。
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Input 
                  type="text" 
                  placeholder="好きなこと、趣味など" 
                  value={newLike}
                  onChange={(e) => setNewLike(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addLike()}
                />
                <Button onClick={addLike} size="icon" aria-label="追加">
                  <PlusCircle size={20} />
                </Button>
              </div>
              
              {profile.likes.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.likes.map((like) => (
                    <div key={like.id} className="bg-secondary rounded-full px-3 py-1 text-sm flex items-center gap-1">
                      {like.name}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5" 
                        onClick={() => setProfile(prev => ({
                          ...prev,
                          likes: prev.likes.filter(item => item.id !== like.id)
                        }))}
                      >
                        <X size={12} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">カテゴリから選ぶ</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {activityCategories.map((category) => (
                    <div
                      key={category.id}
                      className={`
                        border rounded-md p-2 cursor-pointer text-sm transition-colors
                        ${selectedCategories.includes(category.id) 
                          ? 'bg-primary text-white border-primary' 
                          : 'hover:bg-gray-100 border-gray-200'}
                      `}
                      onClick={() => toggleCategory(category.id)}
                    >
                      <div className="flex items-center gap-1">
                        {selectedCategories.includes(category.id) && (
                          <Check size={14} />
                        )}
                        <span>{category.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">苦手なものを教えてください</h2>
            <p className="text-sm text-gray-600">
              あなたが苦手なアクティビティや概念を教えてください。
              これにより、あなたに合わないものをフィルタリングします。
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Input 
                  type="text" 
                  placeholder="苦手なこと、避けたいことなど" 
                  value={newDislike}
                  onChange={(e) => setNewDislike(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addDislike()}
                />
                <Button onClick={addDislike} size="icon" aria-label="追加">
                  <PlusCircle size={20} />
                </Button>
              </div>
              
              {profile.dislikes.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.dislikes.map((dislike) => (
                    <div key={dislike.id} className="bg-gray-200 rounded-full px-3 py-1 text-sm flex items-center gap-1">
                      {dislike.name}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5" 
                        onClick={() => setProfile(prev => ({
                          ...prev,
                          dislikes: prev.dislikes.filter(item => item.id !== dislike.id)
                        }))}
                      >
                        <X size={12} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">苦手なカテゴリを選ぶ</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {activityCategories.map((category) => (
                    <div
                      key={category.id}
                      className={`
                        border rounded-md p-2 cursor-pointer text-sm transition-colors
                        ${dislikedCategories.includes(category.id) 
                          ? 'bg-gray-700 text-white border-gray-700' 
                          : 'hover:bg-gray-100 border-gray-200'}
                      `}
                      onClick={() => toggleDislikedCategory(category.id)}
                    >
                      <div className="flex items-center gap-1">
                        {dislikedCategories.includes(category.id) && (
                          <X size={14} />
                        )}
                        <span>{category.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">現在のネガティブな思考について</h2>
            <p className="text-sm text-gray-600">
              今あなたを悩ませている思考や感情があれば、できるだけ具体的に教えてください。
              共有したくない場合は空欄でも構いません。
            </p>
            
            <Textarea
              placeholder="例：仕事のプレゼンがうまくいかなかったことが頭から離れない"
              className="min-h-[120px]"
              value={profile.negativeThoughts}
              onChange={(e) => setProfile(prev => ({
                ...prev,
                negativeThoughts: e.target.value
              }))}
            />
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">
                この情報は、あなたの現在の気持ちに寄り添うためだけに使用され、
                個人を特定する情報として保存されることはありません。
              </p>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">ネガティブ思考のタイプ</h2>
            <p className="text-sm text-gray-600">
              あなたがよく経験するネガティブな思考パターンを選んでください。
              複数選択可能です。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {negativeThoughtTypes.map((type) => (
                <div key={type.type} className="flex items-start space-x-2">
                  <Checkbox 
                    id={`type-${type.type}`} 
                    checked={profile.negativeThoughtType.includes(type.type)}
                    onCheckedChange={() => toggleNegativeThoughtType(type.type)}
                  />
                  <div className="grid gap-1.5">
                    <label
                      htmlFor={`type-${type.type}`}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {type.name}
                    </label>
                    <p className="text-xs text-gray-500">
                      {type.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-2">
              <Input
                type="text"
                placeholder="あなたの現在地を入力（例：東京都渋谷区）"
                value={profile.location || ''}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  location: e.target.value
                }))}
                className="mt-4"
              />
              <p className="text-xs text-gray-500 mt-1">
                地域に合ったアクティビティを提案するために使用します
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <Card className="p-6 shadow-lg rounded-xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">プロフィール設定</h1>
            <div className="text-sm text-muted-foreground">
              ステップ {step}/5
            </div>
          </div>
          
          <div className="flex mb-8">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 mx-0.5 rounded-full ${
                  s <= step ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
        
        {renderStepContent()}
        
        <div className="mt-10 flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
          >
            戻る
          </Button>
          
          <Button
            variant="default"
            onClick={handleNext}
            disabled={
              (step === 1 && !profile.mbti) ||
              (step === 5 && profile.negativeThoughtType.length === 0)
            }
            className="btn-gradient"
          >
            {step === 5 ? '完了' : '次へ'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;
