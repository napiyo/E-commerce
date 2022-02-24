export default function CartReducer(state=[],action){
    const product = action.payload;
        switch(action.type){
            case "ADD_ITEM_CART":
                //CHECK if product is already in cart
                const exist = state.find((x)=> x.id ===product.id);

                if(exist){
                    //if already exist increase quantity
                    return state.map((x)=> 
                        x.id == product.id ? {...x,quantity:x.quantity+1}:x
                    );
                }
                else{
                    product.quantity =1;
                    return [...state,product];
                }
              // delete item from cart 
              break; 
            case "DEC_ITEM_CART":
                //grab product from cart -- so we can have quantity of product in cart
                const exist2 = state.find((x)=> x.id === product.id);
                if(exist2.quantity === 1){
                    // return state.filter((item)=> item.id != exist2.id);
                    // dont do anything
                    return state
                }
                else{
                    // dont delete decrease quantity
                    return state.map((x)=> 
                        x.id == product.id ? {...x,quantity:x.quantity-1}:x
                    );
                }
              break;
              case "DEL_ITEM_CART":
                  return state.filter((item)=> item.id != product.id);
            default: 
                return state;
        }
}
// action for cart
    // {
    //     type:"actionType" ,
    //     payload:{
    //         
    //     }
    // }