import {FC, useEffect, useRef} from 'react'
import {KTSVG} from '../../../helpers'
import {getCSSVariableValue} from '../../../assets/ts/_utils'
  
const CardsWidget0 = ({
  className,
  chartSize = 70,
  chartLine = 11,
  chartRotate = 145,
}) => {
  const chartRef = useRef(null)
   
  return (
    <div className={`card card-flush ${className}`}>
      <div className='card-header pt-5 invisible'>
        
      </div>  
    </div>
  )
} 

export {CardsWidget0}
