
import { fetchGptResponse } from "@/services/apiService";
import { UserProfile } from "@/types";

export const generateBridgeStory = async (
  userProfile: UserProfile
): Promise<{ title: string, content: string, activityHint: string }> => {
  const likes = userProfile.likes.map(like => like.name).join(", ");
  const dislikes = userProfile.dislikes.map(dislike => dislike.name).join(", ");
  const thoughtTypes = userProfile.negativeThoughtType.join(", ");
  
  const prompt = `
    以下のユーザープロフィールに基づいて、1ページで読める短い物語を創作してください:
    
    MBTI: ${userProfile.mbti || "不明"}
    好きなもの: ${likes}
    苦手なもの: ${dislikes}
    ネガティブ思考のタイプ: ${thoughtTypes}
    
    物語の要件:
    1. ストーリーは「日常から一歩踏み出して新しい体験に触れる」をテーマにしてください
    2. 主人公が最初は躊躇しながらも、新しい体験に踏み出す様子を描いてください
    3. 物語は明るい雰囲気で終わり、読者が「私も何か新しいことを試してみたい」と思うような終わり方にしてください
    4. タイトルと本文と、このストーリーから連想される「アクティビティのヒント」を1つ教えてください
    
    回答は以下の形式で返してください:
    タイトル: [物語のタイトル]
    本文: [物語の本文]
    アクティビティのヒント: [このストーリーから連想されるアクティビティの種類]
  `;
  
  try {
    const response = await fetchGptResponse(prompt);
    
    try {
      // 結果をパースしてみる
      const titleMatch = response.match(/タイトル:\s*(.*)/);
      const contentMatch = response.match(/本文:\s*([\s\S]*?)(?=アクティビティのヒント:|$)/);
      const hintMatch = response.match(/アクティビティのヒント:\s*(.*)/);
      
      return {
        title: titleMatch ? titleMatch[1].trim() : "偶然の一歩",
        content: contentMatch ? contentMatch[1].trim() : response,
        activityHint: hintMatch ? hintMatch[1].trim() : "創作活動"
      };
    } catch (error) {
      console.error("Failed to parse bridge story:", error);
      return {
        title: "偶然の一歩",
        content: response,
        activityHint: "創作活動"
      };
    }
  } catch (error) {
    console.error("Error generating bridge story:", error);
    // フォールバックのストーリー
    return {
      title: "偶然の一歩",
      content: `「もう、やめておこうかな」\n\n朝比奈は、スマホの画面を眺めながらそうつぶやいた。職場の同僚から誘われたワークショップ。普段なら断っていたはずだが、先週の飲み会で流れで「行ってみようかな」と言ってしまったのだ。\n\n今朝になって、急に不安がこみ上げてきた。知らない人ばかりの中に飛び込むのは苦手だ。いつも通り家で過ごした方が安全だし、心地いい。そう思って、キャンセルのメッセージを打とうとした瞬間、電話が鳴った。\n\n「やあ、朝比奈。今日のこと、やっぱり気が進まないかな？」\n\n同僚の声だった。\n\n「うん...正直...」\n\n「わかるよ。僕も最初は行きたくなかったんだ。でも、思い切って行ってみたら、全然想像と違ったんだよね。もし居心地悪かったら、こっそり抜け出してもいいしさ。とりあえず、入り口まで来てみない？」\n\n朝比奈は深呼吸をした。たった2時間。そう考えれば、試してみる価値はあるかもしれない。\n\n「...わかった、行ってみる」\n\n会場に着くと、意外にもリラックスした雰囲気だった。緊張しながらも、朝比奈は部屋の隅に座った。ワークショップが始まり、粘土に触れるよう指示があった。\n\n冷たく、少し湿った粘土の感触。指の間をすり抜けていく感覚に、朝比奈は少しずつ意識を集中させていった。頭の中の声が静かになっていくのを感じる。思考のループから解放されていく心地よさ。\n\n「こんな感覚、久しぶりかも...」\n\n帰り道、朝比奈は不思議な充実感を覚えていた。たった2時間の体験だったが、日々の思考の渦から離れられた貴重な時間だった。\n\nもしかしたら、たまには見知らぬ場所に足を踏み入れてみることも、悪くないのかもしれない。`,
      activityHint: "創作活動"
    };
  }
};
