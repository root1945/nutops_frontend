import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import ScrollTop from 'src/hooks/useScrollTop';

import 'nprogress/nprogress.css';
import { Provider } from 'react-redux';
import store from 'src/store';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SideBarContext';
import * as serviceWorker from 'src/serviceWorker';
import { AuthProvider } from 'src/contexts/JwtAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <Provider store={store}>
      <SidebarProvider>
        <BrowserRouter>
          <ScrollTop />
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </SidebarProvider>
    </Provider>
  </HelmetProvider>
);

serviceWorker.unregister();
