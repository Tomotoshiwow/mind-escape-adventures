
import { fetchGptResponse } from "@/services/apiService";
import { UserProfile } from "@/types";

export const generateMindfulnessPrompt = async (
  userProfile: UserProfile,
  detailedSituation: string
): Promise<string> => {
  const thoughtTypes = userProfile.negativeThoughtType.join(", ");
  const userThoughts = userProfile.negativeThoughts || "";
  
  // Combine user profile info with their current detailed situation
  const prompt = `
    私は以下のような悩みを持っています:
    
    状況の詳細: ${detailedSituation}
    ネガティブ思考の傾向: ${thoughtTypes}
    普段考えていること: ${userThoughts}
    MBTI: ${userProfile.mbti || "不明"}
    
    私の悩みに対して、以下の2つの異なるアプローチからアドバイスを提供してください:
    
    1. 現代に降臨したブッダのように、悩みの感情を鎮める上でリアルタイムに実践可能で効果的、かつできる限り具体的で臨場感の湧くアドバイス。例えば五感に集中するなど仏教思想の本質を活用したものであり、かつできる限り意外性と新鮮さを与えるもので、身近な人がリアルタイムに語り掛けるような口調でお願いします。
    
    2. 精神科医および心理士の立場から、悩みの感情を鎮める上でリアルタイムに実践可能で効果的、かつできる限り具体的で臨場感の湧くアドバイス。科学的見地に基づく信頼感を与えるもので、身近な人がリアルタイムに語り掛けるような口調でお願いします。
    
    両方のアドバイスを一つの回答にまとめて、自然につながるようにしてください。
  `;
  
  try {
    return await fetchGptResponse(prompt);
  } catch (error) {
    console.error("Error generating mindfulness prompt:", error);
    // フォールバックのレスポンスを返す
    return `
    呼吸に意識を向けてみましょう。今この瞬間、あなたの呼吸はどうなっていますか？深く息を吸って...そしてゆっくりと吐き出してください。

    不安や完璧主義の思考に捉われているとき、私たちの心は過去や未来に囚われがちです。今この瞬間に立ち返ることで、その循環から抜け出す第一歩になります。あなたの周りにある小さな美しさに気づくことから始めましょう。

    科学的にも、マインドフルネスの実践は扁桃体の活動を抑え、前頭前皮質の活動を高めることで、感情のコントロールを助けることがわかっています。特に${userProfile.mbti || "あなた"}タイプの方は、内省的な性質を活かして、この気づきの練習が効果的です。

    今日は一歩ずつ、あなた自身のペースで進んでいきましょう。完璧を求めず、ただ「気づく」ことから始めるのです。
    `;
  }
};
