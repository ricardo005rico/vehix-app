"use client"

import { useState, useMemo } from "react"
import { Zap, ArrowLeft, Users, Fuel, Package, Heart, Star, ChevronDown, Gauge } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import type { Page, UserProfile, Car } from "./vehix-app"
import { carsData } from "./vehix-app"

type RecommendationsProps = {
  profile: UserProfile
  onNavigate: (page: Page) => void
  onSelectCar: (car: Car) => void
}

const tipos = ["SUV", "Sedan", "Hatchback"]
const marcas = ["Toyota", "Kia", "Mazda", "Hyundai", "Chevrolet", "Suzuki"]

const sortOptions = [
  { value: "compatibilidad", label: "Mayor compatibilidad" },
  { value: "precio-asc", label: "Menor precio" },
  { value: "precio-desc", label: "Mayor precio" },
  { value: "rating", label: "Mejor valorados" },
]

export function Recommendations({ profile, onNavigate, onSelectCar }: RecommendationsProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([5000000, 50000000])
  const [selectedTipos, setSelectedTipos] = useState<string[]>([])
  const [selectedMarcas, setSelectedMarcas] = useState<string[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [sortBy, setSortBy] = useState("compatibilidad")
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const toggleFavorite = (carId: number) => {
    setFavorites(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    )
  }

  const toggleFilter = (
    value: string, 
    selected: string[], 
    setSelected: (v: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value))
    } else {
      setSelected([...selected, value])
    }
  }

  const filteredCars = useMemo(() => {
    const filtered = carsData.filter(car => {
      const withinPrice = car.precio >= priceRange[0] && car.precio <= priceRange[1]
      const matchesTipo = selectedTipos.length === 0 || selectedTipos.includes(car.tipo)
      const matchesMarca = selectedMarcas.length === 0 || selectedMarcas.includes(car.marca)
      return withinPrice && matchesTipo && matchesMarca
    })

    // Sort the filtered results
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "compatibilidad":
          return b.compatibilidad - a.compatibilidad
        case "precio-asc":
          return a.precio - b.precio
        case "precio-desc":
          return b.precio - a.precio
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })
  }, [priceRange, selectedTipos, selectedMarcas, sortBy])

  const formatPrice = (value: number) => {
    return `$${value.toLocaleString("es-CL")}`
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
      </nav>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 p-6 border-b lg:border-b-0 lg:border-r border-border bg-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Filtros</h2>
            <button 
              onClick={() => {
                setPriceRange([5000000, 50000000])
                setSelectedTipos([])
                setSelectedMarcas([])
              }}
              className="text-sm text-primary hover:underline"
            >
              Limpiar
            </button>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <label className="block text-foreground font-medium mb-4">
              Rango de precio
            </label>
            <p className="text-sm text-primary mb-4">
              {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </p>
            <Slider
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              min={5000000}
              max={50000000}
              step={1000000}
              className="w-full"
            />
          </div>

          {/* Tipo */}
          <div className="mb-8">
            <label className="block text-foreground font-medium mb-4">Tipo</label>
            <div className="flex flex-wrap gap-2">
              {tipos.map(tipo => (
                <FilterButton
                  key={tipo}
                  selected={selectedTipos.includes(tipo)}
                  onClick={() => toggleFilter(tipo, selectedTipos, setSelectedTipos)}
                >
                  {tipo}
                </FilterButton>
              ))}
            </div>
          </div>

          {/* Marca */}
          <div>
            <label className="block text-foreground font-medium mb-4">Marca</label>
            <div className="flex flex-wrap gap-2">
              {marcas.map(marca => (
                <FilterButton
                  key={marca}
                  selected={selectedMarcas.includes(marca)}
                  onClick={() => toggleFilter(marca, selectedMarcas, setSelectedMarcas)}
                >
                  {marca}
                </FilterButton>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-foreground">
              Autos recomendados para ti
            </h1>
            <Button 
              variant="ghost" 
              onClick={() => onNavigate("profile")}
              className="text-muted-foreground w-fit"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Editar preferencias
            </Button>
          </div>

          {/* Profile Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <p className="text-sm text-muted-foreground">
              Mostrando resultados para:{" "}
              <span className="text-foreground">
                {profile.estadoCivil || "—"} · {profile.hijos || "—"} · {profile.estiloVida || "—"} · ${(profile.presupuesto / 1000000).toFixed(0)}M · {profile.combustible || "—"}
              </span>
            </p>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Ordenar por: <span className="text-foreground">{sortOptions.find(o => o.value === sortBy)?.label}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
              </button>
              {showSortDropdown && (
                <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg z-10 min-w-[180px]">
                  {sortOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value)
                        setShowSortDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        sortBy === option.value ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {filteredCars.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No se encontraron autos con los filtros seleccionados.
              </p>
              <Button 
                variant="link" 
                onClick={() => {
                  setPriceRange([5000000, 50000000])
                  setSelectedTipos([])
                  setSelectedMarcas([])
                }}
                className="text-primary mt-4"
              >
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCars.map(car => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  onViewDetails={() => onSelectCar(car)}
                  formatPrice={formatPrice}
                  isFavorite={favorites.includes(car.id)}
                  onToggleFavorite={() => toggleFavorite(car.id)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function FilterButton({ 
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
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
        selected 
          ? "bg-primary text-primary-foreground" 
          : "bg-secondary text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  )
}

function CarCard({ 
  car, 
  onViewDetails,
  formatPrice,
  isFavorite,
  onToggleFavorite
}: { 
  car: Car
  onViewDetails: () => void
  formatPrice: (value: number) => string
  isFavorite: boolean
  onToggleFavorite: () => void
}) {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border">
      <div className="relative">
        <img
          src={car.imagen}
          alt={car.nombre}
          crossOrigin="anonymous"
          className="w-full h-[200px] object-cover"
        />
        {/* Heart Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite()
          }}
          className="absolute top-3 left-3 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-foreground"}`} 
          />
        </button>
        <span className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
          {car.compatibilidad}% compatible
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground mb-1">{car.nombre}</h3>
        <p className="text-xl font-bold text-primary mb-2">{formatPrice(car.precio)}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            {car.asientos}
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel className="w-4 h-4" />
            {car.combustible}
          </span>
          <span className="flex items-center gap-1.5">
            <Package className="w-4 h-4" />
            {car.maletero}
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge className="w-4 h-4" />
            {car.rendimiento}
          </span>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-5">
          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          <span>{car.rating.toFixed(1)}</span>
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={onViewDetails}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Ver detalles
          </Button>
          <Button 
            variant="outline"
            className="flex-1 border-border text-foreground hover:bg-secondary"
          >
            Comparar
          </Button>
        </div>
      </div>
    </div>
  )
}
