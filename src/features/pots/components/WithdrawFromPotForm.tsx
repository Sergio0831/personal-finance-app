'use client';

import { ApolloError } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { type Dispatch, type SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AmountInputWithLabel } from '@/components/custom';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useWithdrawFromPotMutation } from '@/graphql/generated/output';
import {
  WithdrawFromPotSchema,
  type WithdrawFromPotSchemaType,
} from '../schemas';

type WithdrawFromPotFormProps = {
  id: string;
  name: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onAmountChange: Dispatch<SetStateAction<number>>;
};

const WithdrawFromPotForm = ({
  id,
  name,
  setIsOpen,
  onAmountChange,
}: WithdrawFromPotFormProps) => {
  const [withdrawFromPotMutation, { loading }] = useWithdrawFromPotMutation();

  const form = useForm<WithdrawFromPotSchemaType>({
    resolver: zodResolver(WithdrawFromPotSchema),
    defaultValues: {
      id,
      amount: '' as unknown as number,
    },
  });

  const potAmount = form.watch('amount') ?? 0;

  useEffect(() => {
    if (onAmountChange) {
      onAmountChange(Number(potAmount));
    }
  }, [potAmount, onAmountChange]);

  const onSubmit = async (formValues: WithdrawFromPotSchemaType) => {
    try {
      await withdrawFromPotMutation({
        variables: {
          id,
          amount: formValues.amount,
        },
        onCompleted: () => {
          form.reset();
          setIsOpen(false);
          toast.success(
            `Withdrawed money from \u2018${name}\u2019 successfully!`
          );
        },
        refetchQueries: ['GetAllPots'],
      });
    } catch (error) {
      const errorMessage =
        error instanceof ApolloError
          ? (error.graphQLErrors[0].message ?? error.message)
          : 'An unexpected error occurred';
      toast.error(errorMessage);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AmountInputWithLabel<WithdrawFromPotSchemaType>
          disabled={loading}
          error={form.formState.errors.amount}
          label="Amount to Withdraw"
          nameInSchema="amount"
          placeholder="e.g. 2000"
          type="text"
        />
        <Button className="w-full" disabled={loading} type="submit">
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Confirm Withdrawal'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default WithdrawFromPotForm;
