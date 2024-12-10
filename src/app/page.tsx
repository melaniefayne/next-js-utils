'use client';

import AnimatedParagraph from "@/components/text-opacity-scroll/text-opacity-scroll";

const paragraph = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."

export default function Home() {

  const words = paragraph.split(" ")
  return (
    <main>
      <div style={{ height: '20vh' }}></div>

      <hr></hr>
      <h1>Text Gradient Opacity On Scroll</h1>
      <AnimatedParagraph paragraph={paragraph} animationMode="paragraph" />
      <div style={{ height: '20vh' }}></div>
      <AnimatedParagraph paragraph={paragraph} animationMode="word" txtColor="#FF0" />
      <div style={{ height: '20vh' }}></div>
      <AnimatedParagraph paragraph={paragraph} animationMode="character" />
      <div style={{ height: '50vh' }}></div>

      <hr></hr>
    </main>
  )
}