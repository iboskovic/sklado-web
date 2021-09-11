import 'react-toastify/dist/ReactToastify.css';
import MainRouter from './MainRouter';
import './styles/App.scss';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer />
      <MainRouter />
    </>
  );
}

export default App;
