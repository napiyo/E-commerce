export const addToCartReduxAction = (product) => {
    return{
        type:"ADD_ITEM_CART",
        payload:{
            id:product._id,
            productName:product.name,
            productImage:product.images[0],
            price:product.price,
            stock:product.stock
        }
    }
}
// decrease quantity
export const decFromCartReduxAction= (product) => {
    return{
        type:"DEC_ITEM_CART",
        payload:{
            id:product._id,
            productName:product.name,
            productImage:product.images[0],
            price:product.price,
            stock:product.stock
        }
    }
}

//REMOVE ITEM FROM CART
export const delFromCartReduxAction= (product) => {
    return{
        type:"DEL_ITEM_CART",
        payload:{
            id:product._id,
            productName:product.name,
            productImage:product.images[0],
            price:product.price,
            stock:product.stock
        }
    }
}