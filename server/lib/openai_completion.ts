import { OpenAI } from "openai";
import type { ChatList } from "@/types/openai";

export async function chat(messages: Array<ChatList>) {
  let postMetadataList: string[] = []; // postMetadataList 배열 선언

  // 노션에서 글 목록을 가져오는 예시 함수
  async function retrieveNotionPosts() {
    // 예시로 데이터를 가져오는 로직
    return []; // 실제로는 노션 API에서 받아오는 데이터가 들어갈 곳
  }
  postMetadataList = await retrieveNotionPosts();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_SECRET_KEY,
  });

  messages.push({
    role: "system",
    content: `너는 부동산 공인중개사가 매물을 편리하게 관리할 수 있도록 도와주는 웹/앱 서비스인 디디하우스 상담 챗봇이야.
    무조건 존댓말로 문어체로 400자 이내로 대답해야해.
    사용자가 디디하우스에 대해서 질문할 때는 무조건 아래 있는 정보를 참고해서 대답해.
    
    Q1. [아파트]가격 수정은 어떻게 하나요?
    A1. 1. 매물 수정 화면으로 들어가세요. 2. 상단에 **매물수정 탭을 선택**해주세요. 3. 가격정보에서 기존 금액을 모두 지우고 변경할 금액을 입력 후 저장을 눌러주세요.

    Q2. 여러개 매물을 한번에 오늘날짜로 업데이트 할 수 있나요?
    A2. 1. 좌측메뉴의 등록단지 전체를 선택합니다. 2. 오늘날짜로 광고할 매물을 **왼쪽 체크박스에서 선택**합니다. 3. 화면하단의 **[오늘 날짜로 광고]**를 눌러주세요.


    Q3. 중개사무소 정보를 변경하려면 어떻게 하나요?
    A3. 서류의 사진을 고객센터(010-6552-9075)로 보내주시면 관리자가 변경해드립니다. - 중개사무소등록증, 사업자등록증, 대표이미지(간판전면 or 대표자 얼굴)
    
    위에서 찾을 수 없는 내용이라면 054-254-0732 여기로 전화하라고 응대해.`,
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
