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
  const [toggle, setToggle] = useState(false);
  // const [qualification, setQualification] = useState("");
  const [language, setLanguage] = useState("English");
  const [experience, setExperience] = useState(1);
  const [fluency, setFluency] = useState("Basic");
  const [pricing45, setPricing45] = useState(100);
  const [pricing60, setPricing60] = useState(100);
  const [pricing90, setPricing90] = useState(100);

  // const [teachingExp, setTeachingExp] = useState("");
  // const [timing, setTiming] = useState([]);
  // const [day, setDay] = useState("");
  // const [from, setFrom] = useState("");
  // const [to, setTo] = useState("");
  // const [videoLink, setVideoLink] = useState("");
  const [validation, setValidation] = useState(false);
  const [validation2, setValidation2] = useState(false);
  const [languageList, setLanguageList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [fluencyList, setFluencyList] = useState([]);
  const [pricingList, setPricingList] = useState([]);

  const addLanguage = () => {
    if (
      (language !== "") &
      (experience !== "") &
      (fluency !== "") &
      (pricing45 !== "") &
      (pricing60 !== "") &
      (pricing90 !== "")
    ) {
      setValidation2(false);
      setLanguageList((old) => [...old, language]);
      setExperienceList((old) => [...old, "" + experience]);
      setFluencyList((old) => [...old, fluency]);
      setPricingList((old) => [
        ...old,
        { 45: "" + pricing45, 60: "" + pricing60, 90: "" + pricing90 },
      ]);
      console.log(languageList);
      console.log(fluencyList);
    } else {
      setValidation2(true);
    }
  };
  const postTeachersData = () => {
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
        fluency: fluencyList,
        exp: experienceList,
        pricing: pricingList,
        profilePhoto: "",
      };
      console.log(item);
      axios.post(baseUrl + "tutor", item).then(() => navigate("/"));
    } else {
      if (languageList.length === 0) setValidation2(true);
      if ((name == "") & (email == "") & (password == "")) setValidation(true);
    }
  };

  const languages = ["English", "German", "Spanish", "Korean", "French"];
  const fluencies = ["Basic", "Intermediate", "Advanced"];
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
            <label className="Register-Left-Heading">Tutor Registration</label>
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
              <input
                className="Register-Input"
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Experience(years)"
                type="number"
                value={experience}
                min="1"
                style={{
                  flexBasis: "30%",
                  border:
                    validation2 === true ? "1px solid red" : "1px solid grey",
                }}
              />
              <select
                onChange={(e) => setFluency(e.target.value)}
                style={{
                  width: "100%",
                  flexBasis: "30%",
                  height: 40,
                  border: "1px solid grey",
                }}
              >
                {fluencies.map((i, key) => (
                  <option key={key}>{i}</option>
                ))}
              </select>
              <input
                className="Register-Input"
                onChange={(e) => setPricing45(e.target.value)}
                placeholder="Pricing(INR/45mins)"
                type="number"
                value={pricing45}
                min="1"
                style={{
                  flexBasis: "30%",
                  border:
                    validation2 === true || pricing45 === ""
                      ? "1px solid red"
                      : "1px solid grey",
                }}
              />
              <input
                className="Register-Input"
                onChange={(e) => setPricing60(e.target.value)}
                placeholder="Pricing(INR/60mins)"
                type="number"
                min="1"
                value={pricing60}
                style={{
                  flexBasis: "30%",
                  border:
                    validation2 === true || pricing60 === ""
                      ? "1px solid red"
                      : "1px solid grey",
                }}
              />
              <input
                className="Register-Input"
                onChange={(e) => setPricing90(e.target.value)}
                placeholder="Pricing(INR/90mins)"
                value={pricing90}
                type="number"
                min="1"
                style={{
                  flexBasis: "30%",
                  border:
                    validation2 === true || pricing90 === ""
                      ? "1px solid red"
                      : "1px solid grey",
                }}
              />
            </div>

            <div className="Register-Input-Box">
              <button
                onClick={() => {
                  addLanguage();
                }}
                className="btn btn-warning"
                style={{
                  marginTop: "5rem",
                }}
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
            >
              {/* <select
                onChange={(e) => setQualification(e.target.value)}
                style={{
                  width: "100%",
                  height: 40,
                  border:
                    (validation === true) & (qualification === "")
                      ? "1px solid red"
                      : "1px solid grey",
                }}
              >
                <option selected disabled>
                  Qualification
                </option>
                <option>Master's Degree</option>
                <option>PhD or Doctorate</option>
                <option>Teaching Certification</option>
                <option>Other</option>
              </select> */}
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
                flexDirection: "row",
                alignItems: "flex-start",
                height: "60px",
                justifyContent: "space-between",
              }}
            ></div>

            <br />
            <button
              onClick={() => {
                postTeachersData();
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
              <label style={{ fontSize: 67 }}>LinguaConnect</label> <br />{" "}
              Explore, Learn, Connect
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorRegister;
