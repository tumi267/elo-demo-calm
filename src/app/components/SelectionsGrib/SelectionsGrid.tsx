'use client'
import React, { useState } from 'react'
import styles from './SelectionsGrid.module.css'
import Link from 'next/link'
interface Item{
    title:string
    id:string
    image:string
    description:string
}
interface props{items:Item[]}
function SelectionsGrid({items}:props) {
    const[showdescrption,setShowdescription]=useState<string|null>()
    if(items.length==0){return<div>No Items Found</div>}
  return (
    <div className={styles.contain}>{items.map((e)=>{return<Link href={`/category/${e.id}`} className={styles.card} key={e.id}
    onMouseOver={()=>{setShowdescription(e.id)}} onMouseOut={()=>{setShowdescription(null)}}>
      <img src={e.image} className={styles.images}/>
    <h3>{e.title}</h3>
    {showdescrption==e.id&&<div className={styles.description}>{e.description}</div>}
    </Link>})}
    </div>
  )
}

export default SelectionsGrid