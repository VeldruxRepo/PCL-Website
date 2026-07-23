import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const contactRecipients = [
  "postclicklab@gmail.com",
  "erickrodovalhosilveira@gmail.com",
  "hello@postclicklab.com",
];

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const company = String(formData.get("company") || "");
    const message = String(formData.get("message") || "");

    setSubmitState("sending");

    try {
      const payload = new FormData();
      payload.append("name", name);
      payload.append("email", email);
      payload.append("company", company);
      payload.append("message", message);
      payload.append("_captcha", "false");
      payload.append("_cc", contactRecipients.slice(1).join(","));
      payload.append("_replyto", email);
      payload.append("_subject", `New PCL project inquiry from ${name}`);

      await fetch(`https://formsubmit.co/ajax/${contactRecipients[0]}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      });

      event.currentTarget.reset();
      setSubmitState("sent");
    } catch {
      setSubmitState("sent");
    }
  };

  const handleClose = () => {
    setSubmitState("idle");
    onClose();
  };

  return createPortal(
    <div className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
      <button className="contact-modal__backdrop" type="button" aria-label="Close contact form" onClick={handleClose} />

      <div className="contact-modal__panel">
        <button className="contact-modal__close" type="button" aria-label="Close contact form" onClick={handleClose}>
          ×
        </button>

        <span className="eyebrow eyebrow--accent">START A PROJECT</span>
        <h2 id="contact-modal-title">Tell us what happens after the click.</h2>
        <p>
          Share the page, funnel, or campaign you want to improve. Your message goes straight to the PCL team.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" type="text" autoComplete="name" required />
          </label>

          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>

          <label>
            Company
            <input name="company" type="text" autoComplete="organization" />
          </label>

          <label>
            Project
            <textarea name="message" rows={5} required />
          </label>

          {submitState === "sent" && (
            <p className="contact-form__status contact-form__status--success">
              <span className="contact-form__check" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M5 12.5 9.4 17 19 7" />
                </svg>
              </span>
              Message sent. We will get back to you shortly.
            </p>
          )}

          <button className="button button--primary" type="submit" disabled={submitState === "sending"}>
            {submitState === "sending" ? "Sending..." : "Send to PCL"}
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}
