export function PatientInfo() {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Nombre Completo</h3>
          <p className="text-sm sm:text-base">Jane Smith</p>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">ID de Paciente</h3>
          <p className="text-sm sm:text-base">P12345</p>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Fecha de Nacimiento</h3>
          <p className="text-sm sm:text-base">15 de mayo, 1975 (50 años)</p>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Género</h3>
          <p className="text-sm sm:text-base">Femenino</p>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Número de Contacto</h3>
          <p className="text-sm sm:text-base">(555) 123-4567</p>
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Correo Electrónico</h3>
          <p className="text-sm sm:text-base">jane.smith@example.com</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Motivo de Consulta</h3>
        <p className="text-sm sm:text-base">Bulto palpable en mama derecha, descubierto durante autoexamen</p>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Historial de Salud Mamaria</h3>
        <p className="text-sm sm:text-base">
          Sin condiciones mamarias previas. Madre diagnosticada con cáncer de mama a los 62 años.
        </p>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Imágenes Previas</h3>
        <p className="text-sm sm:text-base">
          Última mamografía hace 2 años, reportada como BI-RADS 2 (hallazgos benignos).
        </p>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Medicamentos Actuales</h3>
        <p className="text-sm sm:text-base">Lisinopril 10mg diario, Suplemento de Calcio + Vitamina D</p>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Alergias</h3>
        <p className="text-sm sm:text-base">Penicilina</p>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Notas Adicionales</h3>
        <p className="text-sm sm:text-base">
          La paciente reporta que el bulto ha estado presente por aproximadamente 3 semanas. No reporta cambios en la
          piel, secreción del pezón o dolor. Actualmente posmenopáusica, sin terapia de reemplazo hormonal.
        </p>
      </div>
    </div>
  )
}
