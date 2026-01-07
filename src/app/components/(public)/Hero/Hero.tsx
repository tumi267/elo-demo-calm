import React from 'react'
import styles from './Hero.module.css'
interface Props{
    direction:'left'|'right'|'center'
    title:string|null
    discription:string|null
    src:string
}
function Hero({direction,title,discription,src}:Props) {
switch (direction) {
    case 'center':
        return (
            <div className={styles.imageWrap}>
                <img src={src} className={styles.center}/>
            </div>
          )        
        break;
    case 'left':
        return (
            <div>Hero left</div>
            )        
        break;
    case 'right':
        return (
            <div>Hero right</div>
            )        
        break;
    default:
        return null
}

}

export default Hero