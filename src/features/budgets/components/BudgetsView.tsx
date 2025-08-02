import { useGetAllBudgetsQuery } from '@/graphql/generated/output';

const BudgetsView = () => {
  const { data, loading } = useGetAllBudgetsQuery();

  return <div className="">BudgetsView</div>;
};

export default BudgetsView;
