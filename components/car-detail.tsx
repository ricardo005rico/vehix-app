"use client"

import { useState, useMemo } from "react"
import { Zap, ArrowLeft, Users, Fuel, Package, Gauge, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import type { Page, Car } from "./vehix-app"
import { carsData } from "./vehix-app"

type CarDetailProps = {
  car: Car
  onNavigate: (page: Page) => void
}

const plazos = [12, 24, 36, 48]
const tasaInteres = 0.008 // 0.8% mensual

export function CarDetail({ car, onNavigate }: CarDetailProps) {
  const [pieInicial, setPieInicial] = useState(20) // 20% por defecto
  const [plazo, setPlazo] = useState(36)

  const formatPrice = (value: number) => {
    return `$${value.toLocaleString("es-CL")}`
  }

  const financing = useMemo(() => {
    const montoPie = car.precio * (pieInicial / 100)
    const montoFinanciar = car.precio - montoPie
    
    // Cálculo de cuota con interés compuesto
    const cuotaMensual = montoFinanciar * (tasaInteres * Math.pow(1 + tasaInteres, plazo)) / (Math.pow(1 + tasaInteres, plazo) - 1)
    const totalPagar = cuotaMensual * plazo + montoPie
    
    return {
      montoPie,
      montoFinanciar,
      cuotaMensual,
      totalPagar
    }
  }, [car.precio, pieInicial, plazo])

  const similarCars = carsData.filter(c => c.id !== car.id).slice(0, 3)

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
      </nav>

      <main className="flex-1 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => onNavigate("recommendations")}
            className="text-muted-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a resultados
          </Button>

          {/* Car Image */}
          <div className="relative rounded-xl overflow-hidden mb-8">
            <img
              src={car.imagen}
              alt={car.nombre}
              crossOrigin="anonymous"
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
          </div>

          {/* Car Info */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{car.nombre}</h1>
              <p className="text-2xl font-bold text-primary">{formatPrice(car.precio)}</p>
            </div>
            <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold w-fit">
              {car.compatibilidad}% compatible
            </span>
          </div>

          {/* Specs Table */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-6">Especificaciones</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <SpecItem label="Motor" value={car.motor} />
              <SpecItem label="Transmisión" value={car.transmision} />
              <SpecItem label="Consumo" value={car.consumo} />
              <SpecItem label="Rendimiento" value={car.rendimiento} />
              <SpecItem label="Asientos" value={car.asientos.toString()} />
              <SpecItem label="Maletero" value={car.maletero} />
              <SpecItem label="Seguridad" value={car.seguridad} />
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Valoración</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-foreground font-medium">{car.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Financing Simulator */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-6">Simulador de financiamiento</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left side - Controls */}
              <div>
                {/* Pie Inicial */}
                <div className="mb-6">
                  <label className="block text-foreground font-medium mb-4">
                    Pie inicial: <span className="text-primary">{pieInicial}%</span>
                    <span className="text-muted-foreground ml-2">
                      ({formatPrice(financing.montoPie)})
                    </span>
                  </label>
                  <Slider
                    value={[pieInicial]}
                    onValueChange={(value) => setPieInicial(value[0])}
                    min={10}
                    max={40}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>10%</span>
                    <span>40%</span>
                  </div>
                </div>

                {/* Plazo */}
                <div>
                  <label className="block text-foreground font-medium mb-4">Plazo</label>
                  <div className="flex gap-3">
                    {plazos.map(p => (
                      <button
                        key={p}
                        onClick={() => setPlazo(p)}
                        className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                          plazo === p 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {p} meses
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  Tasa de interés: 0.8% mensual
                </p>
              </div>

              {/* Right side - Summary */}
              <div className="bg-secondary rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Precio del vehículo</span>
                    <span className="text-foreground font-medium">{formatPrice(car.precio)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pie inicial ({pieInicial}%)</span>
                    <span className="text-foreground font-medium">{formatPrice(financing.montoPie)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monto a financiar</span>
                    <span className="text-foreground font-medium">{formatPrice(financing.montoFinanciar)}</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground font-semibold">Cuota mensual</span>
                      <span className="text-2xl font-bold text-primary">{formatPrice(Math.round(financing.cuotaMensual))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total a pagar</span>
                      <span className="text-foreground font-medium">{formatPrice(Math.round(financing.totalPagar))}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Contactar vendedor
                </Button>
              </div>
            </div>
          </div>

          {/* Similar Cars */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Autos similares</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {similarCars.map(similarCar => (
                <SimilarCarCard 
                  key={similarCar.id} 
                  car={similarCar}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-muted-foreground text-sm">{label}</span>
      <p className="text-foreground font-medium">{value}</p>
    </div>
  )
}

function SimilarCarCard({ 
  car,
  formatPrice 
}: { 
  car: Car
  formatPrice: (value: number) => string
}) {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border">
      <img
        src={car.imagen}
        alt={car.nombre}
        crossOrigin="anonymous"
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1">{car.nombre}</h3>
        <p className="text-primary font-bold">{formatPrice(car.precio)}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-2">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {car.asientos}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="w-3 h-3" />
            {car.combustible}
          </span>
          <span className="flex items-center gap-1">
            <Package className="w-3 h-3" />
            {car.maletero}
          </span>
          <span className="flex items-center gap-1">
            <Gauge className="w-3 h-3" />
            {car.rendimiento}
          </span>
        </div>
      </div>
    </div>
  )
}
