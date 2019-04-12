var initialState=[];
var _=require('lodash')

function Cart(state=initialState,action){
    switch (action.type) {
        case 'ADDTOCART':
        //console.log(action.payload)
            var pos=_.findIndex(state,{id:action.payload.id})
            if(pos !==-1){
                state[pos].quantity=state[pos].quantity+1;
                state[pos].subTotal=state[pos].quantity*state[pos].price.now;
                return [...state]
            }else{
               action.payload.quantity=1;
               action.payload.subTotal=action.payload.price.now;
               return [...state,action.payload]
            };

        case 'CHANGETOTALNUM':
            var pos=_.findIndex(state,{id:action.payload.id})
            if(pos !==-1){
                action.payload.subTotal=action.payload.quantity*action.payload.price.now;
                Object.assign({...state[pos]},{...action.payload})
                return [...state]
                }
        case 'REMOVETOCART':
            var pos=_.findIndex(state,{id:action.payload.id})
            state[pos].quantity=state[pos].quantity-1;
            state[pos].subTotal=state[pos].quantity*state[pos].price.now;
            return [...state];

        case 'DELETECART':
            //var pos=_.findIndex(state,{id:action.payload.id})
            return state.filter(item=>{
                return item.id!==action.payload.id
            })

        case 'CALCULATE':
            return [...state]
        default:
           return state
    }
}

export default Cart