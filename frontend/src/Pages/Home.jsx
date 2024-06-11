import React from 'react'
import CategoryProduct from '../Components/CategoryProduct'
import Banner from '../Components/Banner'
import HorizProductList from '../Components/HorizProductList'

const Home = () => {
  return (
    <>
    <CategoryProduct/>
    <Banner/>
    <HorizProductList  category={"airpodes"} heading={"Top's Airpodes"}/>
    <HorizProductList  category={"watches"} heading={"Popular's Watches  "}/>
    </>
  )
}

export default Home
