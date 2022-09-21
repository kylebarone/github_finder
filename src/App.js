import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Alert from './components/layout/Alert';
import About from './pages/About';
import NotFound from './pages/NotFound';
import User from './pages/User';
import { GithubProvider } from './contexts/github/GithubContext';
import { AlertProvider } from './contexts/alert/AlertContext';

function App() {
  return (
    <GithubProvider>
      <AlertProvider>
      <BrowserRouter>
        <div className='flex flex-col justify-between h-screen'>
          <Navbar />
          <main className='container mx-auto px-3 pb-12'>
            <Alert />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/notfound' element={<NotFound />} />
              <Route path='/*' element={<NotFound />} />
              <Route path='/user/:login' element={<User />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
      </AlertProvider>
    </GithubProvider>
  );
}

export default App;
