var initialState=[]
function News(state=initialState,action){
    switch(action.type){
        case 'GETNEWSLISTDATA':
       // console.log(action.payload)
        return [...action.payload];
        default:
        return state;
    }
}
export default News