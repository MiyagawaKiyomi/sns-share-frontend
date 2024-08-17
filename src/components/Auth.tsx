import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLogin ? '/api/login' : '/api/signup';
      const response = await axios.post(`http://localhost:5000${endpoint}`, { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    } catch (error) {
      setError('認証に失敗しました。もう一度お試しください。');
      console.error('認証エラー:', error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  return (
    <AuthContainer>
      <h2>{isLogin ? 'ログイン' : '新規登録'}</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="メールアドレス"
          value={email}
          onChange={handleInputChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="パスワード"
          value={password}
          onChange={handleInputChange}
          required
        />
        <Button type="submit">{isLogin ? 'ログイン' : '登録'}</Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ToggleText onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? '新規登録はこちら' : 'ログインはこちら'}
      </ToggleText>
    </AuthContainer>
  );
};

const AuthContainer = styled.div`
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const ToggleText = styled.p`
  text-align: center;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default Auth;