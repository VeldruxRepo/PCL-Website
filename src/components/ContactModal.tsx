import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

import { Arrow } from "./ui/Arrow";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type LeadFormData = {
  services: string[];
  businessType: string;
  currentSituation: string;
  website: string;
  noWebsite: boolean;
  budget: string;
  timeline: string;
  projectDetails: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
};

type StepId =
  | "contact"
  | "services"
  | "businessType"
  | "currentSituation"
  | "website"
  | "budget"
  | "timeline"
  | "projectDetails";

type FormStep = {
  id: StepId;
  eyebrow: string;
  title: string;
  helper: string;
};

const contactRecipients = [
  "postclicklab@gmail.com",
  "erickrodovalhosilveira@gmail.com",
];

const initialLeadData: LeadFormData = {
  services: [],
  businessType: "",
  currentSituation: "",
  website: "",
  noWebsite: false,
  budget: "",
  timeline: "",
  projectDetails: "",
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  phone: "",
};

const formSteps: FormStep[] = [
  {
    id: "contact",
    eyebrow: "START HERE",
    title: "First, where can we reach you?",
    helper: "Add the essentials before we qualify the project. This saves your lead even if you leave before finishing.",
  },
  {
    id: "services",
    eyebrow: "STEP 01",
    title: "What can we help you with?",
    helper: "Choose every area that feels relevant. We will help narrow it down.",
  },
  {
    id: "businessType",
    eyebrow: "STEP 02",
    title: "What type of business are you running?",
    helper: "This helps us frame the right post-click strategy.",
  },
  {
    id: "currentSituation",
    eyebrow: "STEP 03",
    title: "Where are you right now?",
    helper: "Pick the closest match to your current situation.",
  },
  {
    id: "website",
    eyebrow: "STEP 04",
    title: "What's your current website?",
    helper: "A URL helps us understand the funnel before we talk.",
  },
  {
    id: "budget",
    eyebrow: "STEP 05",
    title: "What's your approximate budget?",
    helper: "This is just qualification context, not a rejection filter.",
  },
  {
    id: "timeline",
    eyebrow: "STEP 06",
    title: "When would you like to get started?",
    helper: "Timing helps us recommend the right path.",
  },
  {
    id: "projectDetails",
    eyebrow: "STEP 07",
    title: "Tell us what you're trying to achieve.",
    helper: "A short note is enough. Keep it simple and direct.",
  },
];

const optionGroups = {
  services: [
    "Conversion Rate Optimization",
    "Landing Page Design",
    "Website Development",
    "Website Redesign",
    "A/B Testing",
    "UI/UX Design",
    "Custom Development",
    "Not sure yet",
  ],
  businessType: [
    "Ecommerce / DTC",
    "SaaS",
    "Service Business",
    "Agency",
    "Startup",
    "Other",
  ],
  currentSituation: [
    "We already have a website and want to improve conversions",
    "We need a new landing page",
    "We need a complete redesign",
    "We need development support",
    "We want to run experiments / A/B tests",
    "We're launching something new",
    "Not sure - we need guidance",
  ],
  budget: [
    "Under $2,500",
    "$2,500 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000+",
    "Not sure yet",
  ],
  timeline: [
    "ASAP",
    "Within 2 weeks",
    "Within 1 month",
    "1-3 months",
    "Just exploring",
  ],
};

const tracking = {
  started: () => undefined,
  stepCompleted: (step: StepId) => {
    void step;
  },
  completed: () => undefined,
};

const excelHeaders = [
  "Captured At",
  "Status",
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "Company",
  "Services",
  "Business Type",
  "Current Situation",
  "Website",
  "Budget",
  "Timeline",
  "Project Details",
];

function escapeCsvCell(value: string | string[] | boolean) {
  const normalizedValue = Array.isArray(value)
    ? value.join("; ")
    : String(value);

  return `"${normalizedValue.replaceAll('"', '""')}"`;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isLikelyUrl(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return false;
  }

  try {
    const url = new URL(
      trimmedValue.startsWith("http")
        ? trimmedValue
        : `https://${trimmedValue}`,
    );

    return url.hostname.includes(".") && url.hostname.length > 3;
  } catch {
    return false;
  }
}

