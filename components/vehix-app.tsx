"use client"

import { useState } from "react"
import { LandingPage } from "./landing-page"
import { ProfileForm } from "./profile-form"
import { Recommendations } from "./recommendations"
import { CarDetail } from "./car-detail"

export type UserProfile = {
  estadoCivil: string
  hijos: string
  estiloVida: string
  presupuesto: number
  combustible: string
  kmDiarios: string
  paraQuien: string
  prioridad: string
}

export type Car = {
  id: number
  nombre: string
  precio: number
  compatibilidad: number
  imagen: string
  asientos: number
  combustible: string
  maletero: string
  tipo: string
  marca: string
  motor: string
  transmision: string
  consumo: string
  seguridad: string
  rating: number
  rendimiento: string
}

export const carsData: Car[] = [
  {
    id: 1,
    nombre: "Toyota Corolla Cross",
    precio: 22990000,
    compatibilidad: 98,
    imagen: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400&h=220&fit=crop",
    asientos: 5,
    combustible: "Híbrido",
    maletero: "440L",
    tipo: "SUV",
    marca: "Toyota",
    motor: "1.8L Híbrido",
    transmision: "CVT",
    consumo: "4.5L/100km",
    seguridad: "7 Airbags, ABS, ESP",
    rating: 4.8,
    rendimiento: "22 km/l"
  },
  {
    id: 2,
    nombre: "Kia Sportage",
    precio: 24990000,
    compatibilidad: 95,
    imagen: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=220&fit=crop",
    asientos: 5,
    combustible: "Bencina",
    maletero: "591L",
    tipo: "SUV",
    marca: "Kia",
    motor: "2.0L",
    transmision: "Automática 6V",
    consumo: "8.2L/100km",
    seguridad: "6 Airbags, ABS, ESP",
    rating: 4.5,
    rendimiento: "12 km/l"
  },
  {
    id: 3,
    nombre: "Mazda CX-5",
    precio: 27990000,
    compatibilidad: 92,
    imagen: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=220&fit=crop",
    asientos: 5,
    combustible: "Bencina",
    maletero: "506L",
    tipo: "SUV",
    marca: "Mazda",
    motor: "2.0L Skyactiv-G",
    transmision: "Automática 6V",
    consumo: "7.4L/100km",
    seguridad: "6 Airbags, ABS, ESP, LKA",
    rating: 4.6,
    rendimiento: "13.5 km/l"
  },
  {
    id: 4,
    nombre: "Chevrolet Onix",
    precio: 12990000,
    compatibilidad: 88,
    imagen: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&h=220&fit=crop",
    asientos: 5,
    combustible: "Bencina",
    maletero: "275L",
    tipo: "Sedan",
    marca: "Chevrolet",
    motor: "1.0L Turbo",
    transmision: "Manual 5V",
    consumo: "6.1L/100km",
    seguridad: "4 Airbags, ABS",
    rating: 4.2,
    rendimiento: "16 km/l"
  },
  {
    id: 5,
    nombre: "Hyundai Tucson",
    precio: 25990000,
    compatibilidad: 94,
    imagen: "https://images.unsplash.com/photo-1633613286991-611fe299a4be?w=400&h=220&fit=crop",
    asientos: 5,
    combustible: "Diésel",
    maletero: "620L",
    tipo: "SUV",
    marca: "Hyundai",
    motor: "2.0L CRDi",
    transmision: "Automática 8V",
    consumo: "6.8L/100km",
    seguridad: "6 Airbags, ABS, ESP, ADAS",
    rating: 4.7,
    rendimiento: "15 km/l"
  },
  {
    id: 6,
    nombre: "Suzuki Swift",
    precio: 11990000,
    compatibilidad: 85,
    imagen: "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=400&h=220&fit=crop",
    asientos: 5,
    combustible: "Bencina",
    maletero: "265L",
    tipo: "Hatchback",
    marca: "Suzuki",
    motor: "1.2L DualJet",
    transmision: "CVT",
    consumo: "5.0L/100km",
    seguridad: "6 Airbags, ABS, ESP",
    rating: 4.3,
    rendimiento: "20 km/l"
  }
]

export type Page = "landing" | "profile" | "recommendations" | "detail"

export function VehixApp() {
  const [currentPage, setCurrentPage] = useState<Page>("landing")
  const [profile, setProfile] = useState<UserProfile>({
    estadoCivil: "",
    hijos: "",
    estiloVida: "",
    presupuesto: 25000000,
    combustible: "",
    kmDiarios: "",
    paraQuien: "",
    prioridad: ""
  })
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)

  const navigateTo = (page: Page) => setCurrentPage(page)

  const handleSelectCar = (car: Car) => {
    setSelectedCar(car)
    navigateTo("detail")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {currentPage === "landing" && (
        <LandingPage onNavigate={navigateTo} />
      )}
      {currentPage === "profile" && (
        <ProfileForm 
          profile={profile} 
          setProfile={setProfile} 
          onNavigate={navigateTo} 
        />
      )}
      {currentPage === "recommendations" && (
        <Recommendations 
          profile={profile}
          onNavigate={navigateTo}
          onSelectCar={handleSelectCar}
        />
      )}
      {currentPage === "detail" && selectedCar && (
        <CarDetail 
          car={selectedCar}
          onNavigate={navigateTo}
        />
      )}
    </div>
  )
}
