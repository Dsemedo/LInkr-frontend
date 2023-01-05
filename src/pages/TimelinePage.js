import styled from "styled-components";
import Header from "../components/Header";
import Post from "../components/Post";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import context from "../contexts/context.js";
import { BASE_URL } from "../constants/urls"


export default function TimelinePage() {
  const { config } = useContext(context);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const promise = axios.get(`${BASE_URL}/timeline`, config);
    promise.then((res) => {
      setPosts(res.data);
    });
    promise.catch((err) => {
      console.log(err);
    });
  });

  return (
    <>
      <Header />
      <Container>
        <Timeline>
          <h1>timeline</h1>
          <ContainerTimeline>
            <Posts>
              <CurrentPost></CurrentPost>
              {posts.map((p)=> <Post username={p.username} picture={p.picture} description={p.description} link={p.link}/>)}
            </Posts>
            <Trendings>
              <h1>trending</h1>
            </Trendings>
          </ContainerTimeline>
        </Timeline>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding-top: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100vw;
  background-color: #333333;
`;

const Timeline = styled.div`
  width: 75vw;
  height: 90vh;
  background-color: #333333;
  h1 {
    font-family: "Oswald", cursive;
    color: white;
    font-size: 43px;
  }
`;

const ContainerTimeline = styled.div`
  background-color: #333333;
  display: flex;
  margin: 43px 0;
`;

const Posts = styled.div`
  width: 65vw;
  height: 85vh;
  background-color: #333333;
`;

const CurrentPost = styled.div`
  height: 210px;
  width: 100%;
  margin: 0 0 15px 0;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Trendings = styled.div`
  width: 25vw;
  height: 60vh;
  margin-left: 3vh;
  border-radius: 16px;
  background-color: #171717;
  padding: 9px 16px;
  h1 {
    font-family: "Oswald", cursive;
    font-size: 27px;
  }
`;
