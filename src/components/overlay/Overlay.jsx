import React from 'react'
import style from "./overlay.module.css";

const Overlay = ({top, left, right, bottom}) => {
  return (
    <div className={style.Overlay}
    style={{top, left, right, bottom}}
    ></div>
  )
}

export default Overlay