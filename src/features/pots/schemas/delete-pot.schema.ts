import { z } from 'zod';

export const DeletePotSchema = z
  .object({
    id: z.string().uuid(),
  })
  .strict();

export type DeletePotSchemaType = z.infer<typeof DeletePotSchema>;
