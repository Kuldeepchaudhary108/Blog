import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config";
import PostCard from "../post-form/PostCard";
import Container from "../Container";
export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  
  if (posts.length === 0) {
    <div className="w-full mt-4 py-8 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="py-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              Login to read posts
            </h1>
          </div>
        </div>
      </Container>
      ;
    </div>;
  }
  return (
    <div className="py-8 w-full">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => {
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>;
          })}
        </div>
      </Container>
    </div>
  );
}
