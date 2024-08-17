import React from 'react';
import styled from 'styled-components';

const BottomNav: React.FC = () => {
  return (
    <NavContainer>
      <NavItem>
        <img src="/icons/profile.png" alt="Profileテスト" />
      </NavItem>
      <NavItem>
        <img src="/icons/globe.png" alt="Website" />
      </NavItem>
      <NavItem>
        <img src="/icons/email.png" alt="Email" />
      </NavItem>
      <NavItem>
        <img src="/icons/phone.png" alt="Phone" />
      </NavItem>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 24px;
    max-height: 24px;
  }
`;

export default BottomNav;