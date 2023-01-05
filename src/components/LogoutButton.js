import styled from "styled-components";
import { useState } from "react";
import arrowUp from "../assets/images/ArrowUp.png";
import arrowDown from "../assets/images/ArrowDown.png";

export default function LogoutButton() {
  const [logoutClicked, setLogoutClicked] = useState(false);

  return (
    <>
      {logoutClicked ? (
        <Logout flex={`column`} height={`120%`}>
          <ContainerLogout>
            <img
              alt="seta para cima"
              src={arrowUp}
              onClick={() => setLogoutClicked(false)}
            />
            <UserLogout />
          </ContainerLogout>
          <LogoutButt>Logout</LogoutButt>
        </Logout>
      ) : (
        <Logout flex={`row`} height={`100%`}>
          <img
            alt="seta para baixo"
            src={arrowDown}
            onClick={() => setLogoutClicked(true)}
          />
          <UserLogout />
        </Logout>
      )}
    </>
  );
}

const Logout = styled.div`
  width: 10vw;
  height: ${(props) => props.height};
  display: flex;
  flex-direction: ${(props) => props.flex};
  align-items: center;
  justify-content: space-around;
  margin-right: 1%;
  padding-top: 1%;

  img {
    width: 20%;
    height: 20%;
  }
`;

const UserLogout = styled.image`
  height: 85%;
  width: 42%;
  border-radius: 50%;
  background-color: green;
`;

const LogoutButt = styled.div`
  height: 20px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
`;

const ContainerLogout = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;

  margin-bottom: 1%;
`;
