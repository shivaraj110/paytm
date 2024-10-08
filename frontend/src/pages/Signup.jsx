import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Subheading from "../components/Subheading";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currUserBalAtom } from "../atoms/currUserBal";
import { authFlag } from "../atoms/authFlag";
import { curruserAtom } from "../atoms/userAtom";

export default function Signup() {
  const nav = useNavigate();
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const [bal, setBal] = useRecoilState(currUserBalAtom);
  const setAuthFlag = useSetRecoilState(authFlag);
  const setCurrUser = useSetRecoilState(curruserAtom);
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="felx flex-col justify-center ">
        <div className="rounded-xl bg-white w-80 shadow-md hover:shadow-2xl text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <Subheading label={"enter your information to create an account"} />
          <InputBox
            label={"First name"}
            placeholder={"John"}
            onChange={(e) => {
              setFname(e.target.value);
            }}
          />
          <InputBox
            label={"Last name"}
            placeholder={"Borgen"}
            onChange={(e) => {
              setLname(e.target.value);
            }}
          />
          <InputBox
            label={"Email"}
            placeholder={"example@gmail.com"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <InputBox
            label={"Password"}
            placeholder={"123456"}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                try {
                  const res = await axios.post(
                    "http://localhost:3000/api/v1/user/signup",
                    {
                      username: username,
                      firstName: firstName,
                      lastName: lastName,
                      password: password,
                    }
                  );
                  res.data.msg === "user created successfully!"
                    ? alert(res.data.msg) &
                      nav(
                        "/setpin?name=" +
                          firstName +
                          "&email=" +
                          username +
                          "&lname=" +
                          lastName
                      ) &
                      setCurrUser(
                        (u) =>
                          (u = {
                            fname: firstName,
                            lname: lastName,
                            email: username,
                            pass: password,
                          })
                      ) &
                      setBal(res.data.balance)
                    : null;
                  localStorage.setItem("token", res.data.token);
                  setAuthFlag((v) => (v = true));
                } catch (e) {
                  console.log("axios error", e);
                  alert("invalid inputs!");
                }
              }}
              label={"Sign up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            btmLink={"sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}
