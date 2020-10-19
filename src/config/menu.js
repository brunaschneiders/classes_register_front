import {
  faUser,
  faList,
  faUsers,
  faUserGraduate,
} from '@fortawesome/free-solid-svg-icons';

export const headerMenu = [
  {
    name: 'Dados Pessoais',
    link: '/personal-data',
    icon: faUser,
  },
];

export const menu = [
  {
    name: 'Aulas disponíveis',
    link: '/',
    icon: faList,
  },
  {
    name: 'Usuários',
    link: '/admin/users',
    icon: faUsers,
  },
  {
    name: 'Growdevers',
    link: '/admin/growdevers',
    icon: faUserGraduate,
  },
];
