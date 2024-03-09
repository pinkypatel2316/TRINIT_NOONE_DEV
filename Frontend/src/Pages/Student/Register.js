import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../BaseUrl";
import "./Register.css";

function TutorRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("English");

  const [validation, setValidation] = useState(false);
  const [validation2, setValidation2] = useState(false);
  const [languageList, setLanguageList] = useState([]);
  const addLanguage = () => {
    if (language !== "") {
      setValidation2(false);
      setLanguageList((old) => [...old, language]);
    } else {
      setValidation2(true);
    }
  };
  const postStudentData = () => {
    if (
      (name !== "") &
      (email !== "") &
      (password !== "") &
      (languageList.length != 0)
    ) {
      setValidation(false);
      setValidation2(false);
      const item = {
        name: name,
        email: email,
        password: password,
        languages: languageList,
        profilePhoto: "",
      };
      axios.post(baseUrl + "student", item).then(() => navigate("/"));
    } else {
      if (languageList.length === 0) setValidation2(true);
      if ((name == "") & (email == "") & (password == "")) setValidation(true);
    }
  };

  const languages = ["English", "German", "Spanish", "Korean", "French"];
  return (
    <div className="Register">
      <div className="Register-Main">
        <div className="Register-Left">
          <div
            style={{
              height: "95vh",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <label className="Register-Left-Heading">
              Student Registration
            </label>
            <div className="Register-Input-Box" style={{ marginTop: "1rem" }}>
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                value={name}
                className="Register-Input"
                style={{
                  border:
                    (validation === true) & (name === "")
                      ? "1px solid red"
                      : "1px solid grey",
                }}
              />
            </div>
            <div className="Register-Input-Box">
              <input
                className="Register-Input"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                value={email}
                style={{
                  border:
                    (validation === true) & (email === "")
                      ? "1px solid red"
                      : "1px solid grey",
                }}
              />
              <label
                className="Register-Input-Box-Invalid"
                style={{
                  display:
                    (!email.includes("@") || !email.includes(".com")) &
                    validation
                      ? "block"
                      : "none",
                }}
              >
                *Invalid Email
              </label>
            </div>
            <div className="Register-Input-Box">
              <input
                className="Register-Input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{
                  border:
                    (validation === true) & (password === "")
                      ? "1px solid red"
                      : "1px solid grey",
                }}
              />
            </div>
            <ul
              className="list-group"
              display={languageList.length == 0 ? "none" : "block"}
            >
              {languageList.length !== 0 &&
                languageList.map((ele, index) => (
                  <li className="list-group-item" key={index}>
                    {ele}
                  </li>
                ))}
            </ul>
            <div
              className="Register-Input-Box"
              style={{
                justifyContent: "start",
                flexDirection: "row",
                gap: "1rem",
                flexWrap: "wrap",
                display: "flex",
              }}
            >
              <select
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  flexBasis: "30%",
                  width: "100%",
                  height: 40,
                  border: "1px solid grey",
                }}
              >
                {languages.map((i, key) => (
                  <option key={key}>{i}</option>
                ))}
              </select>
            </div>
            <div className="Register-Input-Box">
              <button
                onClick={() => {
                  addLanguage();
                }}
                className="btn btn-warning"
              >
                Add Language
              </button>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                height: "60px",
                justifyContent: "space-evenly",
              }}
            ></div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                height: "60px",
                justifyContent: "space-evenly",
              }}
            ></div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                height: "60px",
                justifyContent: "space-between",
              }}
            ></div>
            <br />
            <button
              onClick={() => {
                postStudentData();
              }}
              style={{
                width: "100%",
                minHeight: 40,
                borderRadius: 5,
                color: "white",
                backgroundColor: "black",
                border: "none",
              }}
            >
              Create Account
            </button>
            <br />
            <br />
            <label>
              Already have an account?{" "}
              <span onClick={() => navigate("/")} style={{ color: "#8b5fb3" }}>
                Login
              </span>
            </label>
          </div>
        </div>
        <div className="lgnd1" style={{ height: "100vh", width: "50%" }}>
          <div
            style={{
              height: "100vh",
              width: "100%",
              backgroundColor: "black",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <h2
              style={{
                fontFamily: "Tilt Prism",
                textShadow: "5px 5px 10px orange",
              }}
            >
              <label style={{ fontSize: 67 }}>KNOWLEDGE LAND </label> <br />{" "}
              VIRTUAL LEARNING PLATFORM
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorRegister;
