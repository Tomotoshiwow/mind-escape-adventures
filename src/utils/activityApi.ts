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
    
    回答はJSON形式で返してください。結果は配列として返し、各アクティビティはオブジェクトにしてください。
  `;
  
  try {
    const response = await fetchGptResponse(prompt);
    console.log("API応答:", response.substring(0, 100) + "...");
    
    try {
      // JSONを抽出してパースする
      let jsonData;
      
      // 1. コードブロック内のJSONを探す
      const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/) || 
                       response.match(/```\s*([\s\S]*?)\s*```/);
      
      if (jsonMatch && jsonMatch[1]) {
        try {
          jsonData = JSON.parse(jsonMatch[1]);
        } catch (parseError) {
          console.warn("コードブロック内のJSONパースエラー:", parseError);
        }
      }
      
      // 2. レスポンス全体をJSONとしてパースしてみる
      if (!jsonData) {
        try {
          const jsonStr = response.match(/\{[\s\S]*\}/) || response.match(/\[[\s\S]*\]/);
          if (jsonStr) {
            jsonData = JSON.parse(jsonStr[0]);
          }
        } catch (parseError) {
          console.warn("レスポンス全体のJSONパースエラー:", parseError);
        }
      }
      
      // 3. どの方法でもパースできない場合はフォールバック
      if (!jsonData) {
        console.warn("JSONパースに失敗、フォールバックを使用します");
        throw new Error("JSONパースエラー");
      }
      
      // パースしたデータを活動リストに変換
      let activities: Activity[] = [];
      
      if (Array.isArray(jsonData)) {
        activities = jsonData.map(transformToActivity);
      } else if (jsonData.activities && Array.isArray(jsonData.activities)) {
        activities = jsonData.activities.map(transformToActivity);
      } else if (jsonData.type1 && Array.isArray(jsonData.type1)) {
        activities = [
          ...jsonData.type1.map(transformToActivity),
          ...((jsonData.type2 && Array.isArray(jsonData.type2)) ? jsonData.type2.map(transformToActivity) : [])
        ];
      } else {
        // 何らかの構造で返ってきた場合、キーを検索してActivityに変換
        activities = Object.values(jsonData)
          .filter(value => typeof value === 'object' && value !== null)
          .flatMap(value => {
            if (Array.isArray(value)) {
              return value.map(transformToActivity);
            } else {
              return transformToActivity(value);
            }
          });
      }
      
      if (activities.length > 0) {
        return activities;
      }
      throw new Error("No valid activities found in response");
    } catch (parseError) {
      console.error("Failed to parse activities:", parseError, response);
      throw parseError; // 下のcatchブロックでハンドリングするために再スロー
    }
  } catch (error) {
    console.error("Error generating activities:", error);
    
    // エラー時はフォールバックのアクティビティを返す
    return getFallbackActivities();
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

function getFallbackActivities(): Activity[] {
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
    },
    {
      id: `fallback-4-${Date.now()}`,
      title: "古民家でのヨガ体験",
      description: "歴史ある古民家で行うヨガ。伝統的な空間で心と体を整えます。",
      personalizedMessage: "静かな空間で心を落ち着かせましょう",
      imageUrl: getRandomImage(),
      category: "ヨガ・瞑想",
      duration: "1時間",
      price: "2,500円",
      schedule: "平日朝・週末",
      location: "世田谷区",
      bookingLink: "https://www.google.com/search?q=東京+古民家+ヨガ",
      discount: "初回体験500円オフ"
    },
    {
      id: `fallback-5-${Date.now()}`,
      title: "ガラス工芸体験",
      description: "溶けたガラスから美しい作品を作る体験。初めての方も安心のレクチャー付き。",
      personalizedMessage: "創作の喜びを味わえる新しい体験",
      imageUrl: getRandomImage(),
      category: "クラフト",
      duration: "2時間",
      price: "5,000円",
      schedule: "週末のみ",
      location: "江東区",
      bookingLink: "https://www.google.com/search?q=東京+ガラス工芸+体験",
      discount: "記念日の方にプレゼント付き"
    },
    {
      id: `fallback-6-${Date.now()}`,
      title: "森林セラピーウォーク",
      description: "専門ガイドと共に森を散策し、自然の癒し効果を体験するツアー。",
      personalizedMessage: "自然の中でリフレッシュする時間を",
      imageUrl: getRandomImage(),
      category: "アウトドア",
      duration: "半日",
      price: "3,500円",
      schedule: "週末午前",
      location: "高尾",
      bookingLink: "https://www.google.com/search?q=東京+高尾+森林セラピー",
      mapLink: "https://maps.google.com/?q=高尾+森林セラピー"
    }
  ];
}

function getRandomImage(): string {
  const randomIndex = Math.floor(Math.random() * sampleImages.length);
  return `https://images.unsplash.com/${sampleImages[randomIndex]}?auto=format&fit=crop&w=800&q=80`;
}
