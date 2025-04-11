
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";

// CORSヘッダーを設定
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // OPTIONSリクエスト（CORS preflight）に対応
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // リクエストボディからプロンプトを取得
    const { prompt } = await req.json();
    
    if (!prompt) {
      throw new Error("プロンプトが指定されていません");
    }

    console.log("リクエスト受信:", prompt.substring(0, 50) + "...");

    // OpenAI APIにリクエスト
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
      const error = await response.text();
      console.error("OpenAI API エラー:", error);
      throw new Error(`OpenAI API エラー: ${response.status} ${response.statusText}`);
    }

    // レスポンスをJSON形式で返す
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "回答が取得できませんでした。";
    console.log("応答成功:", content.substring(0, 50) + "...");

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("エラー発生:", error);
    return new Response(
      JSON.stringify({
        error: error.message,
        content: "エラーが発生しました。時間をおいてお試しください。"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
