import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components';



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: spaced-evenly;
  width: 100%;
  min-height: 100vh;
  background-image: url("https://www.nps.gov/common/uploads/structured_data/68BFC1AC-BF96-629F-89D261D78F181C64.jpg");
  background-size: cover;
  background-position: center;
  padding: 1rem;
  box-sizing: border-box;

  @media screen and (max-width: 60rem) {
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  }

  @media screen and (max-width: 53rem) {
    padding: 1.5rem;
    background-color: rgba(245, 245, 245, 0.5);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  }

  @media screen and (max-width: 27rem) {
    padding: 2rem;
    background-color: rgba(242, 242, 242, 0.5);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;


const Title = styled.h1`
  font-size: 35px;
  font-weight: 700;
  color: #484848;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: #ff5a5f;
  margin-bottom: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin-bottom: 19px;
  margin-top: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #484848;
  margin-bottom: 8px;
  color: rgb(101, 109, 74);
`;

const Input = styled.input`
  font-size: 16px;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 30px;
  outline: none;
  &:focus {
    border-color: #008489;
  }
`;

const SubmitButton = styled.button`
  font-size: 16px;
  font-weight: 600;
  background-color: #ff5a5f;
  color: #fff;
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #ff3d48;
  }
`;


const ContentWrapper = styled.div`
  // margin-top: 2rem;
  background-color: rgba(255, 255, 255, .9);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.9);
`;


const RegisterLink = styled(Link)`
  color: rgb(101, 109, 74);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;



export default function Login({ currentUser, setCurrentUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const reqBody = {
        email,
        password,
      };
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, reqBody);

      const { token } = response.data;
      localStorage.setItem('jwt', token);

      const decoded = jwt_decode(token);

      setCurrentUser(decoded);
    } catch (err) {
      console.warn(err);
      if (err.response) {
        setMsg(err.response.data.msg);
      }
    }
  };

  if (currentUser) {
    navigate('/users/profile');
  }


  return (
    <Container>

      <Title>Login</Title>

      <ContentWrapper>
        <ErrorMessage>{msg}</ErrorMessage>

        <Form onSubmit={handleSubmit}>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            placeholder='Enter your email...'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            id='password'
            placeholder='Enter your password...'
            onChange={e => setPassword(e.target.value)}
            value={password}
          />

          <SubmitButton type='submit'>Login</SubmitButton>
          <RegisterLink to='/users/register'>New? Register here</RegisterLink>
        </Form>
      </ContentWrapper>
    </Container>
  )
}
