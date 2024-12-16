export interface Lift {
    id: number;
    currentFloor: number;
    isMoving: boolean;
    direction: 'up' | 'down' | 'idle';
  }
  
  export interface Floor {
    number: number;
    hasLift: boolean;
  }