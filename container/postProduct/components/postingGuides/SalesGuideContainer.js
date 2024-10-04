import PostingGuide from '@/components/guide/PostingGuide';
import React from 'react';
import { Text, TextP, TextPB, TextSB, TextSE, TextSS, TextAreaPB, TextCont } from './Components';


const SalesGuideContainer = ({showCard, toggleShowCard}) => {

    return (
    <PostingGuide
        title="Record Product Sale"
        showCard={showCard}
        toggleShowCard={()=>toggleShowCard(!showCard)}
        childrenStyle="text-[12px]"
    >
    <div className='flex flex-col'>
        <div>
            <p><TextSS v="Example:"/> Sold 20 units of article A at #7,000 per unit on 27 March, 2024 with sales invoice number INV-007.</p>            
            <Text v="Scenario 1: Sale on credit"/>
            <p>Assuming the goods were sold to Dans Ltd with 30 days payment terms; Cost of Goods Sold sold account code to be charged is 
                <TextSE v="511000 Cost of Sale" s="pl-2"/>; Dans Ltd personal account (Sub account code) is <TextSE v="C-000003 Dans Ltd"/>; Inventory Account code is 
                <TextSE v="162000 Inventory Control" s="pl-2"/>; Product account code (Sub account) is <TextSE v="ATC0001 Article A"/> and the Income Account code is <TextSE v="411000 Sales"/>
            </p>

        </div>
        <div>
            <Text s={'pt-2 text-red-900'} v="Entries: "/>
            <div className='flex flex-col shadow-lg p-2 bg-sky-50'>
                <div>
                    <div className='mb-2 px-2 flex flex-row bg-sky-100 w-full py-1 border-y border-blue-700'>
                        <p className='text-blue-800 font-bold text-center w-[50px]'>Date</p>
                        <p className='text-blue-800 font-bold text-center w-[150px]'>Description</p>
                        <p className='text-blue-800 font-bold text-center w-[100px]'>Reference</p>
                        <p className='text-blue-800 font-bold text-center w-[60px]'>Amount</p>
                    </div>
                    <div className='flex flex-row gap-1'>
                        <TextPB v="27/03/2024"/> 
                        <TextAreaPB v="Being sale of 20 units of article A for #140,000"/>
                        <TextPB v="INV-007" s="px-4"/> 
                        <TextPB v="140,000" s="px-2"/> 
                    </div>
                </div>
                <div className='bg-gray-300 px-2 py-1 rounded-md my-2'>
                    <div className='flex gap-1 items-center'>
                        <Text s="text-gray-900" v="Product"/>
                        <TextCont t="Select Accunt" v="162000 Inventory Control"/>
                        <TextCont t="Product Sold" v="ATC0001 Article A"/>
                        <TextCont t="Quantity" v="20"/>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <Text s="text-gray-900 pr-[40px]" v=""/>
                        <TextCont t="Quantity Left" v="30"/>
                        <TextP v="Charge Cost of Sale to:" s="text-red-800 pl-2"/>
                        <TextCont t="Select COS Account" s1="text-red-800" v="511000 Cost of Sale"/>
                    </div>
                </div>
                <div className='pt-2 flex gap-1 items-center'>
                    <Text s="text-green-800" v="Debit"/>
                    <TextCont t="Select Account" v="222000 Receivables Control"/>
                    <TextCont t="Sub Account" v="C-00003 Dans Ltd"/>
                    <TextCont t="Receivable due date" v="30"/>
                </div>
                <div className='pt-2 flex items-center gap-1'>
                    <Text s="text-red-600" v="Credit"/>
                    <TextCont t="Select Account" v="411000 Sales" s2="px-10"/>
                    <TextCont t="Sub Account" v="--No Sub Acct--" s2="px-2"/>
                    
                </div>
            </div>
        </div>
       
    </div>
    </PostingGuide>
  )
}

export default SalesGuideContainer;


