import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import api from '../../services/api';

import Input from '../../components/Input';
import Spinner from '../../components/Spinner';

import logoGrowdevImage from '../../assets/images/logoGrowdev.png';

import {
  Container,
  div as Box,
  UserData,
  Row,
  FormButton,
  CollapseDiv as Collapse,
  TextButton,
} from './styles';

import * as userActions from '../../store/user/action';

export default () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [createNew, setCreateNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [messageSuccessAlert, setMessageSuccessAlert] = useState();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [messageErrorAlert, setMessageErrorAlert] = useState();

  const dispatch = useDispatch();

  async function handleStoreUser(e) {
    e.preventDefault();
    setShowAlert(false);
    setShowErrorAlert(false);
    setShowSuccessAlert(false);
    setLoading(true);
    try {
      const response = await api.post('/users', {
        name,
        type: 'Growdever',
        username,
        password,
      });

      setLoading(false);
      setShowSuccessAlert(true);
      setShowAlert(true);
      if (response?.data?.message) {
        setMessageSuccessAlert(response?.data?.message);
      } else {
        setMessageSuccessAlert('Usuário cadastrado!');
      }
      setCreateNew(false);
    } catch (error) {
      setLoading(false);
      setShowErrorAlert(true);
      setShowAlert(true);
      if (error?.response?.data?.message) {
        setMessageErrorAlert(error?.response?.data?.message);
      } else {
        setMessageErrorAlert(
          'Erro ao tentar cadastrar o usuário. Tente novamente mais tarde.'
        );
      }
    }
    setName('');
    setUsername('');
    setPassword('');
    setLoading(false);
  }

  async function handleStoreLogin(e) {
    e.preventDefault();
    setShowAlert(false);
    setShowErrorAlert(false);
    setShowSuccessAlert(false);
    setLoading(true);
    try {
      const response = await api.post('/login', {
        username,
        password,
      });

      if (response?.data?.token) {
        dispatch(userActions.login(response.data));
      }
    } catch (error) {
      setLoading(false);
      setShowErrorAlert(true);
      setShowAlert(true);
      if (error?.response?.data?.message) {
        setMessageErrorAlert(error?.response?.data?.message);
      } else {
        setMessageErrorAlert(
          'Erro ao tentar logar. Tente novamente mais tarde.'
        );
      }
    }
    setUsername('');
    setPassword('');
    setLoading(false);
  }

  return (
    <Container>
      <Spinner visible={loading} />
      <Box>
        <img src={logoGrowdevImage} alt="Logo Growdev" />
        <Typography color="secondary">Agendamento de aulas</Typography>

        <UserData onSubmit={createNew ? handleStoreUser : handleStoreLogin}>
          {createNew && (
            <Row>
              <Input
                type="text"
                label="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Row>
          )}
          <Row>
            <Input
              type="text"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Row>
          <Row>
            <Input
              type="password"
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Row>
          <FormButton type="submit" variant="contained" color="secondary">
            {createNew ? 'Cadastre-se' : 'Entrar'}
          </FormButton>
        </UserData>

        <Collapse in={showAlert}>
          {showErrorAlert && (
            <Alert severity="error">{messageErrorAlert}</Alert>
          )}
          {showSuccessAlert && (
            <Alert severity="success">{messageSuccessAlert}</Alert>
          )}
        </Collapse>

        {createNew ? (
          <TextButton onClick={() => setCreateNew(false)}>
            Já possui uma conta?
          </TextButton>
        ) : (
          <TextButton onClick={() => setCreateNew(true)}>
            Ainda não possui uma conta?
          </TextButton>
        )}
      </Box>

      <a
        href="https://br.freepik.com/vetores/fundo"
        style={{ color: 'white', fontSize: '12px' }}
      >
        Fundo vetor criado por freepik - br.freepik.com
      </a>
    </Container>
  );
};
