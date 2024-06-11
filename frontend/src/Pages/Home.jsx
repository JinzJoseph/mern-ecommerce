import React from 'react'
import CategoryProduct from '../Components/CategoryProduct'
import Banner from '../Components/Banner'
import HorizProductList from '../Components/HorizProductList'
import VerticalCardProduct from '../Components/VerticalCardProduct'

const Home = () => {
  return (
    <>
    <CategoryProduct/>
    <Banner/>
    <HorizProductList  category={"airpodes"} heading={"Top's Airpodes"}/>
    <HorizProductList  category={"watches"} heading={"Popular's Watches  "}/>
    <VerticalCardProduct category={"mobiles"} heading={" Mobile phones "}/>
    <HorizProductList  category={"Mouse"} heading={"Top's Mouse"}/>
    <VerticalCardProduct category={"processor"} heading={" Top Brand Processor "}/>
    <HorizProductList  category={"camera"} heading={"Top camera"}/>
    <VerticalCardProduct category={"printers"} heading={" Top Brand printers "}/>
    <HorizProductList  category={"speakers"} heading={"Top speakers"}/>
    <VerticalCardProduct category={"refrigerator"} heading={" Top Brand refrigerator "}/>
    </>
  )
}

export default Home
