'use client'
import React, { useEffect, useState } from 'react'
import SideMenu from '../SideMenu/SideMenu'
import SelectionsGrid from '../../SelectionsGrib/SelectionsGrid'
import styles from './Landing.module.css'
import db from '../../../libs/db.json'
import category from '../../../libs/category.json'
import Hero from '../Hero/Hero'
import CTA from '../CTA/CTA'
import BreathingExercise from '../BreathingExercise/BreathingExercise'
interface Props {
    name: string
    id: string
    
    selector: () => void
  }
interface GridItem {
    id: string
    categoryId: string
    title: string
    description: string
    image: string
    audio?: string
    order?: number
  }
function Landing() {
    const [isSelected,setIsSelected]=useState<string | null>('cat-1')
    const[renderItems,setRenderItems]=useState<GridItem[]>([])
    const items: Props[] = category.map(e => ({id:e.id,name:e.name,selector:()=>setIsSelected(e.id),}))
    
useEffect(()=>{
    if(isSelected===null||isSelected===undefined){
        setIsSelected(items[0].id)
    }
},[isSelected])
useEffect(()=>{
const data=db.filter(e=>{return e.categoryId==isSelected})
setRenderItems(data)
},[isSelected])
  return (
    <>
    <Hero
    direction='center'
    src='/IMG-20260102-WA0035.jpg'
    title={null}
    discription={null}
    />
    <CTA/>
    <BreathingExercise/>
    <div className={styles.contain}>
        <SideMenu
        items={items}
        isSelected={isSelected}
        />
        <SelectionsGrid
        items={renderItems}
        />
    </div>
    </>
  )
}

export default Landing