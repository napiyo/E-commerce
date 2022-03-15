import React, { useEffect } from 'react'
import './adminpanel.css'
import {NavLink, Outlet, useNavigate} from 'react-router-dom'
import  {Divider} from '@mui/material'
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
export default function AdminPanel() {
  const user = useSelector((state)=>state.UserReducer);
  const navigate = useNavigate();
  const alert = useAlert();
  useEffect(() => {
   
    if(user.loaded && (!user.isauthenticated || user.role != 'admin' )){
        navigate('/')
    }
  }, [user])
    return (
     <div className="adminPanelBox">
       <div className="sideBarAdmin">
         <div className="adminPanelLogo">
           Bookias
         </div>
         <Divider sx={{width:'100%',bgcolor:"whitesmoke"}}/>
        
         <NavLink to='dashboard'
         className={({ isActive }) =>
         isActive ? 'currentSectionTitleProfile leftSectionbottomItem ' : "leftSectionbottomItem "
       }
         > DashBoard</NavLink>
         <NavLink to='users' 
         className={({ isActive }) =>
         isActive ? 'currentSectionTitleProfile leftSectionbottomItem ' : "leftSectionbottomItem "
       }
         > Users</NavLink>
         <NavLink to='orders' 
         className={({ isActive }) =>
         isActive ? 'currentSectionTitleProfile leftSectionbottomItem ' : "leftSectionbottomItem "
       }
         > orders</NavLink>
         <NavLink to='products' 
         className={({ isActive }) =>
         isActive ? 'currentSectionTitleProfile leftSectionbottomItem ' : "leftSectionbottomItem "
       }
         > Products</NavLink> 
        
         
        
       </div>
       <Outlet />
     </div>
  )
}
