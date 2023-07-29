import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ConfigContextProvider } from './contexts/ConfigContext.tsx';
import { DrawerContextProvider } from './contexts/DrawerContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ConfigContextProvider>
			<DrawerContextProvider>
				<App />
			</DrawerContextProvider>
		</ConfigContextProvider>
	</React.StrictMode>
);
