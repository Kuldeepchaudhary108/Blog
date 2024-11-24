import React from "react";
import Container from "../Container";
import PostForm from "../post-form/PostForm";
export default function AddPost() {
  return (
    <div className="py-8">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}
