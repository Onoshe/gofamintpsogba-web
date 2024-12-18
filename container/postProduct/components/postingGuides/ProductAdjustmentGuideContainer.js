import PostingGuide from '@/components/guide/PostingGuide';
import React from 'react';
import { Text, TextP, TextPB, TextSB, TextSE, TextSS, TextAreaPB } from './Components';


const ProductAdjustmentGuideContainer = ({showCard, toggleShowCard}) => {

    return (
    <PostingGuide
        title="Record Product Adjustment"
        showCard={showCard}
        toggleShowCard={()=>toggleShowCard(!showCard)}
        childrenStyle="text-[12px]"
    >
    <div className='flex flex-col'>
        <div>
            <p>
            The<span className='font-bold px-2'>Product Adjustment Platform</span> 
            is used to record all product-related transactions that are neither product purchases nor product sales including Purchase retuns and Sales retuns.
            These adjustments can be done either through  
            <span className='font-bold px-2'>Quantity Adjustments</span> or
            <span className='font-bold px-2'>Value Adjustments. </span>
            </p>

            <Text s={'py-2 font-bold'} v="1. Quantity Adjustments"/>
            <p className="">
                Select<span className='font-bold px-2'>Adjustment by Quantity</span>  {"when the adjustment pertains to the product's quantity. Examples include:"}
            </p>
            <p className="py-1">* Product damage</p>
            <p className="py-1">* Theft</p>
            <p className="py-1">* Obsolence, etc</p>
            <p  className="pt-1">
                In such cases, enter the quantity to be adjusted under Quantity and select the Expenses account to write off the adjustment (account to Debit) and the product account to be credited.
                The cost of the affected products will be calculated by the system.
            </p>

            <Text s={'pt-4 font-bold'} v="2. Value Adjustments"/>
            <p className="py-1">Choose<span className='font-bold px-2'>Adjustment by Value</span> when the adjustment involves changes to the product’s cost/value without affecting its quantity. This is typically used for:</p>
            <p className="py-1">* Product valuation adjustments</p>
            <p>The Quantity field will turn to Amount when the adjustment is by cost. Enter the amount and the accounts to be debited and credited.</p>
            
            <p className="py-2">By selecting the appropriate adjustment type, you ensure accurate tracking and reporting of all product-related activities.</p>

        

        </div>       
    </div>
    </PostingGuide>
  )
}

export default ProductAdjustmentGuideContainer;


