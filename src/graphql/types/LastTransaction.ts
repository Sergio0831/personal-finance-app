// src/graphql/types/LastTransaction.ts
import type { Transaction } from '../../generated/prisma';
import { builder } from '../builder';

export type LastTransaction = Pick<
    Transaction,
    'id' | 'avatar' | 'name' | 'amount' | 'date'
>;

export const LastTransactionRef = builder
    .objectRef<LastTransaction>('LastTransaction')

export const LastTransaction = LastTransactionRef.implement({
    fields: (t) => ({
        id: t.exposeID('id', { nullable: false }),
        avatar: t.exposeString('avatar', { nullable: false }),
        name: t.exposeString('name', { nullable: false }),
        amount: t.exposeFloat('amount', { nullable: false }),
        date: t.expose('date', { type: 'Date', nullable: false }),
    }),
})



