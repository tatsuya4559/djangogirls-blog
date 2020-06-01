declare module "*.module.css" {
  interface ClassNames {
    [className: string]: string;
  }
  const classNames: ClassNames;
  export default classNames;
}
