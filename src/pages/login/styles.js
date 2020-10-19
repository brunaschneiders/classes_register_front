import styled from 'styled-components';
import { Button, Box, Collapse } from '@material-ui/core';

import loginBackgroundImage from '../../assets/images/login.jpg';

export const Container = styled(Box)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  display: flex;
  background: linear-gradient(rgba(36, 60, 94, 0.3), rgba(36, 60, 94, 0.3)),
    url(${loginBackgroundImage});
  background-size: cover;
  background-position: center center;
`;

export const div = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 35%;
  height: 100%;
`;

export const UserData = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  background-color: rgba(36, 60, 94, 0.7);
  padding: 5%;
  margin: 3%;
  width: 100%;
  min-height: 45%;
`;

export const Row = styled(Box)`
  width: 100%;
  margin-bottom: 5%;
`;

export const FormButton = styled(Button)`
  height: 46px;
  width: 100%;
  padding: 0.375rem 0.75rem;
  border-radius: 3px;
`;

export const CollapseDiv = styled(Collapse)`
  height: 46px;
  width: 100%;
  padding: 0.375rem 0.75rem;
  border-radius: 3px;
  margin: 2%;
`;

export const TextButton = styled.button`
  font-size: 16px;
  color: whitesmoke;
  border: none;
  width: 100%;
  background: none;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
