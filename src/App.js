import { RouterProvider } from 'react-router-dom';
import './App.css';
import routers from './Routers/Routers/Routers';

function App() {
  return (
    <div className='max-w-screen-xl mx-auto'>
      <RouterProvider router={routers} ></RouterProvider>
    </div>
  );
}

export default App;
