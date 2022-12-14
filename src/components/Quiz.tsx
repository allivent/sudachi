import React, { useState } from 'react';
import { VocabEntryType } from '../data/types/Vocab';
import { Button, SHAPE } from 'baseui/button';
import { Block } from 'baseui/block';
import { Input } from 'baseui/input';

function renderAnswer({ vocab }: { vocab: VocabEntryType }) {
  const kanjiSection = <div>kanji: {vocab.kanji}</div>;
  return (
    <Block paddingTop="25px">
      {vocab.kanji ? kanjiSection : null}
      <div>meaning: {vocab.meaning}</div>
    </Block>
  );
}

function Quiz({
  returnToSettings,
  vocab,
}: {
  returnToSettings: Function;
  vocab: VocabEntryType[];
}) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shouldShowAnswer, setShouldShowAnswer] = useState<boolean>(false);
  const [guess, setGuess] = useState<string>('');

  const current = vocab[currentIndex];

  function moveThroughQuiz({ newIndex }: { newIndex: number }) {
    setGuess('');
    setShouldShowAnswer(false);
    return setCurrentIndex(newIndex);
  }

  function handleKeyPress(
    evt: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (evt.key === 'Enter') {
      return setShouldShowAnswer(true);
    } else if (evt.key === 'ArrowLeft') {
      return moveThroughQuiz({
        newIndex: currentIndex - 1,
      });
    } else if (evt.key === 'ArrowRight') {
      return moveThroughQuiz({
        newIndex: currentIndex + 1,
      });
    }
  }

  return (
    <div>
      <Block minHeight="250px">
        <Block minHeight="200px">
          <div>{current.kana}</div>
          <Block maxWidth="300px" margin="0 auto" paddingTop="25px">
            <Input
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              autoFocus={true}
              onKeyDown={handleKeyPress}
            />
          </Block>
          {shouldShowAnswer ? renderAnswer({ vocab: current }) : null}
        </Block>
        <Block paddingTop="25px">
          <Button
            style={{ marginRight: '10px' }}
            shape={SHAPE.pill}
            onClick={() =>
              moveThroughQuiz({
                newIndex: currentIndex - 1,
              })
            }
            disabled={currentIndex < 1}
          >
            {'Back'}
          </Button>
          <Button shape={SHAPE.pill} onClick={() => setShouldShowAnswer(true)}>
            {'View answer'}
          </Button>
          <Button
            style={{ marginLeft: '10px' }}
            shape={SHAPE.pill}
            onClick={() =>
              moveThroughQuiz({
                newIndex: currentIndex + 1,
              })
            }
            disabled={currentIndex === vocab.length - 1}
          >
            {'Next'}
          </Button>
        </Block>
      </Block>
      {returnToSettings()}
    </div>
  );
}

export default Quiz;
