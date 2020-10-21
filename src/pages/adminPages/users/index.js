import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Typography,
  Button,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Add, Delete } from '@material-ui/icons';
import api from '../../../services/api';

import Input from '../../../components/Input';
import Spinner from '../../../components/Spinner';
import ClassCard from '../../../components/Card';
import Modal from '../../../components/Modal';

import { Container, Box, Row } from '../../../styles/mainStyles';

export default () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [userName, setUserName] = useState('');
  const [userUsername, setUserUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [growdeverEmail, setGrowdeverEmail] = useState('');
  const [growdeverPhone, setGrowdeverPhone] = useState('');
  const [growdeverProgram, setGrowdeverProgram] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showUserRegisterModal, setShowUserRegisterModal] = useState(false);
  const [showGrowdeverRegisterModal, setShowGrowdeverRegisterModal] = useState(
    false
  );
  const [
    showConfirmationDeleteUserModal,
    setShowConfirmationDeleteUserModal,
  ] = useState(false);
  const [loading, setLoading] = useState(false);

  const userData = useSelector((state) => state?.user);

  async function getUsers() {
    setLoading(true);
    try {
      const response = await api.get(`/users`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });
      setUsers(response?.data?.users.filter((user) => user?.type !== 'Admin'));
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage(
          'Não foi possível buscar os usuários. Por favor, tente novamente mais tarde.'
        );
      }
      setShowMessageModal(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  async function handleShowCreateUserModal() {
    setUserName('');
    setUserUsername('');
    setUserPassword('');
    setShowUserRegisterModal(true);
  }

  async function handleCreateNewUser(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(
        `/users`,
        {
          name: userName,
          type: 'Growdever',
          username: userUsername,
          password: userPassword,
        },
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      setLoading(false);
      if (response?.data?.message) {
        setModalMessage(response.data.message);
      } else {
        setModalMessage('Usuário cadastrado com sucesso!');
      }
      setShowMessageModal(true);
      setShowUserRegisterModal(false);
      getUsers();
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage(
          'Não foi possível cadastrar este usuário. Por favor, tente novamente mais tarde.'
        );
      }
      setShowMessageModal(true);
    }
    setUserName('');
    setUserUsername('');
    setUserPassword('');
  }

  async function handleShowRegisterGrowdeverModal(user) {
    if (user?.growdever !== null) {
      setModalMessage(
        'Este usuário já está matriculado. Se necessário, verifique os seus dados em "Growdevers"'
      );
      setShowMessageModal(true);
    } else {
      setSelectedUser(user);
      setGrowdeverEmail('');
      setGrowdeverPhone('');
      setGrowdeverProgram('');
      setShowGrowdeverRegisterModal(true);
    }
  }

  async function handleRegisterGrowdever(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(
        `/growdevers`,
        {
          email: growdeverEmail,
          phone: growdeverPhone,
          program: growdeverProgram,
          user_uid: selectedUser?.uid,
        },
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      setLoading(false);
      if (response?.data?.message) {
        setModalMessage(response.data.message);
      } else {
        setModalMessage('Growdever matriculado com sucesso!');
      }
      setShowMessageModal(true);
      setShowGrowdeverRegisterModal(false);
      getUsers();
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage(
          'Não foi possível matricular o Growdever. Por favor, tente novamente mais tarde.'
        );
      }
      setShowMessageModal(true);
    }
    setUserName('');
    setUserUsername('');
    setUserPassword('');
  }

  async function handleShowConfirmationDeleteUserModal(user) {
    setShowConfirmationDeleteUserModal(true);
    setSelectedUser(user);
  }

  async function handleDeleteUser() {
    setShowConfirmationDeleteUserModal(false);
    setLoading(true);
    try {
      const response = await api.delete(`/users/${selectedUser.uid}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });
      setLoading(false);
      if (response?.data?.message) {
        setModalMessage(response.data.message);
      } else {
        setModalMessage('Usuário deletado com sucesso!');
      }
      setShowMessageModal(true);
      setUsers(users.filter((user) => user.uid !== selectedUser.uid));
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage(
          'Não foi possível deletar este usuário. Por favor, tente novamente mais tarde.'
        );
      }
      setShowMessageModal(true);
    }
    setLoading(false);
  }

  return (
    <Container>
      <Row style={{ padding: '2%' }}>
        <Typography color="primary" component="h1" variant="h4">
          Usuários
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleShowCreateUserModal()}
        >
          Cadastrar um novo usuário
        </Button>
      </Row>
      <Box>
        {users.length === 0 && (
          <Typography component="h3" color="primary">
            Nenhum usuário encontrado.
          </Typography>
        )}
        {users.map((user) => {
          return (
            <ClassCard key={user?.uid}>
              <>
                <Avatar
                  style={{ margin: 'auto', height: '86px', width: '86px' }}
                />
                <CardContent>
                  <Typography style={{ fontWeight: 'bold' }}>
                    {user?.name}
                  </Typography>
                </CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Username: {user?.username}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  É Growdever? {user?.growdever === null ? 'Não' : 'Sim'}
                </Typography>
                <CardActions
                  style={{ justifyContent: 'center', marginTop: '5%' }}
                >
                  <Tooltip title="Fazer Matrícula">
                    <IconButton
                      style={{ padding: '0px 10px' }}
                      onClick={() => handleShowRegisterGrowdeverModal(user)}
                    >
                      <Add color="secondary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Deletar Usuário">
                    <IconButton
                      style={{ padding: '0px 10px' }}
                      onClick={() =>
                        handleShowConfirmationDeleteUserModal(user)
                      }
                    >
                      <Delete color="secondary" />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </>
            </ClassCard>
          );
        })}
      </Box>
      <Modal
        showModal={showUserRegisterModal}
        onClose={() => setShowUserRegisterModal(false)}
      >
        <form onSubmit={handleCreateNewUser}>
          <Row>
            <Input
              type="text"
              label="Nome"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              style={{
                marginBottom: '25px',
              }}
            />
          </Row>
          <Row>
            <Input
              type="text"
              label="Username"
              value={userUsername}
              onChange={(e) => setUserUsername(e.target.value)}
              required
              style={{ marginBottom: '25px' }}
            />
          </Row>
          <Row>
            <Input
              type="text"
              label="Senha"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
              style={{ marginBottom: '15px' }}
            />
          </Row>

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ marginTop: '5%', height: '36px', width: '100%' }}
          >
            Cadastrar Usuário
          </Button>
        </form>
      </Modal>
      <Modal
        showModal={showGrowdeverRegisterModal}
        onClose={() => setShowGrowdeverRegisterModal(false)}
      >
        <form onSubmit={handleRegisterGrowdever}>
          <Row>
            <Input
              type="email"
              label="Email"
              value={growdeverEmail}
              onChange={(e) => setGrowdeverEmail(e.target.value)}
              required
              style={{
                marginBottom: '25px',
              }}
            />
          </Row>
          <Row>
            <Input
              type="text"
              label="Telefone"
              value={growdeverPhone}
              onChange={(e) => setGrowdeverPhone(e.target.value)}
              required
              style={{ marginBottom: '25px' }}
            />
          </Row>
          <Row>
            <Input
              type="text"
              label="Programa"
              value={growdeverProgram}
              onChange={(e) => setGrowdeverProgram(e.target.value)}
              required
              style={{ marginBottom: '15px' }}
            />
          </Row>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ marginTop: '5%', height: '36px', width: '100%' }}
          >
            Cadastrar Growdever
          </Button>
        </form>
      </Modal>
      <Modal
        showModal={showConfirmationDeleteUserModal}
        onClose={() => setShowConfirmationDeleteUserModal(false)}
      >
        <>
          <Typography component="h3" color="primary">
            Você tem certeza que deseja deletar este usuário?
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: '5%', height: '36px', width: '100%' }}
            onClick={() => handleDeleteUser()}
          >
            Confirmar
          </Button>
        </>
      </Modal>
      <Modal
        showModal={showMessageModal}
        onClose={() => setShowMessageModal(false)}
      >
        <Typography component="h3" color="primary">
          {modalMessage}
        </Typography>
      </Modal>
      <Spinner visible={loading} />
    </Container>
  );
};
