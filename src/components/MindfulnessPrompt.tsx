
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { UserProfile } from '@/types';
import { ArrowRight, Brain, Sparkles, ChevronDown, ChevronUp, Loader2, AlertCircle } from 'lucide-react';
import { generateMindfulnessPrompt } from '@/utils/mindfulnessApi';
import { toast } from "sonner";
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface MindfulnessPromptProps {
  userProfile: UserProfile;
  onComplete: () => void;
}

const MindfulnessPromptComponent: React.FC<MindfulnessPromptProps> = ({ userProfile, onComplete }) => {
  const [step, setStep] = useState(1);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [situation, setSituation] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [mindfulnessContent, setMindfulnessContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // 次のステップへ進む
  const handleNext = async () => {
    if (step === 1 && (situation || userProfile.negativeThoughts)) {
      setIsLoading(true);
      setHasError(false);
      
      try {
        // APIを使ってマインドフルネスプロンプトを生成
        const prompt = await generateMindfulnessPrompt(
          userProfile, 
          situation + "\n" + thoughts
        );
        
        setMindfulnessContent(prompt);
        setStep(2);
      } catch (error) {
        console.error("Error generating mindfulness prompt:", error);
        toast.error("マインドフルネスの生成に失敗しました");
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    } else if (step === 2) {
      onComplete();
    }
  };

  const handleRetry = () => {
    setHasError(false);
    handleNext();
  };

  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <Card className="p-6 shadow-lg rounded-xl overflow-hidden mindful-gradient">
        {step === 1 ? (
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Sparkles className="text-purple-500" size={24} />
                マインドフルネスの時間
              </h2>
              <p className="text-sm text-gray-600">
                新しい体験の前に、今の気持ちを整理しましょう。
                あなたのネガティブな思考について教えてください。
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="situation" className="text-sm font-medium">
                  現在の状況
                </label>
                <Input
                  id="situation"
                  placeholder="例：仕事で大きなプレゼンを控えている"
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="thoughts" className="text-sm font-medium">
                  浮かんでくる考え・感情
                </label>
                <Textarea
                  id="thoughts"
                  placeholder="例：うまくいかないかもしれないと不安で、考えが堂々巡りしている"
                  className="min-h-[100px]"
                  value={thoughts}
                  onChange={(e) => setThoughts(e.target.value)}
                />
              </div>
              
              <div className="p-3 bg-white/50 rounded-lg text-sm">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => setDetailsExpanded(!detailsExpanded)}>
                  <span className="font-medium">なぜこれが重要なの？</span>
                  {detailsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                
                {detailsExpanded && (
                  <div className="mt-2 text-gray-600 text-xs">
                    <p>ネガティブな思考パターンを認識することで、新しい体験に開かれた状態になります。これは「マインドフルネス」と呼ばれる技術で、今この瞬間に集中することで思考の循環から抜け出す助けになります。</p>
                    <p className="mt-1">あなたの回答は、あなたに最適なマインドフルネスの提案をするために使用されます。</p>
                  </div>
                )}
              </div>
            </div>

            <Button
              className="w-full btn-gradient mt-4"
              onClick={handleNext}
              disabled={(!situation && !userProfile.negativeThoughts) || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <span>次へ進む</span>
                  <ArrowRight className="ml-2" size={16} />
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Brain className="text-purple-500" size={20} />
                マインドフルネス・ガイド
              </h2>
            </div>
            
            {hasError ? (
              <div className="space-y-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>接続エラー</AlertTitle>
                  <AlertDescription>
                    サーバーに接続できませんでした。ネットワーク接続を確認してください。
                  </AlertDescription>
                </Alert>
                <Button
                  className="w-full"
                  onClick={handleRetry}
                  variant="outline"
                >
                  再試行
                </Button>
              </div>
            ) : (
              <div className="bg-white/70 p-4 rounded-lg shadow-sm border border-purple-100">
                <div className="prose text-sm whitespace-pre-line">
                  {mindfulnessContent}
                </div>
              </div>
            )}
            
            <div className="mt-4 space-y-2">
              <Button
                className="w-full btn-gradient"
                onClick={handleNext}
              >
                心の準備ができました
                <ArrowRight className="ml-2" size={16} />
              </Button>
              
              <p className="text-xs text-center text-gray-500">
                この瞬間を大切にして、次のステップに進みましょう
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MindfulnessPromptComponent;
