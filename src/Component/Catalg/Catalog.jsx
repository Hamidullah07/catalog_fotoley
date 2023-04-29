import React, { useState, useRef, useEffect } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import data from '../Data/Data';
import './Catalog.css';

const Catalog = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const timeOut = useRef(null);

    const handleNext = () => {
        if (currentIndex < data.length) {
            if (currentIndex === data.length - 1) {
                setCurrentIndex(0)
            }
            else {
                setCurrentIndex(currentIndex + 1)
            }
        }
    };
    const handlePrev = () => {
        if (currentIndex === 0) {
            setCurrentIndex(data.length - 1)
        } else {
            setCurrentIndex(currentIndex - 1)
        }
    };

    const hanldePlay = () => {
        if (!isPlaying) {
            setIsPlaying(true)
        }
        else {
            setIsPlaying(false)
        }
    }

    const resetTimeout = () => {
        if (timeOut.current) {
            clearTimeout(timeOut.current)
        }
    };

    useEffect(() => {
        if (isPlaying) {
            resetTimeout();
            timeOut.current = setTimeout(
                () => setCurrentIndex((prevIndex) => prevIndex === data.length - 1 ? 0 : prevIndex + 1),
                3000
            );
            return () => {
                resetTimeout();
            };
        }
    },[isPlaying ,currentIndex])

    return (
        <div className="Catalog">
            <ArrowBackIosIcon className="catelog_box_back" onClick={()=> handlePrev()} />
                    <div className="Catalog_box_content">
                        <div className="Catalog_box_content_box">
                            <img className="Catalog_box_content_img"
                                src={data[currentIndex].image}
                                alt={data[currentIndex].id}
                            />
                            <div className="Catalog_box_content_right">
                                <h3>{ data[currentIndex].heading}</h3>
                                <p>{data[currentIndex].descrption}</p>
                            </div>
                        </div>
                        <div className="catelog_down">
                            {data.map((el, i) => (
                                <div className="Catalog_box_multi_img">
                                    <img
                                        key={i }
                                        src={el.image}
                                        alt={el.id}
                                        className={currentIndex === i ? "active" : "Catalog_img"}
                                        onClick={()=> {setCurrentIndex(i)}}
                                    />
                                </div>
                             ))}
                            <div onClick={()=> hanldePlay()} className='pbtn'>
                                {isPlaying ? <PauseCircleIcon className='btn' /> : <PlayCircleIcon className='btn' />}
                            </div>
                        </div>
                    </div>
            <ArrowForwardIosIcon className="catelog_box_back" onClick={()=> handleNext()} />
      </div>
  );
};

export default Catalog;


