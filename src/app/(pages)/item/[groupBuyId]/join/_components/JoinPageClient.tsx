import React from 'react';
import ItemSummary from './ItemSummary';
import JoinForm from './JoinForm';
import AgreeTerms from './AgreeTerms';
import PaymentButton from './PaymentButton';

const JoinPageClient = () => {
  return (
    <>
      <ItemSummary />
      <JoinForm />
      <AgreeTerms />
      <PaymentButton />
    </>
  );
};

export default JoinPageClient;
