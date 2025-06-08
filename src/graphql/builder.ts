import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import RelayPlugin from '@pothos/plugin-relay';
import ZodPlugin from '@pothos/plugin-zod';

import PrismaTypes from '@/generated/pothos-types';

import prisma from '../lib/clients/prisma-client';

import { Context } from './context';

export const builder = new SchemaBuilder<{
	PrismaTypes: PrismaTypes;
	Context: Context;
}>({
	plugins: [PrismaPlugin, RelayPlugin, ZodPlugin],
	relay: {},
	prisma: {
		client: prisma
	}
});

builder.queryType({});

// builder.mutationType({});
