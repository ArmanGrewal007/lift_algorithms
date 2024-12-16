import React from 'react';
import { Floor as FloorType } from '../types/types';

interface FloorProps {
  floor: FloorType;
  onFloorClick: (floorNumber: number) => void;
  isLiftHere: boolean;
}

export const Floor: React.FC<FloorProps> = ({ floor, onFloorClick, isLiftHere }) => {
  return (
    <div 
      className={`
        h-16 border-b border-gray-300 flex items-center justify-between px-4
        ${isLiftHere ? 'bg-blue-100' : 'bg-white'}
        hover:bg-gray-50 cursor-pointer transition-colors
      `}
      onClick={() => onFloorClick(floor.number)}
    >
      <div className="font-semibold text-gray-700">Floor {floor.number}</div>
      {isLiftHere && (
        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
          Lift Here
        </div>
      )}
    </div>
  );
};