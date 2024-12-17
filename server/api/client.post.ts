import { chat } from "../lib/openai_completion";
import type { ChatList } from "@/types/openai";

const messages: Array<ChatList> = [];

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (body.prompt) {
    console.log("질문내용 : " + body.prompt);
    messages.push({ role: "user", content: body.prompt });

    const answer = await chat(messages);
    if (answer) {
      if (answer.content) {
        messages.push({
          role: answer.role,
          content: answer.content,
        });
      }
      return {
        result: answer.content,
      };
    }
  } else {
    throw createError({
      statusCode: 400,
      statusMessage: "질문이 입력되지 않았습니다.",
    });
  }
});
