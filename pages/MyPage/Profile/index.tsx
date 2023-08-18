// pages/MyPage/Profile/index.tsx
import React, { useState } from "react";
import MyPageLayout from "../../../src/components/units/mypage/MyPageLayout";
import styled from "@emotion/styled";

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  const ProfileCF = styled.div`
    display: flex;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    /* 위에는 기본 박스 설정 */
    flex-basis: calc(50% - 10px);
    min-height: 150px;
    border-top: 3px solid #5eb6f6;
    /* padding: 20px; */
    background-color: white;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    transition: box-shadow 0.3s ease;
    justify-content: center;

    flex-direction: column;
    align-items: center;

    &:hover {
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
  `;

  const handleProfilePictureChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = () => {
    // Simulate password change
    if (newPassword === confirmPassword) {
      setPasswordChangeSuccess(true);
    } else {
      setPasswordChangeSuccess(false);
    }
  };

  return (
    <MyPageLayout>
      <ProfileCF>
        <h3>프로필사진 바꾸기</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
        />
        {profilePicture && <img src={profilePicture} alt="Profile" />}
      </ProfileCF>
      <ProfileCF>
        <h3>비밀번호 변경</h3>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handlePasswordChange}>비밀번호 변경</button>
        {passwordChangeSuccess && <p>비밀번호가 성공적으로 변경되었습니다.</p>}
        {!passwordChangeSuccess && confirmPassword && (
          <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다</p>
        )}
      </ProfileCF>
    </MyPageLayout>
  );
};

export default Profile;