function normalizeUrl(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "";
  }

  return trimmedValue.startsWith("http")
    ? trimmedValue
    : `https://${trimmedValue}`;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M5 12.5 9.4 17 19 7" />
    </svg>
  );
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [leadData, setLeadData] = useState<LeadFormData>(initialLeadData);
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent">("idle");
  const [leadCaptureState, setLeadCaptureState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const hasStartedRef = useRef(false);
  const hasCapturedLeadRef = useRef(false);

  const activeStep = formSteps[activeStepIndex];
  const progress = ((activeStepIndex + 1) / formSteps.length) * 100;
  const isFinalStep = activeStepIndex === formSteps.length - 1;

  const submissionSummary = useMemo(() => {
    return {
      services: leadData.services,
      businessType: leadData.businessType,
      currentSituation: leadData.currentSituation,
      website: leadData.noWebsite ? "No website yet" : normalizeUrl(leadData.website),
      noWebsite: leadData.noWebsite,
      budget: leadData.budget,
      timeline: leadData.timeline,
      projectDetails: leadData.projectDetails,
      firstName: leadData.firstName,
      lastName: leadData.lastName,
      email: leadData.email,
      company: leadData.company,
      phone: leadData.phone,
    };
  }, [leadData]);

  const buildExcelCsv = (status: string) => {
    const capturedAt = new Date().toISOString();
    const row = [
      capturedAt,
      status,
      submissionSummary.firstName,
      submissionSummary.lastName,
      submissionSummary.email,
      submissionSummary.phone,
      submissionSummary.company,
      submissionSummary.services,
      submissionSummary.businessType,
      submissionSummary.currentSituation,
      submissionSummary.website,
      submissionSummary.budget,
      submissionSummary.timeline,
      submissionSummary.projectDetails,
    ].map(escapeCsvCell);

    return [
      excelHeaders.map(escapeCsvCell).join(","),
      row.join(","),
    ].join("\n");
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    if (!hasStartedRef.current) {
      tracking.started();
      hasStartedRef.current = true;
    }

    window.setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 80);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || submitState === "sent") {
      return;
    }

    window.setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 80);
  }, [activeStepIndex, isOpen, submitState]);

  if (!isOpen) {
    return null;
  }

  const updateLeadData = <Key extends keyof LeadFormData>(
    key: Key,
    value: LeadFormData[Key],
  ) => {
    setLeadData((currentData) => ({
      ...currentData,
      [key]: value,
    }));
  };

  const toggleService = (service: string) => {
    setLeadData((currentData) => {
      const hasService = currentData.services.includes(service);

      return {
        ...currentData,
        services: hasService
          ? currentData.services.filter((item) => item !== service)
          : [...currentData.services, service],
      };
    });
  };

  const getStepError = () => {
    switch (activeStep.id) {
      case "services":
        return leadData.services.length
          ? ""
          : "Select at least one area so we know where to focus.";
      case "businessType":
        return leadData.businessType
          ? ""
          : "Choose the business type that fits best.";
      case "currentSituation":
        return leadData.currentSituation
          ? ""
          : "Choose the option closest to your current situation.";
      case "website":
        if (leadData.noWebsite) {
          return "";
        }

        return isLikelyUrl(leadData.website)
          ? ""
          : "Add a website URL or choose that you do not have one yet.";
      case "budget":
        return leadData.budget
          ? ""
          : "Choose a budget range. This is only context.";
      case "timeline":
        return leadData.timeline
          ? ""
          : "Choose when you would like to get started.";
      case "projectDetails":
        return leadData.projectDetails.trim().length >= 12
          ? ""
          : "Add a little context so we can review the project properly.";
      case "contact":
        if (!leadData.firstName.trim()) {
          return "Add your first name.";
        }

        if (!leadData.lastName.trim()) {
          return "Add your last name.";
        }

        if (!isValidEmail(leadData.email)) {
          return "Add a valid work email.";
        }

        if (!leadData.phone.trim()) {
          return "Add your phone or WhatsApp number.";
        }

        return "";
      default:
        return "";
    }
  };

  const sendLeadToEmail = async (status: "Lead captured" | "Completed qualification") => {
    const payload = new FormData();
    const isCompleted = status === "Completed qualification";

    payload.append("status", status);
    payload.append("services", submissionSummary.services.join(", "));
    payload.append("businessType", submissionSummary.businessType);
    payload.append("currentSituation", submissionSummary.currentSituation);
    payload.append("website", submissionSummary.website);
    payload.append("noWebsite", String(submissionSummary.noWebsite));
    payload.append("budget", submissionSummary.budget);
    payload.append("timeline", submissionSummary.timeline);
    payload.append("projectDetails", submissionSummary.projectDetails);
    payload.append("firstName", submissionSummary.firstName);
    payload.append("lastName", submissionSummary.lastName);
    payload.append("email", submissionSummary.email);
    payload.append("company", submissionSummary.company);
    payload.append("phone", submissionSummary.phone);
    payload.append("excelCsv", buildExcelCsv(status));
    payload.append("structuredLead", JSON.stringify({ status, ...submissionSummary }, null, 2));
    payload.append("_captcha", "false");
    payload.append("_template", "table");
    payload.append("_cc", contactRecipients.slice(1).join(","));
    payload.append("_replyto", submissionSummary.email);
    payload.append(
      "_subject",
      isCompleted
        ? `PostClickLab Contacting - Qualified Project - ${submissionSummary.firstName} ${submissionSummary.lastName}`
        : `PostClickLab Contacting - Lead Captured - ${submissionSummary.firstName} ${submissionSummary.lastName}`,
    );

    await fetch(`https://formsubmit.co/ajax/${contactRecipients[0]}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: payload,
    });
  };

  const captureLeadBeforeQualification = async () => {
    if (hasCapturedLeadRef.current || leadCaptureState === "sending") {
      return;
    }

    setLeadCaptureState("sending");

    try {
      await sendLeadToEmail("Lead captured");
    } catch {
      // Keep the onboarding moving even if FormSubmit does not return cleanly.
    }

    hasCapturedLeadRef.current = true;
    setLeadCaptureState("sent");
  };

  const goToNextStep = async () => {
    const stepError = getStepError();

    if (stepError) {
      setError(stepError);
      return;
    }

    if (activeStep.id === "contact") {
      await captureLeadBeforeQualification();
    }

    tracking.stepCompleted(activeStep.id);
    setError("");
    setActiveStepIndex((currentIndex) =>
      Math.min(currentIndex + 1, formSteps.length - 1),
    );
  };

  const goToPreviousStep = () => {
    setError("");
    setActiveStepIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  };

  const handleFormKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.tagName === "TEXTAREA") {
      return;
    }

    event.preventDefault();

    if (isFinalStep) {
      event.currentTarget.requestSubmit();
      return;
    }

    goToNextStep();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitState === "sending") {
      return;
    }

    const stepError = getStepError();

    if (stepError) {
      setError(stepError);
      return;
    }

    setSubmitState("sending");

    try {
      await sendLeadToEmail("Completed qualification");

      tracking.completed();
      setSubmitState("sent");
    } catch {
      tracking.completed();
      setSubmitState("sent");
    }
  };

  const handleClose = () => {
    setSubmitState("idle");
    setLeadCaptureState("idle");
    setActiveStepIndex(0);
    setLeadData(initialLeadData);
    setError("");
    hasStartedRef.current = false;
    hasCapturedLeadRef.current = false;
    onClose();
  };

  const renderOptionButton = (
    value: string,
    isSelected: boolean,
    onClick: () => void,
  ) => (
    <button
      className={`lead-option${isSelected ? " is-selected" : ""}`}
      key={value}
      type="button"
      aria-pressed={isSelected}
      onClick={onClick}
    >
      <span>{value}</span>
      <i aria-hidden="true">
        <CheckIcon />
      </i>
    </button>
  );

  const renderStepFields = () => {
    switch (activeStep.id) {
      case "services":
        return (
          <div className="lead-options lead-options--compact">
            {optionGroups.services.map((service) =>
              renderOptionButton(
                service,
                leadData.services.includes(service),
                () => toggleService(service),
              ),
            )}
          </div>
        );
      case "businessType":
        return (
          <div className="lead-options lead-options--compact">
            {optionGroups.businessType.map((businessType) =>
              renderOptionButton(
                businessType,
                leadData.businessType === businessType,
                () => updateLeadData("businessType", businessType),
              ),
            )}
          </div>
        );
      case "currentSituation":
        return (
          <div className="lead-options">
            {optionGroups.currentSituation.map((currentSituation) =>
              renderOptionButton(
                currentSituation,
                leadData.currentSituation === currentSituation,
                () => updateLeadData("currentSituation", currentSituation),
              ),
            )}
          </div>
        );
      case "website":
        return (
          <div className="lead-field-stack">
            <label>
              Website URL
              <input
                ref={firstFieldRef as RefObject<HTMLInputElement>}
                autoComplete="url"
                inputMode="url"
                placeholder="yourbrand.com"
                type="text"
                value={leadData.website}
                disabled={leadData.noWebsite}
                onChange={(event) => updateLeadData("website", event.target.value)}
              />
            </label>

            {renderOptionButton(
              "We don't have one yet",
              leadData.noWebsite,
              () => {
                setLeadData((currentData) => ({
                  ...currentData,
                  noWebsite: !currentData.noWebsite,
                  website: !currentData.noWebsite ? "" : currentData.website,
                }));
              },
            )}
          </div>
        );
      case "budget":
        return (
          <div className="lead-options lead-options--compact">
            {optionGroups.budget.map((budget) =>
              renderOptionButton(
                budget,
                leadData.budget === budget,
                () => updateLeadData("budget", budget),
              ),
            )}
          </div>
        );
      case "timeline":
        return (
          <div className="lead-options lead-options--compact">
            {optionGroups.timeline.map((timeline) =>
              renderOptionButton(
                timeline,
                leadData.timeline === timeline,
                () => updateLeadData("timeline", timeline),
              ),
            )}
          </div>
        );
      case "projectDetails":
        return (
          <label>
            Project context
            <textarea
              ref={firstFieldRef as RefObject<HTMLTextAreaElement>}
              rows={5}
              placeholder="Tell us what you're working on, what's not performing well, or what you'd like us to improve."
              value={leadData.projectDetails}
              onChange={(event) => updateLeadData("projectDetails", event.target.value)}
            />
          </label>
        );
      case "contact":
        return (
          <div className="lead-contact-grid">
            <label>
              First name
              <input
                ref={firstFieldRef as RefObject<HTMLInputElement>}
                autoComplete="given-name"
                type="text"
                value={leadData.firstName}
                onChange={(event) => updateLeadData("firstName", event.target.value)}
              />
            </label>

            <label>
              Last name
              <input
                autoComplete="family-name"
                type="text"
                value={leadData.lastName}
                onChange={(event) => updateLeadData("lastName", event.target.value)}
              />
            </label>

            <label>
              Work email
              <input
                autoComplete="email"
                inputMode="email"
                type="email"
                value={leadData.email}
                onChange={(event) => updateLeadData("email", event.target.value)}
              />
            </label>

            <label>
              Company name <span>Optional</span>
              <input
                autoComplete="organization"
                type="text"
                value={leadData.company}
                onChange={(event) => updateLeadData("company", event.target.value)}
              />
            </label>

            <label className="lead-contact-grid__wide">
              Phone / WhatsApp
              <input
                autoComplete="tel"
                inputMode="tel"
                type="tel"
                value={leadData.phone}
                onChange={(event) => updateLeadData("phone", event.target.value)}
              />
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return createPortal(
    <div
      className="contact-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <button
        className="contact-modal__backdrop"
        type="button"
        aria-label="Close contact form"
        onClick={handleClose}
      />

      <div className="contact-modal__panel contact-modal__panel--lead" ref={panelRef}>
        <button
          className="contact-modal__close"
          type="button"
          aria-label="Close contact form"
          onClick={handleClose}
        >
          ×
        </button>

        {submitState === "sent" ? (
          <div className="lead-success">
            <span className="contact-form__check" aria-hidden="true">
              <CheckIcon />
            </span>
            <span className="eyebrow eyebrow--accent">PROJECT RECEIVED</span>
            <h2 id="contact-modal-title">You're in.</h2>
            <p>
              We've received your project details. We'll review everything and get back to you shortly.
            </p>
            <button className="button button--primary" type="button" onClick={handleClose}>
              Back to the site
            </button>
          </div>
        ) : (
          <>
            <div className="lead-form__top">
              <div>
                <span className="eyebrow eyebrow--accent">{activeStep.eyebrow}</span>
                <h2 id="contact-modal-title">{activeStep.title}</h2>
                <p>{activeStep.helper}</p>
              </div>

              <span className="lead-form__count">
                {String(activeStepIndex + 1).padStart(2, "0")} / {String(formSteps.length).padStart(2, "0")}
              </span>
            </div>

            <div className="lead-progress" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>

            <form className="contact-form lead-form" onSubmit={handleSubmit} onKeyDown={handleFormKeyDown}>
              <div className="lead-form__step" key={activeStep.id}>
                {renderStepFields()}
              </div>

              {error ? (
                <p className="lead-form__error" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="lead-form__actions">
                <button
                  className="button button--secondary"
                  type="button"
                  disabled={activeStepIndex === 0 || submitState === "sending"}
                  onClick={goToPreviousStep}
                >
                  Back
                </button>

                {isFinalStep ? (
                  <button
                    className="button button--primary"
                    type="submit"
                    disabled={submitState === "sending"}
                  >
                    {submitState === "sending" ? "Sending..." : "Send My Project"}
                    <Arrow />
                  </button>
                ) : (
                  <button
                    className="button button--primary"
                    type="button"
                    onClick={goToNextStep}
                  >
                    Next Step
                    <Arrow />
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
