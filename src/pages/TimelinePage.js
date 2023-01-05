import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import arrowUp from "../assets/images/ArrowUp.png";
import arrowDown from "../assets/images/ArrowDown.png";

export default function Timeline() {
  const [link, setLink] = useState("");
  const [linkDescription, setLinkDescription] = useState("");
  const [logoutClicked, setLogoutClicked] = useState(false);
  const [publishClicked, setPublishClicked] = useState(false);

  async function postLinkr(e) {
    e.preventDefault();
    setPublishClicked(true);
    const body = { link, linkDescription };
    axios
      .post("https://api-linkr-eivv.onrender.com/timeline", body)
      .then((response) => {
        response.sendStatus(200);
      })
      .catch(() => {
        alert("Houve um erro ao publicar seu link");
        setPublishClicked(false);
      });
  }

  return (
    <Container>
      <Header>
        <h1>linkr</h1>
        {logoutClicked ? (
          <Logout>
            <img
              alt="seta para cima"
              src={arrowUp}
              onClick={() => setLogoutClicked(false)}
            />
            <UserLogout />
          </Logout>
        ) : (
          <Logout>
            <img
              alt="seta para baixo"
              src={arrowDown}
              onClick={() => setLogoutClicked(true)}
            />
            <UserLogout />
          </Logout>
        )}
      </Header>
      <ContainerTimeline>
        <TimelinePosts>
          <h1>timeline</h1>
          <CurrentPost>
            <UserImage />
            {publishClicked ? (
              <Description>
                <h2>What are you going to share today?</h2>
                <InputLink
                  placeholder="http://..."
                  required
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                  disabled
                />
                <InputDescription
                  placeholder="Awesome article about #javascript"
                  onChange={(e) => setLinkDescription(e.target.value)}
                  value={linkDescription}
                  disabled
                />
                <PublishButt disabled color={`#333333`} cursor={""}>
                  Publishing...
                </PublishButt>
              </Description>
            ) : (
              <Description>
                <h2>What are you going to share today?</h2>
                <InputLink
                  placeholder="http://..."
                  required
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                />
                <InputDescription
                  placeholder="Awesome article about #javascript"
                  onChange={(e) => setLinkDescription(e.target.value)}
                  value={linkDescription}
                />
                <PublishButt
                  onClick={postLinkr}
                  color={`#1877F2`}
                  cursor={"pointer"}
                >
                  Publish
                </PublishButt>
              </Description>
            )}
          </CurrentPost>
        </TimelinePosts>
        <Trendings>
          <h1>trending</h1>
        </Trendings>
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

const Trendings = styled.div`
  width: 25%;
  height: 70vh;
  margin: 5% 0 0 5vw;
  border-radius: 4%;
  background-color: #171717;

  h1 {
    font-family: "Oswald", sans-serif;
    color: white;
    font-size: 35px;
    margin: 4%;
  }
`;

const CurrentPost = styled.div`
  height: 40%;
  width: 100%;
  padding-top: 2%;
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`;

const UserImage = styled.image`
  height: 27%;
  width: 10%;
  border-radius: 50%;
  background-color: green;
`;

const Description = styled.div`
  height: 40%;
  width: 80%;

  h2 {
    color: #707070;
    font-family: "Lato", sans-serif;
    font-size: 20px;
  }
`;

const InputLink = styled.input`
  margin-top: 5%;
  height: 40%;
  width: 100%;
  border: none;
  background-color: #efefef;
`;

const InputDescription = styled.input`
  margin-top: 3%;
  height: 70%;
  width: 100%;
  border: none;
  background-color: #efefef;
`;

const PublishButt = styled.button`
  background-color: ${(props) => props.color};
  margin: 3% 0 0 80%;
  width: 8vw;
  height: 4vh;
  border: none;
  border-radius: 5px;
  color: white;
  font-family: "Lato";
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  cursor: ${(props) => props.cursor};
`;

const Logout = styled.div`
  width: 10vw;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-right: 1%;

  img {
    width: 20%;
    height: 20%;
  }
`;

const UserLogout = styled.image`
  height: 85%;
  width: 4.3vw;
  border-radius: 50%;
  background-color: green;
`;
