import React, { useState } from "react";
import { View, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Slider from "../Components/Slider";

function Home() {
  // Example images array
  const [sliderImages, setSliderImages] = useState([
    require("../assets/images/1.jpg"),
    require("../assets/images/2.jpeg"),
    require("../assets/images/3.jpeg"),
    // Or use URLs
    // 'https://example.com/image1.jpg',
    // 'https://example.com/image2.jpg',
  ]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar color="blue" barStyle="dark-content" />

      {/* Basic usage */}
      <Slider images={sliderImages} showBullets={false} imageHeight={350} />

      {/* Or with more options */}
      {/* <Slider 
        images={sliderImages}
        showBullets={true}
        autoPlay={true}
        autoPlayInterval={5000}
        imageHeight={250}
        bulletColor="#FF0000"
        inactiveBulletColor="#999"
      /> */}
    </SafeAreaView>
  );
}

export default Home;
