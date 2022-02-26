import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import api from '../config/axiosApi';

export default function Myorders() {
    const [loading, setloading] = useState(true);
    const [Myorders, setMyorders] = useState([]);
    useEffect(() => {
      api.get('/api/v3/orders/myOrders').then((res)=>{
          setMyorders(res.data.order);
        //   setloading(false);
      })
    }, [])

if(loading){

        return <>
        
         <Skeleton variant="rectangular" width={'100%'} height={118} sx={{bgcolor:'aquamarine',margin:'1vmax'}}/>
         <Skeleton variant="rectangular" width={'100%'} height={118} sx={{bgcolor:'aquamarine',margin:'1vmax'}}/>
         <Skeleton variant="rectangular" width={'100%'} height={118} sx={{bgcolor:'aquamarine',margin:'1vmax'}}/>
        
        </>
    }
  return (
   <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga esse aut quasi doloribus, neque laudantium nemo in mollitia fugit maiores natus, ratione molestias deserunt. Atque ex assumenda itaque, nobis mollitia velit inventore magni possimus laudantium sed sapiente ea ipsam veniam explicabo corporis eligendi? Aliquam asperiores eaque temporibus eius, sapiente aperiam odio, soluta deleniti iusto officia mollitia dolorum accusantium vel velit maiores ex facere eos. Amet vel nostrum repudiandae quis ad, earum velit neque pariatur libero in architecto magni error molestiae aspernatur minima totam consequuntur dolor. Mollitia nam officia veniam accusamus doloremque! Qui distinctio, assumenda error minus odio nostrum nam. Ullam.</div>
  )
}
