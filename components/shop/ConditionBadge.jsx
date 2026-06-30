const BADGE_STYLES = {
  BRAND_NEW: "bg-green-100 text-green-800",
  BOX_TON:   "bg-emerald-100 text-emerald-800",
  UK_USED:   "bg-purple-100 text-purple-800",
  GRADE_A:   "bg-blue-100 text-blue-800",
  GRADE_B:   "bg-amber-100 text-amber-800",
  GRADE_C:   "bg-orange-100 text-orange-800",
};

const BADGE_LABELS = {
  BRAND_NEW: "Brand New",
  BOX_TON:   "Box Ton",
  UK_USED:   "UK Used",
  GRADE_A:   "Grade A",
  GRADE_B:   "Grade B",
  GRADE_C:   "Grade C",
};

export default function ConditionBadge({ condition }) {
  if (!condition) return null;
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${BADGE_STYLES[condition]}`}>
      {BADGE_LABELS[condition]}
    </span>
  );
}
