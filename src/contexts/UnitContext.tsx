import React, { createContext, useContext, useState } from "react";

type Unit = "metric" | "imperial";

interface UnitContextProps {
  unit: Unit;
  toggleUnit: () => void;
}

const UnitContext = createContext<UnitContextProps | undefined>(undefined);

export const UnitProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [unit, setUnit] = useState<Unit>("metric");

  const toggleUnit = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  return (
    <UnitContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </UnitContext.Provider>
  );
};

export const useUnit = () => {
  const context = useContext(UnitContext);
  if (!context) throw new Error("useUnit must be used within a UnitProvider");
  return context;
};
