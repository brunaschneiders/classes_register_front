import React, { useState } from 'react';
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
import { LockTwoTone, EditTwoTone } from '@material-ui/icons';
import api from '../../../services/api';

import Input from '../../../components/Input';
import Spinner from '../../../components/Spinner';
import ClassCard from '../../../components/Card';
import Modal from '../../../components/Modal';

import { Container, Box, Row } from '../../../styles/mainStyles';

export default () => {
  const [growdeverEmail, setGrowdeverEmail] = useState('');
  const [growdeverPhone, setGrowdeverPhone] = useState('');
  const [
    showUpdateContactInformationsModal,
    setShowUpdateContactInformationsModal,
  ] = useState(false);
  const [userNewPassword, setUserNewPassword] = useState('');
  const [userOldPassword, setUserOldPassword] = useState('');
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const userData = useSelector((state) => state?.user);

  async function handleShowUpdateContactInformationsModal() {
    setGrowdeverEmail('');
    setGrowdeverPhone('');
    setShowUpdateContactInformationsModal(true);
  }

  async function handleUpdateContactInformations(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.put(
        `/growdevers/${userData?.user?.growdever?.uid}`,
        {
          email: growdeverEmail,
          phone: growdeverPhone,
        },
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      setLoading(false);
      if (response?.data?.message) {
        setModalMessage(response.data.message);
      } else {
        setModalMessage('Informações atualizadas com sucesso!');
      }
      setShowMessageModal(true);
      setShowUpdatePasswordModal(false);
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage(
          'Não foi possível atualizar suas informações. Por favor, tente novamente mais tarde.'
        );
      }
      setShowMessageModal(true);
    }
    setGrowdeverEmail('');
    setGrowdeverPhone('');
  }

  async function handleShowUpdatePasswordModal() {
    setUserOldPassword('');
    setUserNewPassword('');
    setShowUpdatePasswordModal(true);
  }

  async function handleUpdatePassword(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.put(
        `/users/${userData?.user?.uid}`,
        {
          username: userData?.user?.username,
          oldPassword: userOldPassword,
          password: userNewPassword,
        },
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      setLoading(false);
      if (response?.data?.message) {
        setModalMessage(response.data.message);
      } else {
        setModalMessage('Senha atualizada com sucesso!');
      }
      setShowMessageModal(true);
      setShowUpdatePasswordModal(false);
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage(
          'Não foi possível atualizar a sua senha. Por favor, tente novamente mais tarde.'
        );
      }
      setShowMessageModal(true);
    }
    setUserOldPassword('');
    setUserNewPassword('');
  }

  return (
    <Container>
      {console.log(userData)}
      <Row style={{ padding: '2%' }}>
        <Typography color="primary" component="h1" variant="h4">
          Dados pessoais
        </Typography>
      </Row>
      <Box>
        <ClassCard style={{ width: '500px', height: '380px' }}>
          <>
            <Avatar
              style={{ margin: 'auto', height: '150px', width: '150px' }}
            />
            <CardContent>
              <Typography style={{ fontWeight: 'bold' }}>
                {userData?.user?.name}
              </Typography>
            </CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Username: {userData?.user?.username}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Programa: {userData?.user?.growdever.program}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Email: {userData?.user?.growdever.email}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Telefone: {userData?.user?.growdever.phone}
            </Typography>
            <CardActions style={{ justifyContent: 'center', marginTop: '2%' }}>
              <Tooltip title="Atualizar Informações de Contato">
                <IconButton
                  onClick={() => handleShowUpdateContactInformationsModal()}
                >
                  <EditTwoTone color="secondary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Alterar Senha">
                <IconButton onClick={() => handleShowUpdatePasswordModal()}>
                  <LockTwoTone color="secondary" />
                </IconButton>
              </Tooltip>
            </CardActions>
          </>
        </ClassCard>
      </Box>
      <Modal
        showModal={showUpdateContactInformationsModal}
        onClose={() => setShowUpdateContactInformationsModal(false)}
      >
        <form onSubmit={handleUpdateContactInformations}>
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
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ height: '36px', width: '100%' }}
          >
            Atualizar Informações
          </Button>
        </form>
      </Modal>
      <Modal
        showModal={showUpdatePasswordModal}
        onClose={() => setShowUpdatePasswordModal(false)}
      >
        <form onSubmit={handleUpdatePassword}>
          <Row>
            <Input
              type="password"
              label="Senha atual"
              value={userOldPassword}
              onChange={(e) => setUserOldPassword(e.target.value)}
              required
              style={{
                marginBottom: '25px',
              }}
            />
          </Row>
          <Row>
            <Input
              type="password"
              label="Nova senha"
              value={userNewPassword}
              onChange={(e) => setUserNewPassword(e.target.value)}
              required
              style={{ marginBottom: '25px' }}
            />
          </Row>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ height: '36px', width: '100%' }}
          >
            Atualizar Senha
          </Button>
        </form>
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
