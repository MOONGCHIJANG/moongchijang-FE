import React from 'react';
import { NotificationPage } from '@/api/generated/api.schemas';

type NoticeClientProps = {
  data: NotificationPage;
};

const NoticeClient = ({ data }: NoticeClientProps) => {
  return <div>NoticeClient {JSON.stringify(data)}</div>;
};

export default NoticeClient;
