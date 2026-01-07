import React from 'react'
import styles from './Sidemenu.module.css'

interface Item {
    name: string
    id: string
    selector: () => void
  }
  
  interface Props {
    isSelected:string|null
    items: Item[]
  }
function SideMenu({ items ,isSelected}: Props) {
  return (
    <div className={styles.contain}>
        {items.map((e)=>{return <div className={e.id==isSelected?styles.selected:styles.elm} key={e.id} onClick={e.selector}>
            {e.name}
        </div>})}
    </div>
  )
}

export default SideMenu