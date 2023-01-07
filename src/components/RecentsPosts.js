import styled from "styled-components";

export default function RecentsPosts({ setPublishedPosts, publishedPosts }) {

  if (publishedPosts === 0 || publishedPosts === undefined) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  } else {
    return (
      <>
        {publishedPosts.map((value, i) => (
          <Card key={value.id}>
            <ContainerLeft>
              <UserImage src={value.picture}/>
            </ContainerLeft>
            <ContainerRight>
              <PostDescription>{value.description}</PostDescription>
              <PostUrl>{value.link}</PostUrl>
            </ContainerRight>
          </Card>
        ))}
      </>
    );
  }
}

const Card = styled.div`
  height: 40%;
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  overflow: hidden;

  h1 {
    color: black;
  }
`;

const PostDescription = styled.div`
  width: 80%;
  height: 20%;
`;

const PostUrl = styled.div`
  width: 80%;
  height: 50%;
`;

const UserImage = styled.img`
  height: 30%;
  width: 60%;
  border-radius: 50%;
`;

const ContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const ContainerLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 20%;
`;
