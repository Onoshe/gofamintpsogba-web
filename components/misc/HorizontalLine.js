const HorizontalLine=({widths, heights, bColor, margTop, margBot})=>{

    return(
        <div 
            className="flex w-full content-center justify-center items-center">
            <div style={{
                width: `${widths || 90}%`,
                height: `${heights || 2}px`,
                backgroundColor: `${bColor || 'gray'}`,
                marginTop: `${margTop || 0}px`,
                marginBottom: `${margBot || 0}px`,
            }}
            />
        </div>
    );
}


export default HorizontalLine