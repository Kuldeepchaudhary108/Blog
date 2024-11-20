import React from "react";
import Container from "../Container";
import PostForm from "../post-form/PostForm";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";

function EditPost() {
  const { slug } = useParams();
  const [post, setPosts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={posts} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
