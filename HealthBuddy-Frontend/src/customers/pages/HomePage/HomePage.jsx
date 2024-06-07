import React from 'react'
import MainCarousel from '../../components/HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel'
import { diabetes } from '../../../Data/diabetes'
import { supplements } from '../../../Data/supplements'
import { disinfectants } from '../../../Data/disinfectants'
import { vitamin } from '../../../Data/vitamin'

const HomePage = () => {
  return (
    <div>
        <MainCarousel/>
        <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
            <HomeSectionCarousel data={diabetes} sectionName={"Diabates"}/>
            <HomeSectionCarousel data={supplements} sectionName={"Suppliments"}/>
            <HomeSectionCarousel data={disinfectants} sectionName={"Disinfectants"}/>
            <HomeSectionCarousel data={vitamin} sectionName={"Vitamins"}/>
        </div>
    </div>
  )
}

export default HomePage