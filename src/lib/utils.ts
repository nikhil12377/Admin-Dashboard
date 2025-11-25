export const getColor = (colorVar: string) => `hsl(var(${colorVar}))`;

export const combineStyles = (
  ...styles: (React.CSSProperties | undefined)[]
): React.CSSProperties => {
  return Object.assign({}, ...styles.filter(Boolean));
};
