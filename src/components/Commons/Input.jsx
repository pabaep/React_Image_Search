import React from 'react'
import classes from './Input.module.css'

// const input = (props) => {
//   return (
//     <div className={classes.input}>
//         <label htmlFor={props.input.id}>{props.label}</label>
//         <input {...props.input}/>
//     </div>
//   )
// }

const input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
        <label>{props.label}</label>
        <input ref={ref} {...props.input}/>
    </div>
  )
})

export default input