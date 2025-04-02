
import { toast } from "sonner";

const API_URL = "https://fprazmjkekhiyusqifwj.supabase.co/functions/v1/chatgpt";

export const fetchGptResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.reply || "応答を生成できませんでした。";
  } catch (error) {
    console.error("API request error:", error);
    toast.error("APIリクエストに失敗しました。後でもう一度お試しください。");
    
    // フォールバックのレスポンスを返す
    return "申し訳ありませんが、現在サーバーに接続できません。ネットワーク接続を確認して、後でもう一度お試しください。\n\n現在の不安や考えから少し離れるために、深呼吸をして、周りの環境に意識を向けてみてください。目に見えるもの5つ、聞こえる音4つ、触れられるもの3つ、香り2つ、味わい1つに注目してみましょう。この簡単なエクササイズが、今この瞬間に意識を戻す助けになります。";
  }
};
