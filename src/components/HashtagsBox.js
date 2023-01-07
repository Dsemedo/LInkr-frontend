import styled from "styled-components"

export default function HashtagsBox({hashtags}) {
  
  return (
    <Trendings>
      <Top>
        <h1>trending</h1>
      </Top>
      <Hashtags>
        {hashtags && hashtags.map((e) => (
          <p key={e.id}>{e.hashtag}</p>
        ))}
      </Hashtags>
    </Trendings>
  )
}

const Trendings = styled.div`
  width: 25%;
  height: 70vh;
  margin: 5% 0 0 5vw;
  border-radius: 4%;
  background-color: #171717;
  overflow: hidden;
`
const Top = styled.div`
  border-bottom: 1px solid #484848;
  width: 100%;
  h1 {
    font-family: "Oswald", sans-serif;
    color: white;
    font-size: 35px;
    margin: 4%;
  }
`

const Hashtags = styled.div`
  padding: 4%;
  display: flex;
  flex-direction: column;
  p {
    font-family: "Lato";
    font-weight: 700;
    font-size: 19px;
    letter-spacing: 0.05em;
    color: #ffffff;
    margin-bottom: 5%;
  }
`
