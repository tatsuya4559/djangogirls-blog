export default function remToPx(rem: number) {
  const fontSize = window.getComputedStyle(document.documentElement).fontSize;
  return rem * parseFloat(fontSize);
}
