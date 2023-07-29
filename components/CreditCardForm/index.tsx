import { useSelector } from 'react-redux';
import { CreditCardFormContainer, CreditCardInput, CvvInput, ExpiryDateContainer } from './CreditCard.style'
import { RootState } from '@/stateManagement/store';
import { z } from 'zod';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddToCart, BuyNow } from '@/styles/product.style';
import { useEffect, useState } from 'react';

type creditCardProp={
    price: number,
}

export const CardDetails=z.object({
    creditCardNumber: z.string().length(16),
    month: z.string().length(2),
    year: z.string().length(2),
    cvv: z.string().length(3)
})

function CreditCardForm(props:creditCardProp) {
  const cartItems = useSelector((state: RootState) => state.cart);
  const address = useSelector((state: RootState) => state.address);
  const months = Array.from({ length: 12 }, (_, index) => (index + 1).toString().padStart(2, '0'));
  const [years, setyear] = useState<string[]>([])
  const {register,handleSubmit,formState,reset,control}=useForm({resolver: zodResolver(CardDetails)})
  const { field: monthField } = useController({
    name: 'month',
    control,
  });

  const { field: yearField } = useController({
    name: 'year',
    control,
  });
  const {errors}=formState
  const handleMonthChange=(event: React.ChangeEvent<HTMLSelectElement>)=>{
    monthField.onChange(event.target.value)
  }
  const handleYearChange=(event: React.ChangeEvent<HTMLSelectElement>)=>{
    yearField.onChange(event.target.value)
  }
  const handleFormSubmit=()=>{

  }
  useEffect(() => {
    const yearList=[]
    for (let year = 2023; year <= 2040; year++) {
      const yearValue = (year % 100).toString().padStart(2, '0');
      yearList.push(yearValue);
    }
    setyear(yearList)
    console.log('Years is: ')
  }, [])
  
  return (
    <CreditCardFormContainer onSubmit={handleSubmit(handleFormSubmit)}>
      <CreditCardInput placeholder='Enter Card Number' {...register('creditCardNumber')} type='number'/>
      {errors.creditCardNumber && <p>{errors.creditCardNumber.message?.toString()}</p>}
      <ExpiryDateContainer>
        <h2>Valid thru</h2>
        <select onChange={handleMonthChange} id="month-dropdown" name="month" value={monthField.value}>
        <option value="">MM</option>
            {months.map((month, index) => (
            <option key={index} value={month}>
            {month}
            </option>
            ))}
        </select>
        <select onChange={handleYearChange} id="year-dropdown" name="year" value={yearField.value}>
        <option value="">YY</option>
            {years.map((year, index) => (
            <option key={index} value={year}>
            {year}
            </option>
            ))}
        </select>
      </ExpiryDateContainer>
      {errors.month && <p>{errors.month.message?.toString()}</p>}
      {errors.year && <p>{errors.year.message?.toString()}</p>}
      <CvvInput maxLength={3} minLength={3} placeholder='CVV' type='number' {...register('cvv')}/>
      {errors.cvv && <p>{errors.cvv.message?.toString()}</p>}
      <BuyNow type='submit'>PAY ₹ {props.price}</BuyNow>
    </CreditCardFormContainer>
  )
}



export default CreditCardForm
