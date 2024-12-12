import { RadioButtonsPair } from '@/components/forms/RadioButtonsPair'
import React from 'react'

const ProductAdjustmentSelection = ({adjustProductChecked, handleAdjustProductBy}) => {
  return (
    <div className='flex flex-col py-2'>
          <div className='flex flex-row items-center justify-center gap-2 text-red-900'>
            <p>Adjust Product by:</p>
            <RadioButtonsPair
                classNameCont={'m-3'}
                btn1Name="BYQTY"
                btn1Title="Quantity"
                btn2Name="BYCOST"
                btn2Title="Cost"
                checkedBtn={adjustProductChecked}
                setCheckedBtn={handleAdjustProductBy}
            />
          </div>
          
    </div>
  )
}

export default ProductAdjustmentSelection