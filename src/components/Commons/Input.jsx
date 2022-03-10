import React from 'react'
import classes from './Input.module.css'

// 1. forwardRef 적용 전.
// const Input = (props) => {
//   return (
//     <div className={classes.input}>
//         <label htmlFor={props.input.id}>{props.label}</label>
//         <input {...props.input} />
//     </div>
//   )
// }

// 2. forwardRef 적용 후.
// const Input = React.forwardRef((props, ref) => {});

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} {...props.input} />
    </div>
  )
});

export default Input