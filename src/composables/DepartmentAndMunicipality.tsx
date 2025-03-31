import { useEffect, useMemo, useState } from "react";
import { useCitiesQuery, useDepartmentsQuery } from "../domain/graphql";
import SearchableSelect from "../components/form/selectSeach";

type DepartmentAndMunicipalityProps = {
  departmentId?: string;
  municipalityId?: string;
  disabledDepartment?: boolean;
  disabledMunicipality?: boolean;
  onChange: (values: {
    departmentId: string;
    municipalityId: string;
  }) => void;
};

interface IMunicipalitySelect {
  departmentId: string;
  disabled?: boolean;
  onChange: (municipalityId: string) => void;
  currentMunicipalityId?: string;
}

export const DepartmentAndMunicipality = ({
  departmentId: propDepartmentId = "",
  municipalityId: propMunicipalityId = "",
  disabledMunicipality = false,
  onChange,
}: DepartmentAndMunicipalityProps) => {
  const [localDepartmentId, setLocalDepartmentId] = useState(propDepartmentId);
  const { data: departmentData, loading } = useDepartmentsQuery();

  const departmentOptions = useMemo(() => {
    if (!departmentData) return [];
    return (
      departmentData.departments
        ?.map((department) => ({
          label: department.name,
          value: department.id,
        }))
        .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase())) || []
    );
  }, [departmentData]);

  useEffect(() => {
    if (departmentOptions.length > 0 && !localDepartmentId) {
      const initialValue = departmentOptions[0].value || "";
      setLocalDepartmentId(initialValue);
      onChange({
        departmentId: initialValue,
        municipalityId: "",
      });
    }
  }, [departmentData]);

  const handleDepartmentChange = (value: string) => {
    setLocalDepartmentId(value);
    onChange({
      departmentId: value,
      municipalityId: "",
    });
  };

  if (loading) return <div className="loader flex-1" />;

  return (
    <div className="mb-5 flex flex-1 gap-2">
      <SearchableSelect
        placeholder="Selecciona un departamento"
        className="flex-1"
        options={departmentOptions}
        onChange={handleDepartmentChange}
        defaultValue={localDepartmentId}
      />
      {localDepartmentId ? (
        <MunicipalitySelect
          disabled={disabledMunicipality}
          departmentId={localDepartmentId}
          onChange={(municipalityId) => onChange({
            departmentId: localDepartmentId,
            municipalityId
          })}
          currentMunicipalityId={propMunicipalityId}
        />
      ) : (
        <div className="loader flex-1 rounded-sm" />
      )}
    </div>
  );
};

const MunicipalitySelect = ({
  departmentId,
  onChange,
  currentMunicipalityId = ""
}: IMunicipalitySelect) => {
  const [localMunicipalityId, setLocalMunicipalityId] = useState(currentMunicipalityId);
  const { data: municipalitiesData, loading: isLoadingMunicipalities, refetch } = useCitiesQuery({
    variables: {
      departmentId,
    },
  });

  const municipalityOptions = useMemo(() => {
    if (!municipalitiesData) return [];
    return (
      municipalitiesData?.cities?.map((municipality) => ({
        label: municipality.name,
        value: municipality.id,
      })) || []
    );
  }, [municipalitiesData]);

  useEffect(() => {
    refetch();
  }, [departmentId]);

  useEffect(() => {
    if (municipalitiesData?.cities?.length && departmentId) {
      const initialValue = municipalitiesData.cities[0]?.id || "";
      setLocalMunicipalityId(initialValue);
      onChange(initialValue);
    }
  }, [municipalitiesData]);

  const handleMunicipalityChange = (value: string) => {
    setLocalMunicipalityId(value);
    onChange(value);
  };

  if (!municipalitiesData && isLoadingMunicipalities) return <div className="loader flex-1" />;

  return (
    <SearchableSelect
      placeholder="Selecciona un municipio"
      className="flex-1"
      options={municipalityOptions}
      onChange={handleMunicipalityChange}
      defaultValue={localMunicipalityId}
    />
  );
};