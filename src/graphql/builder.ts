import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import RelayPlugin from '@pothos/plugin-relay';
import ZodPlugin from '@pothos/plugin-zod';
import { GraphQLDate } from 'graphql-scalars';

import PrismaTypes from '@/generated/pothos-types';

import { Category } from '../generated/prisma';
import { prisma } from '../lib/prisma-client';

import { Context } from './context';

export const builder = new SchemaBuilder<{
	PrismaTypes: PrismaTypes;
	Context: Context;
	Scalars: {
		Date: {
			Input: Date;
			Output: Date;
		};
	};
}>({
	plugins: [PrismaPlugin, RelayPlugin, ZodPlugin],
	relay: {},
	prisma: {
		client: prisma
	}
});

export const CategoryEnumType = builder.enumType('Category', {
	values: Object.values(Category)
});

builder.queryType({});
builder.addScalarType('Date', GraphQLDate);

// builder.mutationType({});
