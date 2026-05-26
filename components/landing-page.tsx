"use client"

import { Zap, Car, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Page } from "./vehix-app"

type LandingPageProps = {
  onNavigate: (page: Page) => void
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
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
          onClick={() => onNavigate("profile")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Comenzar
        </Button>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 py-20 gap-12">
  <div className="text-center lg:text-left max-w-xl">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
      Encuentra el auto perfecto para ti
    </h1>
    <p className="text-lg md:text-xl text-muted-foreground mb-10">
      La forma más inteligente de encontrar tu próximo vehículo en Chile
    </p>
    <Button
      onClick={() => onNavigate("profile")}
      size="lg"
      className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
    >
      Comenzar ahora →
    </Button>
  </div>
  <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl">
    <img
      src="/hero-keys.jpg"
      alt="Auto moderno"
      className="w-full h-80 object-cover"
    />
  </div>
</main>

      {/* Features Section */}
      <section className="px-6 py-20 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            Todo lo que necesitas
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-primary" />}
              title="Recomendación personalizada"
              description="Algoritmo inteligente que analiza tu perfil para encontrar el auto ideal"
            />
            <FeatureCard 
              icon={<Car className="w-8 h-8 text-primary" />}
              title="500+ modelos disponibles"
              description="Amplio catálogo de vehículos de las mejores marcas del mercado"
            />
            <FeatureCard 
              icon={<DollarSign className="w-8 h-8 text-primary" />}
              title="Simulador de financiamiento"
              description="Calcula tu cuota mensual y encuentra la mejor opción de crédito"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-16">
            Así de simple
          </h2>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 w-[60%] h-0.5 bg-border" />
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
              <StepCard 
                number={1}
                title="Crea tu perfil"
                description="Cuéntanos tu estilo de vida"
              />
              <StepCard 
                number={2}
                title="Recibe recomendaciones"
                description="Nuestra IA analiza tu perfil"
              />
              <StepCard 
                number={3}
                title="Encuentra tu auto"
                description="Contacta al vendedor directo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-6">
            ¿Listo para encontrar tu auto ideal?
          </h2>
          <Button 
            onClick={() => onNavigate("profile")}
            size="lg"
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6"
          >
            Comenzar ahora →
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border">
        <p className="text-center text-muted-foreground text-sm">
          © 2025 Vehix. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="bg-secondary rounded-xl p-6">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function StepCard({
  number,
  title,
  description
}: {
  number: number
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4 relative z-10">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
