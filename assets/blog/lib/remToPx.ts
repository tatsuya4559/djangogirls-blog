export default function remToPx(rem: number) {
  const fontSize = getComputedStyle(document.documentElement).fontSize;
  return rem * parseFloat(fontSize);
}
