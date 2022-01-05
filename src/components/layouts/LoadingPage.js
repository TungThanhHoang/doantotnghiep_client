import React from 'react'
import Lottie from 'react-lottie';
import loading from '../../assets/loading.json'
function LoadingPage() {

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: loading,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    return (
        <div style={{ backgroundColor:'#fff' , width:"100%" , height:'100vh'  ,zIndex:999 , alignSelf:'center'}}>
            <Lottie 
              options={defaultOptions}
              height={50}
              width={50}
              />
        </div>
    )
}

export default LoadingPage
