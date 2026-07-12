export const SPEED_FEEL_LAYOUT = Object.freeze({
  gapPx: 8,
  inlinePaddingPx: 12,
  // 262 px cannot fit two 128 px controls plus the gap; 435.15625 px fits all three.
  minButtonWidthPx: 128,
  minTapHeightPx: 44,
});

export const SPEED_FEEL_GRID_TEMPLATE =
  'repeat(auto-fit, minmax(min(100%, 128px), 1fr))';

export function measureSpeedFeelLayout({ controlsWidthPx, labelWidthsPx }) {
  const availableColumns = Math.floor(
    (controlsWidthPx + SPEED_FEEL_LAYOUT.gapPx) /
      (SPEED_FEEL_LAYOUT.minButtonWidthPx + SPEED_FEEL_LAYOUT.gapPx),
  );
  const columns = Math.max(
    1,
    Math.min(availableColumns, labelWidthsPx.length),
  );
  const buttonWidthPx =
    (controlsWidthPx - SPEED_FEEL_LAYOUT.gapPx * (columns - 1)) / columns;

  return {
    columns,
    buttonWidthPx,
    labels: labelWidthsPx.map((labelWidthPx) => ({
      contained:
        SPEED_FEEL_LAYOUT.inlinePaddingPx + labelWidthPx <= buttonWidthPx,
      padded:
        SPEED_FEEL_LAYOUT.inlinePaddingPx * 2 + labelWidthPx <= buttonWidthPx,
    })),
  };
}
