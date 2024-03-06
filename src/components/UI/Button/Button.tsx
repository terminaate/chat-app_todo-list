import cl from './Button.module.scss';
import { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: boolean;
};

export const Button: FC<Props> = ({ className, children, icon, ...props }) => {
  return (
    <button
      data-icon={icon}
      className={classNames(cl.button, className)}
      {...props}
    >
      {children}
    </button>
  );
};
