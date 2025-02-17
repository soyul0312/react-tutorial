import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import axios from "axios";

export default function Create() {
  const navigate = useNavigate();

  // redux에 있는 user(email) 데이터 가져오기
  const user = useSelector((state) => state.authSlice.user);

  // 변경된 내용 한번에 상태 관리
  const [createInput, setCreateInput] = useState({
    title: "",
    content: "",
  });

  // db.json에 새로운 게시글 추가
  const mutation = useMutation(async () => {
    await axios.post("http://localhost:4000/posts", {
      // 추가할 내용
      title: createInput.title,
      content: createInput.content,
      author: user,
    });
  });

  const onCangeHandler = (e) => {
    setCreateInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // 게시글 추가 실행 : .mutate()
    mutation.mutate();
    navigate("/");
  };

  return (
    <>
      <Header />
      <Container>
        <form
          style={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          onSubmit={onSubmitHandler}
        >
          <div>
            <input
              name="title"
              placeholder="제목"
              value={createInput.title}
              onChange={onCangeHandler}
              style={{
                width: "100%",
                height: "60px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div
            style={{
              height: "400px",
            }}
          >
            <textarea
              name="content"
              placeholder="내용"
              value={createInput.content}
              onChange={onCangeHandler}
              style={{
                resize: "none",
                height: "100%",
                width: "100%",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "12px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "skyblue",
              cursor: "pointer",
            }}
          >
            추가하기
          </button>
        </form>
      </Container>
    </>
  );
}
