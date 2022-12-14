import { useState } from 'react';

import { useCourse } from './Course';
import PracticeSetup from '../components/PracticeSetup';
import Quiz from '../components/Quiz';
import Slideshow from '../components/Slideshow';
import { UnitType } from '../data/types/Units';
import ReturnToSettings from '../components/ReturnToSettings';

export const SETUP = 'SETUP';
export const QUIZ = 'QUIZ';
export const SLIDESHOW = 'SLIDESHOW';

export type ModeType = keyof {
  [SETUP]: string;
  [QUIZ]: string;
  [SLIDESHOW]: string;
};

function renderChangeSettingsButton(setIsActive: Function) {
  return <ReturnToSettings setIsActive={setIsActive} />;
}

function Practice() {
  const [selectedUnits, setSelectedUnits] = useState<number[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<number>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const { course } = useCourse();

  let mode = SETUP;
  if (selectedStyle === 0) {
    mode = QUIZ;
  } else if (selectedStyle === 1) {
    mode = SLIDESHOW;
  }

  let currentView = () =>
    PracticeSetup(
      selectedUnits,
      setSelectedUnits,
      course.units,
      selectedStyle,
      setSelectedStyle,
      setIsActive
    );

  if (isActive && selectedUnits.length > 0) {
    const returnToSettings = () => renderChangeSettingsButton(setIsActive);
    const unitsToUse: UnitType[] = Object.values(course.units).filter(
      (_unit, index) => selectedUnits.indexOf(index) >= 0
    );

    let allVocab: Array<any> = [];
    if (mode !== SETUP) {
      unitsToUse.forEach((unit) => {
        allVocab.push(unit.vocab);
      });
      allVocab = allVocab.flat().sort(() => (Math.random() > 0.5 ? 1 : -1));
    }
    if (mode === QUIZ) {
      currentView = () => (
        <Quiz returnToSettings={returnToSettings} vocab={allVocab} />
      );
    } else if (mode === SLIDESHOW) {
      currentView = () => (
        <Slideshow returnToSettings={returnToSettings} vocab={allVocab} />
      );
    }
  }

  return (
    <div>
      <h3>Practice</h3>
      <span>{currentView()}</span>
    </div>
  );
}

export default Practice;
