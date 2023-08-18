import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FilterTags,
  QuestionCard,
  SearchInput,
  TagButton,
  WriteQuestionButton,
  TextContainer,
  ImageContainer,
  PaginationBox,
} from "../../src/components/units/questioncomponent/QuestionRoomCSS";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";

interface Question {
  _id: string;
  name: string;
  remarks: string;
  contents: string;
  price: number;
  tags: string[];
  images: string;
}

const QuestionRoom = (): JSX.Element => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allQuestions, setAllQuestions] = useState<Question[]>([]); // 모든 질문 데이터 저장
  const [renderQuestions, setRenderQuestions] = useState<Question[]>([]); // 필터링된 질문 데이터 저장
  const itemsPerPage = 10; // 한 페이지에 보여줄 항목수
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 번호

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  //질문쓰기

  const deleteWrite = async (useditemId: string) => {
    try {
      const response = await axios.post(
        "http://backend-practice.codebootcamp.co.kr/graphql",
        {
          query: `
            mutation {
              deleteUseditem(useditemId: "${useditemId}")
            }
          `,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data.data.deleteUseditem === useditemId) {
        // 삭제 성공 시 해당 게시글을 상태에서 제거
        setRenderQuestions((prevQuestions) =>
          prevQuestions.filter((q) => q._id !== useditemId)
        );
        alert("게시글이 성공적으로 삭제되었습니다.");
      }
    } catch {
      alert("게시글 작성자만 삭제할 수 있습니다.");
    }
  };

  useEffect(() => {
    // 초기화 시에 스터디 그룹 정보를 받아오는 함수 호출
    fetchWrite();
  }, []);

  const fetchWrite = async () => {
    try {
      const response = await axios.post(
        "http://backend-practice.codebootcamp.co.kr/graphql",
        {
          query: `
          query {
            fetchUseditems(
              isSoldout: false
              search: ""
              page: 1
            
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
      if (response.data.data) {
        const QuestionList = response.data.data.fetchUseditems; // fetchUseditems에서 데이터를 가져옴

        setRenderQuestions(QuestionList);
        setAllQuestions(QuestionList);
      }
    } catch (error) {
      console.error("Error fetching study groups:", error);
    }
  };

  const uniqueTags = Array.from(new Set(allQuestions.flatMap((q) => q.tags)));

  const router = useRouter();

  const onClickHeader = (path: string): void => {
    void router.push(path);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag((prevTag) => (prevTag === tag ? null : tag));
  };

  useEffect(() => {
    // 검색 쿼리와 선택된 태그에 따라 필터링하여 렌더할 질문 데이터 업데이트
    //let filtered = allQuestions;
    let filtered = allQuestions.filter((q) => q.tags.includes("study"));
    if (selectedTag) {
      filtered = filtered.filter((q) => q.tags.includes(selectedTag));
    }

    if (searchQuery) {
      filtered = filtered.filter((q) =>
        q.remarks.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setRenderQuestions(filtered);
  }, [searchQuery, selectedTag, allQuestions]);

  // 현재 페이지에 해당하는 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRenderStudy = renderQuestions.slice(startIndex, endIndex);
  const handlePostClick = (postId: number): void => {
    void router.push(`/QuestionRoom/QuestionItem?postId=${postId}`);
  };

  return (
    <div>
      {/* FilterTags, SearchInput, WriteQuestionButton */}
      <FilterTags>
        {uniqueTags.map((tag) => (
          <TagButton
            key={tag}
            active={selectedTag === tag}
            onClick={() => handleTagClick(tag)}
          >
            #{tag}
          </TagButton>
        ))}
      </FilterTags>

      <div style={{ display: "flex", alignItems: "center" }}>
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions..."
        />
        <WriteQuestionButton
          onClick={() => {
            onClickHeader("/QnaWrite");
          }}
        >
          Write a Question
        </WriteQuestionButton>
      </div>

      <div>
        {currentRenderStudy.map((question) => (
          <QuestionCard
            key={question._id}
            onClick={() => handlePostClick(Number(question._id))}
          >
            )
            <TextContainer>
              <h3>{question.remarks}</h3>
              <p>{question.contents}</p>
              <br />

              <p>작성자: {question.name}</p>

              <WriteQuestionButton onClick={() => deleteWrite(question._id)}>
                게시글 삭제
              </WriteQuestionButton>
              <WriteQuestionButton>댓글달기</WriteQuestionButton>
            </TextContainer>
            <ImageContainer>
              <img
                src={question.images}
                alt="Thumbnail"
                width="100" // 이미지 크기 조절
                height="100"
                loading="lazy" // 지연 로딩 설정
              />
            </ImageContainer>
          </QuestionCard>
        ))}
      </div>

      <PaginationBox>
        <Pagination
          //현재 보고 있는 페이지
          activePage={currentPage}
          //한 페이지에 출력할 아이템 수
          itemsCountPerPage={10}
          //총 아이템 수
          totalItemsCount={renderQuestions.length}
          //표시할 페이지 수
          pageRangeDisplayed={10}
          //함수
          onChange={handlePageChange}
        ></Pagination>
      </PaginationBox>
    </div>
  );
};

export default QuestionRoom;
