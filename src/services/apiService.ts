
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
    return "申し訳ありませんが、エラーが発生しました。後でもう一度お試しください。";
  }
};
