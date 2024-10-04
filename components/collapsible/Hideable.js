'use client';
import React, { useEffect, useRef, useState } from "react";
import { BsArrowBarDown } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";


const Hideable = ({
  open,
  collapsibleClassName = "collapsible-card-edonec",
  headerClassName = "collapsible-header-edonec",
  titleClassName = "title-text-edonec",
  iconButtonClassName = "collapsible-icon-button-edonec",
  contentClassName = "collapsible-content-edonec",
  contentContainerClassName = "collapsible-content-padding-edonec",
  children,
  header
}) => {
  const [isOpen, setIsOpen] = useState(open);
  

  return (
    <>
      <div className={`shadow-md ${collapsibleClassName}`}>
        <div>
          <div className={`bg-[aliceblue] p-4 shadow-md flex flow-row justify-between ${headerClassName}`}>
            <div>{header}</div>
            <button
              type="button"
              className={''}
              onClick={()=> setIsOpen(!isOpen)}
            >
              <IoIosArrowDown
                size={28}
                className={` ${
                  isOpen
                    ? "rotate-180 animate-rotate duration-300"
                    : ""
                }`}
              />
            </button>
          </div>
        </div>
        <div className={`p-3 ${contentClassName}`} style={{display:isOpen? 'block' :'none'}}>
          <div className={contentContainerClassName}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Hideable;
