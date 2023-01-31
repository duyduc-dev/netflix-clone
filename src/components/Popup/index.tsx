import classNames from 'classnames';
import * as React from 'react';

interface PlacementPopup {
  bottom?: number;
}

interface PopupProps {
  children: React.ReactNode;
  className?: string;
  popupClassName?: string;
  visible?: boolean;
  placement?: PlacementPopup;
  popupRef?: React.LegacyRef<HTMLDivElement>;
  render?: () => React.ReactNode;
}

const Popup: React.FC<PopupProps> = (props) => {
  const { children, visible, className, popupClassName, placement = { bottom: 10 }, popupRef, render } = props;

  return (
    <div className={classNames('relative', className)}>
      {children}
      <div
        ref={popupRef}
        className={classNames(
          'absolute right-0 transition-all duration-300',
          visible ? 'opacity-100 translate-y-0 z-[999]' : 'opacity-0 -translate-y-[10px] pointer-events-none z-[-1]',
          popupClassName
        )}
      >
        <div style={{ height: placement.bottom || 0 }}></div>
        {render?.()}
      </div>
    </div>
  );
};

export default React.memo(Popup);
