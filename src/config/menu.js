import {
  faUser,
  faList,
  faUsers,
  faUserGraduate,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';

export const headerAdminMenu = [
  {
    name: 'Dados Pessoais',
    link: '/admin/personal-data',
    icon: faUser,
  },
];

export const adminMenu = [
  {
    name: 'Aulas disponíveis',
    link: '/admin/available-classes',
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

export const headerGrowdeverMenu = [
  {
    name: 'Dados Pessoais',
    link: '/growdever/personal-data',
    icon: faUser,
  },
];

export const growdeverMenu = [
  {
    name: 'Aulas disponíveis',
    link: '/growdever/available-classes',
    icon: faList,
  },
  {
    name: 'Aulas agendadas',
    link: '/growdever/scheduled-classes',
    icon: faCalendarCheck,
  },
];
