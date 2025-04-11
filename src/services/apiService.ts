
import { toast } from "sonner";

// OpenAI APIキーを環境変数から取得
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const fetchGptResponse = async (prompt: string): Promise<string> => {
  try {
    // OpenAI APIに直接リクエスト
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API エラー:", errorText);
      throw new Error(`OpenAI API エラー: ${response.status} ${response.statusText}`);
    }

    // レスポンスをJSONとしてパース
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "回答が取得できませんでした。";
    
    return content;
  } catch (error) {
    console.error("API request error:", error);
    toast.error("API接続エラー: 時間をおいてお試しください");
    return "エラーが発生しました。時間をおいてお試しください。";
  }
};
