import React from 'react'
import './footer.css'
import narendraPic from '../assests/narendra_pic.png'
export default function Footer() {
  return (
    <div className='footer'>
      <div className="leftFooter">
        <div><img src={narendraPic} alt="loading" srcset="" className='narendraPic_footer'/></div>
        <h3 className="heading" style={{margin:0}}>About me</h3>
        I'm final year engineering student <br /> at Ramaiah Institute of technology, Bengaluru 
         <br />
         <br />
         
          I just love to code</div>
      <div className="centerFooter">Narendra Dewasi
      <p style={{fontSize:'1rem'}}><a href='mailto:radioactivenarendra@gmail.com' >radioactivenarendra@gmail.com
      </a>
      </p></div>
      <div className="rightFooter">
      <h3 className="heading" style={{margin:0}}>My profile links</h3>
        <a href="https://www.linkedin.com/narendra-dewasi/" target={'_blank'}>LinkedIn</a>
        <a href="https://github.com/napiyo" target={'_blank'}>gitHub</a>
        <a href="https://www.codechef.com/users/napiyo" target={'_blank'}>codechef</a>
      </div>
    </div>
  )
}
