import React from 'react';

import { CountBox, SpecificValueBox, AnyNumberBox, BonusBox } from '../types';

interface InputProps {
    box: CountBox | SpecificValueBox | AnyNumberBox | BonusBox;
    onClick: Function;
}

export const Input: React.FC<InputProps> = ({ box, onClick }) => {
    return <div onClick={() => onClick(box)}>{box.points}</div>;
};

// interface TopInputProps {
//     value: number;
//     index: number;
// }

// export const TopInput: React.FC = ({ value, index }: TopInputProps) => (
//     <Input options={[0, 1, 2, 3, 4, 5].map(v => v * (index + 1))} value={value * (index + 1)} />
// );
