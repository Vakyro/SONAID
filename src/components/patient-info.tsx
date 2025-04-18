export function PatientInfo() {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
          <p className="text-base">John Smith</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Patient ID</h3>
          <p className="text-base">P12345</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Date of Birth</h3>
          <p className="text-base">May 15, 1980 (45 years)</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Gender</h3>
          <p className="text-base">Male</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Contact Number</h3>
          <p className="text-base">(555) 123-4567</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
          <p className="text-base">john.smith@example.com</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Chief Complaint</h3>
        <p className="text-base">Chest pain and shortness of breath</p>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Medical History</h3>
        <p className="text-base">Hypertension, Type 2 Diabetes diagnosed in 2018</p>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Current Medications</h3>
        <p className="text-base">Lisinopril 10mg daily, Metformin 500mg twice daily</p>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Allergies</h3>
        <p className="text-base">Penicillin</p>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Additional Notes</h3>
        <p className="text-base">
          Patient reports symptoms worsen with physical activity. Recent stress test showed abnormal results. Referred
          by primary care physician Dr. Williams.
        </p>
      </div>
    </div>
  )
}
