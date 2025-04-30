import { useUnit } from "../contexts/UnitContext";
import { useIntl } from "react-intl";

const UnitSwitcher = () => {
  const { unit, toggleUnit } = useUnit();
  const intl = useIntl();

  return (
    <div className="flex justify-center mb-4">
      <button
        onClick={toggleUnit}
        className="px-4 py-2 rounded-lg font-medium bg-blue-500 hover:bg-blue-600 text-white transition-all dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        {unit === "metric"
          ? intl.formatMessage({
              id: "switchToF",
              defaultMessage: "Switch to °F",
            })
          : intl.formatMessage({
              id: "switchToC",
              defaultMessage: "Switch to °C",
            })}
      </button>
    </div>
  );
};

export default UnitSwitcher;
