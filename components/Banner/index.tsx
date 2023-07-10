import React, { useState,useEffect} from 'react'
import { BannerContainer, BannerImage, BannerNav } from './Banner.style'
import {Banner} from '@/models/banner_model'
import { faChevronRight,faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'

type bannerPropType={
    banners: Banner[]
  }

function BannerSlider(props: bannerPropType) {
    const [currentIndex, setcurrentIndex] = useState(0)
    const router=useRouter()
    const goToPrevBanner=()=>{
    console.log('Going to prev banner')
    const isFirst=currentIndex===0
    const newIndex= isFirst? props.banners.length-1:currentIndex-1
    setcurrentIndex(newIndex)
    }
    const goToNextBanner=()=>{
    console.log('Going to next banner')
    const isLast=currentIndex===props.banners.length-1
    const newIndex=isLast? 0:currentIndex+1
    setcurrentIndex(newIndex)
    } 
    useEffect(() => {
      const interval = setInterval(goToNextBanner, 5000); // Auto slide change every 5 seconds
      return () => {
        clearInterval(interval); // Clear the interval on component unmount
      };
    }, [currentIndex]);
  return (
    <BannerContainer>
        <BannerNav className="left" onClick={goToPrevBanner}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </BannerNav>
        {props.banners.map((banner, index) => (
            <BannerImage backgroundimage={banner.imageUrl} key={index} className={index === currentIndex ? 'active' : ''} onClick={()=>router.push(banner.link)}/>
        ))}
        <BannerNav className="right" onClick={goToNextBanner}>
        <FontAwesomeIcon icon={faChevronRight}/>
        </BannerNav>
    </BannerContainer>
  )
}

export default BannerSlider
