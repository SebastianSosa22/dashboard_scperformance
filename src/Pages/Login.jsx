import React, { useState } from 'react';
import styled from "styled-components";
import Container from '../Container/Container.jsx';
import Card from '../Container/Card.jsx';
import { useNavigate } from 'react-router-dom';

// Manteniendo los estilos originales
const Form = styled.form`
    display: flex;
    flex-direction: column;
    h1{
        text-align: center;
    }
`;

const StyledLabel = styled.label`
  font-weight: regular;
  font-size: medium;
  color: #666666;
  margin-bottom: 5px;
`;

const StyledInput = styled.input`
  border-style: none;
  padding-left: 5px;
  border-bottom: 1px solid #37A03C;
  font-size: medium;
  &:focus {
    border-color: #297f2d;
    outline: none;
  }
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: #37A03C;
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: small;
  cursor: pointer;
  &:hover {
    background-color: #297f2d;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px; // Añade un margen inferior a cada FieldContainer
  
  &:last-child {
    margin-bottom: 0; // Elimina el margen inferior del último FieldContainer para evitar espaciado extra al final
  }
`;


// Refactorización con la misma lógica y estilos
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateUser = async (email, password) => {
    return email === "test@email.com" && password === "password"; // Simulación de validación
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidUser = await validateUser(email, password);
    if (!isValidUser) {
      setError('Usuario o contraseña incorrecta.');
    } else {
      navigate('/dashboard'); // Redirige al usuario al Dashboard
    }
  };

  return (
    <Container>
      <Card>
        <Form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <FieldContainer>
            <StyledLabel htmlFor="email">Email Address</StyledLabel>
            <StyledInput
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@devios.com"
            />
          </FieldContainer>

          <FieldContainer>
            <StyledLabel htmlFor="password">Password</StyledLabel>
            <StyledInput
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••"
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FieldContainer>

          <StyledButton type="submit">Login</StyledButton>
        </Form>
      </Card>
    </Container>
  );
}

export default App;
