import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPosts =  () => {
    /*//Bad approach
    const response = await jsonPlaceholder.get('/posts');

    return {
        type: 'FETCH_POSTS',
        playload: response
    }*/
    return async function( dispatch, getState) {
        const response = await jsonPlaceholder.get('/posts');
        console.log(response);
        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data
        });   
    }
}

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/$(id)`);

    dispatch({ type: 'FETCH_USER', playload: response.data});
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    console.log("About to fetch posts");
    await dispatch(fetchPosts());
    console.log("Posts Fetched!",getState.posts);

    const userIds = _.uniq(_.map(getState.posts, 'userId'));
    userIds.forEach(id => dispatch(fetchUser(id)));

    //alternaitively we can use chain method of lodash
    /*_.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();*/
};