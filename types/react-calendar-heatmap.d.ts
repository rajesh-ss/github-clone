declare module "react-calendar-heatmap" {
  import { ReactElement } from "react";

  export interface ReactCalendarHeatmapValue<T = any> {
    date: string | Date;
    count?: number;
    [key: string]: any;
  }

  export interface ReactCalendarHeatmapProps<T = any> {
    values: ReactCalendarHeatmapValue<T>[];
    startDate?: string | Date;
    endDate?: string | Date;
    gutterSize?: number;
    horizontal?: boolean;
    showMonthLabels?: boolean;
    showWeekdayLabels?: boolean;
    showOutOfRangeDays?: boolean;
    monthLabels?: string[];
    weekdayLabels?: string[];
    classForValue?: (value: ReactCalendarHeatmapValue<T> | undefined) => string;
    titleForValue?: (value: ReactCalendarHeatmapValue<T> | undefined) => string;
    tooltipDataAttrs?:
      | ((value: ReactCalendarHeatmapValue<T> | undefined) => {
          [key: string]: any;
        })
      | { [key: string]: any };
    onClick?: (value: ReactCalendarHeatmapValue<T> | undefined) => void;
    onMouseOver?: (
      event: React.MouseEvent<SVGRectElement>,
      value: ReactCalendarHeatmapValue<T> | undefined
    ) => void;
    onMouseLeave?: (
      event: React.MouseEvent<SVGRectElement>,
      value: ReactCalendarHeatmapValue<T> | undefined
    ) => void;
    transformDayElement?: (
      element: ReactElement,
      value: ReactCalendarHeatmapValue<T> | undefined,
      index: number
    ) => ReactElement;
  }

  export default function CalendarHeatmap<T = any>(
    props: ReactCalendarHeatmapProps<T>
  ): ReactElement;
}

declare module "react-calendar-heatmap/dist/styles.css";
