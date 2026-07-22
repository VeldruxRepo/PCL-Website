import { useEffect, type FormEvent } from "react";
import { createPortal } from "react-dom";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const contactRecipients = [
  "hello@postclicklab.com",
  "erickrodovalhosilveira@gmail.com",
  "postclicklab@gmail.com",
];

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const company = String(formData.get("company") || "");
    const message = String(formData.get("message") || "");

    const subject = encodeURIComponent(`New PCL project inquiry from ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company}`,
        "",
        "Project:",
        message,
      ].join("\n"),
    );

    window.location.href = `mailto:${contactRecipients.join(",")}?subject=${subject}&body=${body}`;
  };

  return createPortal(
    <div className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
      <button className="contact-modal__backdrop" type="button" aria-label="Close contact form" onClick={onClose} />

      <div className="contact-modal__panel">
        <button className="contact-modal__close" type="button" aria-label="Close contact form" onClick={onClose}>
          ×
        </button>

        <span className="eyebrow eyebrow--accent">START A PROJECT</span>
        <h2 id="contact-modal-title">Tell us what happens after the click.</h2>
        <p>
          Share the page, funnel, or campaign you want to improve. The message opens in your email app addressed to the PCL team.
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

          <button className="button button--primary" type="submit">
            Send to PCL
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}
