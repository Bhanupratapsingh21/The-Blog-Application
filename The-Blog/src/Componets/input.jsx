import React , {useId} from "react";
const Input = React.forwardRef(function Input({
    labal,
    type = "text",
    className = "",
    ...props
}, ref ){
    const id = useId()
    return (
        <div className='w-full'>
            {labal && <label
            className="inline-block mb-1 pl-1"
            htmlFor={id}
            >{labal}
                </label>
            }
            <input 
            type={type}
            className={`px-3 py-2 bg-black rounded-l outline-none  duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})
export default Input