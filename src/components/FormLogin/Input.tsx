import classNames from 'classnames';
import { useInput, useBoolean } from 'hooks-react-custom';
import React from 'react';

interface InputProps {
  name?: string;
  register?: any;
  error?: any;
  placeholder: string;
  type?: 'text' | 'password';
}

function Input(props: InputProps) {
  const { name, register, error, placeholder, type = 'text' } = props;

  const [isInputFocus, actionsBoolean] = useBoolean();
  const { eventBind, hasValue } = useInput('');

  return (
    <div className="relative h-[50px] my-5">
      <div
        className={classNames(
          'absolute left-[20px] -translate-y-1/2 transition-all duration-150 pointer-events-none',
          isInputFocus || hasValue ? 'top-3 text-xs' : 'top-1/2 text-[16px]'
        )}
      >
        <span className=" text-philippine_gray">{placeholder}</span>
      </div>
      <div className="h-full">
        <input
          className={classNames(
            'h-full bg-[#333] rounded-[4px] outline-none leading-[50px] w-full p-[16px_20px_0] transition-all duration-150',
            error && 'border-b-2 border-b-fulvous'
          )}
          type={type}
          name={name}
          autoComplete="off"
          onFocus={actionsBoolean.setTrue}
          onBlur={actionsBoolean.setFalse}
          {...register?.(name)}
          {...eventBind}
        />
      </div>
      {error && <div className="pt-0.5 px-[3px] text-fulvous !text-[14px]">{error}</div>}
    </div>
  );
}

export default Input;
