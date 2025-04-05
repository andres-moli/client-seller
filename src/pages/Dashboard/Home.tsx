import { useVentasPorVendedorQuery } from "../../domain/graphql";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import { useUser } from "../../context/UserContext";
import EmbudoVentas from "../../components/ecommerce/EmbudoVentas";
import VentasDiariasChart from "../../components/ecommerce/ventasTrabajadorDiaras";

export default function Home() {
  const { user } = useUser();
  const { data, loading } = useVentasPorVendedorQuery({
    variables: {
      input: {
        vendedor: user?.identificationNumber || '',
      },
    },
  });

  return (
    <>
      <PageMeta
        title="Intranet"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />
          {/* Enviamos los datos de ventas como prop */}
          <MonthlySalesChart data={data?.ventasPorVendedor || []} loading={loading} />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart  data={data?.ventasPorVendedor || []} loading={loading}/>
        </div>
        <div className="col-span-12">
          <VentasDiariasChart />
        </div>
        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
          <EmbudoVentas />
        </div>
      </div>
    </>
  );
}
