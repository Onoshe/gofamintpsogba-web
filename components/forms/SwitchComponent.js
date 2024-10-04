export const SwitchComponent = ({isOn, handleToggle, isOnBallBg, isOnBg, isOnBorder}) => {

    
    return (
      <div
        className={`${
          isOn ? `${isOnBg || 'bg-green-100'} border ${isOnBorder || 'border-green-500'}` : 'bg-gray-300'
        } relative inline-flex items-center h-6 rounded-full w-14 cursor-pointer transition-colors duration-200 ease-in-out`}
        onClick={handleToggle}
      >
        <span
          className={`${
            isOn ? `translate-x-9 ${isOnBallBg || 'bg-green-500'}` : 'translate-x-1 bg-white'
          } inline-block w-4 h-4 transform rounded-full transition-transform duration-200 ease-in-out`}
        />
      </div>
    );
    
  };
