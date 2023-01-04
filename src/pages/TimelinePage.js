import styled from "styled-components";

export default function timeline() {
  return (
    <>
      <Header></Header>
      <ContainerTimeline>
        <Timeline>
          <h1>timeline</h1>
          <CurrentPost></CurrentPost>
        </Timeline>
        <Trendings></Trendings>
      </ContainerTimeline>
    </>
  );
}

const Header = styled.div`
  width: 100vw;
  height: 5vw;
  background-color: blue;
`;

const ContainerTimeline = styled.div`
  padding-top: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100vw;
  background-color: yellow;
`;

const Timeline = styled.div`
  width: 50vw;
  height: 90vh;
  background-color: red;
`;

const Trendings = styled.div`
  width: 25vw;
  height: 60vh;
  margin-left: 10vh;
  border-radius: 4%;
  background-color: blue;
`;

const CurrentPost = styled.div`
  height: 40%;
  width: 100%;
  background-color: black;
`;
