declare module '*.module.css' {
  interface ClassNames {
    [className: string]: string;
  }
  const classNames: ClassNames;
  export default classNames;
}

declare module '*.json' {
  interface Json {
    [key: string]: any;
  }
  const json: Json;
  export default json;
}
