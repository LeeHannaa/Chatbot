import { OpenAI } from "openai";
import type { ChatList } from "@/types/openai";

export async function chat(messages: Array<ChatList>) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_SECRET_KEY,
  });

  messages.push({
    role: "system",
    content: "너는 포항 부동산 서비스인 DDHOUSE의 상담 챗봇이야.",
  });
  const completion = await openai.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      messages: messages,
    })
    .catch((err) => {
      console.log(err);
    });

  if (completion) {
    console.log("답변종료 : " + JSON.stringify(completion.choices[0]));
    return Promise.resolve(completion.choices[0].message);
  }
}
