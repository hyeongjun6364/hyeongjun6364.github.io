// src/components/units/study/fetchStudyGroups.tsx
import axios from "axios";

const fetchStudyGroups = async (page: number, searchQuery?: string) => {
  try {
    const response = await axios.post(
      "http://backend-practice.codebootcamp.co.kr/graphql",
      {
        query: `
              query {
                fetchUseditems(
                  isSoldout: false
                  search: "${searchQuery || ""}"
                  page: ${page}
                ) {
                  _id
                  name
                  remarks
                  contents
                  price
                  tags
                }
              }
            `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("API Response:", response.data); // API 응답 확인
    if (response.data.data) {
      const studyGroups = response.data.data.fetchUseditems;
      return studyGroups;
    }
  } catch (error) {
    console.error("Error fetching study groups:", error);
    return [];
  }
};

export default fetchStudyGroups;
