import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "./BaseUrl";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import "./AddTimeslot.css";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

function AddTimeslot() {
  const [loading, setLoading] = useState(true);
  const [tutorDetails, setTutorDetails] = useState();
  const [value, setValue] = useState();
  const [language, setLanguage] = useState("");
  const [slot, setSlot] = useState(45);
  const [languageList, setLanguageList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          `http://localhost:5001/api/tutor/${localStorage.userId}`
        );
        setTutorDetails(response.data);
        setLanguage(
          response.data.languages[0][0].toUpperCase() +
            response.data.languages[0].substring(1).toLowerCase()
        );
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  function addMinutesToTime(timeString, minutesToAdd) {
    // Parse the input time string
    const [hours, minutes] = timeString.split(":").map(Number);

    // Calculate the new time
    const totalMinutes = hours * 60 + minutes + minutesToAdd;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;

    // Format the new time as "HH:mm"
    const formattedTime = `${String(newHours).padStart(2, "0")}:${String(
      newMinutes
    ).padStart(2, "0")}`;

    return formattedTime;
  }

  const getValue = async (evt) => {
    // get the date and slot entered and language and accordigly display the booked time slots
    /*
    2-2:45: german
     */
    const bookedslots = tutorDetails["bookedTimeslots"];
    Object.keys(bookedslots).forEach((lang) => {
      const lan = bookedslots[lang];
      const sll = Number(slot);
      const s = lan[slot];

      const l = s.map((sl) => {
        if (sl.startDay == `${evt.$D}/${evt.$M}/${evt.$y}`)
          return `${sl.from}-${addMinutesToTime(sl.from, sll)}: ${lang}`;
      });

      setLanguageList(l);
    });
  };

  const addslot = () => {
    //
  };
  return (
    <div className="Add-ts">
      <div style={{ height: "100vh", width: "100%", display: "flex" }}>
        <div
          className="all-course-side"
          style={{ width: "15%", height: "100vh", backgroundColor: "purple" }}
        >
          <Sidebar />
        </div>
        {loading ? (
          <div>Loading</div>
        ) : (
          <div
            className="add-right"
            style={{
              height: "100vh",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              paddingTop: "2rem",
              backgroundColor: "#f6e0ff",
            }}
          >
            <div
              className="add-right-main"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              <div
                className="add-input-box"
                style={{
                  // backgroundColor: "yellow",
                  width: "80%",
                  margin: "auto",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", width: "100%", gap: "1rem" }}>
                  <div style={{ fontWeight: "500", fontSize: "1.2rem" }}>
                    Language
                  </div>
                  <select
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{
                      height: 40,
                      width: "30%",
                      border: "1px solid grey",
                    }}
                  >
                    {tutorDetails.languages.map((i, key) => (
                      <option key={key} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: "flex", width: "100%", gap: "1rem" }}>
                  <div style={{ fontWeight: "500", fontSize: "1.2rem" }}>
                    Slot
                  </div>
                  <select
                    onChange={(e) => setSlot(e.target.value)}
                    style={{
                      height: 40,
                      width: "20%",
                      border: "1px solid grey",
                    }}
                  >
                    {[45, 60, 90].map((i, key) => (
                      <option key={key} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: "flex", width: "100%", gap: "1rem" }}>
                  <div style={{ fontWeight: "500", fontSize: "1.2rem" }}>
                    Course Duration: 30 days
                  </div>
                </div>
              </div>

              <div
                className="add-input-box"
                style={{
                  // backgroundColor: "yellow",
                  width: "80%",
                  margin: "auto",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    // flexDirection: "colum",
                    height: "100%",
                    justifyContent: "space-between",
                    // background: "red",
                    // paddingBottom: "2rem",
                  }}
                >
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="en-gb"
                  >
                    <DemoContainer
                      components={["DateTimePicker", "DateTimePicker"]}
                    >
                      <DemoItem label="">
                        <StaticDateTimePicker
                          ampm={false}
                          defaultValue={dayjs("2024-04-17T15:30")}
                          onChange={getValue}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                  <ul
                    style={{ width: "50%" }}
                    className="list-group"
                    display={languageList.length == 0 ? "none" : "block"}
                  >
                    {languageList[0] != null &&
                      languageList.map((ele, index) => (
                        <li className="list-group-item" key={index}>
                          {ele}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div
                className="add-input-box"
                style={{
                  // backgroundColor: "yellow",
                  width: "80%",
                  margin: "auto",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "3rem",
                }}
              >
                <button
                  style={{
                    minHeight: 40,
                    width: "fit-content",
                    borderRadius: 5,
                    color: "white",
                    backgroundColor: "black",
                    border: "none",
                    padding: "0 1rem",
                  }}
                  onClick={() => {
                    addslot();
                  }}
                >
                  Add TimeSlot
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddTimeslot;
