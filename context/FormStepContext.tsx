import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface PersonalInfo {
  name: string;
  email: string;
}

interface TopicsInterested {
  topic: string[];
}

interface FormData {
  personalInfo: PersonalInfo;
  topicsInterested: TopicsInterested;
}

interface FormStepContextType {
  formData: FormData;
  handleChange: (data: any, stepName: string) => void;
}

const initialFormData: FormData = {
  personalInfo: {
    name: "",
    email: "",
  },
  topicsInterested: {
    topic: [],
  },
};

export const FormStepContext = createContext<FormStepContextType>({
  formData: initialFormData,
  handleChange: () => {},
});

export const FormStepProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = useCallback(
    (data: any, stepName: string) => {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        [stepName]: { ...prevFormData[stepName], ...data },
      }));
    },
    [setFormData]
  );

  const value: FormStepContextType = useMemo(() => {
    return { formData, handleChange };
  }, [formData, handleChange]);

  return (
    <FormStepContext.Provider value={value}>
      {children}
    </FormStepContext.Provider>
  );
};

export const useFormStepContext = () => useContext(FormStepContext);
