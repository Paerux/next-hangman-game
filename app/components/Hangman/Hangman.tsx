"use client";

import styles from './Hangman.module.scss';
import { Fragment, useCallback, useEffect, useState } from 'react'
import words from "../../../data/wordList.json";
import HangmanDrawing from '../HangmanDrawing/HangmanDrawing';
import HangmanWord from '../HangmanWord/HangmanWord';
import Keyboard from '../Keyboard/Keyboard';
import { Dialog, Transition } from '@headlessui/react';
import axios, { AxiosError } from 'axios';



export default function Hangman()
{
    async function getWord()
    {
        //return words[Math.floor(Math.random() * words.length)];
        try
        {
            const response = await axios.get("/api/randomWord", { withCredentials: true });
            setWordtoGuess(response.data.word);
            setHydrated(true);
        }
        catch (error)
        {
            if (error instanceof AxiosError)
            {
                if (error.response?.status === 401)
                {
                    console.error("Unauthorized");
                    setError("Please login with discord.");
                    setHydrated(true);
                    return;
                }
            }
            else
            {
                console.error("Error getting word:", error);
                setHydrated(true);
            }
        }
    }
    const [error, setError] = useState<string>("");
    const [hydrated, setHydrated] = useState(false);
    const [wordToGuess, setWordtoGuess] = useState("");
    const [open, setOpen] = useState(false)

    useEffect(() =>
    {
        if (!hydrated)
        {
            getWord();
            /* setWordtoGuess(getWord);
            setHydrated(true); */
        }

    })

    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const incorrectLetters = guessedLetters.filter((letter) => !wordToGuess.includes(letter));

    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess ? wordToGuess.split("").every((letter) => guessedLetters.includes(letter)) : false;

    const addGuessedLetter = useCallback((letter: string) =>
    {
        if (!guessedLetters.includes(letter) && !isLoser && !isWinner)
        {
            setGuessedLetters(currentLetters => [...currentLetters, letter]);
        }
    }, [guessedLetters, isLoser, isWinner]);

    useEffect(() =>
    {
        if (wordToGuess === "") return;
        console.log("Updated word to guess:", wordToGuess);
    }, [wordToGuess]);

    useEffect(() =>
    {
        const handler = (event: KeyboardEvent) =>
        {
            const key = event.key;
            if (key !== "Enter" || (!isWinner && !isLoser)) return;

            event.preventDefault();
            setGuessedLetters([]);
            /* setWordtoGuess(getWord()); */
            getWord();
            setOpen(false);
        }

        document.addEventListener('keypress', handler);
        return () =>
        {
            document.removeEventListener('keypress', handler);
        }
    }, [wordToGuess, isWinner, isLoser])

    useEffect(() =>
    {
        const handler = (event: KeyboardEvent) =>
        {
            const key = event.key.toLowerCase();
            if (!key.match(/^[a-z]$/)) return;
            event.preventDefault();
            addGuessedLetter(key);
        }
        document.addEventListener('keypress', handler);
        return () =>
        {
            document.removeEventListener('keypress', handler)
        }
    }, [guessedLetters, wordToGuess])

    useEffect(() =>
    {
        if (hydrated && (isWinner || isLoser))
        {
            setOpen(true);
        }
    }, [isWinner, isLoser])

    return (
        <div className={`${styles.hangman}`}>
            <div className={`${styles.hangmanContainer}`}>
                {!hydrated && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {hydrated && (
                    <>
                        <Transition.Root show={open} as={Fragment}>
                            <Dialog as="div" className="relative z-10 resultDialog" onClose={setOpen}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                </Transition.Child>

                                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        >
                                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                                <div className={styles.result}>
                                                    {isWinner && "Winner! Press Enter to try again"}
                                                    {isLoser && "Loser! Press Enter to try again"}
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition.Root>

                        {wordToGuess && <HangmanDrawing incorrectGuesses={incorrectLetters.length} />}
                        {wordToGuess && <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />}
                        {wordToGuess && (<div style={{ alignSelf: "stretch" }}>
                            <Keyboard activeLetters={guessedLetters.filter(letter =>
                                wordToGuess.includes(letter))}
                                inactiveLetters={incorrectLetters}
                                addGuessedLetter={addGuessedLetter}
                                disabled={isWinner || isLoser} />
                        </div>)}
                    </>
                )}
            </div>
        </div >
    )
}
