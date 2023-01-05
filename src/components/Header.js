import { useContext } from "react";
import context from "../contexts/context.js";
import styled from "styled-components";
import foto from "../assets/images/foto.jpeg";

export default function Header() {
  //const { userInfo } = useContext(context);

  return (
    <Container>
      <Logo>linkr</Logo>
      <RightContainer>
        <ion-icon name="chevron-down"></ion-icon>
        <UserPicture>
          {/* <img src={userInfo.picture} alt={`Imagem de perfil de ${userInfo.username}`} /> */}
          <img src={foto} alt={"foto"} />
        </UserPicture>
      </RightContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 72px;
  width: 100%;
  background-color: #151515;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  color: #ffffff;
  font-family: "Passion One", cursive;
  font-size: 49px;
  margin: 10px 0 10px 30px;
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 110px;
  ion-icon {
    color: #ffffff;
    font-size: 30px;
  }
`;

const UserPicture = styled.div`
  width: 51px;
  height: 51px;
  margin: 10px 17px 10px 0;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
