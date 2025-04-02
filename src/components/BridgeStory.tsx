
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/types';
import { ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import { generateBridgeStory } from '@/utils/bridgeStoryApi';
import { toast } from "sonner";

interface BridgeStoryProps {
  userProfile: UserProfile;
  onComplete: () => void;
}

interface Story {
  id: string;
  title: string;
  content: string;
  activityHint: string;
}

const BridgeStory: React.FC<BridgeStoryProps> = ({ userProfile, onComplete }) => {
  const [isReading, setIsReading] = useState(true);
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadStory = async () => {
      setIsLoading(true);
      try {
        const generatedStory = await generateBridgeStory(userProfile);
        
        setStory({
          id: `story-${Date.now()}`,
          title: generatedStory.title,
          content: generatedStory.content,
          activityHint: generatedStory.activityHint
        });
      } catch (error) {
        console.error("Error generating story:", error);
        toast.error("ストーリーの生成に失敗しました");
        
        // フォールバックのストーリー
        setStory({
          id: 'fallback-story',
          title: '偶然の一歩',
          content: `「もう、やめておこうかな」\n\n朝比奈は、スマホの画面を眺めながらそうつぶやいた。職場の同僚から誘われたワークショップ。普段なら断っていたはずだが、先週の飲み会で流れで「行ってみようかな」と言ってしまったのだ。\n\n今朝になって、急に不安がこみ上げてきた。知らない人ばかりの中に飛び込むのは苦手だ。いつも通り家で過ごした方が安全だし、心地いい。そう思って、キャンセルのメッセージを打とうとした瞬間、電話が鳴った。\n\n「やあ、朝比奈。今日のこと、やっぱり気が進まないかな？」\n\n同僚の声だった。\n\n「うん...正直...」\n\n「わかるよ。僕も最初は行きたくなかったんだ。でも、思い切って行ってみたら、全然想像と違ったんだよね。もし居心地悪かったら、こっそり抜け出してもいいしさ。とりあえず、入り口まで来てみない？」\n\n朝比奈は深呼吸をした。たった2時間。そう考えれば、試してみる価値はあるかもしれない。\n\n「...わかった、行ってみる」\n\n会場に着くと、意外にもリラックスした雰囲気だった。緊張しながらも、朝比奈は部屋の隅に座った。ワークショップが始まり、粘土に触れるよう指示があった。\n\n冷たく、少し湿った粘土の感触。指の間をすり抜けていく感覚に、朝比奈は少しずつ意識を集中させていった。頭の中の声が静かになっていくのを感じる。思考のループから解放されていく心地よさ。\n\n「こんな感覚、久しぶりかも...」\n\n帰り道、朝比奈は不思議な充実感を覚えていた。たった2時間の体験だったが、日々の思考の渦から離れられた貴重な時間だった。\n\nもしかしたら、たまには見知らぬ場所に足を踏み入れてみることも、悪くないのかもしれない。`,
          activityHint: '創作活動'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStory();
  }, [userProfile]);

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto py-6 px-4">
        <Card className="p-6 shadow-lg rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 text-purple-500 animate-spin mb-4" />
          <p className="text-sm text-gray-600">ストーリーを準備しています...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <Card className="p-6 shadow-lg rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50">
        {isReading && story ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="text-purple-500" size={20} />
              <h2 className="text-xl font-semibold">{story.title}</h2>
            </div>
            
            <div className="prose text-sm overflow-y-auto max-h-[60vh] p-4 bg-white/70 rounded-lg shadow-inner">
              <p className="whitespace-pre-line leading-relaxed">{story.content}</p>
            </div>
            
            <Button
              className="w-full btn-gradient mt-4"
              onClick={() => setIsReading(false)}
            >
              <span>読み終えました</span>
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">物語から体験へ</h2>
            
            <div className="bg-white/70 p-4 rounded-lg">
              <p className="text-sm mb-3">
                「{story?.title}」のように、思いがけない体験が新しい扉を開くことがあります。
              </p>
              <p className="text-sm font-medium">
                日常から一歩踏み出し、新しい体験に触れてみませんか？あなたにぴったりのアクティビティを探してみましょう。
              </p>
              {story?.activityHint && (
                <p className="text-sm text-purple-600 mt-2">
                  ヒント: {story.activityHint}に関連するアクティビティも見つかるかもしれません。
                </p>
              )}
            </div>
            
            <Button
              className="w-full btn-gradient"
              onClick={onComplete}
            >
              <span>アクティビティを探す</span>
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BridgeStory;
