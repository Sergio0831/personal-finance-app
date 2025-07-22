'use client';

import { ApolloError } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import SelectWithLabel from '@/components/custom/select-with-label';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { themeOptions } from '@/constants/theme';
import { InputWithLabel } from '@/features/auth/components';
import { useCreatePotMutation } from '@/graphql/generated/output';
import { CreatePotSchema, type CreatePotSchemaType } from '../schemas';

const MAX_NAME_LENGTH = 30;

const AddNewPotForm = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [createPotMutation, { loading }] = useCreatePotMutation();

  const form = useForm<CreatePotSchemaType>({
    resolver: zodResolver(CreatePotSchema),
    defaultValues: {
      input: {
        name: '',
        target: '' as unknown as number,
        theme: '#277C78',
      },
    },
  });

  const potName = form.watch('input.name');
  const charsLeft = MAX_NAME_LENGTH - potName.length;

  const onSubmit = async (formValues: CreatePotSchemaType) => {
    try {
      await createPotMutation({
        variables: {
          input: formValues.input,
        },
        onCompleted: () => {
          form.reset();
          setIsOpen(false);
          toast.success(`Pot ${formValues.input.name} created successfully!`);
        },
        refetchQueries: ['GetAllPots'],
      });
    } catch (error) {
      const errorMessage =
        error instanceof ApolloError
          ? error.message
          : 'An unexpected error occurred';
      toast.error(`Error creating pot: ${errorMessage}`);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputWithLabel<CreatePotSchemaType>
          charsLeft={charsLeft}
          disabled={loading}
          error={form.formState.errors.input?.name}
          label="Pot Name"
          maxLength={MAX_NAME_LENGTH}
          nameInSchema="input.name"
          placeholder="e.g. Rainy Days"
          type="text"
        />
        <InputWithLabel<CreatePotSchemaType>
          disabled={loading}
          error={form.formState.errors.input?.target}
          label="Target"
          nameInSchema="input.target"
          placeholder="e.g. 2000"
          type="text"
        />
        <SelectWithLabel<CreatePotSchemaType>
          className="mb-5"
          disabled={loading}
          error={form.formState.errors.input?.theme}
          isThemeSelect={true}
          label="Theme"
          nameInSchema="input.theme"
          options={themeOptions}
        />
        <Button className="w-full" disabled={loading} type="submit">
          {loading ? <Loader2 className="size-4 animate-spin" /> : 'Add Pot'}
        </Button>
      </form>
    </Form>
  );
};

export default AddNewPotForm;
