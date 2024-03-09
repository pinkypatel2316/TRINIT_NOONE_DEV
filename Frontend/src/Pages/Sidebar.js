import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  useEffect(() => {
    const loginCheck = localStorage.getItem("check");
    if (loginCheck !== "okk") {
      navigate("/");
    }
  });
  const type = localStorage.getItem("type");
  return (
    <div>
      <div
        className="sideblack"
        style={{
          height: "96vh",
          width: "50%",
          backgroundColor: "black",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          color: "white",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginLeft: "25%",
          marginTop: "2vh",
        }}
      >
        <h1
          onClick={() => navigate("/dashboard")}
          style={{
            cursor: "pointer",
            letterSpacing: "1px",
            position: "absolute",
            top: 30,
          }}
        >
          LC
        </h1>
        <i
          onClick={() => navigate("/dashboard")}
          style={{ fontSize: "23px", cursor: "pointer", marginTop: "10px" }}
          className="fa fa-home"
        ></i>
        <i
          onClick={() => navigate("/tutor/addtimeslot")}
          style={{ fontSize: "23px", cursor: "pointer" }}
          className="fa fa-calendar"
        ></i>
        <i
          onClick={() => navigate("/Allcourses")}
          style={{ fontSize: "23px", cursor: "pointer" }}
          className="fa fa-calendar-times-o"
        ></i>
        <i
          onClick={() => navigate("/Setting")}
          style={{ fontSize: "23px", cursor: "pointer" }}
          className="fa fa-language"
        ></i>
        <i
          onClick={() => {
            localStorage.removeItem("check");
            navigate("/");
          }}
          style={{ fontSize: "23px", cursor: "pointer" }}
          class="fa fa-sign-out"
        ></i>
      </div>
    </div>
  );
}

export default Sidebar;
