import cl from './Button.module.scss';
import { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({ className, children, ...props }) => {
  return (
    <button className={classNames(cl.button, className)} {...props}>
      {children}
    </button>
  );
};
