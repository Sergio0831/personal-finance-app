import { builder } from './builder';
import './types/Transaction';
import './types/User';

export const schema = builder.toSchema();
