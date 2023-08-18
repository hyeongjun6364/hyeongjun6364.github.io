// components/mypage/Challenga.tsx
import React from "react";

const Challenge = (): JSX.Element => {
  const challenges = [
    { id: 1, title: "Newcomers", content: "Go to page 3", image: "" },
    {
      id: 2,
      title: "Taecho Village",
      content: "Register and enter the Q&A room",
      image: "",
    },
  ];

  return (
    <div>
      <h3>도전과제</h3>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.id}>{challenge.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Challenge;
