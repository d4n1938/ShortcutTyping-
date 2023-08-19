import { type ReactElement } from 'react';
import { Animator } from '@arwes/react-animator';
import { GridLines, Dots, MovingLines, Puffs } from '@arwes/react-bgs';

const BGDots = (): ReactElement => {
  return (
    <Animator duration={{ interval: 10 }}>
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: -1,
        backgroundColor: '#000906',
        backgroundImage: 'radial-gradient(85% 85% at 50% 50%, hsla(185, 100%, 25%, 0.25) 0%, hsla(185, 100%, 25%, 0.12) 50%, hsla(185, 100%, 25%, 0) 100%)'
      }}>
        <Puffs
          color='hsla(180, 100%, 75%, 0.5)'
          quantity={30}
        />
        <GridLines
          lineColor='hsla(180, 100%, 75%, 0.05)'
          distance={60}
        />
        <Dots
          color='hsla(180, 100%, 75%, 0.05)'
          distance={60}
        />
        <MovingLines
          lineColor='hsla(180, 100%, 75%, 0.07)'
          distance={60}
          sets={20}
        />
      </div>
    </Animator>
  );
};


export default BGDots;