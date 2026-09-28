import { AlertTriangle, BarChart3, LayoutDashboard, Users } from "lucide-react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { ExtendedDemand } from "@/components/dashboard/ExtendedDemand";
import { Heatmap } from "@/components/dashboard/Heatmap";
import { IssueChart } from "@/components/dashboard/IssueChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { UsageChart } from "@/components/dashboard/UsageChart";
import { dailyUsage, hourlyUsage, issueCounts, issueReports } from "@/data/mockData";

export default function AdminPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-5 py-10 lg:grid-cols-[240px_1fr]">
      <AdminSidebar />
      <section>
        <div className="mb-8">
          <h1 className="text-4xl font-semibold">FM Dashboard</h1>
          <p className="mt-2 text-[#777777]">Reservation Status와 Issue Report를 바탕으로 공간 운영을 분석합니다.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="전체 예약률" value="62%" helper="Average reservation rate" icon={LayoutDashboard} />
          <StatCard label="Quiet Zone 예약률" value="78%" helper="Individual work demand" icon={BarChart3} />
          <StatCard label="Creative Zone 예약률" value="51%" helper="Collaboration demand" icon={Users} />
          <StatCard label="Issue Count" value="38" helper="Reported this month" icon={AlertTriangle} />
        </div>
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <UsageChart data={hourlyUsage} />
          <IssueChart items={issueCounts} />
        </div>
        <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Heatmap data={dailyUsage} />
          <div className="rounded-lg border border-[#e5e2dc] bg-white p-5 shadow-sm">
            <h3 className="font-semibold">주요 신고 위치 TOP 3</h3>
            <div className="mt-5 space-y-3">
              {issueReports.slice(0, 3).map((report, index) => (
                <div key={report.id} className="grid grid-cols-[36px_1fr_auto] items-center gap-3 rounded-md border border-[#e5e2dc] bg-[#f7f7f5] p-3">
                  <span className="grid h-8 w-8 place-items-center rounded-md bg-white text-sm font-semibold">{index + 1}</span>
                  <div>
                    <div className="font-semibold">{report.seatId}</div>
                    <div className="text-sm text-[#777777]">{report.category}</div>
                  </div>
                  <span className="font-semibold">{report.count}건</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <ExtendedDemand />
        </div>
      </section>
    </main>
  );
}
