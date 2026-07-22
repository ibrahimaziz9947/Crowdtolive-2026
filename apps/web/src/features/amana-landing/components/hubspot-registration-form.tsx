type HubspotRegistrationFormProps = {
  className?: string;
};

export function HubspotRegistrationForm({ className }: HubspotRegistrationFormProps) {
  return (
    <div className={className}>
      <div
        className="hs-form-frame"
        data-region="na1"
        data-form-id="bc0e9160-1ef8-4994-b05b-cd5144658c15"
        data-portal-id="7221343"
      />
    </div>
  );
}
