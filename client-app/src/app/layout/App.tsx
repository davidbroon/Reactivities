import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

function App() {
	const { commonStore, userStore } = useStore();
	const location = useLocation();

	useEffect(() => {
		if (commonStore.token) {
			userStore.getUser().finally(() => commonStore.setAppLoaded());
		} else {
			commonStore.setAppLoaded();
		}
	}, [commonStore, userStore]);

	if (!commonStore.appLoaded)
		return <LoadingComponent content='Loading App...' />;

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

	return (
		<>
			<ToastContainer position='bottom-right' hideProgressBar />
			<ModalContainer/>
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
					<Route path='/errors' element={<TestErrors />} />
					<Route path='/server-error' element={<ServerError />} />
					<Route path='/login' element={<LoginForm />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
}

export default observer(App);
