export const ONBOARDING_STEPS = [
  {
    id: 1,
    title: "출생연도를 알려주세요",
    description: "나이에 맞는 도서를 추천해드릴게요",
  },
  {
    id: 2,
    title: "성별을 선택해주세요",
    description: "더 정확한 추천을 위해 필요해요",
  },
  {
    id: 3,
    title: "관심 있는 장르를 선택해주세요",
    description: "복수 선택 가능해요",
  },
  {
    id: 4,
    title: "독서 목적을 선택해주세요",
    description: "목적에 맞는 책을 추천해드릴게요",
  },
  {
    id: 5,
    title: "평소에 독서 빈도는 어떻게 되시나요?",
    description: "독서 패턴에 맞춰 추천해드릴게요",
  },
] as const;

export const TOTAL_STEPS = ONBOARDING_STEPS.length;

export const GENDER_OPTIONS = [
  { value: "남자", label: "남성" },
  { value: "여자", label: "여성" },
  { value: "기타", label: "기타" },
  { value: "선택안함", label: "선택 안 함" },
] as const;

export const READING_PURPOSE_OPTIONS = [
  { value: "취미", label: "취미", description: "재미있게 읽고 싶어요" },
  { value: "자기계발", label: "자기계발", description: "성장하고 싶어요" },
  { value: "학습", label: "학습", description: "지식을 쌓고 싶어요" },
  { value: "업무", label: "업무", description: "업무에 도움이 되었으면 해요" },
  { value: "힐링", label: "힐링", description: "마음의 평안을 찾고 싶어요" },
] as const;

export const READING_FREQUENCY_OPTIONS = [
  { value: "매일", label: "매일" },
  { value: "주 2~3회", label: "주 2~3회" },
  { value: "주 1회", label: "주 1회" },
  { value: "월 1~2회", label: "월 1~2회" },
  { value: "가끔", label: "가끔" },
] as const;

export const GENRE_OPTIONS = [
  { value: "소설", label: "소설" },
  { value: "에세이", label: "에세이" },
  { value: "자기계발", label: "자기계발" },
  { value: "과학", label: "과학" },
  { value: "역사", label: "역사" },
  { value: "경제", label: "경제" },
  { value: "예술", label: "예술" },
  { value: "철학", label: "철학" },
  { value: "심리학", label: "심리학" },
  { value: "요리", label: "요리" },
  { value: "건강", label: "건강" },
  { value: "여행", label: "여행" },
] as const;
