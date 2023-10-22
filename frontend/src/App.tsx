import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/Form/RegistrationForm';

function App() {
	return (
		<BrowserRouter>
			<div className='container'>
				<Routes>
					<Route path='/registration' Component={RegistrationForm} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
