type RadioButtonProps = {
  label: string;
  id: string;
  name: string;
  onChange: () => void;
  checked: boolean;
  disabled?: boolean;
};

const RadioButton = ({
  onChange,
  label,
  checked,
  id,
  name,
  disabled,
}: RadioButtonProps) => {
  return (
    <div className="flex items-center gap-2">
      <input
        onChange={onChange}
        type="radio"
        checked={checked}
        id={id}
        name={name}
        disabled={disabled}
        className="absolute opacity-0 size-0"
      />
      <div
        onClick={disabled ? undefined : onChange}
        className="size-5 cursor-pointer border-1 border-zinc-400 rounded-sm flex-center"
      >
        <div
          className={`${
            checked ? "opacity-100" : "opacity-0"
          } size-3 bg-blue-500 rounded-sm`}
        ></div>
      </div>
      <label
        htmlFor={id}
        className={`cursor-pointer text-lg ${
          disabled && "opacity-50 cursor-not-allowed"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
