import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import SNSGrid from './SNSGrid';
import BottomNav from './BottomNav';
import NFCReader from './NFCReader';

interface SNSIcon {
  id: string;
  name: string;
  url: string;
  icon: string;
}

interface ThemeOptions {
  color: string;
  font: string;
}

interface ProfileData {
  name: string;
  snsIcons: SNSIcon[];
  theme: ThemeOptions;
}

const ProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const navigate = useNavigate();

// TODO: 将来的な最適化 - useCallbackとuseEffectの依存配列の調整を検討
useEffect(() => {
  fetchProfileData();
}, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth');
        return;
      }
      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      navigate('/auth');
    }
  };

  const handleReorder = (newOrder: SNSIcon[]) => {
    setProfileData(prevData => prevData ? { ...prevData, snsIcons: newOrder } : null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <PageContainer style={{
      backgroundColor: profileData?.theme?.color || '#ffffff',
      fontFamily: profileData?.theme?.font || 'Arial',
    }}>
      <h1>{profileData?.name || 'ユーザー名'}</h1>
      {profileData && <SNSGrid icons={profileData.snsIcons} onReorder={handleReorder} />}
      <NFCReader />
      <BottomNav />
      <EditLink to="/edit">編集</EditLink>
      <LogoutButton onClick={handleLogout}>ログアウト</LogoutButton>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EditLink = styled(Link)`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #008CBA;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  
  &:hover {
    background-color: #005f73;
  }
`;

const LogoutButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #cc0000;
  }
`;

export default ProfilePage;