import React from 'react';
import ItemSummary from './ItemSummary';
import JoinForm from './JoinForm';
import AgreeTerms from './AgreeTerms';
import PaymentButton from './PaymentButton';

const JoinPageClient = () => {
  return (
    <div className="bg-bg-white-muted p-4">
      <ItemSummary />
      <JoinForm />
      <AgreeTerms />
      <PaymentButton price={18000} />
    </div>
  );
};

export default JoinPageClient;
