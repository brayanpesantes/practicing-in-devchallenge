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
  MAX_STEPS: number;
  goToNextStep: () => void;
  currentStep: number;
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
  MAX_STEPS: 3,
  goToNextStep: () => {},
  currentStep: 1,
});

export const FormStepProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const MAX_STEPS = 3;

  const handleChange = useCallback(
    (data: any, stepName: string) => {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        [stepName]: { ...prevFormData[stepName], ...data },
      }));
    },
    [setFormData]
  );
  const goToNextStep = useCallback(() => {
    setCurrentStep((prevStep) => {
      if (prevStep === MAX_STEPS) {
        return 1;
      } else {
        return prevStep + 1;
      }
    });
  }, []);

  const value: FormStepContextType = useMemo(() => {
    return { formData, handleChange, MAX_STEPS, goToNextStep, currentStep };
  }, [formData, handleChange, currentStep, goToNextStep, MAX_STEPS]);
  return (
    <FormStepContext.Provider value={value}>
      {children}
    </FormStepContext.Provider>
  );
};

export const useFormStepContext = () => useContext(FormStepContext);
