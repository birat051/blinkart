import React, { useEffect, useState } from 'react';
import { OrderStatusContainer, OrderStatusElement, OrderStatusLink } from './OrderStatus.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';


export type OrderStatusValues = 'Ordered' | 'Shipped' | 'Out for Delivery' | 'Delivered'

interface OrderStatusStepsProps {
  activeStatus: OrderStatusValues;
}


const OrderStatus: React.FC<OrderStatusStepsProps> = ({ activeStatus }) => {
    const steps = ['Ordered', 'Shipped', 'Out for Delivery', 'Delivered'];
    const [activeStep, setactiveStep] = useState(0)
    useEffect(() => {
        steps.forEach((step,index)=>{
            if(step===activeStatus)
            setactiveStep(index)
        })
    }, [])
    
  return (
    <OrderStatusContainer>
      <ul>
        {steps.map((step,index)=>{
            if(index===0)
            return (
                <OrderStatusLink key={index+'orderstatus'}>
                    <OrderStatusElement className={'active first-child'}>
                    <FontAwesomeIcon icon={faCircle} style={{textAlign: 'left',marginBottom:'0.5rem',zIndex:3}}/>
                    <p>{step}</p>
                    <div />
                    </OrderStatusElement>
                </OrderStatusLink>
            )
            else if(index===steps.length-1)
            return <OrderStatusLink key={index+'orderstatus'}>
                <OrderStatusElement className={index<=activeStep?'active last-child':'last-child'}>
                    <FontAwesomeIcon icon={faCircle} style={{textAlign: 'left',marginBottom:'0.5rem'}}/>
                    <p>{step}</p>
                    <div />
                    </OrderStatusElement>
            </OrderStatusLink>
            return (
                <OrderStatusLink key={index+'orderstatus'}>
                    <OrderStatusElement className={index<=activeStep?'active':''}>
                    <FontAwesomeIcon icon={faCircle} style={{textAlign: 'left',marginBottom:'0.5rem',zIndex:2}}/>
                    <p>{step}</p>
                    <div />
                    </OrderStatusElement>
                </OrderStatusLink>
            )
        })}
      </ul>
    </OrderStatusContainer>
  );
};

export default OrderStatus;
