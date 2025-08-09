import { z } from 'zod';

export const DeleteBudgetSchema = z
    .object({
        id: z.string().uuid(),
    })
    .strict();

export type DeleteBudgetSchemaType = z.infer<typeof DeleteBudgetSchema>;
