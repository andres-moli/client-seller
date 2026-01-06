import PageMeta from "../../components/common/PageMeta";

const CompraPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <PageMeta
        title="Compras"
        description="Compras"
      />
      <h1 className="text-3xl font-bold">Compra</h1>
    </div>
  );
};

export default CompraPage;