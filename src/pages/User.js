import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "../components/LogoutButton.js";
import { BASE_URL } from "../constants/urls.js";
import RecentsPosts from "../components/RecentsPosts.js";
import HashtagsBox from "../components/HashtagsBox.js";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function User() {
  const [logoutClicked, setLogoutClicked] = useState(false);
  const [publishedPosts, setPublishedPosts] = useState();
  const [hashtags, setHashtags] = useState();
  const [userData, serUserData] = useState();
  const [liked, setLiked] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Bearer")}`,
      },
    };
    axios
      .get(`${BASE_URL}/user/${id}`, config)
      .then((res) => {
        setPublishedPosts(res.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
    axios
      .get(`${BASE_URL}/hashtags`, config)
      .then((res) => {
        setHashtags(res.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
    axios
      .get(`${BASE_URL}/sign-in`, config)
      .then((res) => {
        serUserData(res.data);
        console.log(res.data);
      })
      .catch((erro) => {
        console.log(erro);
        localStorage.removeItem("Bearer");
        navigate("/");
      });
  }, [navigate, id]);

  if (publishedPosts !== undefined) {
    return (
      <Container onClick={() => logoutClicked && setLogoutClicked(false)}>
        <Header>
          <h1>linkr</h1>
          <LogoutButton
            userData={userData}
            logoutClicked={logoutClicked}
            setLogoutClicked={setLogoutClicked}
          />
        </Header>
        <ContainerTimeline>
          <TimelinePosts>
            <Flex>
            <PostUrl src={publishedPosts[0].picture} alt="LinkImage" />
            <Feed>{publishedPosts[0].username} Posts</Feed>
            </Flex>
            <RecentsPosts
              publishedPosts={publishedPosts}
              setPublishedPosts={setPublishedPosts}
              liked={liked}
              setLiked={setLiked}
            />
          </TimelinePosts>
          <HashtagsBox hashtags={hashtags} />
        </ContainerTimeline>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #333333;

  overflow: scroll;
`;

const Header = styled.div`
  height: 10vh;
  background-color: #151515;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  h1 {
    font-family: "Passion One", cursive;
    font-size: 52px;
    color: white;
    margin-left: 2%;
  }
`;
const Feed = styled.span`
 font-family: "Oswald", sans-serif;
    color: white;
    font-size: 43px;
    margin: 0 0 5% 0;
    padding-left: 18px;
`

const ContainerTimeline = styled.div`
  padding-top: 3%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 60%;
`;

const TimelinePosts = styled.div`
  width: 50%;
  height: 100vh;

  h1 {
    font-family: "Oswald", sans-serif;
    color: white;
    font-size: 43px;
    margin: 0 0 5% 0;
  }
`;

const PostUrl = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 26.5px;
  color: #b7b7b7;
  margin-top: 1%;
  display: flex;
  justify-content: space-between;
  border: 1px solid #4d4d4d;
  cursor: pointer;
`;
const Flex =  styled.div`
display: flex;

`
