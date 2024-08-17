import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ProfilePreview from './ProfilePreview';
import { SNSItem, ThemeOptions } from '../interfaces';

const EditForm: React.FC = () => {
  const [snsItems, setSnsItems] = useState<SNSItem[]>([]);
  const [name, setName] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [theme, setTheme] = useState<ThemeOptions>({ color: '#ffffff', font: 'Arial' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/profile');
      if (response.data) {
        setName(response.data.name);
        setSnsItems(response.data.snsItems);
        setTheme(response.data.theme || { color: '#ffffff', font: 'Arial' });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const addSnsItem = () => {
    setSnsItems([...snsItems, { id: Date.now().toString(), name: '', url: '' }]);
  };

  const updateSnsItem = (id: string, field: 'name' | 'url', value: string) => {
    setSnsItems(snsItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeSnsItem = (id: string) => {
    setSnsItems(snsItems.filter(item => item.id !== id));
  };

  const handleThemeChange = (field: keyof ThemeOptions, value: string) => {
    setTheme(prevTheme => ({ ...prevTheme, [field]: value }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
  
    if (!name.trim()) {
      newErrors.name = '名前を入力してください。';
    }
  
    snsItems.forEach((item, index) => {
      if (!item.name.trim()) {
        newErrors[`snsName${index}`] = 'SNS名を入力してください。';
      }
      if (!item.url.trim()) {
        newErrors[`snsUrl${index}`] = 'URLを入力してください。';
      }
    });
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('http://localhost:5000/api/profile', { name, snsItems, theme });
        alert('プロフィールが正常に保存されました！');
      } catch (error) {
        console.error('プロフィールの保存中にエラーが発生しました:', error);
        alert('プロフィールの保存中にエラーが発生しました。もう一度お試しください。');
      }
    }
  };

  return (
    <FormContainer>
      <h2>プロフィール編集</h2>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <label htmlFor="name">名前:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </InputGroup>
        
        <h3>SNSアカウント</h3>
        {snsItems.map((item) => (
          <SNSItemGroup key={item.id}>
            <input
              type="text"
              placeholder="SNS名"
              value={item.name}
              onChange={(e) => updateSnsItem(item.id, 'name', e.target.value)}
              required
            />
            {errors[`snsName${item.id}`] && <ErrorMessage>{errors[`snsName${item.id}`]}</ErrorMessage>}
            <input
              type="url"
              placeholder="URL"
              value={item.url}
              onChange={(e) => updateSnsItem(item.id, 'url', e.target.value)}
              required
            />
            {errors[`snsUrl${item.id}`] && <ErrorMessage>{errors[`snsUrl${item.id}`]}</ErrorMessage>}
            <button type="button" onClick={() => removeSnsItem(item.id)}>削除</button>
          </SNSItemGroup>
        ))}
        <AddButton type="button" onClick={addSnsItem}>+ SNSを追加</AddButton>
        
        <h3>テーマ設定</h3>
        <ThemeGroup>
          <label>
            背景色:
            <input
              type="color"
              value={theme.color}
              onChange={(e) => handleThemeChange('color', e.target.value)}
            />
          </label>
          <label>
            フォント:
            <select
              value={theme.font}
              onChange={(e) => handleThemeChange('font', e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier">Courier</option>
            </select>
          </label>
        </ThemeGroup>
        
        <PreviewToggle type="button" onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? 'プレビューを隠す' : 'プレビューを表示'}
        </PreviewToggle>
        
        {showPreview && <ProfilePreview name={name} snsItems={snsItems} theme={theme} />}
        
        <SubmitButton type="submit">保存</SubmitButton>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const SNSItemGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const AddButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #008CBA;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const PreviewToggle = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const ThemeGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  label {
    display: flex;
    align-items: center;
    
    input, select {
      margin-left: 10px;
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

export default EditForm;