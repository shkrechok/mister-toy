import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import './styles/styles.scss';

import { store } from './store/store'
import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { Home } from './views/home'
import { About } from './views/about'
import { UserMsg } from './cmps/user-msg';
import { ToyIndex } from './views/toy-index';
import { ToyEdit } from './views/toy-edit';
import { ToyDetails } from './views/toy-details';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <section id="app" className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<About />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  );
}

