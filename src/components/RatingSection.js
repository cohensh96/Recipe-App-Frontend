import React from 'react'
import { FaStar } from 'react-icons/fa';
import { useState,useEffect } from 'react';

const RatingSection = ({comments}) => {
    const [avarage, setAvarage] = useState(0)
    useEffect(() => {
        handleAvarage();
    }, [comments]);
    const handleAvarage = () => {
        if(comments.length <= 0)
            return 0;
        
        let avarge = 0;
        comments.forEach(comment => {
            avarge += comment.rating;
            console.log(comment.rating);
        })
        setAvarage(avarge / comments.length);
        console.log(avarage);
    }

  return (
    <div>
        {comments.length  > 0 ? 
            (<section>
                <ol className='flex'>
                    {
                        [1, 2, 3, 4, 5].map((star, index) => (
                            <li key={index}><FaStar className={Math.floor(avarage) >= star ? 'text-yellow-500' : 'text-gray-300'}/></li>
                        ))
                    }
                </ol>
                <p>{comments.length} Revives | {avarage.toFixed(1)} Avarage</p>
            </section>) 
            : 
            (<section>
                <p>No Revivews.</p>
            </section>)}
        <section></section>
    </div>
  )
}

export default RatingSection