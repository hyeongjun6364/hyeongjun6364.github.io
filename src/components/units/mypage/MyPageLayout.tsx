// pages/MyPage/MyPageLayout.tsx
import { UserOutlined } from "@ant-design/icons";
import {
  MyPageWrapper,
  SidebarContainer,
  SidebarTab,
  ContentContainer,
} from "./MyPageCss";
import { useRouter } from "next/router";
import { useState } from "react";

const MyPageLayout = ({ children }: any) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("MyInfo");

  // Extract the last part of the URL path to determine the active tab
  const currentPath = router.pathname.split("/").pop();

  const handleTabClick = (tab: any) => {
    setSelectedTab(tab);
    router.push(`/MyPage/${tab}`); // Update the URL
  };

  return (
    <MyPageWrapper>
      {/* 사이드바 레이아웃 */}
      <SidebarContainer>
        <SidebarTab
          selected={currentPath === "MyPage"}
          onClick={() => handleTabClick("./")}
        >
          내 정보
        </SidebarTab>
        <SidebarTab
          selected={currentPath === "Profile"}
          onClick={() => handleTabClick("Profile")}
        >
          내 프로필
          <UserOutlined />
        </SidebarTab>
        <SidebarTab
          selected={currentPath === "MyBoard"}
          onClick={() => handleTabClick("MyBoard")}
        >
          내가 쓴 게시글
        </SidebarTab>
        <SidebarTab
          selected={currentPath === "MyComment"}
          onClick={() => handleTabClick("MyComment")}
        >
          내 댓글
        </SidebarTab>
        <SidebarTab
          selected={currentPath === "Resign"}
          onClick={() => handleTabClick("Resign")}
        >
          회원 탈퇴
        </SidebarTab>
      </SidebarContainer>
      {/* 내용 레이아웃 */}
      <ContentContainer>{children}</ContentContainer>
    </MyPageWrapper>
  );
};

export default MyPageLayout;
