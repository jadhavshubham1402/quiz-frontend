// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from './component/login';
import RegisterForm from './component/register';
import { Provider } from 'react-redux';
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import HomePage from './component/home';
import TopicSelection from './component/topicSelection';
import Quiz from './component/quiz';

function App() {
  let persistor = persistStore(store);
  return (
    <div >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/topic_selection" element={<TopicSelection />} />
              <Route path="/quiz" element={<Quiz />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
