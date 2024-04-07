import styles from './hangmandrawing.module.scss';

const HEAD = (
    <div key="hangmanHead" className={styles.hangmanHead} />
)

const BODY = (
    <div key="hangmanBody" className={styles.hangmanBody} />
)

const LEFT_ARM = (
    <div key="hangmanLeftArm" className={styles.hangmanLeftArm} />
)

const RIGHT_ARM = (
    <div key="hangmanRightArm" className={styles.hangmanRightArm} />
)

const LEFT_LEG = (
    <div key="hangmanLeftLeg" className={styles.hangmanLeftLeg} />
)

const RIGHT_LEG = (
    <div key="hangmanRightLeg" className={styles.hangmanRightLeg} />
)

type HangmanDrawingProps = {
    incorrectGuesses: number;
}

const BODY_PARTS = [HEAD, BODY, LEFT_ARM, RIGHT_ARM, LEFT_LEG, RIGHT_LEG];

export default function HangmanDrawing({ incorrectGuesses }: HangmanDrawingProps)
{

    return (
        <div className={styles.hangmanDrawing}>
            <div className={styles.hangmanDropdown} />
            {BODY_PARTS.slice(0, incorrectGuesses)}
            <div className={styles.hangmanRope} />
            <div className={styles.hangmanPole} />
            <div className={styles.hangmanBase} />
        </div>
    )
}
