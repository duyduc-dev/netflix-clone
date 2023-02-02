import classNames from 'classnames';
import { useInput } from 'hooks-react-custom';
import * as React from 'react';

interface InputProps {
  placeholder?: string;
  value?: string;
  error?: any;
  register?: any;
  type?: 'text' | 'password';
  name?: string;
}

const Input: React.FC<InputProps> = props => {
  const { placeholder, value, error, name, register, type = 'text' } = props;
  const [isInputFocus, setInputFocus] = React.useState(false);
  const { eventBind, hasValue } = useInput(value || '');

  const inputID = React.useId();

  const handleInputBlur = () => {
    setInputFocus(false);
  };

  const handleInputFocus = () => {
    setInputFocus(true);
  };

  return (
    <div>
      <div
        className={classNames(
          'relative h-[60px] w-full border-philippine_gray border rounded-sm text-black text-[16px]',
          error && '!border-international_orange'
        )}
      >
        <label
          htmlFor={inputID}
          className={classNames(
            'cursor-text text-philippine_gray text-[16px] absolute left-[10px] top-1/2 -translate-y-1/2',
            'transition-all duration-200',
            (isInputFocus || hasValue) && '!text-[13px] !font-[500] !top-3'
          )}
        >
          {placeholder}
        </label>
        <input
          autoComplete="off"
          name={name}
          id={inputID}
          type={type}
          className="w-full h-full p-[10px_10px_0] bg-transparent border-none outline-none"
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          {...register?.(name)}
          {...eventBind}
        />
      </div>
      {error && (
        <div>
          <p className="!text-international_orange text-[13px]">{error}</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(Input);
