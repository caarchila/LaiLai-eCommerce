import React,{useEffect, useState} from 'react';

function useFecha(){
const [date, setDate] = useState(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
    useEffect(()=>{
      const timer=setTimeout(() => {
        setDate(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        console.log(date);
      },1000);
      return () => clearTimeout(timer);
    })

  return date;
}

export default useFecha;
