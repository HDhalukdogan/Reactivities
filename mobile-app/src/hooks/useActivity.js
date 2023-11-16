import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activitySelectors, fetchActivities, fetchActivity } from '../store';
import { useFocusEffect } from '@react-navigation/native';

export default (id) => {
    const dispatch = useDispatch();
    if (id) {
        const activity = useSelector(state => activitySelectors.selectById(state, id));
        useEffect(() => {
            if (!activity) dispatch(fetchActivity(id));
        }, [id, dispatch, activity])

        return [activity]
    } else {
        const activities = useSelector(activitySelectors.selectAll);
        const { activitiesLoaded } = useSelector(state => state.activity)
        useFocusEffect(
            useCallback(() => {
                getActivities();

            },[])
        )

        const getActivities = async () => {
            await dispatch(fetchActivities());
        }
        return [activities, activitiesLoaded]
    }
}