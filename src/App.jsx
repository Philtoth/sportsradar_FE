import './App.css'
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import AnimatedRoutes from './components/AnimatedRoutes';

export default function App() {

  // render main
  return (
    <DataProvider>
    {
      <div className="w-full min-h-screen m-0 text-center bg-indigo-500">
        <Navbar/>
        <main className="p-3">
          <AnimatedRoutes/>
        </main>
      </div>
    }
    </DataProvider>

  )
}
