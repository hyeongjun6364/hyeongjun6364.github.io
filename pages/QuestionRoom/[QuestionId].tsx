import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "@emotion/styled";
import { Useditem2 } from "../../src/components/units/questioncomponent/exampleData";
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Pretendard-Regular", sans-serif;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const AdminInfo = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  opacity: 0.8;
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 1.6;
`;

const LoadingMessage = styled.p`
  font-size: 18px;
`;

const Error = styled.p`
  font-size: 18px;
  color: red;
`;

const BackButton = styled.button`
  background-color: #2d9cdb;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
`;
const ReWrite = styled.button`
  background-color: #2d9cdb;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
const QuestionItem: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [question, setQuestion] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuestion = async () => {
    try {
      if (!postId) {
        return; // Exit if postId is not available yet
      }

      const response = await axios.post(
        "http://backend-practice.codebootcamp.co.kr/graphql",
        {
          query: `
            query FetchQuestion($postId: ID!) {
              fetchUseditem(useditemId: $postId) {
                _id
                name
                remarks
                contents
                price
                tags
              }
            }
          `,
          variables: {
            postId: postId,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.data) {
        const fetchedQuestion = response.data.data.fetchUseditem;
        setQuestion(fetchedQuestion);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
      setError("Error fetching question data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [postId]);

  const handleBackToList = (): void => {
    void router.push("/QuestionRoom");
  };

  return (
    <Container>
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : error ? (
        <Error>{error}</Error>
      ) : (
        <div>
          <Title>{question?.remarks}</Title>
          <AdminInfo>
            <span>작성자: {question?.name}</span>
            {/* <span>{new Date(question?.date).toLocaleDateString()}</span> */}
          </AdminInfo>
          <Content>{question?.contents}</Content>
        </div>
      )}

      <ButtonContainer>
        <ReWrite>댓글달기</ReWrite>
        <BackButton onClick={handleBackToList}>목록으로</BackButton>
      </ButtonContainer>
    </Container>
  );
};

export default QuestionItem;
