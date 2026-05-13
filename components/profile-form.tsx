"use client"

import { useState } from "react"
import { Zap, ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import type { Page, UserProfile } from "./vehix-app"

type ProfileFormProps = {
  profile: UserProfile
  setProfile: (profile: UserProfile) => void
  onNavigate: (page: Page) => void
}

export function ProfileForm({ profile, setProfile, onNavigate }: ProfileFormProps) {
  const [step, setStep] = useState(1)

  const updateProfile = (key: keyof UserProfile, value: string | number) => {
    setProfile({ ...profile, [key]: value })
  }

  const formatPrice = (value: number) => {
    return `$${value.toLocaleString("es-CL")}`
  }

  const canProceed = () => {
    if (step === 1) return profile.estadoCivil && profile.hijos
    if (step === 2) return profile.estiloVida
    if (step === 3) return profile.combustible
    return false
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
 <button
  onClick={() => onNavigate("landing")}
  className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
>
  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
    <Zap className="w-6 h-6 text-primary-foreground" />
  </div>
  <div className="flex flex-col">
    <span className="text-xl font-bold text-foreground leading-none">Vehix</span>
    <span className="text-xs text-primary leading-none">Chile</span>
  </div>
</button>
        <Button 
          variant="ghost" 
          onClick={() => onNavigate("landing")}
          className="text-muted-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
      </nav>

      {/* Progress Bar */}
      <div className="px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  s < step 
                    ? "bg-primary text-primary-foreground" 
                    : s === step 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-muted-foreground"
                }`}>
                  {s < step ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-20 md:w-32 h-1 mx-2 ${
                    s < step ? "bg-primary" : "bg-secondary"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {step === 1 && (
            <Step1 profile={profile} updateProfile={updateProfile} />
          )}
          {step === 2 && (
            <Step2 profile={profile} updateProfile={updateProfile} formatPrice={formatPrice} />
          )}
          {step === 3 && (
            <Step3 profile={profile} updateProfile={updateProfile} formatPrice={formatPrice} />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            {step > 1 ? (
              <Button 
                variant="outline" 
                onClick={() => setStep(step - 1)}
                className="border-border text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>
            ) : (
              <div />
            )}
            
            {step < 3 ? (
              <Button 
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Siguiente
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={() => onNavigate("recommendations")}
                disabled={!canProceed()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Ver recomendaciones
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function Step1({ 
  profile, 
  updateProfile 
}: { 
  profile: UserProfile
  updateProfile: (key: keyof UserProfile, value: string | number) => void
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-8">Información personal</h2>
      
      <div className="mb-8">
        <label className="block text-foreground font-medium mb-4">Estado civil</label>
        <div className="grid grid-cols-3 gap-4">
          {["Soltero", "Casado", "Con pareja"].map((option) => (
            <SelectCard
              key={option}
              selected={profile.estadoCivil === option}
              onClick={() => updateProfile("estadoCivil", option)}
            >
              {option}
            </SelectCard>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-foreground font-medium mb-4">Número de hijos</label>
        <div className="grid grid-cols-4 gap-4">
          {["0", "1", "2", "3+"].map((option) => (
            <SelectCard
              key={option}
              selected={profile.hijos === option}
              onClick={() => updateProfile("hijos", option)}
            >
              {option}
            </SelectCard>
          ))}
        </div>
      </div>
    </div>
  )
}

function Step2({ 
  profile, 
  updateProfile,
  formatPrice 
}: { 
  profile: UserProfile
  updateProfile: (key: keyof UserProfile, value: string | number) => void
  formatPrice: (value: number) => string
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-8">Estilo de vida y presupuesto</h2>
      
      <div className="mb-8">
        <label className="block text-foreground font-medium mb-4">Estilo de vida</label>
        <div className="grid grid-cols-3 gap-4">
          {["Ciudad diario", "Viajes largos", "Mixto"].map((option) => (
            <SelectCard
              key={option}
              selected={profile.estiloVida === option}
              onClick={() => updateProfile("estiloVida", option)}
            >
              {option}
            </SelectCard>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-foreground font-medium mb-4">
          Presupuesto: <span className="text-primary">{formatPrice(profile.presupuesto)}</span>
        </label>
        <Slider
          value={[profile.presupuesto]}
          onValueChange={(value) => updateProfile("presupuesto", value[0])}
          min={5000000}
          max={50000000}
          step={1000000}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>$5.000.000</span>
          <span>$50.000.000</span>
        </div>
      </div>
    </div>
  )
}

function Step3({ 
  profile, 
  updateProfile,
  formatPrice 
}: { 
  profile: UserProfile
  updateProfile: (key: keyof UserProfile, value: string | number) => void
  formatPrice: (value: number) => string
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-8">Preferencia de combustible</h2>
      
      <div className="mb-8">
        <label className="block text-foreground font-medium mb-4">Tipo de combustible</label>
        <div className="grid grid-cols-2 gap-4">
          {["Bencina", "Diésel", "Híbrido", "Eléctrico"].map((option) => (
            <SelectCard
              key={option}
              selected={profile.combustible === option}
              onClick={() => updateProfile("combustible", option)}
            >
              {option}
            </SelectCard>
          ))}
        </div>
      </div>

      {/* Profile Summary */}
      <div className="bg-secondary rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Resumen de tu perfil</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Estado civil:</span>
            <p className="text-foreground font-medium">{profile.estadoCivil || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Hijos:</span>
            <p className="text-foreground font-medium">{profile.hijos || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Estilo de vida:</span>
            <p className="text-foreground font-medium">{profile.estiloVida || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Presupuesto:</span>
            <p className="text-primary font-medium">{formatPrice(profile.presupuesto)}</p>
          </div>
          <div className="col-span-2">
            <span className="text-muted-foreground">Combustible:</span>
            <p className="text-foreground font-medium">{profile.combustible || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SelectCard({ 
  children, 
  selected, 
  onClick 
}: { 
  children: React.ReactNode
  selected: boolean
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border-2 transition-all text-center font-medium ${
        selected 
          ? "border-primary bg-primary/10 text-foreground" 
          : "border-border bg-secondary text-muted-foreground hover:border-muted-foreground"
      }`}
    >
      {children}
    </button>
  )
}
