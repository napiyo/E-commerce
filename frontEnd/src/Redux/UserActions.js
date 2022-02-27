export const LoggedIn =(u)=> ({
    type:"LOGGED_IN",
    user:{
        id:u._id,
        email:u.email,
        name:u.name,
        role:u.role,
        isauthenticated:true,
        loaded:true
    }
})
export const logOut =()=> ({
    type:"LOGGED_OUT",
    user:{
        id:'no user',
        email:'please login',
        name:'please login',
        role:'please login',
        isauthenticated:false,
        loaded:true
    }
})