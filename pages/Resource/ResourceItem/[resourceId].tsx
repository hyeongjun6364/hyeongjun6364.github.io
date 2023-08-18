import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "@emotion/styled";
import Resource from "../../../src/components/units/resource";
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

const ResourceItem: React.FC = () => {
  const router = useRouter();
  const { ResourceId } = router.query;
  const [post, setPost] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${ResourceId}`
        );
        const data: Resource = response.data;
        setPost(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Error fetching post data.");
        setLoading(false);
      }
    }

    if (ResourceId) {
      fetchPost();
    }
  }, [ResourceId]);

  const handleBackToList = (): void => {
    void router.push("/Resource");
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

export default ResourceItem;
