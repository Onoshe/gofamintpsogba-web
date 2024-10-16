'use client'
import { useEffect } from 'react';
import { Checkbox,  Selection, TextArea, TextInput } from '@/components/forms/InputComponentsDaisy';
import PageBlind from '@/navigation/pageBlind/PageBlind';
import { MdCancel, MdClose } from 'react-icons/md';
import ProductSelection from './ProductSelection';


const CreateProduct = ({handleSubmit, showBlind, handleClose,formInput, handleFormInput, products, infoMsg, selectedProduct}) => {
    
    let categories  = [];
    const categoriesArr = [];
        for (let index = 0; index < products.length; index++) {
            const {category} = products[index];
            if(!categoriesArr.includes(category)){
                categoriesArr.push(category);
                categories.push({category, value:category.includes('-New Category-')? '' : category});
              }
        };
   
   //console.log(products)
    return (
    <PageBlind showBlind={showBlind}>
        <div className={`w-full justify-center items-center flex flex-col`}>
            <div className='w-full max-w-[550px] justify-center flex flex-col bg-white boxShadowWhite99 text-gray-900'>
                <div className='bg-[aliceblue] w-full  border-b border-gray-100 flex flex-row items-center justify-between p-2 md:px-6'>
                    <p className='font-bold text-blue-500'>{formInput?.editProduct? 'Edit Product' : 'Create Product'}</p>
                    <MdClose size={32} className='text-red-700 hover:text-[red] active:text-red-200 cursor-pointer'
                     onClick={handleClose}/>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='p-3 smc:px-5 gap-4 flex flex-col'>
                        <div className='flex flex-row items-center gap-3 flex-wrap'>
                            <Selection
                                labelName="Select Category*"
                                //classNameCont={'w-[calc(100% - 120px)]'}
                                classNameCont={'smc:-ml-3 max-w-[300px] text-black'}
                                classNameLabel={'whitespace-nowrap w-[100px] text-red-600 text-[12px] mr-2'}
                                classNameInput={'text-blue-700'}
                                name="category"
                                //defaultValue={"--New Category--"}
                                //required
                                onChange={handleFormInput}
                            >   
                                <option  
                                    className={`w-full text-black text-sm py-2`}
                                    selected='selected'
                                    value={""}>
                                    --New Category--
                                </option> 
                                {
                                    categories?.map((dt,i)=>{
                                        return(
                                            <option key={`${i}key`}  
                                                className={`w-full text-black text-sm py-2`}
                                                //selected={dt.selected}
                                                value={dt.category}>
                                                {dt.category}
                                            </option>            
                                        )
                                    })
                                }
                            </Selection>
                           
                            {(!formInput.category) && 
                                <TextInput
                                    labelName="New Category*"
                                    classNameLabel={'whitespace-nowrap text-red-600 text-[12px] mr-2 hidden'}
                                    classNameInput={''}
                                    placeholder="New Category- Length 24"
                                    maxLength="24"
                                    minLength="3"
                                    type="text"
                                    //readOnly={formInput?.category? 'readOnly' :''}
                                    name="newCategory"
                                    value={formInput.newCategory}
                                    onChange={(e)=>handleFormInput(e)}
                                />}
                        </div>
                       
                         <TextInput
                            labelName="Product Name*"
                            classNameLabel={'whitespace-nowrap w-[80px] text-[12px] text-red-600 mr-2'}
                            type="text"
                            name="productName"
                            placeholder="E.g, Laptop. Max length of 52"
                            maxLength="52"
                            minLength="5"
                            value={formInput.productName}
                            required
                            onChange={(e)=>handleFormInput(e)}
                        />
                        <TextInput
                            labelName="Product Code*"
                            classNameLabel={'whitespace-nowrap w-[80px] text-[12px] text-red-600 mr-2'}
                            type="text"
                            name="productCode"
                            placeholder="Eg- LAP0002. Max length of 12"
                            value={formInput.productCode}
                            required
                            maxLength="12"
                            minLength="3"
                            onChange={(e)=>handleFormInput(e)}
                        />
                        <TextArea
                            labelName="Description"
                            classNameLabel={'whitespace-nowrap w-[80px] text-[12px] mr-2'}
                            type="text"
                            placeholder="E.g, HP Laptop with 500GB SSD and i7. Maximum length of 500"
                            maxLength="500"
                            minLength="5"
                            name="description"
                            value={formInput.description}
                            onChange={(e)=>handleFormInput(e)}
                        />
                        
                    </div>
                    <div 
                        className={`smc:ml-[150px] ${infoMsg?.error? 'text-red-600' :'text-green-800'}`} >
                        {infoMsg?.msg}
                    </div>
                    <div className='flex flex-row gap-4 p-4 md:p-6'>
                        <input type='submit' className="btn btn-info px-10 btn-sm" value="Save"/>
                        <button className="btn btn-sm bg-gray-300 text-black hover:bg-gray-400" onClick={handleClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </PageBlind>
  )
}

export default CreateProduct;