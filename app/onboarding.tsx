import { useState } from "react";
import { OnboardingLayout } from "../components/onboarding/OnboardingLayout";
import { BirthYearStep } from "../components/onboarding/steps/BirthYearStep";
import { GenderStep } from "../components/onboarding/steps/GenderStep";
import { GenreStep } from "../components/onboarding/steps/GenreStep";
import { ReadingFrequencyStep } from "../components/onboarding/steps/ReadingFrequencyStep";
import { ReadingPurposeStep } from "../components/onboarding/steps/ReadingPurposeStep";
import { type CategoryType, categoriesToGenres } from "../constants/categories";
import { ONBOARDING_STEPS, TOTAL_STEPS } from "../constants/onboarding";
import { useOnboarding } from "../hooks/useOnboarding";
import type { Gender, ReadingFrequency, ReadingPurpose } from "../types/onboarding";

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [birthYear, setBirthYear] = useState<number | null>(null);
  const [gender, setGender] = useState<Gender | null>(null);
  const [genres, setGenres] = useState<CategoryType[]>([]);
  const [readingPurpose, setReadingPurpose] = useState<ReadingPurpose | null>(null);
  const [readingFrequency, setReadingFrequency] = useState<ReadingFrequency | null>(null);

  const { handleSubmit, isLoading } = useOnboarding();

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    } else {
      if (birthYear && gender && readingPurpose && readingFrequency && genres.length > 0) {
        await handleSubmit({
          birthYear: birthYear.toString(),
          gender,
          readingPurpose,
          readingFrequency,
          favoriteGenres: categoriesToGenres(genres),
        });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isNextDisabled = () => {
    if (currentStep === TOTAL_STEPS && isLoading) {
      return true;
    }

    switch (currentStep) {
      case 1:
        return birthYear === null;
      case 2:
        return gender === null;
      case 3:
        return genres.length === 0;
      case 4:
        return readingPurpose === null;
      case 5:
        return readingFrequency === null;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BirthYearStep onYearSelect={setBirthYear} initialYear={birthYear} />;
      case 2:
        return <GenderStep onGenderSelect={setGender} initialGender={gender} />;
      case 3:
        return <GenreStep onGenresSelect={setGenres} initialGenres={genres} />;
      case 4:
        return (
          <ReadingPurposeStep onPurposeSelect={setReadingPurpose} initialPurpose={readingPurpose} />
        );
      case 5:
        return (
          <ReadingFrequencyStep
            onFrequencySelect={setReadingFrequency}
            initialFrequency={readingFrequency}
          />
        );
      default:
        return null;
    }
  };

  const currentStepData = ONBOARDING_STEPS[currentStep - 1];

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={TOTAL_STEPS}
      title={currentStepData.title}
      description={currentStepData.description}
      onNext={handleNext}
      onBack={currentStep > 1 ? handleBack : undefined}
      isLastStep={currentStep === TOTAL_STEPS}
      isNextDisabled={isNextDisabled()}
      isLoading={isLoading}
    >
      {renderStepContent()}
    </OnboardingLayout>
  );
}
