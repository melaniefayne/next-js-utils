import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import React, { CSSProperties, useRef } from 'react';
import styles from './style.module.scss'

// ============================== Props
interface AnimatedParagraphProps {
    paragraph: string;
    animationMode: 'paragraph' | 'word' | 'character';
    txtColor?: string;
}

interface WordProps {
    children: React.ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
    txtColor?: string;
}

// ============================== Components

const AnimatedParagraph: React.FC<AnimatedParagraphProps> = ({ paragraph, animationMode, txtColor }) => {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start 0.9', 'start 0.25'],
    });
    const textStyle: CSSProperties = { color: txtColor };

    if (animationMode === 'paragraph') {
        // Animate the entire paragraph
        const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
        return (
            <motion.p
                ref={container}
                className={styles.paragraph}
                style={{ ...textStyle, opacity }}
            >
                {paragraph}
            </motion.p>
        );
    }

    const words = paragraph.split(' ');

    if (animationMode === 'word') {
        // Animate word-by-word
        return (
            <p ref={container} className={styles.paragraph} style={textStyle}>
                {words.map((word, i) => {
                    const start = i / words.length;
                    const end = start + 1 / words.length;
                    return (
                        <AnimatedWord key={`w_${i}`} progress={scrollYProgress} range={[start, end]}>
                            {word}
                        </AnimatedWord>
                    );
                })}
            </p>
        );
    }

    if (animationMode === 'character') {
        // Animate character-by-character
        return (
            <p ref={container} className={styles.paragraph} style={textStyle}>
                {words.map((word, i) => {
                    const start = i / words.length;
                    const end = start + 1 / words.length;
                    return (
                        <AnimatedWord key={`w_${i}`} progress={scrollYProgress} range={[start, end]}>
                            {word.split('').map((char, j) => (
                                <AnimatedCharacter
                                    key={`c_${i}_${j}`}
                                    progress={scrollYProgress}
                                    range={[
                                        start + (j / word.length) * (end - start),
                                        start + ((j + 1) / word.length) * (end - start),
                                    ]}
                                >
                                    {char}
                                </AnimatedCharacter>
                            ))}
                        </AnimatedWord>
                    );
                })}
            </p>
        );
    }

    return <p>{paragraph}</p>; 
};


const AnimatedWord: React.FC<WordProps> = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span className={styles.word}>
             <span className={styles.shadow}>{children}</span>
            <motion.span style={{ opacity }}>{children}</motion.span>
        </span>
    );
};

const AnimatedCharacter: React.FC<WordProps> = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span className={styles.character}>
             <span className={styles.shadow}>{children}</span>
            <motion.span style={{ opacity }}>{children}</motion.span>
        </span>
    );
};

export default AnimatedParagraph;
