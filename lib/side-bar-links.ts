import {
  FaBoxOpen,
  FaChartLine,
  FaShoppingCart,
  FaStoreAlt,
  FaUserFriends,
} from 'react-icons/fa';
import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import {
  IoCalendarOutline,
  IoNotificationsOutline,
  IoPeopleSharp,
  IoSettings,
} from 'react-icons/io5';
import {
  MdAccountCircle,
  MdOutlineCategory,
  MdPeopleOutline,
} from 'react-icons/md';
import { SiGooglemarketingplatform } from 'react-icons/si';

const sideBarLinks: {
  icon: React.ElementType;
  name: string;
  disabled: boolean;
  subitems: {
    name: string;
    icon: React.ElementType;
    path: string;
    subitems?: {
      name: string;
      icon: React.ElementType;
      path: string;
    }[];
  }[];
}[] = [
  {
    icon: FaStoreAlt,
    name: 'Store',
    disabled: false,
    subitems: [
      {
        name: `Vente d'articles`,
        icon: FaShoppingCart,
        path: '/pos',
      },
      {
        name: 'Articles',
        path: '/products',
        icon: FaBoxOpen,
      },
      {
        name: 'Achat',
        path: '/purchases',
        icon: GiReceiveMoney,
      },
      {
        name: 'Clients',
        icon: FaUserFriends,
        path: '/customers',
      },
      {
        name: 'Rapports',
        icon: FaChartLine,
        path: '/reports',
      },
      { name: 'Fournisseurs', icon: FaUserFriends, path: '/suppliers' },
    ],
  },
  {
    icon: SiGooglemarketingplatform,
    name: 'Gestion des employés',
    disabled: true,
    subitems: [
      {
        name: 'Employés',
        icon: MdPeopleOutline,
        path: '/dashboard/employees',
      },
      {
        name: 'Contrôle de présence',
        icon: IoCalendarOutline,
        path: '/dashboard/new-attendance',
      },
      {
        name: 'Présence',
        icon: IoPeopleSharp,
        path: '/dashboard/attendance',
      },
      {
        name: 'Rapport de présence',
        icon: FaChartLine,
        path: '/dashboard/attendance-report',
      },
    ],
  },
  {
    icon: GiMoneyStack,
    name: 'Finances',
    disabled: true,
    subitems: [
      {
        name: 'Revenu',
        icon: GiReceiveMoney,
        path: '/finances/income',
      },
      {
        name: 'Dépenses',
        icon: GiPayMoney,
        path: '/finances/expenses',
      },
    ],
  },
  {
    icon: IoSettings,
    name: 'Paramètres',
    disabled: true,
    subitems: [
      {
        name: 'Compte',
        icon: MdAccountCircle,
        path: '/settings/account',
      },
      {
        name: 'Notifications',
        icon: IoNotificationsOutline,
        path: '/settings/notifications',
      },
      {
        name: 'Préférences',
        icon: MdOutlineCategory,
        path: '/settings/preferences',
      },
    ],
  },
];

export default sideBarLinks;
