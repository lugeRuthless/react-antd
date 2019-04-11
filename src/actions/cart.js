export const addToCart=(data)=>{
    return {
        type:'ADDTOCART',
        payload:data
    }
}

export const changeTotalNum=(data)=>{
    return {
        type:  'CHANGETOTALNUM',
        payload:data
    }
}

export const removeToCart=(data)=>{
    return {
        type:'REMOVETOCART',
        payload:data
    }
}

export const deleteCart=(data)=>{
    return {
        type:'DELETECART',
        payload:data
    }
}
