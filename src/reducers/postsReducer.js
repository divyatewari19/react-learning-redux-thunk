export default (state = [], action) => {
  /*  switch (action.type) {
        case 'FETCH_POSTS':
            return action.payload;
        default:
            return state;
    }*/
    if(action.type === 'FETCH_POSTS'){
        console.log(action.payload)
        return action.payload;
    } 
    return state;

}