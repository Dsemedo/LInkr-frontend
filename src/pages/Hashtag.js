import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "../components/LogoutButton.js";
import { BASE_URL } from "../constants/urls.js";
import RecentsPosts from "../components/RecentsPosts.js";
import HashtagsBox from "../components/HashtagsBox.js";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Timeline() {
  const [logoutClicked, setLogoutClicked] = useState(false);
  const [publishedPosts, setPublishedPosts] = useState();
  const [hashtags, setHashtags] = useState();
  const [userData, serUserData] = useState();
  const [liked, setLiked] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  console.log("PARAMS", typeof params.hashtag);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Bearer")}`,
      },
    };
    axios
      .get(`${BASE_URL}/hashtags/${params.hashtag}`, config)
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
  }, [navigate, params.hashtag]);

  return (
    <Container onClick={() => logoutClicked && setLogoutClicked(false)}>
      <Header>
        <h1 onClick={() => navigate("/timeline")}>linkr</h1>
        <LogoutButton
          userData={userData}
          logoutClicked={logoutClicked}
          setLogoutClicked={setLogoutClicked}
        />
      </Header>
      <ContainerTimeline>
        <TimelinePosts>
          <h1># {params.hashtag}</h1>
          <RecentsPosts
            publishedPosts={publishedPosts}
            setPublishedPosts={setPublishedPosts}
            liked={liked}
            setLiked={setLiked}
            userData={userData}
          />
        </TimelinePosts>
        <HashtagsBox hashtags={hashtags} />
      </ContainerTimeline>
    </Container>
  );
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
    cursor: pointer;
  }
`;

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
