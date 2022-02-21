import React from 'react'
import './footer.css'
export default function Footer() {
  return (
    <div className='footer'>
      <div className="leftFooter">
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
        <a href="http://">LinkedIn</a>
        <a href="http://">gitHub</a>
        <a href="http://">codechef</a>
      </div>
    </div>
  )
}
