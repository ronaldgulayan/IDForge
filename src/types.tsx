import type React from "react";

export type GlobalGenderProps = "Male" | "Female" | "Preferred not to say";

export interface GlobalDataProps {
  id: string;
  position: string | null;
  firstname: string;
  lastname: string;
  email: string;
  contact: string | number;
  gender: null | GlobalGenderProps;
  birthdate: string | null;
  file: null | File;
  preview?: string;
}

export interface GlobalAccountProps {
  id: string;
  position: string;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
  gender: GlobalGenderProps;
  birthdate: Date | string;
  profile: string;
  created_at: Date | string;
}

export interface GlobalCardProps {
  data: GlobalDataProps;
  setData: React.Dispatch<React.SetStateAction<GlobalDataProps>>;
}
