
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
};
