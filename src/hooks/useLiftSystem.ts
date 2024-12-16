import { useState, useCallback } from 'react';
import { Lift, Floor } from '../types/types';

export const useLiftSystem = () => {
  const [lifts, setLifts] = useState<Lift[]>([
    { id: 1, currentFloor: 0, isMoving: false, direction: 'idle' },
    { id: 2, currentFloor: 0, isMoving: false, direction: 'idle' },
    { id: 3, currentFloor: 0, isMoving: false, direction: 'idle' },
  ]);

  const [floors] = useState<Floor[]>(
    Array.from({ length: 10 }, (_, i) => ({
      number: 9 - i,
      hasLift: false,
    }))
  );

  const moveLift = useCallback((liftId: number, targetFloor: number) => {
    setLifts(prevLifts => {
      return prevLifts.map(lift => {
        if (lift.id === liftId) {
          const direction = targetFloor > lift.currentFloor ? 'up' : 'down';
          return {
            ...lift,
            currentFloor: targetFloor,
            isMoving: true,
            direction,
          };
        }
        return lift;
      });
    });

    // Simulate lift movement time
    setTimeout(() => {
      setLifts(prevLifts => {
        return prevLifts.map(lift => {
          if (lift.id === liftId) {
            return {
              ...lift,
              isMoving: false,
              direction: 'idle',
            };
          }
          return lift;
        });
      });
    }, 1000);
  }, []);

  const findNearestLift = useCallback((targetFloor: number) => {
    let nearestLift = lifts[0];
    let shortestDistance = Math.abs(lifts[0].currentFloor - targetFloor);

    lifts.forEach(lift => {
      const distance = Math.abs(lift.currentFloor - targetFloor);
      if (distance < shortestDistance && !lift.isMoving) {
        shortestDistance = distance;
        nearestLift = lift;
      }
    });

    return nearestLift;
  }, [lifts]);

  const handleFloorClick = useCallback((floorNumber: number) => {
    const nearestLift = findNearestLift(floorNumber);
    if (!nearestLift.isMoving) {
      moveLift(nearestLift.id, floorNumber);
    }
  }, [findNearestLift, moveLift]);

  return {
    lifts,
    floors,
    handleFloorClick,
  };
};