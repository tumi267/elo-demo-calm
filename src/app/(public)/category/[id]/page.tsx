import React from 'react'
import db from '../../../libs/db.json'
import AudioPlayer from '@/app/components/(public)/AudioPlayer/AudioPlayer'

function page({ params }: { params: { id: string } }) {
  
  const data = db.find((item) => item.id === params.id)
  if (!data) {
    return <div>Item not found</div>
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <AudioPlayer/>
    </div>
  )
}


export default page