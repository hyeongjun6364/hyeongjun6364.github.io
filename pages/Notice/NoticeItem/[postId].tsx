import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "@emotion/styled";
import Post from "../../../src/components/units/noticecomponent/post";
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
`;

const NoticeItem: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //실제 서버
  //http://localhost:8080/api/v1/posts/1
  //무료 api서버
  //https://jsonplaceholder.typicode.com/posts/${postId}
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        const data: Post = response.data;
        setPost(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Error fetching post data.");
        setLoading(false);
      }
    }

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleBackToList = (): void => {
    void router.push("/Notice");
  };

  return (
    <Container>
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : error ? (
        <Error>{error}</Error>
      ) : (
        <div>
          <Title>{post?.title}</Title>
          <AdminInfo>
            <span>작성자: {post?.userId}</span>
            {/* <span>{new Date(post?.date).toLocaleDateString()}</span> */}
          </AdminInfo>
          <Content>{post?.body}</Content>
        </div>
      )}

      <BackButton onClick={handleBackToList}>목록으로</BackButton>
    </Container>
  );
};

export default NoticeItem;
