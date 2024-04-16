import React from 'react'
import styles from './DisplayButton.module.css'
const DisplayButton = ({counterValue, counterName}) => {
  return (
    <div className={styles.wrapper}>
        <h2 className={styles.countVal}>{counterValue}</h2>
        <h4 className={styles.countNam}>{counterName}</h4>
    </div>
  )
}

export default DisplayButton