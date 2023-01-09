import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { lightGrey } from "../constants/colors";
import HeartLiked from "../assets/images/HeartLiked.png";
import HeartUnliked from "../assets/images/HeartUnliked.png";
import DeletePost from "../assets/images/DeletePost.png";
import EditPost from "../assets/images/EditPost.png";

export default function RecentsPosts({
  setPublishedPosts,
  publishedPosts,
  setLiked,
  liked,
}) {
  const navigate = useNavigate();

  function likeLinkr() {
    setLiked(!liked);
  }

  if (publishedPosts === 0 || publishedPosts === undefined) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  } else {
    console.log(publishedPosts)
    return (
      <>
        {publishedPosts.map((value, i) => (
          
          <Card key={value.id}>
            
            <ContainerLeft>
              <UserImage src={value.picture} />
              {liked ? (
                <RedHeart
                  src={HeartUnliked}
                  alt="Heart Unliked"
                  onClick={likeLinkr}
                />
              ) : (
                <RedHeart
                  src={HeartLiked}
                  alt="Heart Liked"
                  onClick={likeLinkr}
                />
              )}
            </ContainerLeft>
            <ContainerRight>
              <ContainerTopPost>
                <h1 onClick={() => navigate(`/user/${value.userId}`)}>{value.username}</h1>
                <PostOptions>
                  <img src={EditPost} alt="aaa" />
                  <img src={DeletePost} alt="aaa" />
                </PostOptions>
              </ContainerTopPost>
              <PostDescription>
                <ReactTagify
                  colors={"blue"}
                  tagClicked={(tag) => navigate(`/hashtags/${tag.replace("#", "")}`)}
                >
                  {value.description}
                </ReactTagify>
              </PostDescription>
              <PostUrl onClick={() => window.open(value.link, "_blank")}>
                <ContainerUrl>
                  <h1>{value.urlTitle}</h1>
                  <h2>{value.urlDescription}</h2>
                  <h3>{value.link}</h3>
                </ContainerUrl>
                <img src={value.urlImage} alt="LinkImage" />
              </PostUrl>
            </ContainerRight>
          </Card>
        ))}
      </>
    );
  }
}

const ContainerUrl = styled.div`
  width: 50%;

  h1 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #cecece;
  }

  h2 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    color: #9b9595;
    padding-bottom: 2%;
  }

  h3 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    top: 0;
    color: #cecece;
  }
`;

const ContainerTopPost = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2%;

  h1 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
  }
`;

const PostOptions = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 35%;
    height: 50%;
    cursor: pointer;
  }
`;

const RedHeart = styled.img`
  width: 22px;
  height: 22px;
  margin-top: 30%;
`;

const Card = styled.div`
  height: 35%;
  width: 100%;
  padding-top: 2%;
  margin-top: 3vh;
  border-radius: 16px;
  background-color: #171717;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  overflow: hidden;
`;

const PostDescription = styled.div`
  width: 80%;
  height: 20%;
  color: ${lightGrey};
`;

const PostUrl = styled.div`
  width: 100%;
  height: 55%;
  color: ${lightGrey};
  margin-top: 1%;
  display: flex;
  justify-content: space-between;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  cursor: pointer;

  img {
    width: 40%;
    height: 100%;
  }
`;

const UserImage = styled.img`
  height: 65px;
  width: 65px;
  border-radius: 50%;
`;

const ContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 81%;
  height: 100%;
`;

const ContainerLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 11%;
`;
