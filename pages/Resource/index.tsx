import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import Post from "../../src/components/units/resource";
import { useRouter } from "next/router";
import Link from "next/link";
import Pagination from "react-js-pagination";
//자료실 페이지
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Arial", sans-serif;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  tr {
    cursor: pointer;
  }
  th,
  td {
    padding: 15px;
    border-bottom: 1px solid #eee;
    text-align: left;
  }
  th {
    font-weight: bold;
    background-color: #f2f2f2;
  }
`;

const Total = styled.div`
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  font-family: "Pretendard-Regular";
`;

//페이지 네이션 스타일
const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    margin-top: 30px;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;

const ITEMS_PER_PAGE = 10; // 페이지 당 게시물 수

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data: Post[] = response.data;
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePostClick = (postId: number): void => {
    void router.push(`/Resource/ResourceItem/${postId}`);
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지에 해당하는 게시물 배열을 반환합니다.
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredPosts.slice(startIndex, endIndex);
  };

  return (
    <Container>
      <Title>자료실</Title>
      <SearchBar
        type="text"
        placeholder="제목 검색"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // 검색어가 변경되면 첫 페이지로 리셋
        }}
      />
      <Total>총 {filteredPosts.length}개</Total>
      <Table>
        <thead>
          <tr>
            <th>NO</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentPageItems().map((post) => (
            <tr key={post.id} onClick={() => handlePostClick(post.id)}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.userId}</td>
              {/* <td>{new Date(post.date).toLocaleDateString()}</td> */}
            </tr>
          ))}
        </tbody>
      </Table>
      {/*페이지네이션 기능 */}
      <PaginationBox>
        <Pagination
          //현재 보고 있는 페이지
          activePage={currentPage}
          //한 페이지에 출력할 아이템 수
          itemsCountPerPage={10}
          //총 아이템 수
          totalItemsCount={filteredPosts.length}
          //표시할 페이지 수
          pageRangeDisplayed={10}
          //함수
          onChange={handlePageChange}
        ></Pagination>
      </PaginationBox>
    </Container>
  );
};

export default Home;
