
import { fetchGptResponse } from "@/services/apiService";
import { Activity, UserProfile } from "@/types";
import { sampleImages } from "./sampleImages";

export const generateActivities = async (
  userProfile: UserProfile,
  cycle: number = 1,
  likedActivities: string[] = [],
  dislikedActivities: string[] = []
): Promise<Activity[]> => {
  const likes = userProfile.likes.map(like => like.name).join(", ");
  const dislikes = userProfile.dislikes.map(dislike => dislike.name).join(", ");
  const thoughtTypes = userProfile.negativeThoughtType.join(", ");
  const location = userProfile.location || "東京";
  
  // 前のサイクルでのフィードバックを伝える
  const feedbackContext = cycle > 1 
    ? `
      前回のサイクルで、ユーザーは以下のアクティビティを気に入りました:
      ${likedActivities.join(", ")}
      
      そして、以下のアクティビティはスキップしました:
      ${dislikedActivities.join(", ")}
    `
    : "";
  
  const prompt = `
    以下のユーザープロフィールに基づいて、${cycle}回目のアクティビティ推薦をしてください:
    
    MBTI: ${userProfile.mbti || "不明"}
    好きなもの: ${likes}
    苦手なもの: ${dislikes}
    ネガティブ思考のタイプ: ${thoughtTypes}
    現在地: ${location}
    
    ${feedbackContext}
    
    2種類のアクティビティをそれぞれ3つずつ提案してください:
    
    1. ユーザーの好みと直交する（本人の好き、嫌いのベクトルから外れる）体験アクティビティで、このまま進むとユーザーの人生とは絶対に縁の無いニュートラルな体験で、少しニッチで新鮮、マイナーなものを3つ
    
    2. ユーザーが絶対に好きそうな体験で、少しニッチで新鮮、マイナーなものを3つ
    
    各アクティビティには以下の情報を含めてください:
    - タイトル
    - 簡潔な説明
    - パーソナライズされたメッセージ（ユーザーの性格や嗜好を考慮したもの）
    - カテゴリ
    - 所要時間（〜30分、1-2時間、半日、1日など）
    - 価格帯（無料、〜1000円、〜3000円、〜5000円、〜10000円など）
    - いつできるか（平日夜、週末のみ、いつでもなど）
    - 場所の特徴
    - 予約サイトのURLまたは検索キーワード
    - 可能であれば特典や割引情報
    
    回答はJSON形式で返してください。
  `;
  
  const response = await fetchGptResponse(prompt);
  
  try {
    // JSONを抽出してパースする
    const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/) || 
                      response.match(/\{[\s\S]*\}/);
    
    const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : response;
    const parsedData = JSON.parse(jsonStr);
    
    // パースしたデータを活動リストに変換
    let activities: Activity[] = [];
    
    if (Array.isArray(parsedData)) {
      activities = parsedData.map(transformToActivity);
    } else if (parsedData.activities && Array.isArray(parsedData.activities)) {
      activities = parsedData.activities.map(transformToActivity);
    } else if (parsedData.type1 && Array.isArray(parsedData.type1)) {
      activities = [
        ...parsedData.type1.map(transformToActivity),
        ...parsedData.type2.map(transformToActivity)
      ];
    } else {
      // 何らかの構造で返ってきた場合、キーを検索してActivityに変換
      activities = Object.values(parsedData)
        .filter(value => typeof value === 'object' && value !== null)
        .map(transformToActivity);
    }
    
    return activities;
  } catch (error) {
    console.error("Failed to parse activities:", error, response);
    
    // エラー時はフォールバックで3つのサンプルアクティビティを返す
    return [
      {
        id: `fallback-1-${Date.now()}`,
        title: "瞑想ワークショップ",
        description: "初心者向けの瞑想体験。心を落ち着かせる技術を学びます。",
        personalizedMessage: "ネガティブ思考から離れる時間を作りましょう",
        imageUrl: getRandomImage(),
        category: "マインドフルネス",
        duration: "1-2時間",
        price: "3,000円",
        schedule: "週末 午前",
        location: "渋谷区",
        bookingLink: "https://www.google.com/search?q=東京+瞑想+ワークショップ",
        discount: "初回参加20%オフ"
      },
      {
        id: `fallback-2-${Date.now()}`,
        title: "陶芸体験",
        description: "初めての方でも楽しめる陶芸体験。世界に一つだけの作品を作ります。",
        personalizedMessage: "手を動かして創作に没頭する時間を",
        imageUrl: getRandomImage(),
        category: "クラフト",
        duration: "2-3時間",
        price: "4,500円",
        schedule: "平日夜・週末",
        location: "新宿区",
        bookingLink: "https://www.google.com/search?q=東京+陶芸+体験",
        discount: "ペア割引あり"
      },
      {
        id: `fallback-3-${Date.now()}`,
        title: "ナイトカヤック",
        description: "夜の静かな海をカヤックで進む、幻想的な体験。初心者向けのガイド付き。",
        personalizedMessage: "自然の中で新しい視点を得られる体験",
        imageUrl: getRandomImage(),
        category: "アウトドア",
        duration: "3時間",
        price: "8,000円",
        schedule: "週末限定",
        location: "神奈川県",
        bookingLink: "https://www.google.com/search?q=東京+近郊+ナイトカヤック",
        mapLink: "https://maps.google.com/?q=神奈川県+ナイトカヤック"
      }
    ];
  }
};

function transformToActivity(data: any): Activity {
  // APIからのデータをActivityの形式に変換
  return {
    id: `activity-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    title: data.title || data.name || "アクティビティ",
    description: data.description || data.summary || "",
    personalizedMessage: data.personalizedMessage || data.message || "",
    imageUrl: getRandomImage(),
    category: data.category || "その他",
    duration: data.duration || data.time || "要確認",
    price: data.price || data.cost || "要確認",
    schedule: data.schedule || data.when || "要確認",
    location: data.location || data.place || "オンライン",
    mapLink: data.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.location || "東京")}`,
    bookingLink: data.bookingLink || data.url || `https://www.google.com/search?q=${encodeURIComponent((data.title || "") + " " + (data.location || "東京"))}`,
    discount: data.discount || data.special || ""
  };
}

function getRandomImage(): string {
  const randomIndex = Math.floor(Math.random() * sampleImages.length);
  return `https://images.unsplash.com/${sampleImages[randomIndex]}?auto=format&fit=crop&w=800&q=80`;
}
