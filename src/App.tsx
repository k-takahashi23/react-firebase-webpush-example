import React from 'react';
import { NotificationForm } from './components/NotificationForm'

interface Props {}

export const App: React.FC<Props> = () => {
  return (
    <div className="App">
      <NotificationForm />
    </div>
  );
}
