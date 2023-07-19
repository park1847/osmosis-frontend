import classNames from "classnames";
import { FunctionComponent } from "react";

import { MenuOption } from "~/components/control/types";
import { CustomClasses, Disableable } from "~/components/types";
import { IS_FRONTIER } from "~/config";

interface Props extends CustomClasses, Disableable {
  options: MenuOption[];
  selectedOptionId: string;
  onSelect: (optionId: string) => void;
}

export const MenuToggle: FunctionComponent<Props> = ({
  options,
  selectedOptionId,
  onSelect,
  className,
  disabled,
}) => (
  <div
    className={classNames(
      "flex h-fit rounded-full bg-osmoverse-700 transition-opacity",
      {
        "opacity-50": disabled,
      }
    )}
  >
    {options.map(({ id, display }) => (
      <label
        key={id}
        htmlFor={"menu-radio"}
        className={classNames(
          "relative h-10 cursor-pointer select-none px-4 py-2",
          {
            "rounded-full bg-wosmongton-400": id === selectedOptionId,
            "text-osmoverse-1000": id === selectedOptionId && IS_FRONTIER,
          },
          className
        )}
      >
        <input
          id="menu-radio"
          type="radio"
          className={classNames(
            "absolute z-20 h-full w-full cursor-pointer appearance-none",
            "after:absolute after:h-full after:w-full",
            {
              "text-osmoverse-300": id !== selectedOptionId,
            }
          )}
          value={id}
          radioGroup={options.reduce((ids, { id }) => ids + id, "")}
          checked={id === selectedOptionId}
          onChange={() => onSelect(id)}
          disabled={disabled}
        ></input>
        <span
          className={classNames("subtitle2 relative z-10", {
            "text-osmoverse-300": id !== selectedOptionId,
          })}
        >
          {display}
        </span>
      </label>
    ))}
  </div>
);
