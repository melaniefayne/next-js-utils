'use client';

import pageStyles from './page.module.scss';
import { projects } from '../app/fixtures/cards';
import CardParallax from "@/components/card-parallax/card-parallax";
import AnimatedParagraph from "@/components/text-opacity-scroll/text-opacity-scroll";
import { useScroll } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

const paragraph = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."

export default function Home() {

  const words = paragraph.split(" ")

  const cardParallaxContainer = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardParallaxContainer,
    offset: ['start start', 'end end']
  })

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  return (
    <main>
      <div style={{ height: '20vh' }}></div>

      <section ref={cardParallaxContainer} className={pageStyles.cardParallaxMain}>
        <hr></hr>
        <h1>Card Parallax</h1>
        {
          projects.map((project, i) => {
            const targetScale = 1 - ((projects.length - i) * 0.05);
            return <CardParallax url={''} key={`p_${i}`} i={i} {...project} progress={scrollYProgress} range={[i * .25, 1]} targetScale={targetScale} />
          })
        }
      </section>

      <section>
        <hr></hr>
        <h1>Text Gradient Opacity On Scroll</h1>
        <AnimatedParagraph paragraph={paragraph} animationMode="paragraph" />
        <div style={{ height: '20vh' }}></div>
        <AnimatedParagraph paragraph={paragraph} animationMode="word" txtColor="#FF0" />
        <div style={{ height: '20vh' }}></div>
        <AnimatedParagraph paragraph={paragraph} animationMode="character" />
        <div style={{ height: '50vh' }}></div>
      </section>

    </main>
  )
}