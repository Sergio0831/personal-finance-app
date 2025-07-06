import { builder } from './builder';
import './types/Transaction';
import './types/User';
import './types/RecurringBills';

export const schema = builder.toSchema();
