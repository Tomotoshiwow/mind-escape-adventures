
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
  
  return fetchGptResponse(prompt);
};
