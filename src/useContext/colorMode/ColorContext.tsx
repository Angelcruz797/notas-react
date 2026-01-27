import {createContext ,useContext} from 'react';
import type { ColorModeType } from './ColorProvider';

export interface ColorContextType {
  colors: ColorModeType;
  changeColor: () => void;
}

export const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const useColor = () => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
};