import PostingGuide from '@/components/guide/PostingGuide';
import React from 'react';
import { Text,  } from './Components';


const ProductReturnsGuide = ({activeTab, showCard, toggleShowCard}) => {
    const record = activeTab === "TAB1"? "Purchase": "Sales";
    const term = activeTab === "TAB1"? "(Return Outwards)" : "(Return Inwards)"
    return (
    <PostingGuide
        title={activeTab==="TAB1"? `Record ${record} Returns ${term}` : `Record ${record} Returns ${term}`}
        showCard={showCard}
        toggleShowCard={()=>toggleShowCard(!showCard)}
        childrenStyle="text-[12px] h-fit pb-10"
    >
    <div className='flex flex-col'>
        <div>
            <p>Check the button if you want to record {record} returns. </p>

            {activeTab==="TAB1"?
             <div className='pt-2'> 
                <p>
                    <span className='font-bold'>Purchase Returns</span> occurs when goods that have been purchased were returned back to the Supplier.
                </p>
                <p>In such case, the product account would be credited while the Supplier or Bank would be debited</p>
            </div> 

            :<div className='pt-2'> 
                <p>
                    <span className='font-bold'>Sales Returns</span> occurs when goods that have been sold were returned back by the Customer.
                </p>
                <p>In such case, the product account would be debited while the Customer or Bank would be credited</p>
                <p className='py-2'>The product <span className='font-[600]'>Transaction number ref</span> is the transaction number of the product that is to be returned. This can be found from the ledger.</p>
            </div>} 
        </div>       
    </div>
    </PostingGuide>
  )
}

export default ProductReturnsGuide;


