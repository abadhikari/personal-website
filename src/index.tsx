import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';

import App from './components/App';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: process.env.COGNITO_USER_POOL_CLIENT_ID as string,
      userPoolId: process.env.COGNITO_USER_POOL_ID as string,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
