import { useUnit } from "../contexts/UnitContext";

const UnitSwitcher = () => {
  const { unit, toggleUnit } = useUnit();

  return (
    <div className="flex justify-center mb-4">
      <button
        onClick={toggleUnit}
        className="px-4 py-2 rounded-lg font-medium bg-blue-500 hover:bg-blue-600 text-white transition-all dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        {unit === "metric" ? "Switch to °F" : "Switch to °C"}
      </button>
    </div>
  );
};

export default UnitSwitcher;
