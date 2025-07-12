import { builder } from './builder';
import './types/Transaction';
import './types/User';
import './types/RecurringBills';
import './types/Pot';

export const schema = builder.toSchema();
