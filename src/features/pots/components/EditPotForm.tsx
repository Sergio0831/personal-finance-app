'use client';

import { ApolloError } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  AmountInputWithLabel,
  InputWithLabel,
  ThemeSelectWithLabel,
} from '@/components/custom';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { themeOptions } from '@/constants/theme';

import { useUpdatePotMutation } from '@/graphql/generated/output';
import { useUsedThemes } from '../hooks/useUsedThemes';
import { UpdatePotSchema, type UpdatePotSchemaType } from '../schemas';

const MAX_NAME_LENGTH = 30;

const EditPotForm = ({
  setIsOpen,
  id,
  name,
  target,
  theme,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
  name: string;
  target: number;
  theme: string;
}) => {
  const [updatePotMutation, { loading }] = useUpdatePotMutation();

  const usedTheme = useUsedThemes().filter((t) => t !== theme);

  const form = useForm<UpdatePotSchemaType>({
    resolver: zodResolver(UpdatePotSchema),
    defaultValues: {
      id,
      input: {
        name,
        target,
        theme,
      },
    },
  });

  const onSubmit = async (formValues: UpdatePotSchemaType) => {
    try {
      await updatePotMutation({
        variables: {
          id,
          input: formValues.input,
        },
        onCompleted: () => {
          setIsOpen(false);
          toast.success(`Pot '${formValues.input.name}' updated successfully!`);
        },
        refetchQueries: ['GetAllPots'],
      });
    } catch (error) {
      const errorMessage =
        error instanceof ApolloError
          ? error.message
          : 'An unexpected error occurred';
      toast.error(`Error updating pot: ${errorMessage}`);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputWithLabel<UpdatePotSchemaType>
          disabled={loading}
          error={form.formState.errors.input?.name}
          label="Pot Name"
          maxLength={MAX_NAME_LENGTH}
          nameInSchema="input.name"
          placeholder="e.g. Rainy Days"
          type="text"
        />
        <AmountInputWithLabel<UpdatePotSchemaType>
          disabled={loading}
          error={form.formState.errors.input?.target}
          label="Target"
          nameInSchema="input.target"
          placeholder="e.g. 2000"
          type="text"
        />
        <ThemeSelectWithLabel<UpdatePotSchemaType>
          className="mb-5"
          disabled={loading}
          error={form.formState.errors.input?.theme}
          label="Theme"
          nameInSchema="input.theme"
          options={themeOptions}
          placeholder="Select theme"
          usedThemeValues={usedTheme}
        />
        <Button className="w-full" disabled={loading} type="submit">
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Save Changes'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EditPotForm;
