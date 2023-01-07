import styled from "styled-components"
import { ReactTagify } from "react-tagify"
import { useNavigate } from "react-router-dom"
import { black, lightGrey } from "../constants/colors"

export default function RecentsPosts({ setPublishedPosts, publishedPosts }) {
  const navigate = useNavigate()
  if (publishedPosts === 0 || publishedPosts === undefined) {
    return (
      <>
        <h1>Loading</h1>
      </>
    )
  } else {
    return (
      <>
        {publishedPosts.map((value, i) => (
          <Card key={value.id}>
            <ContainerLeft>
              <UserImage src={value.picture} />
            </ContainerLeft>
            <ContainerRight>
              <PostDescription>
                <ReactTagify
                  colors={"blue"}
                  tagClicked={(tag) => navigate(`/hashtag/${tag}`)}
                >
                  {value.description}
                </ReactTagify>
              </PostDescription>
              <PostUrl>{value.link}</PostUrl>
            </ContainerRight>
          </Card>
        ))}
      </>
    )
  }
}

const Card = styled.div`
  font-family: "Lato";
  height: 40%;
  width: 100%;
  margin-top: 10px;
  border-radius: 16px;
  background-color: ${black};
  display: flex;
  justify-content: space-around;
  overflow: hidden;

  h1 {
    color: ${lightGrey};
  }
`

const PostDescription = styled.div`
  width: 80%;
  height: 20%;
  color: ${lightGrey};
`

const PostUrl = styled.div`
  width: 80%;
  height: 50%;
  color: ${lightGrey};
`

const UserImage = styled.img`
  height: 30%;
  width: 60%;
  border-radius: 50%;
`

const ContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`

const ContainerLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 20%;
`
