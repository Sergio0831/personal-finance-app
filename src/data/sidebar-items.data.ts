import {
  NavBills,
  NavBudgets,
  NavOverview,
  NavPots,
  NavTransactions,
} from '@/assets/icons';

export const sidebarItems = [
  {
    icon: NavOverview,
    label: 'Overview',
    href: '/overview',
  },
  {
    icon: NavTransactions,
    label: 'Transactions',
    href: '/transactions',
  },
  {
    icon: NavBudgets,
    label: 'Budgets',
    href: '/budgets',
  },
  {
    icon: NavPots,
    label: 'Pots',
    href: '/pots',
  },
  {
    icon: NavBills,
    label: 'Recurring Bills',
    href: '/recurring-bills',
  },
];
