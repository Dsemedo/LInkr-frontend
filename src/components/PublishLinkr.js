import styled from "styled-components";

export default function PublishLinkr({
  publishClicked,
  setLink,
  link,
  description,
  setDescription,
  postLinkr,
}) {
  return publishClicked ? (
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
        onChange={(e) => setDescription(e.target.value)}
        value={description}
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
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <PublishButt onClick={postLinkr} color={`#1877F2`} cursor={"pointer"}>
        Publish
      </PublishButt>
    </Description>
  );
}

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
