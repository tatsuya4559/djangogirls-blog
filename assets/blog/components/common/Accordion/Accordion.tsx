import React, { useState, useContext } from 'react';
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
  const [id] = useState(uniqueId('accordion'));
  return (
    <>
      <label className={cx(classes.label, className)} htmlFor={id}>
        {children}
      </label>
      <input
        className={classes.check}
        type="radio"
        name={name}
        id={id}
        defaultChecked={defaultOpen}
      />
    </>
  );
};

type ItemProps = {
  className?: string;
};

const AccordionItem: React.FC<ItemProps> = ({ className, children }) => (
  <div className={cx(classes.item, className)}>{children}</div>
);

interface IAccordion extends React.FC {
  Header: typeof AccordionHeader;
  Item: typeof AccordionItem;
}

const Accordion: IAccordion = ({ children }) => {
  const [name] = useState(uniqueId('accordionNamespace'));
  return (
    <AccordionContext.Provider value={name}>
      {children}
    </AccordionContext.Provider>
  );
};

Accordion.Header = AccordionHeader;
Accordion.Item = AccordionItem;

export default Accordion;
