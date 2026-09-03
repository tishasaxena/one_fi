import { SectionLabel } from "@/components/ui/section-label";
import { Money } from "@/components/ui/money";
import { Badge } from "@/components/ui/badge";
import { buildSchedule } from "@/lib/emi/calculator";
import { formatDate, formatINR, formatPercent } from "@/lib/format";
import type { PurchaseDraft } from "@/store/purchase";

function Row({
  label,
  children,
  strong,
}: {
  label: string;
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 text-sm">
      <span className={strong ? "font-semibold" : "text-muted-foreground"}>{label}</span>
      <span className={strong ? "font-bold tabular-nums" : "font-medium tabular-nums"}>
        {children}
      </span>
    </div>
  );
}

export function PlanBreakdown({ draft }: { draft: PurchaseDraft }) {
  const { plan } = draft;
  const schedule = buildSchedule(plan.monthlyAmount, plan.tenureMonths);
  const first = schedule[0];
  const last = schedule[schedule.length - 1];
  const noCost = plan.annualRatePct === 0;

  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="mb-2 flex items-center justify-between">
        <SectionLabel>Your plan</SectionLabel>
        {plan.recommended && (
          <Badge variant="brand" size="sm">
            Recommended
          </Badge>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-bold tabular-nums">{formatINR(plan.monthlyAmount)}</p>
        <p className="text-sm text-muted-foreground">
          / month · {plan.label}
        </p>
      </div>

      <div className="mt-2 divide-y divide-border">
        <Row label="Interest rate">
          {noCost ? (
            <span className="text-success">0% · No-cost EMI</span>
          ) : (
            `${formatPercent(plan.annualRatePct)} p.a.`
          )}
        </Row>
        <Row label="First EMI">{first ? formatDate(first.dueDate) : "—"}</Row>
        <Row label="Last EMI">{last ? formatDate(last.dueDate) : "—"}</Row>
        <Row label="Processing fee">
          <span className="text-success">{formatINR(plan.processingFee)}</span>
        </Row>
        <Row label="Down payment">{formatINR(plan.downPayment)}</Row>
        <Row label={`Total of ${plan.tenureMonths} payments`}>{formatINR(plan.totalPayable)}</Row>
        {plan.interestComponent > 0 && (
          <Row label="of which interest">{formatINR(plan.interestComponent)}</Row>
        )}
        {plan.savingsVsUpfront > 0 && (
          <Row label="You save vs paying upfront" strong>
            <span className="text-success">+{formatINR(plan.savingsVsUpfront)}</span>
          </Row>
        )}
        <Row label="Effective cost" strong>
          <Money amount={plan.effectiveCost} />
        </Row>
      </div>
    </section>
  );
}
