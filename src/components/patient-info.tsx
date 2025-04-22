export function PatientInfo() {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Full Name</h3>
          <p className="text-sm sm:text-base">Jane Smith</p>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Patient ID</h3>
          <p className="text-sm sm:text-base">P12345</p>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Date of Birth</h3>
          <p className="text-sm sm:text-base">May 15, 1975 (50 years)</p>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Gender</h3>
          <p className="text-sm sm:text-base">Female</p>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Contact Number</h3>
          <p className="text-sm sm:text-base">(555) 123-4567</p>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Email</h3>
          <p className="text-sm sm:text-base">jane.smith@example.com</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Chief Complaint</h3>
        <p className="text-sm sm:text-base">Palpable lump in right breast, discovered during self-examination</p>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Breast Health History</h3>
        <p className="text-sm sm:text-base">
          No previous breast conditions. Mother diagnosed with breast cancer at age 62.
        </p>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Previous Imaging</h3>
        <p className="text-sm sm:text-base">Last mammogram 2 years ago, reported as BI-RADS 2 (benign findings).</p>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Current Medications</h3>
        <p className="text-sm sm:text-base">Lisinopril 10mg daily, Calcium + Vitamin D supplement</p>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Allergies</h3>
        <p className="text-sm sm:text-base">Penicillin</p>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Additional Notes</h3>
        <p className="text-sm sm:text-base">
          Patient reports the lump has been present for approximately 3 weeks. No skin changes, nipple discharge, or
          pain reported. Currently postmenopausal, no hormone replacement therapy.
        </p>
      </div>
    </div>
  )
}
