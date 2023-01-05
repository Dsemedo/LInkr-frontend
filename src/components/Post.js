import styled from "styled-components";
import foto from "../assets/images/foto.jpeg";
import { useState } from "react";

export default function Post({ username, picture, description, link }) {
    const [metadata, setMetadata] = useState({});

  const urlMetadata = require("url-metadata");
  urlMetadata(link).then(
    function (metadata) {
        setMetadata(metadata);
      console.log(metadata);
    },
    function (error) {
      console.log(error);
    }
  );
  return (
    <Contaier>
      <LeftContainer>
        <UserPicture>
          <img src={picture} alt={"foto"} />
        </UserPicture>
        <Likes>
          <ion-icon name="heart-outline"></ion-icon>
          <p>x likes</p>
        </Likes>
      </LeftContainer>
      <RightContainer>
        <Username>{username}</Username>
        <Description>{description}</Description>
        <LinkContainer>
        <Text>
            <h1>{metadata.title}</h1>
            <p>{metadata.description}</p>
            <h2>{metadata.url}</h2>
        </Text>
        <Image>
            <img src={metadata.image} alt={"foto"} />
        </Image>
        </LinkContainer>
      </RightContainer>
    </Contaier>
  );
}

const Contaier = styled.div`
  height: 275px;
  width: 100%;
  margin: 7px 0;
  border-radius: 16px;
  background-color: #171717;
  padding: 19px;
  display: flex;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #171717;
`;

const UserPicture = styled.div`
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Likes = styled.div`
  font-family: "Lato";
  font-weight: 400;
  font-size: 11px;
  color: #ffffff;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ion-icon {
    margin: 15px 0 5px 0;
    color: #ffffff;
    font-size: 16px;
  }
`;

const RightContainer = styled.div`
  background-color: blue;
  padding: 0 0 0 18px;
  height: 100%;
  width: 100%;
  color: #ffffff;
`;

const Username = styled.h1``;

const LinkContainer = styled.div``;

const Text = styled.div``;

const Description = styled.div``;

const Image = styled.div``;
