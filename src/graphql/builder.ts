import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import RelayPlugin from '@pothos/plugin-relay';
import type PrismaTypes from '@/generated/pothos-types';
import prisma from '../lib/clients/prisma-client';
import { Context } from './context';

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: Context;
}>({
  plugins: [PrismaPlugin, RelayPlugin],
  relay: {},
  prisma: {
    client: prisma,
  },
});

builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
});
