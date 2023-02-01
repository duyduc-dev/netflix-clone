import classNames from 'classnames';
import React, { useEffect, useMemo, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import {
  useBoolean,
  useDebounce,
  useInput,
  useIsomorphicLayoutEffect,
  useKeyPressHandler,
  useLocalStorage,
  useOnClickOutside,
} from 'hooks-react-custom';
import { useRouter } from 'next/router';

import { IconSearch } from '~/components/icon';
import { constants, routesPath } from '~/utils/constants/common';
import { useRecoilState } from 'recoil';
import { searchTextState } from '~/store/searchState';

interface SearchProps {}

const Search = (props: SearchProps) => {
  const {} = props;

  const { eventBind, value, hasValue, setValue } = useInput('');
  const router = useRouter();
  const [isFocus, actions] = useBoolean();
  const [redirect, setRedirectLocal, removeRedirect] = useLocalStorage(constants.LOCAL_REDIRECT_SEARCH, router.asPath);
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [, setSearchText] = useRecoilState(searchTextState);
  const isPathnameEqualSearch = useMemo(() => router.pathname === routesPath.search, [router.pathname]);
  const visibleSearch = useMemo(() => isFocus || isPathnameEqualSearch, [isFocus, isPathnameEqualSearch]);

  const handleClickSearch = () => {
    inputRef.current?.focus();
    actions.toggle();
  };

  const handleClickClose = () => {
    setValue('');
    inputRef.current?.focus();
  };

  useOnClickOutside<HTMLDivElement>(divRef, actions.setFalse);
  useKeyPressHandler('ctrl.f', e => {
    e.preventDefault();
    actions.setTrue();
    inputRef.current?.focus();
  });
  useKeyPressHandler('esc', () => {
    actions.setFalse();
    inputRef.current?.blur();
  });

  useIsomorphicLayoutEffect(() => {
    if (hasValue && value) {
      if (!isPathnameEqualSearch) setRedirectLocal(router.asPath);
      setSearchText(value);
      router.push({
        pathname: routesPath.search,
        query: {
          q: value,
        },
      });
    } else {
      const url = redirect.includes(routesPath.search) ? routesPath.browse : redirect;
      router.push(url);
      removeRedirect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasValue, value, isPathnameEqualSearch]);

  useIsomorphicLayoutEffect(() => {
    if (!isPathnameEqualSearch) setValue('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPathnameEqualSearch]);

  return (
    <div className="mr-[20px] relative">
      <div>
        <button
          className={classNames(
            'flex items-center cursor-pointer opacity-100 transition-all duration-300',
            visibleSearch && 'opacity-0 pointer-events-none hidden'
          )}
          onClick={handleClickSearch}
        >
          <IconSearch className="text-white" />
        </button>
        <button
          className={classNames(
            'flex items-center cursor-pointer opacity-100 transition-all duration-300 sm:hidden',
            !visibleSearch && 'opacity-0 pointer-events-none hidden'
          )}
          onClick={actions.setFalse}
        >
          <FaTimes className="text-white" />
        </button>
      </div>
      <div
        ref={divRef}
        className={classNames(
          'sm:absolute fixed sm:left-auto right-0 left-0 sm:top-1/2 top-[41px] sm:-translate-y-1/2 opacity-0 pointer-events-none',
          'border-[hsla(0,0%,100%,.85)] border border-solid',
          'bg-[rgba(0,0,0,.75)] flex items-center transition-all duration-300',
          visibleSearch && '!opacity-100 !pointer-events-auto'
        )}
      >
        <label htmlFor="input-search">
          <IconSearch className="ml-2 text-white" />
        </label>
        <input
          ref={inputRef}
          id="input-search"
          autoComplete="off"
          autoFocus
          type="text"
          className={classNames(
            'h-[34px] w-[212px] leading-[34px] border-none outline-none text-[14px] p-[7px_20px_7px_7px]',
            'bg-transparent text-white'
          )}
          placeholder="Titles, people, genres"
          {...eventBind}
        />
        {hasValue && (
          <button onClick={handleClickClose} className="absolute right-0 px-1 -translate-y-1/2 text-platinum top-1/2">
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
