import { useSelector } from "react-redux";
import {
  ControlLabel,
  Icon,
  Input as InputRS,
  InputGroup,
  InputNumber,
  InputProps,
} from "rsuite";
import { SVGIcon } from "rsuite/lib/@types/common";
import { IconNames } from "rsuite/lib/Icon";
import { themeSelector } from "../../redux/selectors";
import "./style.css";

export enum InputType {
  default,
  number,
}

const Input = ({
  fontsize,
  numberSelect,
  inputType,
  icon,
  iconPlace,
  onIconClick,
  children,
  currencySelect,
  error,
  touched,
  styles,
  ...rest
}: Props) => {
  const theme = useSelector(themeSelector);
  const inputStyles = () => {
    switch (inputType) {
      case InputType.number:
        return (
          //@ts-ignore
          <InputNumber
            min={0}
            defaultValue={rest.defaultValue ? rest.defaultValue : "0"}
            {...rest}
          />
        );
      case InputType.default:
      default:
        return <InputRS {...rest} />;
    }
  };
  return (
    <div style={{ marginBlockEnd: 15 }}>
      {rest.label && <ControlLabel>{rest.label}</ControlLabel>}
      <InputGroup
        style={
          error && touched
            ? { width: "100%", borderColor: "#c63235", ...styles }
            : { width: "100%", ...styles }
        }
      >
        {inputStyles()}
        {icon && iconPlace === "right" && (
          <InputGroup.Addon
            style={{ cursor: "pointer" }}
            onClick={() => {
              onIconClick ? onIconClick() : <></>;
            }}
          >
            <Icon icon={icon} />
          </InputGroup.Addon>
        )}
        {error && touched && (
          <InputGroup.Addon>
            <Icon icon="exclamation-triangle" />
          </InputGroup.Addon>
        )}
        {!error && touched && (
          <InputGroup.Addon>
            <Icon icon="check" />
          </InputGroup.Addon>
        )}
        {children || null}
      </InputGroup>
      {error && touched && (
        <p
          style={theme === "light" ? { color: "#c63235" } : {}}
          className="inputErrorStyles"
        >
          {error}
        </p>
      )}
    </div>
  );
};

interface Props extends InputProps {
  inputType?: InputType;
  fontSize?: number;
  icon?: IconNames | SVGIcon;
  iconPlace?: "right" | "left";
  onIconClick?: () => void;
  children?: React.ReactNode;
  error?: string | null;
  touched?: boolean | null;
  currencySelect?: boolean;
  styles?: React.CSSProperties;
}

export default Input;
