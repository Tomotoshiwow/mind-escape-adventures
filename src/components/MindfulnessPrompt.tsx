
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { UserProfile, MindfulnessPrompt } from '@/types';
import { ArrowRight, Brain, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface MindfulnessPromptProps {
  userProfile: UserProfile;
  onComplete: () => void;
}

// サンプルのマインドフルネスプロンプト
const samplePrompts: MindfulnessPrompt[] = [
  {
    id: 'eastern-1',
    type: 'eastern',
    content: `今この瞬間、あなたの心が何かに捕らわれているようですね。まずは深呼吸をしてみましょう。息を鼻から吸って、口からゆっくりと吐き出す。この呼吸の間に、あなたの足の裏が地面に触れている感覚に注目してみてください。この接点があなたを現実に繋ぎとめています。
    
思考は川の流れのようなもの。それらを止めようとするのではなく、川岸に座ってそれらを観察してみましょう。「ああ、また心配の思考が流れてきたな」と。思考を捕まえようとせず、ただ流れに気づくだけでいいのです。

今この場所で、あなたが見える色を5つ、聞こえる音を4つ、触れるテクスチャーを3つ、嗅げる香りを2つ、そして口の中の味を1つ意識してみてください。これが今、この瞬間のあなたの現実です。過去でも未来でもなく、ただここにある現在です。`
  },
  {
    id: 'western-1',
    type: 'western',
    content: `あなたが今経験しているネガティブな思考は、脳が危険から私たちを守ろうとする自然な反応です。しかしその思考に対して「そうかもしれないけれど、必ずしもそうとは限らない」と少し距離を置いてみましょう。

認知行動療法では、このような思考を「認知の歪み」と呼びます。例えば「すべて悪い方向に進む」と考えるのは「破滅的思考」、「自分だけがダメだ」と思うのは「自己批判」という歪みです。

今から3分間、あなたの不安な思考を紙に書き出してみましょう。それから、友人がこの悩みを抱えていたらどんなアドバイスをするか考えてみてください。自分自身にも同じ思いやりを向けることができますよ。

最後に、今この瞬間、あなたができる小さな行動に焦点を当ててみましょう。それが肩の力を抜くことでも、水を一杯飲むことでも構いません。小さな行動が次の一歩につながります。`
  }
];

const MindfulnessPromptComponent: React.FC<MindfulnessPromptProps> = ({ userProfile, onComplete }) => {
  const [step, setStep] = useState(1);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [situation, setSituation] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState<MindfulnessPrompt | null>(null);

  // 次のステップへ進む
  const handleNext = () => {
    if (step === 1 && (situation || userProfile.negativeThoughts)) {
      // 実際のアプリではここでAPIリクエストを行い、適切なプロンプトを取得します
      // 今回はサンプルデータからランダムに選択
      const randomIndex = Math.floor(Math.random() * samplePrompts.length);
      setCurrentPrompt(samplePrompts[randomIndex]);
      setStep(2);
    } else if (step === 2) {
      onComplete();
    }
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
              disabled={!situation && !userProfile.negativeThoughts}
            >
              <span>次へ進む</span>
              <ArrowRight className="ml-2" size={16} />
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
            
            {currentPrompt && (
              <div className="bg-white/70 p-4 rounded-lg shadow-sm border border-purple-100">
                <div className="prose text-sm whitespace-pre-line">
                  {currentPrompt.content}
                </div>
                
                <div className="mt-4 text-xs text-gray-500 italic">
                  {currentPrompt.type === 'eastern' ? 
                    '- 東洋の知恵からのアプローチ' : 
                    '- 認知行動療法のアプローチ'}
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
