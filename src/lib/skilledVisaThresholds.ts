/** Shared thresholds for skilled visa eligibility display and PDF export. */
export const SKILLED_VISA_THRESHOLDS = [
  { visa: "189", label: "Skilled Independent", min: 65, typical: 80 },
  { visa: "190", label: "Skilled Nominated (+5)", min: 65, typical: 70 },
  { visa: "491", label: "Skilled Regional (+15)", min: 65, typical: 65 },
] as const;

export function getVisaEligibilityForPdf(totalPoints: number) {
  return SKILLED_VISA_THRESHOLDS.map((v) => ({
    visa: v.visa,
    label: v.label,
    status:
      totalPoints >= v.typical
        ? "✓ Competitive"
        : totalPoints >= v.min
          ? "⚠ Eligible but low"
          : "✗ Below minimum",
    typical: v.typical,
  }));
}
