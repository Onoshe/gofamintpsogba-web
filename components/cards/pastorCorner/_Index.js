'use client'
import React from 'react'
import Card from './Card';



const CardIndex = ({photo,postedDate, msg, topic, comment, likes, bibleRef, 
    prayer, styles, item}) => {

    return (
        <Card
            photo={photo}
            postedDate={postedDate}
            msg={msg}
            topic={topic}
            comment={comment}
            likes={likes}
            bibleRef={bibleRef}
            prayer={prayer}
            styles={styles}
            item={item}
            id={item.id}
        />
    )
}


export default CardIndex