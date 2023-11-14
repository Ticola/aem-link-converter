import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import InputForm from './components/InputForm';
import Footer from './components/Footer';

function App() {

  return (
    <div className="flex flex-col min-h-screen bg-slate-800">
      <Header />
      <main className="flex-grow">
        <MainContent />
        <div className="mx-auto max-w-4xl p-4">
          <InputForm />
        </div>
      </main>
      <Footer />
    </div>
  );  
}

export default App;
