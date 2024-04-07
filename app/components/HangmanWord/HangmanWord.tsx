import styles from './hangmanword.module.scss';

type HangmanWordProps = {
    guessedLetters: string[];
    wordToGuess: string;
    reveal?: boolean;
}

export default function HangmanWord({ guessedLetters, wordToGuess, reveal = false }: HangmanWordProps)
{
    return (
        <div className={styles.hangmanWord}>
            {wordToGuess.split("").map((letter, index) =>
            {
                return (
                    <div key={index} className={styles.hangmanLetter}>
                        <span className={`${guessedLetters.includes(letter) || reveal ? styles.letterVisible : styles.letterHidden} ${!guessedLetters.includes(letter) && reveal ? styles.letterRed : ""}`}>
                            {letter}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
