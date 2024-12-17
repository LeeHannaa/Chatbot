<script setup lang="ts">
import { ref } from "vue";
import { ChatList } from "../types/openai";

const conversation = ref<Array<string>>([]); // 대화를 담을 배열
const prompt = ref(""); // 서버에 넘겨줄 질문

async function quest() {
  // 질문시작
  const question = prompt.value; // 질문값을 저장
  conversation.value.push(question); // 대화리스트에 push
  prompt.value = ""; // textarea초기화
  try {
    const response = await fetch("/api/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: question }), // body를 JSON 형식으로 전송
    });

    // 응답을 JSON으로 변환
    const data = await response.json();

    // 값이 전달됐다면 배열에 push
    if (data?.result) {
      conversation.value.push(data.result);
    }
  } catch (err) {
    // 실패시
    alert("실패!");
    console.log(err);
  }
}
</script>

<template>
  <div style="text-align: center">
    <textarea v-model="prompt" style="width: 70%">prompt</textarea>
    <button type="button" @click="quest()">질문</button>
    <p v-for="(list, index) in conversation" :key="index">
      {{ list }}
    </p>
  </div>
</template>
