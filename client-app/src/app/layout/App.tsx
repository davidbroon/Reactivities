import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
	const AppLayout = () => {
		return (
			<>
				<NavBar />
				<Container style={{ marginTop: '7em' }}>
					<Outlet />
				</Container>
			</>
		);
	};

	const location = useLocation();

	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route element={<AppLayout />}>
				<Route path='/activities' element={<ActivityDashboard />} />
				<Route path='/activities/:id' element={<ActivityDetails />} />
				<Route
					key={location.key}
					path='/createActivity'
					element={<ActivityForm />}
				/>
				<Route
					key={location.key}
					path='/manage/:id'
					element={<ActivityForm />}
				/>
			</Route>
		</Routes>
	);
}

export default observer(App);
