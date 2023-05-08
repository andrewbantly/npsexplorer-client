import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - 2rem);
  background-image: url("https://www.nps.gov/common/uploads/structured_data/49F34094-B893-7DD6-5AE0F0220724B0EF.jpg");
  background-size: cover;
  background-position: center;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #484848;
  position: absolute;
  top: 1rem;
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
  margin-bottom: 16px;
  outline: none;
  &:focus {
    border-color: #008489;
  }
`;

const SubmitButton = styled.button`
font-size: 16px;
font-weight: 600;
background-color: #333D29;
color: #fff;
padding: 12px 16px;
border: none;
border-radius: 4px;
cursor: pointer;
transition: background-color 0.2s ease-in-out;
&:hover {
	background-color: #414833;
}
`;

const ContentWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.9);
`;

const LoginLink = styled(Link)`
  color: rgb(101, 109, 74);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;


export default function SignUp({ currentUser, setCurrentUser }) {
	// state for the controlled form
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

	const navigate = useNavigate()

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				name,
				email,
				password
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, reqBody)

			// save the token in localstorage
			const { token } = response.data
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			setCurrentUser(decoded)

		} catch (err) {
			console.warn(err)
			if (err.response) {
				setMsg(err.response.data.msg)
			}
		}
	}

	// conditionally render a navigate component
	if (currentUser) {
		navigate("/users/profile")
	}

	return (
		<Container>
			
			<Title>Register</Title>

			<ContentWrapper>
				<ErrorMessage>{msg}</ErrorMessage>

				<Form onSubmit={handleSubmit}>
					<Label htmlFor='name'>Name</Label>
					<Input
						type="text"
						id="name"
						placeholder='Enter your username...'
						onChange={e => setName(e.target.value)}
						value={name}
					/>

					<Label htmlFor='email'>Email</Label>
					<Input
						type="email"
						id="email"
						placeholder='Enter your email...'
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>

					<Label htmlFor='password'>Password</Label>
					<Input
						type="password"
						id="password"
						placeholder='Enter your password...'
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>

					<SubmitButton type="submit">Register</SubmitButton>
					<LoginLink className="login" to='/users/login'>Have an account?</LoginLink>
				</Form>
			</ContentWrapper>
		</Container>
	)
}
