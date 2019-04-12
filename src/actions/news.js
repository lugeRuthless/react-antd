import axios from 'axios'
export const getNewsListData=(data)=>{
    return {
        type:'GETNEWSLISTDATA',
        payload:data
    }
}

export function fetchNewsList(){
    return dispatch=>{
        var url=`${GLOBALURL}news`
        return axios({
            url,
            method:'get'
        }).then(res=>{
            dispatch(getNewsListData(res.data))
        })
    }

}