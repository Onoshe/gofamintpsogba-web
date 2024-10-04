import PostingGuide from '@/components/guide/PostingGuide';
import React from 'react';
import { Text, TextP, TextPB, TextSB, TextSE, TextSS, TextAreaPB } from './Components';


const PurchaseGuideContainer = ({showCard, toggleShowCard}) => {

    return (
    <PostingGuide
        title="Record Product Purchase"
        showCard={showCard}
        toggleShowCard={()=>toggleShowCard(!showCard)}
        childrenStyle="text-[12px]"
    >
    <div className='flex flex-col'>
        <div>
            <p><TextSS v="Example:"/>Purchased 50 units of article A at #5,000 per unit on 24 March, 2024 with purchase invoice number INV-005.</p>            
            <Text v="Scenario 1: Purchased on cash"/>
            <p>Assuming the goods were paid for from Bank ABC account; Inventory Account code is <TextSE v="162000 Inventory Control"/>; Product account code (Sub account) is <TextSE v="ATC0001 Article A"/>
             and bank account code is <TextSE v="121000 Bank ABC"/>
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
                        <TextPB v="24/03/2024"/> 
                        <TextAreaPB v="Being purchased of 50 units of article for #250,000"/>
                        <TextPB v="INV-005" s="px-4"/> 
                        <TextPB v="250,000" s="px-2"/> 
                    </div>
                </div>
                <div className='pt-2 flex gap-1'>
                    <Text s="text-green-800" v="Debit"/>
                    <TextSB v="162000 Inventory Control"/>
                    <TextSB v="ATC0001 Article A"/>
                    <TextSB v="50" s="px-4"/>
                </div>
                <div className='pt-2 flex gap-1'>
                    <Text s="text-red-600" v="Credit"/>
                    <TextSB v="121000 Bank ABC" s="px-5"/>
                    <TextSB v="--No Sub Acct--"/>
                    <TextSB v="---" s="px-4"/>
                </div>
            </div>
        </div>
        <Text v="Scenario 2: Purchased on credit" s="pt-2"/>
        <p>Same assumption as above but the goods were bought on credit from XYZ Ltd; XYZ ltd account code is <TextSE v="V-000005 XYZ Ltd"/>; Account payable control code is <TextSE v="222000 Payables Control"/></p>
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
                        <TextPB v="24/03/2024"/> 
                        <TextAreaPB v="Being purchased of 50 units of article for #250,000"/>
                        <TextPB v="INV-005" s="px-4"/> 
                        <TextPB v="250,000" s="px-2"/> 
                    </div>
                </div>
                <div className='pt-2 flex gap-1'>
                    <Text s="text-green-800" v="Debit"/>
                    <TextSB v="162000 Inventory Control"/>
                    <TextSB v="ATC0001 Article A"/>
                    <TextSB v="50" s="px-4"/>
                </div>
                <div className='pt-2 flex gap-1'>
                    <Text s="text-red-600" v="Credit"/>
                    <TextSB v="222000 Payables Control" s=""/>
                    <TextSB v="--No Sub Acct--"/>
                    <TextSB v="V-000005 XYZ Ltd" s=""/>
                </div>
            </div>
        </div>
    </div>
    </PostingGuide>
  )
}

export default PurchaseGuideContainer;


