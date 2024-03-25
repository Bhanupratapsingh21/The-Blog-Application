import React from "react";
function Container ({children}){
    return(
        <>
            <div className=' bg-black  '>
                {children}
            </div>
        </>
    )
}
export default Container