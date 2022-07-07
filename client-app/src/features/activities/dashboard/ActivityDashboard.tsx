import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const ActivityDashboard = () => {
	const { activityStore } = useStore();
	const { loadActivities, activityRegistry } = activityStore;

	useEffect(() => {
		if (activityRegistry.size <= 1) loadActivities();
	}, [activityRegistry.size, loadActivities]);

	if (activityStore.loadingInitial)
		return <LoadingComponent content='Loading App' />;
	return (
		<Grid>
			<Grid.Column width='10'>
				<ActivityList />
			</Grid.Column>
			<Grid.Column width='6'>
				<h2>Activity filter</h2>
			</Grid.Column>
		</Grid>
	);
};

export default observer(ActivityDashboard);
