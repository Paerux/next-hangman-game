import styles from './keyboard.module.scss'

const KEYS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


type KeyboardProps = {
    activeLetters: string[];
    inactiveLetters: string[];
    addGuessedLetter: (letter: string) => void;
    disabled: boolean;
}

export default function Keyboard({ disabled = false, activeLetters, inactiveLetters, addGuessedLetter }: KeyboardProps)
{
    return (
        <div className={styles.keyboard}>
            {KEYS.map((key) =>
            {
                const isActive = activeLetters.includes(key);
                const isInactive = inactiveLetters.includes(key);
                return (
                    <button onClick={() => addGuessedLetter(key)}
                        className={`${styles.key} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`}
                        key={key}
                        disabled={isInactive || isActive || disabled}>{key}</button>
                )
            })}
        </div>
    )
}
