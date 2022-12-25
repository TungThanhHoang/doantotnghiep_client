import { useEffect, useState } from 'react'

const useCountDown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();

  const [ countDown, setCountDown ] = useState(countDownDate - new Date().getTime());
  useEffect(() => {
    const interval = setInterval(() => {
        setCountDown(countDownDate - new Date().getTime());
    }, 1000)
    return () => clearInterval(interval);
  }, [countDownDate])
  
  return getReturnValues(countDown);
}

const getReturnValues  = (countDown) => {
    const time = new Date(countDown).toISOString().slice(14, 19);
    const minutes = time.split(":")[0];
    const second = time.split(":")[1];
    return [minutes, second];
}

export { useCountDown }
