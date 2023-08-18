// pages/Study/index.tsx
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import {
  FilterTags,
  PageContainer,
  TagButton,
  StudyComponent,
  StudyWrapper,
  GroupButton,
  StudySerach,
} from "../../src/components/units/studycomponent/StudyCSS";
import { useRouter } from "next/router";
import { IUseditem } from "../../src/commons/types/generated/types";
import fetchStudyGroups from "../../src/components/units/study/fetchStudyGroups";
import { boardIdState } from "../../src/components/commons/recoilState";
import { useRecoilValue } from "recoil";

const StudyRoom = (): JSX.Element => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [renderStudy, setRenderStudy] = useState<IUseditem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [maxCounts, setMaxCounts] = useState<Record<string, number>>({});
  const [joinedGroups, setJoinedGroups] = useState<
    Record<string, { title: string; writer: string }>
  >({});

  const [groupCounts, setGroupCounts] = useState<
    Record<string, { title: number; writer: number }>
  >({});
  const [boardData, setBoardData] = useState<
    { title: string; writer: string }[]
  >([]);

  const boardId = useRecoilValue(boardIdState);

  const PASSWORD = "Solver_StudyCount";

  const router = useRouter();

  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const TAGS_CACHE_KEY = "studyTags";

  useEffect(() => {
    localStorage.setItem(TAGS_CACHE_KEY, JSON.stringify(selectedTags));
    fetchData(1);
  }, [selectedTags, searchQuery]);

  const fetchMaxCount = async (useditemId: string): Promise<number> => {
    try {
      const response = await axios.post(
        "http://backend-practice.codebootcamp.co.kr/graphql",
        {
          query: `
            query($boardId: ID!) {
              fetchBoard(boardId: $boardId) {
                _id
                title
                writer
              }
            }
          `,
          variables: {
            boardId: useditemId,
          },
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const targetGroup = response.data.data.fetchBoard;
      return parseInt(targetGroup.writer);
    } catch (error) {
      console.error("보드 정보 가져오기 오류:", error);
      return 0;
    }
  };

  useEffect(() => {
    const newMaxCounts: Record<string, number> = {};

    renderStudy.forEach(async (group) => {
      newMaxCounts[group._id] = await fetchMaxCount(group._id); // async/await 사용 및 수정된 코드
    });

    setMaxCounts(newMaxCounts);
  }, [renderStudy]);

  const onSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    setRenderStudy([]);
  };

  // StudyComponent 컴포넌트 클릭 시 확장 상태를 토글하는 함수
  const toggleExpansion = (itemId: string) => {
    setExpandedItems((prevExpanded) =>
      prevExpanded.includes(itemId)
        ? prevExpanded.filter((id) => id !== itemId)
        : [...prevExpanded, itemId]
    );
  };
  // fetchBoardData 함수 생성
  const fetchBoardData = async (
    boardId: string
  ): Promise<{ boardId: string; title: string; writer: string } | null> => {
    try {
      const {
        data: { fetchBoard },
      } = await axios.post(
        "http://backend-practice.codebootcamp.co.kr/graphql",
        {
          query: `
            query($boardId: ID!) { 
              fetchBoard(
                boardId: $boardId
              ){
                _id
                writer
                title
              }
            }
          `,
          variables: { boardId },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return { boardId, title: fetchBoard.title, writer: fetchBoard.writer };
    } catch (error) {
      console.error("게시판 조회 오류:", error);
      return null;
    }
  };

  const fetchData = async (currentPage: number) => {
    try {
      const studyGroups = await fetchStudyGroups(currentPage, searchQuery);

      const newBoardData = await Promise.all(
        studyGroups.map(
          async (studyGroup: any) => await fetchBoardData(studyGroup._id)
        )
      );

      if (currentPage === 1) {
        setRenderStudy(studyGroups);
        setBoardData(newBoardData); // 게시판 정보 설정
      } else {
        setRenderStudy((prevStudy) => [...prevStudy, ...studyGroups]);
        setBoardData((prevBoardData) => [...prevBoardData, ...newBoardData]); // 기존 게시판 정보에 추가
      }

      const newJoinedGroups = studyGroups.reduce(
        (acc: any, studyGroup: any) => {
          const boardDataItem = newBoardData.find(
            (boardItem) => boardItem.boardId === studyGroup._id
          );

          const [currentCount, maxCount] = boardDataItem.title
            .split("/")
            .map((s: any) => parseInt(s));

          acc[studyGroup._id] = {
            title: currentCount,
            writer: maxCount,
          };
          return acc;
        },
        {}
      );

      setGroupCounts(newJoinedGroups);
    } catch (error) {
      console.error("Error fetching study groups:", error);
    }
  };

  const deleteStudyGroup = async (useditemId: string) => {
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
        setRenderStudy((prevQuestions) =>
          prevQuestions.filter((q) => q._id !== useditemId)
        );
        alert("게시글이 성공적으로 삭제되었습니다.");
      }
    } catch {
      alert("게시글 작성자만 삭제할 수 있습니다.");
    }
  };

  const uniqueTags = Array.from(new Set(renderStudy.flatMap((q) => q.tags)));

  const onClickTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags((prevTags) => [...prevTags, tag]);
    } else {
      setSelectedTags((prevTags) => [tag, ...prevTags.slice(0, 2)]);
    }

    setPage(1);
    setRenderStudy([]);
  };

  const filteredStudyGroups =
    selectedTags.length > 0
      ? renderStudy.filter(
          (group) => selectedTags.some((tag) => group.tags?.includes(tag)) // .some을 통해 or 검색을 함
        )
      : renderStudy;

  const loadMoreStudy = async () => {
    if (!hasMore || loadingMore) return;

    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const studyGroups = await fetchStudyGroups(nextPage);

      if (studyGroups.length > 0) {
        setRenderStudy((prevStudy) => [...prevStudy, ...studyGroups]);
        setPage(nextPage);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more study groups:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const toggleJoined = async (useditemId: string) => {
    try {
      // 이전 코드 삭제

      // 수정된 코드
      // 중복 방지를 위해 상태값을 바로 수정하지 않고 setJoinedGroups를 호출하여 수정합니다.
      if (joinedGroups.hasOwnProperty(useditemId)) {
        delete joinedGroups[useditemId];
        setJoinedGroups({ ...joinedGroups });
      } else {
        setJoinedGroups({
          ...joinedGroups,
          [useditemId]: { title: "", writer: "" },
        }); // 수정된 코드
      }
    } catch (error) {
      console.error("스터디 참가 에러 발생:", error);
      alert("스터디 참가 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <PageContainer>
      <StudyWrapper>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <GroupButton
            onClick={() => {
              router.push("/Study/CreateGroup");
            }}
            style={{ margin: "10px" }}
          >
            스터디 그룹 등록하기
          </GroupButton>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <StudySerach
            placeholder="제목이나 태그 검색"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <FilterTags>
          {uniqueTags && uniqueTags.length > 0 && (
            <FilterTags>
              {uniqueTags.map((tag: any) => (
                <TagButton
                  key={tag}
                  active={selectedTags.includes(tag)}
                  onClick={() => onClickTag(tag)}
                >
                  #{tag}
                </TagButton>
              ))}
            </FilterTags>
          )}
        </FilterTags>

        <InfiniteScroll
          pageStart={0}
          loadMore={loadMoreStudy}
          hasMore={hasMore && !loadingMore}
          useWindow={false}
          loader={<div key={0}>Loading...</div>}
        >
          {filteredStudyGroups.map((studyGroup) => (
            <StudyComponent
              key={studyGroup._id}
              onClick={() => toggleExpansion(studyGroup._id)}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <div>
                <h2>{studyGroup.remarks}</h2>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    {studyGroup.tags
                      ? studyGroup.tags.slice(0, 3).map((tag: any) =>
                          tag ? (
                            <TagButton
                              key={tag}
                              active={selectedTags.includes(tag)}
                              onClick={() => onClickTag(tag)}
                              style={{ margin: "2px" }}
                            >
                              #{tag}
                            </TagButton>
                          ) : null
                        )
                      : null}
                  </div>

                  <p>스터디 회장: {studyGroup.name}</p>
                </div>
              </div>
              {expandedItems.includes(studyGroup._id) && (
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: studyGroup.contents,
                    }}
                  />
                  <button onClick={() => toggleJoined(studyGroup._id)}>
                    {groupCounts[studyGroup._id]?.title >=
                    groupCounts[studyGroup._id]?.writer
                      ? "스터디 퇴장"
                      : "스터디 참가"}
                  </button>
                  {expandedItems.includes(studyGroup._id) && (
                    <span style={{ marginLeft: "10px" }}>
                      스터디참가: {groupCounts[studyGroup._id]?.title}/
                      {groupCounts[studyGroup._id]?.writer}
                    </span>
                  )}
                  <div style={{ paddingLeft: "91%" }}>
                    <button onClick={() => deleteStudyGroup(studyGroup._id)}>
                      게시글 삭제
                    </button>
                  </div>
                </div>
              )}
            </StudyComponent>
          ))}
        </InfiniteScroll>
      </StudyWrapper>
    </PageContainer>
  );
};

export default StudyRoom;
