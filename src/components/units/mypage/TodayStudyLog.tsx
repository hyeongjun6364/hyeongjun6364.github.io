// const TodayStudyLog = () => {
//   const StudyLogs = [
//     {
//       id: 1,
//       enter: "August 6th 5pm",
//       exit: "August 7th 7pm",
//       hour: "2",
//       min: "12",
//     },
//     {
//       id: 2,
//       enter: "August 6th 5pm",
//       exit: "August 7th 7pm",
//       hour: "1",
//       min: "30",
//     },
//   ];
//   return (
//     <>
//       <h3>오늘 활동 시간</h3>
//       <ul>
//         {StudyLogs.map((StudyLog) => (
//           <li key={StudyLog.id}>
//             {StudyLog.hour} 시간 {StudyLog.min} 분
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// export default TodayStudyLog;

// import React, { useEffect, useState } from "react";

// const TodayStudyLog = () => {
//   const [lastLogoutTime, setLastLogoutTime] = useState(null);
//   const [studyLogs, setStudyLogs] = useState([]);

//   const calculateAndSaveActivityTime = (lastLogoutTime) => {
//     const currentTime = new Date();
//     const timeDifference = currentTime - lastLogoutTime;
//     const hours = Math.floor(timeDifference / 3600000);
//     const minutes = Math.floor((timeDifference % 3600000) / 60000);
//     const seconds = Math.floor((timeDifference % 60000) / 1000);

//     const newStudyLog = {
//       id: studyLogs.length + 1,
//       enter: lastLogoutTime.toLocaleString(),
//       exit: currentTime.toLocaleString(),
//       hour: hours.toString(),
//       min: minutes.toString(),
//       sec: seconds.toString(),
//     };

//     setStudyLogs((prevLogs) => [...prevLogs, newStudyLog]);
//     localStorage.setItem(
//       "studyLogs",
//       JSON.stringify([...studyLogs, newStudyLog])
//     );
//   };

//   useEffect(() => {
//     const storedLastLogoutTime = localStorage.getItem("lastLogoutTime");
//     if (storedLastLogoutTime) {
//       setLastLogoutTime(new Date(storedLastLogoutTime));
//     }

//     const storedStudyLogs = localStorage.getItem("studyLogs");
//     if (storedStudyLogs) {
//       setStudyLogs(JSON.parse(storedStudyLogs));
//     }

//     return () => {
//       if (lastLogoutTime) {
//         calculateAndSaveActivityTime(lastLogoutTime);
//         localStorage.setItem("lastLogoutTime", new Date().toISOString());
//         setLastLogoutTime(null);
//       }
//     };
//   }, []);

//   return (
//     <>
//       <h3>Today's activity time</h3>
//       <ul>
//         {studyLogs.map((studyLog) => (
//           <li key={studyLog.id}>
//             {studyLog.enter} - {studyLog.exit}: {studyLog.hour} hours{" "}
//             {studyLog.min} minutes {studyLog.sec} seconds
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// export default TodayStudyLog;

import React, { useEffect, useState } from "react";
import axios from "axios";

const TodayStudyLog = () => {
  const [lastLogoutTime, setLastLogoutTime] = useState(null);
  const [studyLogs, setStudyLogs] = useState([]);

  const calculateAndSaveActivityTime = async (logoutTime: any) => {
    const currentTime = new Date();
    // const timeDifference = currentTime - logoutTime;
    // const hours = Math.floor(timeDifference / 3600000);
    // const minutes = Math.floor((timeDifference % 3600000) / 60000);
    // const seconds = Math.floor((timeDifference % 60000) / 1000);

    const newStudyLog = {
      id: studyLogs.length + 1,
      enter: logoutTime.toLocaleString(),
      exit: currentTime.toLocaleString(),
      // hour: hours.toString(),
      // min: minutes.toString(),
      // sec: seconds.toString(),
    };

    try {
      // Send log data to the backend
      const userId = 1; // Replace with the logged-in user's ID
      await axios.post("/api/activity-log", {
        userId,
        loginTime: logoutTime,
        logoutTime: currentTime,
      });

      // Save the new study log to local storage
      localStorage.setItem(
        "studyLogs",
        JSON.stringify([...studyLogs, newStudyLog])
      );

      // Update the studyLogs state with the new log
      // setStudyLogs((prevLogs) => [...prevLogs, newStudyLog]);
    } catch (error) {
      console.error("Error recording activity log:", error);
    }
  };

  useEffect(() => {
    const storedLastLogoutTime = localStorage.getItem("lastLogoutTime");
    if (storedLastLogoutTime) {
      // setLastLogoutTime(new Date(storedLastLogoutTime));
    }

    const storedStudyLogs = localStorage.getItem("studyLogs");
    if (storedStudyLogs) {
      setStudyLogs(JSON.parse(storedStudyLogs));
    }

    return () => {
      if (lastLogoutTime) {
        calculateAndSaveActivityTime(lastLogoutTime);

        // Update the last logout time in local storage
        localStorage.setItem("lastLogoutTime", new Date().toISOString());
      }
    };
  }, [lastLogoutTime]);

  return (
    <>
      <h3>오늘 활동 시간</h3>
      <ul>
        {/* {studyLogs.map((studyLog) => (
          <li key={studyLog.id}>
            {studyLog.enter} - {studyLog.exit}: {studyLog.hour} hours{" "}
            {studyLog.min} minutes {studyLog.sec} seconds
          </li>
        ))} */}
      </ul>
    </>
  );
};

export default TodayStudyLog;
