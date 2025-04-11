
import { toast } from "sonner";

const API_URL = "https://api.openai.com/v1/chat/completions";

export const fetchGptResponse = async (prompt: string): Promise<string> => {
try {
const response = await fetch(API_URL, {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}` // 環境変数に入れる
},
body: JSON.stringify({
model: "gpt-3.5-turbo",
messages: [{ role: "user", content: prompt }]
})
});

if (!response.ok) {
throw new Error(`API request failed with status ${response.status}`);
}

const data = await response.json();
return data.choices?.[0]?.message?.content || "回答が取得できませんでした。";
} catch (error) {
console.error("API request error:", error);
return "エラーが発生しました。時間をおいてお試しください。";
}
};

