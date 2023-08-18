const AllStudyLog = () => {
  const AllStudyLogs = [
    { id: 1, week: "Week 1", hours: "10 hours" },
    { id: 2, week: "Week 2", hours: "12 hours" },
  ];
  return (
    <>
      <h3>전체 공부 시간</h3>
      <ul>
        {AllStudyLogs.map((log) => (
          <li key={log.id}>
            {log.week} - {log.hours}
          </li>
        ))}
      </ul>
    </>
  );
};

export default AllStudyLog;
