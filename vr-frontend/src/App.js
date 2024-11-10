import './App.css';
import MultiStepForm from './components/MultiStepForm';

function App() {
  return (
    <div className="app-container">
      <h1 className="text-4xl font-bold text-gray-800 flex justify-center items-center min-h-40">Vehicle Rental</h1>
      <MultiStepForm/>
    </div>
  );
}

export default App;
