import { GroupBuyRequestPage } from './_components/GroupBuyRequestPage';

interface Props {
  searchParams: Promise<{
    bakery?: string;
    neighborhood?: string;
    step?: string;
    selectedNeighborhood?: string;
    selectedBakery?: string;
  }>;
}

const page = async ({ searchParams }: Props) => {
  const { bakery, neighborhood, step, selectedNeighborhood, selectedBakery } =
    await searchParams;

  return (
    <GroupBuyRequestPage
      detectedBakery={bakery ?? null}
      detectedNeighborhood={neighborhood ?? null}
      initialStep={step === 'stores' ? 'stores' : 'form'}
      initialSelectedNeighborhood={selectedNeighborhood ?? null}
      initialSelectedBakery={selectedBakery ?? null}
    />
  );
};

export default page;
