import { useTheme } from "@emotion/react";


export default function useMapThemeColor( color ) { 
    const theme = useTheme();
    return theme.palette?.[color]?.main;
}