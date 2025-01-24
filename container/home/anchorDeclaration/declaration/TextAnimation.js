'use client'
import { TypeAnimation } from 'react-type-animation';

const TypeAnimationComponent = ({sequence}) => {
  //const currentAnchor = resData?.anchorAndFaith[0];
  
  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="div"
      cursor={true}
      repeat={Infinity}
      style={{ textAlign: 'center' }}
    />
  );
};

export default TypeAnimationComponent;

const text = {
  anchorType1:'Year 2023',
  anchorType2:'Our Year',
  anchorType3:'Our Year of',
  anchorType4:'Our Year of Abundant',
  anchorType5:'',
  anchorType6:'Our Year of Abundant Life',
}

/*
const text = {
  anchorType1:'Yes, the LORD will give what is good; And our land will yield its increase. Psalm 85:12',
  anchorType2:'Yes, the LORD will give',
  anchorType3:'Yes, the LORD will give what is good; And our land',
  anchorType4:'',
  anchorType5:'Yes, the LORD will give what is good; And our land will yield its increase. Psalm 85:12',
}
*/