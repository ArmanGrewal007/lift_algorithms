import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonWalkingLuggage, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const TOTAL_FLOORS = 10;
const LIFTS_COUNT = 3;

const App = () => {
  // State to manage the current floor of each lift
  const [liftPositions, setLiftPositions] = useState<number[]>(Array(LIFTS_COUNT).fill(1));
  // State to manage passengers on each floor
  const [passengers, setPassengers] = useState<boolean[]>(Array(TOTAL_FLOORS).fill(false));
  // State to track passengers inside lifts
  const [liftPassengers, setLiftPassengers] = useState<(number | null)[]>(Array(LIFTS_COUNT).fill(null));

  // Function to randomly generate passengers on floors
  const generatePassengers = () => {
    setPassengers((prev) =>
      prev.map((_, i) => {
        if (i === 0) {
          return Math.random() < 0.37; // 37% chance on ground floor
        } else {
          return Math.random() < 0.07; // 7% chance on other floors
        }
      })
    );
  };

  // Function to handle lift movement
  const moveLift = (liftIndex: number, floor: number) => {
    if (floor >= 1 && floor <= TOTAL_FLOORS) {
      setLiftPositions((prev) => {
        const newPositions = [...prev];
        newPositions[liftIndex] = floor;
        return newPositions;
      });
    }
  };

  // Function to handle passengers entering lifts
  const handlePassengerEntry = () => {
    setPassengers((prevPassengers) =>
      prevPassengers.map((hasPassenger, floorIndex) => {
        if (hasPassenger) {
          // Check if a lift is on the current floor and available
          const availableLiftIndex = liftPositions.findIndex(
            (liftFloor, liftIndex) => liftFloor === floorIndex + 1 && liftPassengers[liftIndex] === null
          );
          if (availableLiftIndex !== -1) {
            // Passenger enters the lift
            setLiftPassengers((prevLiftPassengers) => {
              const newLiftPassengers = [...prevLiftPassengers];
              newLiftPassengers[availableLiftIndex] = floorIndex + 1;
              return newLiftPassengers;
            });
            return false; // Passenger leaves the floor
          }
        }
        return hasPassenger;
      })
    );
  };

  // Use effect to generate passengers every 3rd second
  useEffect(() => {
    const interval = setInterval(() => {
      generatePassengers();
      handlePassengerEntry();
    }, 3000);
    return () => clearInterval(interval);
  }, [liftPositions, liftPassengers]);

  return (
    <>
      <h1 className="text-4xl font-bold my-5 text-center">Lift Simulator</h1>
      <div className="flex flex-row justify-center mx-auto my-5 p-2.5">
        <div className="flex flex-col-reverse mr-5">
          {[...Array(TOTAL_FLOORS)].map((_, i) => {
            const floorNumber = i + 1;
            return (
              <div
                key={floorNumber}
                className="h-10 leading-10 border border-gray-800 my-0.5 px-2.5 bg-gray-50 flex justify-between items-center w-64"
              >
                <span>{floorNumber}</span>
                {passengers[floorNumber - 1] && (
                  <FontAwesomeIcon icon={faPersonWalkingLuggage} className="ml-2.5 text-lg" />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex flex-row gap-5">
          {[...Array(LIFTS_COUNT)].map((_, liftIndex) => (
            <div key={liftIndex} className="flex flex-col-reverse w-10 gap-1 my-0.5">
              {[...Array(TOTAL_FLOORS)].map((_, i) => {
                const floorNumber = i + 1;
                return (
                  <div
                    key={floorNumber}
                    className={`h-10 border flex justify-center items-center
                      ${liftPositions[liftIndex] === floorNumber
                        ? 'bg-green-500 text-white border-gray-800'
                        : 'border-transparent'}`}
                  >
                    {liftPositions[liftIndex] === floorNumber && liftPassengers[liftIndex] !== null && (
                      <FontAwesomeIcon icon={faPersonWalkingLuggage} className="text-lg" />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-5">
        {[...Array(LIFTS_COUNT)].map((_, liftIndex) => (
          <div key={liftIndex} className="text-center">
            <h3 className="text-sm font-semibold">Lift {liftIndex + 1}</h3>
            <button
              onClick={() => moveLift(liftIndex, liftPositions[liftIndex] + 1)}
              disabled={liftPositions[liftIndex] === TOTAL_FLOORS}
              className="m-1 p-2.5 text-base cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon icon={faArrowUp} size="sm" />
            </button>
            <button
              onClick={() => moveLift(liftIndex, liftPositions[liftIndex] - 1)}
              disabled={liftPositions[liftIndex] === 1}
              className="m-1 p-2.5 text-base cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon icon={faArrowDown} size="sm" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;