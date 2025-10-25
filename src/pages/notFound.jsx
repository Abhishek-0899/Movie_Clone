import React from 'react';
import Lottie from "lottie-react"
import noData from "../assets/Page Not Found 404.json"
const NotFound = () => {
  return (
    <div>
      <Lottie className='h-screen' animationData={noData}/>
    </div>
  );
}

export default NotFound;
