import styles from "./app.module.css";

import { useEffect, useState } from "react";

import { WORDS } from "./utils/words";
import type { Challenge } from "./utils/words";
import type { LetterUsedProps } from "./components/LettersUsed/Index";

import { Header } from "./components/Header";
import { Letter } from "./components/Letter";
import { Button } from "./components/Button/Index";
import { Input } from "./components/Input";
import { Tip } from "./components/Tip";
import { LetterUsed } from "./components/LettersUsed/Index";

export default function App() {
  const [score, setScore] = useState(0);
  const [letter, SetLetter] = useState("");
  const [letterUsed, setLetterUsed] = useState<LetterUsedProps[]>([]);
  const [challange, setChallenge] = useState<Challenge | null>(null);

  const ATTEMPTS_MARGIN = 5;

  function handleRestartGame() {
    const isConfirme = window.confirm("Você tem certeza que deseja reiniciar?")

    if(isConfirme){
      startGame()
    }
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];
    setChallenge(randomWord);

    setScore(0);
    SetLetter("");
    setLetterUsed([]);
  }

  function handleConfirm() {
    if (!challange) {
      return;
    }

    if (!letter.trim()) {
      return alert("Digite uma letra");
    }

    const value = letter.toLocaleUpperCase();
    const exists = letterUsed.find(
      (used) => used.value.toUpperCase() === value,
    );

    if (exists) {
      SetLetter("");
      return alert(`Você já utilizou a letra ${value}`);
    }

    const hits = challange.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length;

    const correct = hits > 0;
    const currentScore = score + hits;

    setLetterUsed((prevState) => [...prevState, { value, correct }]);
    setScore(currentScore);

    SetLetter("");
  }

  function endGame(message: string) {
    alert(message);
    startGame();
  }

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (!challange) {
      return;
    }

    setTimeout(() => {
      if (score === challange.word.length) {
        return endGame("parabéns, você descobriu a palavra!");
      }

      const attempLimit = challange.word.length + ATTEMPTS_MARGIN;

      if (letterUsed.length === attempLimit) {
        return endGame("Que pena, você usou todas as tentativas!");
      }
    }, 200);
  }, [score, letterUsed.length]);

  if (!challange) {
    return;
  }

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={letterUsed.length}
          max={challange.word.length + ATTEMPTS_MARGIN}
          onRestart={handleRestartGame}
        />

        <Tip tip={challange.tip} />

        <div className={styles.word}>
          {challange.word.split("").map((letter, index) => {
            const letteruserd = letterUsed.find(
              (used) => used.value.toUpperCase() === letter.toLocaleUpperCase(),
            );

            return (
              <Letter
                key={index}
                value={letteruserd?.value}
                color={letteruserd?.correct ? "correct" : "defaul"}
              />
            );
          })}
        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letter}
            onChange={(e) => SetLetter(e.target.value)}
          />
          <Button title="Confirmar" onClick={handleConfirm} />
        </div>

        <LetterUsed data={letterUsed} />
      </main>
    </div>
  );
}
