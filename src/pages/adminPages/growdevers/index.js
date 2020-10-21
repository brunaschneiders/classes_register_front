import React, { useState, useEffect } from 'react';
import moment from 'moment';
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
import { List, EditTwoTone, Delete } from '@material-ui/icons';
import api from '../../../services/api';

import Input from '../../../components/Input';
import Spinner from '../../../components/Spinner';
import ClassCard from '../../../components/Card';
import Modal from '../../../components/Modal';
import Table from '../../../components/Table';

import { Container, Box, Row } from '../../../styles/mainStyles';

export default () => {
  const [growdevers, setGrowdevers] = useState([]);
  const [selectedGrowdever, setSelectedGrowdever] = useState('');
  const [growdeverEmail, setGrowdeverEmail] = useState('');
  const [growdeverPhone, setGrowdeverPhone] = useState('');
  const [growdeverProgram, setGrowdeverProgram] = useState('');
  const [
    showScheduledGrowdevClassesModal,
    setShowScheeduledGrowdevClassesModal,
  ] = useState(false);
  const [scheduledGrowdevClasses, setScheduledGrowdevClasses] = useState([]);

  const [modalMessage, setModalMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showGrowdeverUpdateModal, setShowUpdateGrowdeverModal] = useState(
    false
  );
  const [
    showConfirmationDeleteGrowdeverModal,
    setShowConfirmationDeleteGrowdeverModal,
  ] = useState(false);
  const [loading, setLoading] = useState(false);

  const userData = useSelector((state) => state?.user);

  async function getGrowdevers() {
    setLoading(true);
    try {
      const response = await api.get(`/growdevers`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });
      setGrowdevers(
        response?.data?.growdevers.map((growdever) => {
          return {
            uid: growdever?.uid,
            name: growdever?.user?.name,
            username: growdever?.user?.username,
            program: growdever?.program,
            phone: growdever?.phone,
            email: growdever?.email,
          };
        })
      );
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage(
          'Não foi possível buscar os Growdevers. Por favor, tente novamente mais tarde.'
        );
      }
      setShowMessageModal(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    getGrowdevers();
    // eslint-disable-next-line
  }, []);

  async function getScheduledGrowdevClasses(growdever) {
    setLoading(true);
    try {
      const response = await api.get(`/growdevers/${growdever.uid}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });
      const selectedGrowdeverGrowdevClassesScheduled =
        response?.data?.growdever?.scheduled_classes;
      setScheduledGrowdevClasses(
        selectedGrowdeverGrowdevClassesScheduled.map((growdevClass) => {
          return {
            uid: growdevClass?.uid,
            status: growdevClass?.status,
            date: growdevClass?.class?.date,
            time: growdevClass?.class?.hour,
          };
        })
      );
      setLoading(false);
      setShowScheeduledGrowdevClassesModal(true);
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage(
          'Não foi possível buscar as aulas agendadas. Por favor, tente novamente mais tarde.'
        );
      }
      setShowMessageModal(true);
    }
    setLoading(false);
  }

  async function handleShowUpdateGrowdeverModal(growdever) {
    setShowUpdateGrowdeverModal(true);
    setSelectedGrowdever(growdever);
    setGrowdeverEmail(growdever.email);
    setGrowdeverPhone(growdever.phone);
    setGrowdeverProgram(growdever.program);
  }

  async function handleUpdateGrowdever(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.put(
        `/growdevers/${selectedGrowdever.uid}`,
        {
          email: growdeverEmail,
          phone: growdeverPhone,
          program: growdeverProgram,
        },
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      setLoading(false);
      if (response?.data?.message) {
        setModalMessage(response.data.message);
      } else {
        setModalMessage('Dados atualizados com sucesso!');
      }
      setShowMessageModal(true);
      setShowUpdateGrowdeverModal(false);
      getGrowdevers();
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage(
          'Não foi possível atualizar os dados do Growdever. Por favor, tente novamente mais tarde.'
        );
      }
      setShowMessageModal(true);
    }
    setGrowdeverEmail('');
    setGrowdeverPhone('');
    setGrowdeverProgram('');
  }

  async function handleShowConfirmationDeleteGrowdeverModal(growdever) {
    setShowConfirmationDeleteGrowdeverModal(true);
    setSelectedGrowdever(growdever);
  }

  async function handleDeletegrowdever() {
    setShowConfirmationDeleteGrowdeverModal(false);
    setLoading(true);
    try {
      const response = await api.delete(
        `/growdevers/${selectedGrowdever.uid}`,
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      setLoading(false);
      if (response?.data?.message) {
        setModalMessage(response.data.message);
      } else {
        setModalMessage('Growdever deletado com sucesso!');
      }
      setShowMessageModal(true);
      setGrowdevers(
        growdevers.filter(
          (growdever) => growdever.uid !== selectedGrowdever.uid
        )
      );
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage(
          'Não foi possível deletar este Growdever. Por favor, tente novamente mais tarde.'
        );
      }
      setShowMessageModal(true);
    }
    setLoading(false);
  }

  const columnsData = [
    {
      dataField: 'date',
      text: 'Data',
      sort: true,
      style: { textAlign: 'center' },
      formatter: (cell) => moment(cell).format('DD/MM/YYYY'),
    },
    {
      dataField: 'time',
      text: 'Horário',
      sort: true,
      style: { textAlign: 'center' },
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      style: { textAlign: 'center' },
    },
  ];

  return (
    <Container>
      <Row style={{ padding: '2%' }}>
        <Typography color="primary" component="h1" variant="h4">
          Growdevers
        </Typography>
      </Row>
      <Box>
        {growdevers.length === 0 && (
          <Typography component="h3" color="primary">
            Nenhum Growdever encontrado.
          </Typography>
        )}
        {growdevers.map((growdever) => {
          return (
            <ClassCard key={growdever?.uid}>
              <>
                <Avatar
                  style={{ margin: 'auto', height: '86px', width: '86px' }}
                />
                <CardContent>
                  <Typography style={{ fontWeight: 'bold' }}>
                    {growdever?.name}
                  </Typography>
                </CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Programa: {growdever?.program}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Username: {growdever?.username}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Email: {growdever?.email}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Telefone: {growdever?.phone}
                </Typography>
                <CardActions
                  style={{ justifyContent: 'center', marginTop: '5%' }}
                >
                  <Tooltip title="Visualizar Aulas Agendadas">
                    <IconButton
                      style={{ padding: '0px 10px' }}
                      onClick={() => getScheduledGrowdevClasses(growdever)}
                    >
                      <List color="secondary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Atualizar Informações">
                    <IconButton
                      style={{ padding: '0px 10px' }}
                      onClick={() => handleShowUpdateGrowdeverModal(growdever)}
                    >
                      <EditTwoTone color="secondary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Deletar Growdever">
                    <IconButton
                      style={{ padding: '0px 10px' }}
                      onClick={() =>
                        handleShowConfirmationDeleteGrowdeverModal(growdever)
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
        showModal={showScheduledGrowdevClassesModal}
        onClose={() => setShowScheeduledGrowdevClassesModal(false)}
      >
        <Table
          tableData={scheduledGrowdevClasses}
          tableColumns={columnsData}
          messageNoData="Nenhuma agendamento."
        />
      </Modal>
      <Modal
        showModal={showGrowdeverUpdateModal}
        onClose={() => setShowUpdateGrowdeverModal(false)}
      >
        <form onSubmit={handleUpdateGrowdever}>
          <Row>
            <Input
              type="text"
              label="Programa"
              value={growdeverProgram}
              onChange={(e) => setGrowdeverProgram(e.target.value)}
              required
              style={{
                marginBottom: '25px',
              }}
            />
          </Row>
          <Row>
            <Input
              type="email"
              label="Email"
              value={growdeverEmail}
              onChange={(e) => setGrowdeverEmail(e.target.value)}
              required
              style={{ marginBottom: '25px' }}
            />
          </Row>
          <Row>
            <Input
              type="text"
              label="Telefone"
              value={growdeverPhone}
              onChange={(e) => setGrowdeverPhone(e.target.value)}
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
            Atualizar informações do Growdever
          </Button>
        </form>
      </Modal>
      <Modal
        showModal={showConfirmationDeleteGrowdeverModal}
        onClose={() => setShowConfirmationDeleteGrowdeverModal(false)}
      >
        <>
          <Typography component="h3" color="primary">
            Você tem certeza que deseja deletar este Growdever?
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: '5%', height: '36px', width: '100%' }}
            onClick={() => handleDeletegrowdever()}
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
