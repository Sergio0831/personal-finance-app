import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import ZodPlugin from '@pothos/plugin-zod';
import { GraphQLDateTime } from 'graphql-scalars';

import type PrismaTypes from '@/generated/pothos-types';
import { Category } from '../generated/prisma';
import { prisma } from '../lib/prisma-client';

import type { Context } from './context';

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
  plugins: [PrismaPlugin, ZodPlugin],
  prisma: {
    client: prisma,
  },
});

export const CategoryEnumType = builder.enumType('Category', {
  values: Object.values(Category),
});

builder.queryType({});
builder.addScalarType('Date', GraphQLDateTime, {});

// builder.mutationType({});
