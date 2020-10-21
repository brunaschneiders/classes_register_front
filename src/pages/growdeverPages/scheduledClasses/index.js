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
import { Delete } from '@material-ui/icons';
import api from '../../../services/api';

import Spinner from '../../../components/Spinner';
import ClassCard from '../../../components/Card';
import Modal from '../../../components/Modal';

import growdevLogo from '../../../assets/images/logoGrowdev.png';

import { Container, Box, Row } from '../../../styles/mainStyles';

export default () => {
  const [scheduledGrowdevClasses, setScheduledGrowdevClasses] = useState([]);
  const [
    selectedScheduledGrowdevClassUid,
    setSelectedScheduledGrowdevClassUid,
  ] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [
    showConfirmationDeleteSchedulingGrowdevClassModal,
    setShowConfirmationDeleteSchedulingGrowdevClassModal,
  ] = useState(false);
  const [loading, setLoading] = useState(false);

  const userData = useSelector((state) => state?.user);

  async function getScheduledGrowdevClasses() {
    setLoading(true);
    try {
      const response = await api.get(
        `/growdevers/${userData?.user?.growdever?.uid}`,
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      const schedules = response?.data?.growdever?.scheduled_classes;
      const scheduledClasses = schedules.map((schedule) => {
        return {
          uid: schedule.uid,
          class: schedule.class,
          growdeverStatus: schedule.status,
        };
      });
      setScheduledGrowdevClasses(scheduledClasses);
    } catch (error) {
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
    getScheduledGrowdevClasses();
    // eslint-disable-next-line
  }, []);

  async function handleShowConfirmationDeleteSchedulingGrowdevClassModal(
    growdevClass
  ) {
    setShowConfirmationDeleteSchedulingGrowdevClassModal(true);
    setSelectedScheduledGrowdevClassUid(growdevClass.uid);
  }

  async function handleDeleteSchedulingGrowdevClass() {
    setShowConfirmationDeleteSchedulingGrowdevClassModal(false);
    setLoading(true);
    try {
      const response = await api.delete(
        `/class-growdevers/${selectedScheduledGrowdevClassUid}`,
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      if (response?.data?.message) {
        setModalMessage(response.data.message);
      } else {
        setModalMessage('Agendamento cancelado com sucesso!');
      }
      setShowMessageModal(true);
      getScheduledGrowdevClasses();
    } catch (error) {
      if (error?.response?.data?.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage(
          'Não foi possível cancelar sua inscrição nesta aula. Por favor, tente novamente mais tarde.'
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
          Aulas agendadas
        </Typography>
      </Row>
      <Box>
        {scheduledGrowdevClasses.length === 0 && (
          <Typography component="h3" color="primary">
            Nenhum aula encontrada.
          </Typography>
        )}
        {scheduledGrowdevClasses.map((schedule) => {
          return (
            <ClassCard key={schedule.uid}>
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
                        {moment(schedule.class.date, 'YYYY-MM-DD').format(
                          'DD/MM/YY'
                        )}
                      </Typography>
                    </div>
                    <div style={{ paddingLeft: '5%' }}>
                      <Typography component="h3" style={{ fontWeight: 'bold' }}>
                        Horário?
                      </Typography>
                      <Typography variant="body2">
                        {moment(schedule.class.hour, 'hh:mm:ss').format(
                          'HH:mm'
                        )}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Status da Aula: {schedule.class.status}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Meu Status: {schedule.status}
                </Typography>
                <CardActions
                  style={{
                    justifyContent: 'center',
                    padding: 0,
                    marginTop: '2%',
                  }}
                >
                  <Tooltip title="Cancelar Agendamento">
                    <IconButton
                      style={{ padding: 0 }}
                      onClick={() =>
                        handleShowConfirmationDeleteSchedulingGrowdevClassModal(
                          schedule
                        )
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
        showModal={showConfirmationDeleteSchedulingGrowdevClassModal}
        onClose={() =>
          setShowConfirmationDeleteSchedulingGrowdevClassModal(false)
        }
      >
        <>
          <Typography component="h3" color="primary">
            Você tem certeza que quer cancelar este agendamento?
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: '5%', height: '36px', width: '100%' }}
            onClick={() => handleDeleteSchedulingGrowdevClass()}
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
