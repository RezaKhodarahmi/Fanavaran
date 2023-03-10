import React , { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client';

// ** Toast
import { Toaster } from 'react-hot-toast'

// ** Spinner (Splash Screen)
import Spinner from './core/components/spinner/Fallback-spinner'

// ** PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'

// ** React Hot Toast Styles
import './core/scss/react/libs/react-hot-toasts/react-hot-toasts.scss'

// ** Core styles
import './core/assets/fonts/feather/iconfont.css'
import './core/scss/core.scss'
import './assets/scss/style.scss'

//import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import Store from "./Store";

// ** Lazy load app
const LazyApp = lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <React.StrictMode>
      <Suspense fallback={<Spinner />}>
        <LazyApp />
      </Suspense>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
