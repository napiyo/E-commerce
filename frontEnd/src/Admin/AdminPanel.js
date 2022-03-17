import React, { useEffect } from 'react'
import './adminpanel.css'
import {NavLink, Outlet, useNavigate} from 'react-router-dom'
import  {Divider} from '@mui/material'
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import {Dashboard,SupervisedUserCircle,ShoppingCartCheckout,Inventory} from '@mui/icons-material'
export default function AdminPanel() {
  const user = useSelector((state)=>state.UserReducer);
  const navigate = useNavigate();
  const alert = useAlert();
  useEffect(() => {
   
    if(user.loaded && (!user.isauthenticated || user.role != 'admin' )){
        navigate('/profile')
    }
  }, [user.id])
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
         > <Dashboard /> DashBoard</NavLink>
         <NavLink to='users' 
         className={({ isActive }) =>
         isActive ? 'currentSectionTitleProfile leftSectionbottomItem ' : "leftSectionbottomItem "
       }
         > <SupervisedUserCircle />Users</NavLink>
         <NavLink to='orders' 
         className={({ isActive }) =>
         isActive ? 'currentSectionTitleProfile leftSectionbottomItem ' : "leftSectionbottomItem "
       }
         > <ShoppingCartCheckout /> orders</NavLink>
         <NavLink to='products' 
         className={({ isActive }) =>
         isActive ? 'currentSectionTitleProfile leftSectionbottomItem ' : "leftSectionbottomItem "
       }
         ><Inventory /> Products</NavLink> 
        
         
        
       </div>
       <Outlet />
     </div>
  )
}
