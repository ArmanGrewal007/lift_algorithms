import React from 'react';
import { Lift as LiftType } from '../types/types';
import { Elevator } from 'lucide-react';

interface LiftProps {
  lift: LiftType;
}

export const Lift: React.FC<LiftProps> = ({ lift }) => {
  return (
    <div className={`
      flex items-center gap-2 p-2 rounded-lg
      ${lift.isMoving ? 'bg-yellow-100' : 'bg-green-100'}
      transition-all duration-300
    `}>
      <Elevator className={`w-6 h-6 ${lift.isMoving ? 'text-yellow-600' : 'text-green-600'}`} />
      <div className="text-sm font-medium">
        <span>Lift {lift.id}</span>
        <span className="ml-2 text-gray-600">Floor {lift.currentFloor}</span>
      </div>
    </div>
  );
};