"use client";

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { REGIONS } from "@/constants/regions";
import { useState } from "react";

type RegionFilterProps = {
  onChange?: (city_province: string | null, district: string | null) => void;
};

export default function RegionFilter({ onChange }: RegionFilterProps) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const districts: string[] = REGIONS.find((region) => region.city_province === selectedProvince)?.district ?? [];

  const handleProvinceChange = (value: string) => {
    const province = value === "all" ? null : value;
    setSelectedProvince(province);
    setSelectedDistrict(null);
    onChange?.(province, null);
  };

  const handleDistrictChange = (value: string) => {
    const district = value === "all" ? null : value;
    setSelectedDistrict(district);
    onChange?.(selectedProvince, district);
  };

  return (
    <div className="flex gap-4">
      <Select onValueChange={handleProvinceChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="시/도 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">시/도 선택</SelectItem>
          {REGIONS.map((region) => (
            <SelectItem key={region.city_province} value={region.city_province}>
              {region.city_province}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={handleDistrictChange} disabled={!selectedProvince}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="시/군/구 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">시/군/구 선택</SelectItem>
          {districts.map((district) => (
            <SelectItem key={district} value={district}>
              {district}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
