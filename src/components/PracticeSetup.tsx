import { UnitType } from '../data/types/Units';
import { Button } from 'baseui/button';
import { ButtonGroup, MODE } from 'baseui/button-group';
import { Block } from 'baseui/block';
import { UnitsForCourseType } from '../data/types/Courses';

function PracticeSetup(
  selectedUnits: number[],
  setSelectedUnits: Function,
  units: UnitsForCourseType,
  selectedStyle: number | undefined,
  setSelectedStyle: Function,
  setIsActive: Function
) {
  return (
    <div>
      <Block>
        <h4>Select unit(s)</h4>
        <div className="practice-select">
          <ButtonGroup
            mode="checkbox"
            selected={selectedUnits}
            onClick={(_event, index) => {
              if (!selectedUnits.includes(index)) {
                setSelectedUnits([...selectedUnits, index]);
              } else {
                setSelectedUnits(
                  selectedUnits.filter((value) => value !== index)
                );
              }
            }}
          >
            {Object.values(units).map((unit: UnitType) => (
              <Button key={`practice-unit-select-${unit.name}`}>
                {unit.name}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </Block>
      <Block paddingTop="10px">
        <h4>Hello Haru</h4>
        <div className="practice-select">
          <ButtonGroup
            mode={MODE.radio}
            selected={selectedStyle}
            onClick={(_event, index) => {
              setSelectedStyle(index);
            }}
          >
            <Button>Quiz</Button>
            <Button>Slideshow</Button>
          </ButtonGroup>
        </div>
      </Block>
      <Block paddingTop="50px">
        <Button
          disabled={selectedStyle === undefined || selectedUnits.length <= 0}
          onClick={() => setIsActive(true)}
        >
          Start
        </Button>
      </Block>
    </div>
  );
}

export default PracticeSetup;
