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
import { Add } from '@material-ui/icons';
import api from '../../../services/api';

import Spinner from '../../../components/Spinner';
import ClassCard from '../../../components/Card';
import Modal from '../../../components/Modal';

import growdevLogo from '../../../assets/images/logoGrowdev.png';

import { Container, Box, Row } from '../../../styles/mainStyles';

export default () => {
  const [growdevClasses, setGrowdevClasses] = useState([]);
  const [selectedGrowdevClassUid, setSelectedGrowdevClassUid] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
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
          growdever_uid: userData?.user?.growdever?.uid,
          class_uid: selectedGrowdevClassUid,
        },
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      if (response?.data?.message) {
        setModalMessage(response.data.message);
      } else {
        setModalMessage('Sua inscrição nesta aula foi efetuada com sucesso!');
      }
      setShowMessageModal(true);
      getGrowdevClasses();
    } catch (error) {
      if (error?.response?.data?.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage(
          'Não foi possível efetuar sua inscrição nesta aula. Por favor, tente novamente mais tarde.'
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
          Aulas disponíveis
        </Typography>
      </Row>
      <Box>
        {growdevClasses.length === 0 && (
          <Typography component="h3" color="primary">
            Nenhum aula encontrada.
          </Typography>
        )}
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
                  <Tooltip title="Fazer Inscrição">
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
