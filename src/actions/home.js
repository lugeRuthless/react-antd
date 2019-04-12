import axios from 'axios'

export const carousel=data=>{
    return {
        type:'CAROUSEL',
        payload:data
    }
}

export function fetchCarousel(){
    return dispatch=>{
        return axios({
            url:`${GLOBALURL}carousel`,
            method:'get'
        }).then(res=>{
            dispatch(carousel(res.data))
        })
    }
}