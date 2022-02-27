const initial ={
        id:'loading',
        email:'loading',
        name:'loading',
        role:'loading',
        isauthenticated:false,
        loaded:false
}


export default function UserReducer(state = initial, action) {
    switch (action.type) {
        case "LOGGED_IN":
            return action.user;
        case "LOGGED_OUT":
            return action.user;
        default:
            return state;
    }
}