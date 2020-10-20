import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import {
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Add, EditTwoTone, Delete } from '@material-ui/icons';
import api from '../../../services/api';

import Input from '../../../components/Input';
import Spinner from '../../../components/Spinner';
import ClassCard from '../../../components/Card';
import Modal from '../../../components/Modal';
import Table from '../../../components/Table';

import growdevLogo from '../../../assets/images/logoGrowdev.png';

import { Container, Box, Row } from '../../../styles/mainStyles';

export default () => {
  const [growdevClasses, setGrowdevClasses] = useState([]);
  const [selectedGrowdevClassUid, setSelectedGrowdevClassUid] = useState('');
  const [growdevClassDate, setGrowdevClassDate] = useState();
  const [growdevClassTime, setGrowdevClassTime] = useState();
  const [growdevClassStatus, setGrowdevClassStatus] = useState('');
  const [
    growdevClassAvailableVacancies,
    setGrowdevClassAvailableVacancies,
  ] = useState('');
  const [
    selectedGrowdevClassEnrolledGrowdevers,
    setSelectedGrowdevClassEnrolledGrowdevers,
  ] = useState([]);
  const [
    selectedScheduledGrowdeverUid,
    setSelectedScheduledGrowdeverUid,
  ] = useState('');
  const [growdeverStatus, setGrowdeverStatus] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [
    showGrowdevClassRegisterModal,
    setShowGrowdevClassRegisterModal,
  ] = useState(false);
  const [showGrowdeversDataModal, setShowGrowdeversDataModal] = useState(false);
  const [
    showUpdateGrowdeverStatusModal,
    setShowUpdateGrowdeverStatusModal,
  ] = useState(false);
  const [
    showUpdateGrowdevClassModal,
    setShowUpdateGrowdevClassModal,
  ] = useState(false);
  const [
    showConfirmationDeleteGrowdevClassModal,
    setShowConfirmationSchedulingGrowdevClassModal,
  ] = useState(false);
  const [loading, setLoading] = useState(false);

  const userData = useSelector((state) => state?.user);

  async function getGrowdevClasses() {
    setLoading(true);
    try {
      const response = await api.get(`/classes`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });
      setGrowdevClasses(response?.data?.classes);
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage(
          'Não foi possível buscar estas aulas. Por favor, tente novamente mais tarde.'
        );
      }
      setShowMessageModal(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    getGrowdevClasses();
    // eslint-disable-next-line
  }, []);

  async function handleShowCreateGrowdevClassModal() {
    setShowGrowdevClassRegisterModal(true);
    setGrowdevClassDate(moment(new Date()).format('YYYY-MM-DD'));
    setGrowdevClassTime(moment(new Date()).format('HH:mm'));
    setGrowdevClassStatus('');
    setGrowdevClassAvailableVacancies('');
  }

  async function handleCreateNewGrowdevClass(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(
        `/classes`,
        {
          date: moment(growdevClassDate).format('YYYY-MM-DD'),
          hour: growdevClassTime,
          status: growdevClassStatus,
          available_vacancies: growdevClassAvailableVacancies,
        },
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      setLoading(false);
      if (response?.data?.message) {
        setModalMessage(response.data.message);
      } else {
        setModalMessage('Aula cadastrada com sucesso!');
      }
      setShowMessageModal(true);
      setShowGrowdevClassRegisterModal(false);
      getGrowdevClasses();
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage(
          'Não foi possível cadastrar esta aula. Por favor, tente novamente mais tarde.'
        );
      }
      setShowMessageModal(true);
    }
    setGrowdevClassStatus('');
    setGrowdevClassAvailableVacancies('');
    setLoading(false);
  }

  async function getEnrolledsGrowdevers(growdevClassUid) {
    setLoading(true);
    try {
      setSelectedGrowdevClassUid(growdevClassUid);
      const response = await api.get(`/classes/${growdevClassUid}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });
      const selectedGrowdevClassesScheduled =
        response?.data?.growdevClass?.scheduled_class;
      setSelectedGrowdevClassEnrolledGrowdevers(
        selectedGrowdevClassesScheduled.map((growdevClass) => {
          return {
            uid: growdevClass?.uid,
            avatar: <Avatar style={{ margin: 'auto' }} />,
            name: growdevClass?.growdever?.user?.name,
            program: growdevClass?.growdever?.program,
            status: growdevClass?.status,
          };
        })
      );
      setLoading(false);
      setShowGrowdeversDataModal(true);
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

  async function handleShowUpdateGrowdeverStatusModal(scheduled) {
    setShowUpdateGrowdeverStatusModal(true);
    setSelectedScheduledGrowdeverUid(scheduled?.uid);
    setGrowdeverStatus(scheduled?.status);
  }

  async function handleUpdateGrowdeverStatus(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(
        `/class-growdevers/${selectedScheduledGrowdeverUid}`,
        {
          status: growdeverStatus,
        },
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      setLoading(false);
      setModalMessage('Status atualizado com sucesso!');
      setShowUpdateGrowdeverStatusModal(false);
      setShowMessageModal(true);
      await getEnrolledsGrowdevers(selectedGrowdevClassUid);
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage(
          'Não foi possível atualizar o status deste growdever. Por favor, tente novamente mais tarde.'
        );
      }
      setShowMessageModal(true);
    }
    setGrowdeverStatus('');
    setLoading(false);
  }

  async function handleShowUpdateGrowdevClassModal(growdevClass) {
    setShowUpdateGrowdevClassModal(true);
    setSelectedGrowdevClassUid(growdevClass?.uid);
    setGrowdevClassDate(growdevClass?.date);
    setGrowdevClassTime(growdevClass?.hour);
    setGrowdevClassStatus(growdevClass?.status);
    setGrowdevClassAvailableVacancies(growdevClass?.available_vacancies);
  }

  async function handleUpdateGrowdevClass(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.put(
        `/classes/${selectedGrowdevClassUid}`,
        {
          date: moment(growdevClassDate).format('YYYY-MM-DD'),
          hour: growdevClassTime,
          status: growdevClassStatus,
          available_vacancies: growdevClassAvailableVacancies,
        },
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      setLoading(false);
      if (response?.data?.message) {
        setModalMessage(response.data.message);
      } else {
        setModalMessage('Aula atualizada com sucesso!');
      }
      setShowUpdateGrowdevClassModal(false);
      setShowMessageModal(true);
      getGrowdevClasses();
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage(
          'Não foi possível atualizar os dados desta aula. Por favor, tente novamente mais tarde.'
        );
      }
      setShowMessageModal(true);
    }
    setLoading(false);
  }

  async function handleShowConfirmationSchedulingGrowdevClassModal(
    growdevClass
  ) {
    setShowConfirmationSchedulingGrowdevClassModal(true);
    setSelectedGrowdevClassUid(growdevClass.uid);
  }

  async function handleSchedulingGrowdevClass() {
    setShowConfirmationSchedulingGrowdevClassModal(false);
    setLoading(true);
    try {
      const response = await api.post(
        `/class-growdevers`,
        {
          date: moment(growdevClassDate).format('YYYY-MM-DD'),
          hour: growdevClassTime,
          status: growdevClassStatus,
          available_vacancies: growdevClassAvailableVacancies,
        },
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      setLoading(false);
      if (response?.data?.message) {
        setModalMessage(response.data.message);
      } else {
        setModalMessage('Aula cancelada com sucesso!');
      }
      setShowMessageModal(true);
      setGrowdevClasses(
        growdevClasses.filter(
          (growdevClass) => growdevClass.uid !== selectedGrowdevClassUid
        )
      );
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage(
          'Não foi possível cancelar esta aula. Por favor, tente novamente mais tarde.'
        );
      }
      setShowMessageModal(true);
    }
    setLoading(false);
  }

  const columnsData = [
    {
      dataField: 'avatar',
      text: 'Growdever',
      style: { textAlign: 'center' },
    },
    {
      dataField: 'name',
      text: 'Nome',
      sort: true,
      style: { textAlign: 'center' },
    },
    {
      dataField: 'program',
      text: 'Programa',
      sort: true,
      style: { textAlign: 'center' },
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      style: { textAlign: 'center' },
    },
    {
      dataField: '',
      text: 'Ação',
      style: { textAlign: 'center' },
      formatter: (cell, row) => (
        <Tooltip title="Atualizar Status">
          <IconButton onClick={() => handleShowUpdateGrowdeverStatusModal(row)}>
            <EditTwoTone color="secondary" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Container>
      <Row style={{ padding: '2%' }}>
        <Typography color="primary" component="h1" variant="h4">
          Aulas disponíveis
        </Typography>
      </Row>
      <Box>
        {growdevClasses.map((growdevClass) => {
          return (
            <ClassCard key={growdevClass.uid}>
              <>
                <CardMedia
                  component="img"
                  alt="Logo Growdev"
                  height="85"
                  image={growdevLogo}
                />
                <CardContent>
                  <div style={{ display: 'flex' }}>
                    <div
                      style={{
                        borderRight: '1px solid gray',
                        paddingRight: '5%',
                      }}
                    >
                      <Typography component="h3" style={{ fontWeight: 'bold' }}>
                        Quando?
                      </Typography>
                      <Typography variant="body2">
                        {moment(growdevClass.date, 'YYYY-MM-DD').format(
                          'DD/MM/YY'
                        )}
                      </Typography>
                    </div>
                    <div style={{ paddingLeft: '5%' }}>
                      <Typography component="h3" style={{ fontWeight: 'bold' }}>
                        Horário?
                      </Typography>
                      <Typography variant="body2">
                        {moment(growdevClass.hour, 'hh:mm:ss').format('HH:mm')}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Status: {growdevClass.status}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Vagas restantes: {growdevClass.available_vacancies}
                </Typography>
                <CardActions
                  style={{
                    justifyContent: 'center',
                    padding: 0,
                    marginTop: '2%',
                  }}
                >
                  <Tooltip title="Fazer inscrição">
                    <IconButton
                      style={{ padding: 0 }}
                      onClick={() =>
                        handleShowConfirmationSchedulingGrowdevClassModal(
                          growdevClass
                        )
                      }
                    >
                      <Add color="secondary" />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </>
            </ClassCard>
          );
        })}
      </Box>
      <Modal
        showModal={showGrowdevClassRegisterModal}
        onClose={() => setShowGrowdevClassRegisterModal(false)}
      >
        <form onSubmit={handleCreateNewGrowdevClass}>
          <Row>
            <Input
              type="date"
              label="Quando?"
              value={growdevClassDate}
              onChange={(e) => setGrowdevClassDate(e.target.value)}
              required
              style={{
                marginRight: '10px',
                marginBottom: '25px',
              }}
            />
            <Input
              type="time"
              label="Horário?"
              value={growdevClassTime}
              onChange={(e) => setGrowdevClassTime(e.target.value)}
              required
              style={{ marginLeft: '10px', marginBottom: '25px' }}
            />
          </Row>
          <Row>
            <Input
              type="text"
              label="Status"
              value={growdevClassStatus}
              onChange={(e) => setGrowdevClassStatus(e.target.value)}
              required
              style={{ marginRight: '10px' }}
            />
            <Input
              type="number"
              label="Vagas disponíveis"
              value={growdevClassAvailableVacancies}
              onChange={(e) =>
                setGrowdevClassAvailableVacancies(e.target.value)
              }
              required
              style={{ marginLeft: '10px' }}
            />
          </Row>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ marginTop: '5%', height: '36px', width: '100%' }}
          >
            Cadastrar Aula
          </Button>
        </form>
      </Modal>
      <Modal
        showModal={showGrowdeversDataModal}
        onClose={() => setShowGrowdeversDataModal(false)}
      >
        <Table
          tableData={selectedGrowdevClassEnrolledGrowdevers}
          tableColumns={columnsData}
          messageNoData="Nenhum Growdever inscrito nesta aula."
        />
      </Modal>
      <Modal
        showModal={showUpdateGrowdeverStatusModal}
        onClose={() => setShowUpdateGrowdeverStatusModal(false)}
      >
        <form onSubmit={handleUpdateGrowdeverStatus}>
          <Input
            type="text"
            label="Status"
            value={growdeverStatus}
            onChange={(e) => setGrowdeverStatus(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ marginTop: '5%', height: '36px', width: '100%' }}
          >
            Atualizar Status
          </Button>
        </form>
      </Modal>
      <Modal
        showModal={showUpdateGrowdevClassModal}
        onClose={() => setShowUpdateGrowdevClassModal(false)}
      >
        <form onSubmit={handleUpdateGrowdevClass}>
          <Row>
            <Input
              type="date"
              label="Quando?"
              value={growdevClassDate}
              onChange={(e) => setGrowdevClassDate(e.target.value)}
              required
              style={{
                marginRight: '10px',
                marginBottom: '25px',
              }}
            />
            <Input
              type="time"
              label="Horário?"
              value={growdevClassTime}
              onChange={(e) => setGrowdevClassTime(e.target.value)}
              required
              style={{ marginLeft: '10px', marginBottom: '25px' }}
            />
          </Row>
          <Row>
            <Input
              type="text"
              label="Status"
              value={growdevClassStatus}
              onChange={(e) => setGrowdevClassStatus(e.target.value)}
              required
              style={{
                marginRight: '10px',
              }}
            />
            <Input
              type="number"
              label="Vagas disponíveis"
              value={growdevClassAvailableVacancies}
              onChange={(e) =>
                setGrowdevClassAvailableVacancies(e.target.value)
              }
              required
              style={{
                marginLeft: '10px',
              }}
            />
          </Row>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ marginTop: '5%', height: '36px', width: '100%' }}
          >
            Atualizar Aula
          </Button>
        </form>
      </Modal>
      <Modal
        showModal={showConfirmationDeleteGrowdevClassModal}
        onClose={() => setShowConfirmationSchedulingGrowdevClassModal(false)}
      >
        <>
          <Typography component="h3" color="primary">
            Você quer se inscrever para participar desta aula?
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: '5%', height: '36px', width: '100%' }}
            onClick={() => handleSchedulingGrowdevClass()}
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
