
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/types';
import { ArrowRight, BookOpen } from 'lucide-react';

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

// サンプルストーリー
const sampleStories: Story[] = [
  {
    id: 'story-1',
    title: '偶然の一歩',
    content: `「もう、やめておこうかな」

朝比奈は、スマホの画面を眺めながらそうつぶやいた。職場の同僚から誘われたワークショップ。普段なら断っていたはずだが、先週の飲み会で流れで「行ってみようかな」と言ってしまったのだ。

今朝になって、急に不安がこみ上げてきた。知らない人ばかりの中に飛び込むのは苦手だ。いつも通り家で過ごした方が安全だし、心地いい。そう思って、キャンセルのメッセージを打とうとした瞬間、電話が鳴った。

「やあ、朝比奈。今日のこと、やっぱり気が進まないかな？」

同僚の声だった。

「うん...正直...」

「わかるよ。僕も最初は行きたくなかったんだ。でも、思い切って行ってみたら、全然想像と違ったんだよね。もし居心地悪かったら、こっそり抜け出してもいいしさ。とりあえず、入り口まで来てみない？」

朝比奈は深呼吸をした。たった2時間。そう考えれば、試してみる価値はあるかもしれない。

「...わかった、行ってみる」

会場に着くと、意外にもリラックスした雰囲気だった。緊張しながらも、朝比奈は部屋の隅に座った。ワークショップが始まり、粘土に触れるよう指示があった。

冷たく、少し湿った粘土の感触。指の間をすり抜けていく感覚に、朝比奈は少しずつ意識を集中させていった。頭の中の声が静かになっていくのを感じる。思考のループから解放されていく心地よさ。

「こんな感覚、久しぶりかも...」

帰り道、朝比奈は不思議な充実感を覚えていた。たった2時間の体験だったが、日々の思考の渦から離れられた貴重な時間だった。

もしかしたら、たまには見知らぬ場所に足を踏み入れてみることも、悪くないのかもしれない。`,
    activityHint: '創作活動'
  },
  {
    id: 'story-2',
    title: '星空の下で',
    content: `真夜中の公園に佇む春野が見上げたのは、思いがけない満天の星空だった。

会社の帰り、頭の中は明日の締め切りや上司のコメントで一杯だった。駅から家までの道すがら、ふと目に入った公園のベンチに腰を下ろしたのは、ただ少し休みたかっただけ。スマホも見ずに、ただ空を見上げた。

そこには驚くほど鮮明な星空が広がっていた。

「こんな街中でも、こんなに星が見えるんだ...」

春野は深く息を吸い込んだ。星の光は何億光年も離れた過去からの光。今の悩みなんて、宇宙の広大さの前では取るに足らないものに思えてきた。

翌日、同僚の井上に昨夜のことを話した。

「星空？いいね。実は今度、天体観測のイベントがあるんだけど、興味ある？初心者向けだから専門知識はいらないよ」

普段なら断っていたはずだが、昨夜の星空の記憶が鮮明だった。

「行ってみようかな」

週末、春野は郊外の山に向かった。専用の望遠鏡で見る土星の環や木星の縞模様は息をのむほど美しかった。ガイドの説明を聞きながら、春野はすっかり時間を忘れていた。

日常の喧騒から離れ、宇宙の神秘に触れる体験。思いがけない偶然から始まった新しい興味は、春野の週末に小さな冒険をもたらし始めていた。`,
    activityHint: '天体観測'
  }
];

const BridgeStory: React.FC<BridgeStoryProps> = ({ userProfile, onComplete }) => {
  // 実際のアプリでは、ユーザープロフィールに基づいてストーリーを選択します
  const [story] = useState<Story>(() => {
    const randomIndex = Math.floor(Math.random() * sampleStories.length);
    return sampleStories[randomIndex];
  });
  
  const [isReading, setIsReading] = useState(true);

  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <Card className="p-6 shadow-lg rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50">
        {isReading ? (
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
                「{story.title}」のように、思いがけない体験が新しい扉を開くことがあります。
              </p>
              <p className="text-sm font-medium">
                日常から一歩踏み出し、新しい体験に触れてみませんか？あなたにぴったりのアクティビティを探してみましょう。
              </p>
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
