import React, { useState, useContext, useMemo } from 'react';
import { ChevronDown } from 'react-feather';
import uniqueId from 'lodash/uniqueId';
import cx from 'classnames';
import styles from './Accordion.module.css';

const AccordionContext = React.createContext('accordionNamespace');

type HeaderProps = {
  defaultOpen?: boolean;
  className?: string;
};

const AccordionHeader: React.FC<HeaderProps> = ({
  defaultOpen,
  className,
  children,
}) => {
  const name = useContext(AccordionContext);
  const id = useMemo(() => uniqueId('accordion'), []);
  return (
    <>
      <input
        className={styles.check}
        type="radio"
        name={name}
        id={id}
        defaultChecked={defaultOpen}
      />
      <label className={cx(styles.label, className)} htmlFor={id}>
        {children}
        <div className={styles.iconWrapper}>
          <ChevronDown className={styles.icon} />
        </div>
      </label>
    </>
  );
};

type ContentProps = {
  className?: string;
};

const AccordionContent: React.FC<ContentProps> = ({ className, children }) => (
  <div className={cx(styles.content, className)}>{children}</div>
);

interface IAccordion extends React.FC {
  Header: typeof AccordionHeader;
  Content: typeof AccordionContent;
}

const Accordion: IAccordion = ({ children }) => {
  const name = useMemo(() => uniqueId('accordionNamespace'), []);
  return (
    <AccordionContext.Provider value={name}>
      {children}
    </AccordionContext.Provider>
  );
};

Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;

export default Accordion;
