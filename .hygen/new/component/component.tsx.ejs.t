---
to: <%= path %>/<%= componentName %>.tsx
---
import cl from './<%= componentName %>.module.scss';
import { FC } from 'react';

type Props = {

}

export const <%= componentName %>: FC<Props> = () => {
  return (
    <>

    </>
  );
};