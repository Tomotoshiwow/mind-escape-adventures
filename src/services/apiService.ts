
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const fetchGptResponse = async (prompt: string): Promise<string> => {
  try {
    // Supabase Edge Functionを使用してOpenAI APIを呼び出す
    const { data, error } = await supabase.functions.invoke('chatgpt', {
      body: { prompt }
    });

    if (error) {
      console.error("Edge Function error:", error);
      throw new Error(`Edge Function error: ${error.message}`);
    }

    if (!data || !data.content) {
      throw new Error("応答データが正常ではありません");
    }

    return data.content;
  } catch (error) {
    console.error("API request error:", error);
    toast.error("サーバー接続エラー: 時間をおいてお試しください");
    return "エラーが発生しました。時間をおいてお試しください。";
  }
};
