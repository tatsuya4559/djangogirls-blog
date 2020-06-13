import React, { useState, useContext, useMemo } from 'react';
import { ChevronDown } from 'react-feather';
import uniqueId from 'lodash/uniqueId';
import cx from 'classnames';
import classes from './Accordion.module.css';

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
        className={classes.check}
        type="radio"
        name={name}
        id={id}
        defaultChecked={defaultOpen}
      />
      <label className={cx(classes.label, className)} htmlFor={id}>
        {children}
        <div className={classes.iconWrapper}>
          <ChevronDown className={classes.icon} />
        </div>
      </label>
    </>
  );
};

type ContentProps = {
  className?: string;
};

const AccordionContent: React.FC<ContentProps> = ({ className, children }) => (
  <div className={cx(classes.content, className)}>{children}</div>
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
