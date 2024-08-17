import React from 'react';
import styled from 'styled-components';
import { SNSItem, ThemeOptions } from '../interfaces';

interface ProfilePreviewProps {
  name: string;
  snsItems: SNSItem[];
  theme: ThemeOptions;
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ name, snsItems, theme }) => {
  return (
    <PreviewContainer>
      <h3>プレビュー</h3>
      <PreviewContent style={{ backgroundColor: theme.color, fontFamily: theme.font }}>
        <h2>{name || 'ユーザー名'}</h2>
        <SNSList>
        {snsItems.map((item) => (
        <SNSListItem key={item.id}>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.name}
          </a>
        </SNSListItem>
        ))}
        </SNSList>
      </PreviewContent>
    </PreviewContainer>
  );
};

const PreviewContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
`;

const PreviewContent = styled.div`
  padding: 20px;
  border-radius: 4px;
`;

const SNSList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SNSListItem = styled.li`
  margin-bottom: 10px;
  
  a {
    color: #0066cc;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default ProfilePreview;