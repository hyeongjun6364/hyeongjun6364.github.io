// components/mypage/WhenToMeet.tsx

const WhenToMeet = (): JSX.Element => {
  // Dummy data for growth WhenToMeetDay or annual learning
  const WhenToMeetDays = [
    {
      date: "2023-01-15",
      activity: "Completed React course",
      category: "React",
    },
    {
      date: "2023-02-10",
      activity: "Started learning Node.js",
      category: "Node.js",
    },
    // Add more growth WhenToMeetDay entries here
  ];

  return (
    <div>
      <h2>스터디 언제 만날까?</h2>
      <ul>
        {WhenToMeetDays.map((WhenToMeetDay, index) => (
          <li key={index}>
            <strong>시간:</strong> {WhenToMeetDay.date} <br />
            <strong>활동:</strong> {WhenToMeetDay.activity} <br />
            <strong>카테고리:</strong> {WhenToMeetDay.category} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhenToMeet;
