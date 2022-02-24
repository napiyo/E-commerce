export default function UserReducer(state = {isauthenticated:false}, action) {
    switch (action.type) {
        case "LOGGED_IN":
            return action.user;
        case "LOGGED_OUT":
            return action.user;
        default:
            return state;
    }
}