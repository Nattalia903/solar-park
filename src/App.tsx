import { useState, useEffect, type FormEvent } from 'react'
import { 
  Sun, Battery, Zap, Car, MapPin, 
  Phone, Mail, Menu, X, ChevronRight, Star, 
  CheckCircle, TrendingUp, Leaf, Users, CreditCard,
  BarChart3, Wifi, Camera, ArrowRight, Calendar,
  Timer, TreePine, Droplets, Wind
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import './App.css'

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Acasă', href: '#home' },
    { name: 'Rezervă', href: '#reservation' },
    { name: 'Prețuri', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="SolarPark Logo"
                className="w-14 h-14 rounded-3xl object-contain bg-white/95 p-2 shadow-lg border border-white"
              />
              <span className={`font-bold text-xl transition-colors ${isScrolled ? 'text-[#273D2B]' : 'text-[#273D2B]'}`}>
                Solar<span className="text-[#06D889]">Park</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-[#06D889]/10 hover:text-[#06D889] ${
                    isScrolled ? 'text-[#273D2B]' : 'text-[#273D2B]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="ghost"
                className="text-[#273D2B] hover:text-[#06D889]"
                onClick={() => setIsLoginOpen(true)}
              >
                Login
              </Button>
              <Button
                className="bg-[#06D889] hover:bg-[#05b876] text-white rounded-xl px-6"
                asChild
              >
                <a href="#reservation">Rezervă Loc</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4 animate-fade-in">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="px-4 py-3 rounded-lg text-[#273D2B] hover:bg-[#06D889]/10 hover:text-[#06D889] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setIsLoginOpen(true)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    Login
                  </Button>
                  <Button className="flex-1 bg-[#06D889] hover:bg-[#05b876]" asChild>
                    <a href="#reservation">Rezervă</a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Autentificare</DialogTitle>
            <DialogDescription>
              Introdu datele tale pentru a accesa contul SolarPark.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="loginEmail">Email</Label>
              <Input id="loginEmail" type="email" placeholder="ion@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loginPassword">Parolă</Label>
              <Input id="loginPassword" type="password" placeholder="********" />
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setIsLoginOpen(false)}>
              Anulează
            </Button>
            <Button
              className="flex-1 btn-primary"
              onClick={() => {
                setIsLoginOpen(false)
                window.alert('Te-ai autentificat cu succes!')
              }}
            >
              Conectează-te
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Hero Section with Live Stats
function HeroSection() {
  const [stats, setStats] = useState({
    availableSpots: 32,
    totalSpots: 50,
    energyToday: 128,
    co2Saved: 86
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        energyToday: prev.energyToday + Math.floor(Math.random() * 3),
        co2Saved: prev.co2Saved + Math.floor(Math.random() * 2)
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#E8F5E9] via-white to-[#FFFDE7]">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#06D889]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFD600]/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-[#06D889]/5 rounded-full blur-2xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm">
              <span className="w-2 h-2 bg-[#06D889] rounded-full animate-pulse" />
              <span className="text-sm font-medium text-[#273D2B]">Sistem Live Activ</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#273D2B] leading-tight">
              Parchezi la <span className="text-[#06D889]">umbră</span>,
              <br />
              produci <span className="text-[#FFD600]">viitorul</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-lg">
              Prima parcare inteligentă din Cahul cu panouri solare. 
              Rezervă online, parchează inteligent și contribuie la un viitor verde.
            </p>

            {/* Live Stats Dashboard */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#273D2B]">
                <Zap className="w-4 h-4 text-[#FFD600]" />
                Statistici Live
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#06D889]/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Car className="w-5 h-5 text-[#06D889]" />
                    <span className="text-sm text-gray-600">Locuri Libere</span>
                  </div>
                  <div className="text-2xl font-bold text-[#273D2B]">
                    {stats.availableSpots}/{stats.totalSpots}
                  </div>
                  <Progress value={(stats.availableSpots / stats.totalSpots) * 100} className="h-2 mt-2" />
                </div>
                <div className="bg-[#FFD600]/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="w-5 h-5 text-[#FFD600]" />
                    <span className="text-sm text-gray-600">Energie Azi</span>
                  </div>
                  <div className="text-2xl font-bold text-[#273D2B]">
                    {stats.energyToday} <span className="text-sm">kWh</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#FFD600] to-[#06D889] w-3/4 animate-pulse" />
                  </div>
                </div>
                <div className="bg-[#06D889]/10 rounded-xl p-4 col-span-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-[#06D889]" />
                      <span className="text-sm text-gray-600">CO₂ Economisit</span>
                    </div>
                    <div className="text-xl font-bold text-[#06D889]">
                      {stats.co2Saved} kg
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                className="btn-primary text-lg px-8 py-6"
                asChild
              >
                <a href="#reservation">
                  Rezervă Loc
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button
                variant="outline"
                className="btn-secondary text-lg px-8 py-6"
                asChild
              >
                <a href="#reservation">
                  <Camera className="w-5 h-5 mr-2" />
                  Vezi Disponibilitate Live
                </a>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="/hero-image.jpg" 
                alt="Solar Parking" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#273D2B]/30 to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 glass-card p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#06D889] rounded-xl flex items-center justify-center">
                  <Battery className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Încărcare EV</div>
                  <div className="font-bold text-[#273D2B]">Disponibilă</div>
                </div>
              </div>
            </div>

            {/* Eco Score Badge */}
            <div className="absolute -top-4 -right-4 glass-card p-4 animate-float-delayed">
              <div className="flex items-center gap-2">
                <TreePine className="w-5 h-5 text-[#06D889]" />
                <span className="font-bold text-[#273D2B]">Eco Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// About Section
function AboutSection() {
  const stats = [
    { value: '500+', label: 'Instalații Finalizate', icon: CheckCircle },
    { value: '50MW+', label: 'Energie Curată', icon: Zap },
    { value: '10,000+', label: 'Tone CO₂ Evitate', icon: Leaf },
  ]

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img 
                src="/parking-solar.jpg" 
                alt="Solar Parking Installation" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#06D889]/10 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="section-label">
              <Sun className="w-4 h-4" />
              Despre Noi
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-[#273D2B]">
              Pionieri în Soluții de Parcare Sustenabilă
            </h2>
            
            <p className="text-gray-600 leading-relaxed">
              La SolarPark, credem că fiecare loc de parcare are potențialul de a alimenta un viitor mai curat. 
              Instalațiile noastre inovatoare de panouri solare transformă parcările obișnuite în active generatoare de energie.
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              Cu peste 10 ani de experiență în energie regenerabilă, am ajutat afaceri și comunități 
              să-și reducă amprenta de carbon în timp ce economisesc până la 70% din costurile cu energia.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-[#E8F5E9] rounded-2xl">
                  <stat.icon className="w-6 h-6 text-[#06D889] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#273D2B]">{stat.value}</div>
                  <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Scanare LPR',
      description: 'Camera cu recunoaștere automată a numărului de înmatriculare identifică vehiculul la intrare.',
      icon: Camera
    },
    {
      number: '02',
      title: 'Acces Fără Ticket',
      description: 'Bariera se deschide automat. Nu ai nevoie de card sau ticket.',
      icon: CheckCircle
    },
    {
      number: '03',
      title: 'Parcare Inteligentă',
      description: 'Sistemul îți indică locurile libere în timp real prin aplicație.',
      icon: MapPin
    },
    {
      number: '04',
      title: 'Plată Automată',
      description: 'La ieșire, plata se procesează automat prin cardul înregistrat.',
      icon: CreditCard
    }
  ]

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-[#E8F5E9] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="section-label justify-center mb-4">
            <Zap className="w-4 h-4" />
            Cum Funcționează
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#273D2B]">
            Tehnologie de Ultimă Generație
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Flux simplu și rapid: de la intrare până la ieșire, totul este automatizat
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Flow Animation */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img 
                src="/smart-tech.jpg" 
                alt="Smart Parking Technology" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
              <path 
                d="M 50 150 Q 200 100 350 150" 
                stroke="#06D889" 
                strokeWidth="2" 
                fill="none"
                strokeDasharray="8 4"
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="flex gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#06D889] to-[#05b876] rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                  {step.number}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <step.icon className="w-4 h-4 text-[#06D889]" />
                    <h3 className="font-bold text-[#273D2B]">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Reservation Section with Parking Map
function ReservationSection() {
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null)
  const [reservationType, setReservationType] = useState('hour')
  const [showDialog, setShowDialog] = useState(false)

  // Generate parking spots
  const parkingSpots = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    status: Math.random() > 0.4 ? 'available' : 'occupied',
    type: i < 10 ? 'ev' : 'standard',
    hasSolar: i % 2 === 0
  }))

  const getSpotColor = (spot: typeof parkingSpots[0]) => {
    if (selectedSpot === spot.id) return 'bg-[#FFD600] border-[#FFD600]'
    if (spot.status === 'occupied') return 'bg-gray-300 border-gray-300'
    if (spot.type === 'ev') return 'bg-[#06D889]/30 border-[#06D889]'
    return 'bg-white border-[#06D889]'
  }

  return (
    <section id="reservation" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-label justify-center mb-4">
            <Calendar className="w-4 h-4" />
            Rezervă Parcare
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#273D2B]">
            Smart Parking Live
          </h2>
          <p className="text-gray-600 mt-4">
            Alege locul tău în timp real și rezervă în câteva secunde
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Parking Map */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#273D2B]">Hartă Parcare</h3>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white border-2 border-[#06D889] rounded" />
                    <span>Disponibil</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#06D889]/30 border-2 border-[#06D889] rounded" />
                    <span>EV Charging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded" />
                    <span>Ocupat</span>
                  </div>
                </div>
              </div>

              {/* Parking Grid */}
              <div className="grid grid-cols-10 gap-2">
                {parkingSpots.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => spot.status === 'available' && setSelectedSpot(spot.id)}
                    disabled={spot.status === 'occupied'}
                    className={`
                      aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-xs
                      transition-all duration-300 hover:scale-110
                      ${getSpotColor(spot)}
                      ${spot.status === 'occupied' ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}
                    `}
                  >
                    {spot.type === 'ev' && <Zap className="w-3 h-3 text-[#06D889]" />}
                    {spot.hasSolar && <Sun className="w-3 h-3 text-[#FFD600]" />}
                    <span className="font-medium">{spot.id}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reservation Panel */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-bold text-[#273D2B] mb-4">Detalii Rezervare</h3>
              
              {selectedSpot ? (
                <div className="space-y-4">
                  <div className="p-4 bg-[#06D889]/10 rounded-xl">
                    <div className="text-sm text-gray-600">Loc Selectat</div>
                    <div className="text-2xl font-bold text-[#06D889]">#{selectedSpot}</div>
                  </div>

                  <Tabs value={reservationType} onValueChange={setReservationType}>
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="hour">Oră</TabsTrigger>
                      <TabsTrigger value="day">Zi</TabsTrigger>
                      <TabsTrigger value="subscription">Abonament</TabsTrigger>
                    </TabsList>
                    <TabsContent value="hour" className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">15 LEI / oră</span>
                          <Timer className="w-5 h-5 text-[#06D889]" />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="day" className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">50 LEI / zi</span>
                          <Calendar className="w-5 h-5 text-[#06D889]" />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="subscription" className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">400 LEI / lună</span>
                          <Star className="w-5 h-5 text-[#FFD600]" />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Button 
                    className="w-full btn-primary"
                    onClick={() => setShowDialog(true)}
                  >
                    Continuă către Plată
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Selectează un loc de parcare de pe hartă</p>
                </div>
              )}
            </div>

            {/* Live Stats */}
            <div className="glass-card p-6">
              <h4 className="font-semibold text-[#273D2B] mb-4">Status Parcare</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Locuri Libere</span>
                  <span className="font-bold text-[#06D889]">32/50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stații EV</span>
                  <span className="font-bold text-[#06D889]">6/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timp Mediu</span>
                  <span className="font-bold text-[#273D2B]">2.5h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Finalizează Rezervarea</DialogTitle>
            <DialogDescription>
              Loc #{selectedSpot} - {reservationType === 'hour' ? '15 LEI/oră' : reservationType === 'day' ? '50 LEI/zi' : '400 LEI/lună'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nume Complet</Label>
              <Input id="name" placeholder="Ion Popescu" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="ion@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" placeholder="+373 69 123 456" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plate">Număr Înmatriculare</Label>
              <Input id="plate" placeholder="CAH 123" />
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setShowDialog(false)}>
              Anulează
            </Button>
            <Button className="flex-1 btn-primary" onClick={() => setShowDialog(false)}>
              Plătește
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

// Pricing Section
function PricingSection() {
  const plans = [
    {
      name: 'Orar',
      price: '15',
      unit: 'LEI / oră',
      features: [
        'Acces la toate locurile',
        'Protecție solară',
        'Plată automată',
        'Notificare expirare'
      ],
      popular: false
    },
    {
      name: 'Zilnic',
      price: '50',
      unit: 'LEI / zi',
      features: [
        'Toate beneficiile orare',
        'Preț fix pentru 24h',
        'Istoric parcări',
        'Suport prioritar'
      ],
      popular: true
    },
    {
      name: 'Săptămânal',
      price: '400',
      unit: 'LEI / săptămână',
      features: [
        'Toate beneficiile zilnice',
        'Loc rezervat fix',
        'Facturare automată',
        'Scor eco personal'
      ],
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-[#E8F5E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="section-label justify-center mb-4">
            <CreditCard className="w-4 h-4" />
            Prețuri
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#273D2B]">
            Tarife Transparente
          </h2>
          <p className="text-gray-600 mt-4">
            Alege planul care ți se potrivește
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`
                relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2
                ${plan.popular 
                  ? 'bg-gradient-to-br from-[#06D889] to-[#05b876] text-white shadow-xl scale-105' 
                  : 'bg-white shadow-lg hover:shadow-xl'
                }
              `}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFD600] text-[#273D2B] hover:bg-[#FFD600]">
                  Cel Mai Popular
                </Badge>
              )}
              
              <div className="text-center mb-6">
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-[#273D2B]'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-[#06D889]'}`}>
                    {plan.price}
                  </span>
                  <span className={plan.popular ? 'text-white/80' : 'text-gray-500'}>
                    {plan.unit}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3">
                    <CheckCircle className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-[#06D889]'}`} />
                    <span className={plan.popular ? 'text-white/90' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-white text-[#06D889] hover:bg-gray-100' 
                    : 'btn-primary'
                }`}
                onClick={() => window.alert(`Ai ales planul ${plan.name}. Vom reveni în curând cu detalii.`)}
              >
                Alege Planul
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Green Energy Section
function GreenEnergySection() {
  const stats = [
    { label: 'Panouri Solare', value: '120', unit: 'buc', icon: Sun },
    { label: 'Putere Totală', value: '54', unit: 'kW', icon: Zap },
    { label: 'Producție Anuală', value: '78,840', unit: 'kWh', icon: BarChart3 },
    { label: 'Energie Vândută', value: '45,000', unit: 'kWh', icon: TrendingUp },
  ]

  const ecoImpact = [
    { label: 'CO₂ Redus', value: '56.7', unit: 'tone/an', icon: Wind },
    { label: 'Copaci Plantați', value: '2,580', unit: 'echivalent', icon: TreePine },
    { label: 'Apă Economisită', value: '1.2M', unit: 'litri/an', icon: Droplets },
  ]

  return (
    <section id="green-energy" className="py-24 bg-[#273D2B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#06D889] font-semibold text-sm uppercase tracking-wider mb-4">
            <Leaf className="w-4 h-4" />
            Energie Verde
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Puterea Soarelui, <span className="text-[#06D889]">Viitorul Tău</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Fiecare loc de parcare generează energie curată pentru comunitate
          </p>
        </div>

        {/* Solar Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center hover:bg-white/20 transition-colors">
              <stat.icon className="w-8 h-8 text-[#FFD600] mx-auto mb-4" />
              <div className="text-3xl font-bold text-[#06D889]">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.unit}</div>
              <div className="text-sm text-white/80 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="/solar-tech.jpg" 
              alt="Solar Technology" 
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Dashboard Live</h3>
            <p className="text-gray-400">
              Urmărește în timp real producția de energie, consumul și impactul ecologic 
              al parcării tale direct din aplicație.
            </p>

            {/* Live Energy Graph Simulation */}
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-400">Producție Astăzi</span>
                <span className="text-[#06D889] font-bold">128 kWh</span>
              </div>
              <div className="h-32 flex items-end gap-2">
                {[40, 55, 45, 70, 85, 90, 75, 60, 80, 95, 88, 72].map((height, i) => (
                  <div 
                    key={i}
                    className="flex-1 bg-gradient-to-t from-[#06D889] to-[#FFD600] rounded-t transition-all duration-500"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Eco Impact */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Impact Ecologic</h3>
          <p className="text-gray-400">Contribuția ta la un viitor sustenabil</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {ecoImpact.map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-[#06D889]/20 to-[#FFD600]/20 rounded-2xl p-6 text-center">
              <item.icon className="w-10 h-10 text-[#06D889] mx-auto mb-4" />
              <div className="text-3xl font-bold text-white">{item.value}</div>
              <div className="text-sm text-[#FFD600]">{item.unit}</div>
              <div className="text-sm text-gray-400 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// For Companies Section
function ForCompaniesSection() {
  const benefits = [
    {
      title: 'Abonamente Flotă',
      description: 'Gestionează toate vehiculele companiei dintr-un singur cont.',
      icon: Car
    },
    {
      title: 'Facturare Automată',
      description: 'Facturi lunare consolidate pentru toate parcările.',
      icon: CreditCard
    },
    {
      title: 'Locuri Rezervate',
      description: 'Locuri dedicate pentru angajații și vizitatorii companiei.',
      icon: MapPin
    },
    {
      title: 'Rapoarte Detaliate',
      description: 'Acces la statistici complete de utilizare și costuri.',
      icon: BarChart3
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="section-label">
              <Users className="w-4 h-4" />
              Pentru Companii
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-[#273D2B]">
              Soluții Complete pentru Afacerea Ta
            </h2>
            
            <p className="text-gray-600 leading-relaxed">
              Oferă angajaților tăi un beneficiu unic: parcare sigură, la umbră, 
              cu încărcare EV și contribuție la sustenabilitate.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="p-4 bg-[#E8F5E9] rounded-xl hover:bg-[#06D889]/10 transition-colors">
                  <benefit.icon className="w-6 h-6 text-[#06D889] mb-2" />
                  <h4 className="font-bold text-[#273D2B] mb-1">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>

            <Button className="btn-primary mt-6">
              Solicită Ofertă B2B
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img 
                src="/parking-solar.jpg" 
                alt="Corporate Parking" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 glass-card p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FFD600] rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Reducere Costuri</div>
                  <div className="font-bold text-[#273D2B]">până la 70%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Maria Ionescu',
      role: 'Manager Resurse Umane',
      company: 'TechCorp Moldova',
      content: 'SolarPark a transformat parcarea angajaților noștri într-un activ energetic. Economisim mii de lei lunar și angajații sunt încântați.',
      avatar: '/avatar-1.jpg',
      rating: 5
    },
    {
      name: 'Andrei Popescu',
      role: 'Dezvoltator Imobiliar',
      company: 'GreenBuild',
      content: 'Instalarea a fost impecabilă, iar dashboard-ul de monitorizare este incredibil de intuitiv. Recomand cu încredere!',
      avatar: '/avatar-2.jpg',
      rating: 5
    },
    {
      name: 'Elena Dumitrescu',
      role: 'Director Sustenabilitate',
      company: 'EcoRetail',
      content: 'Amprenta noastră de carbon a scăzut cu 40% în primul an. O investiție care merită fiecare leu.',
      avatar: '/avatar-3.jpg',
      rating: 5
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-[#E8F5E9] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="section-label justify-center mb-4">
            <Star className="w-4 h-4" />
            Testimoniale
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#273D2B]">
            Ce Spun Clienții Noștri
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-card p-6 hover:shadow-xl transition-shadow">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFD600] text-[#FFD600]" />
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-[#273D2B]">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                  <div className="text-sm text-[#06D889]">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    window.alert(`Mulțumim, ${contactForm.firstName}! Mesajul tău a fost trimis.`)
    setContactForm({ firstName: '', lastName: '', email: '', phone: '', message: '' })
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <div className="section-label mb-4">
                <Mail className="w-4 h-4" />
                Contact
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#273D2B]">
                Hai să Vorbim
              </h2>
              <p className="text-gray-600 mt-4">
                Ai întrebări? Suntem aici să te ajutăm. Contactează-ne și îți răspundem în 24h.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-[#E8F5E9] rounded-xl">
                <div className="w-12 h-12 bg-[#06D889] rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-[#273D2B]">Adresă</div>
                  <div className="text-gray-600">Str. Stefan cel Mare 45, Cahul</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-[#E8F5E9] rounded-xl">
                <div className="w-12 h-12 bg-[#06D889] rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-[#273D2B]">Telefon</div>
                  <div className="text-gray-600">+373 299 12 345</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-[#E8F5E9] rounded-xl">
                <div className="w-12 h-12 bg-[#06D889] rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-[#273D2B]">Email</div>
                  <div className="text-gray-600">info@solarpark.md</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-8">
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prenume</Label>
                  <Input
                    id="firstName"
                    value={contactForm.firstName}
                    onChange={(event) => setContactForm({ ...contactForm, firstName: event.target.value })}
                    placeholder="Ion"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nume</Label>
                  <Input
                    id="lastName"
                    value={contactForm.lastName}
                    onChange={(event) => setContactForm({ ...contactForm, lastName: event.target.value })}
                    placeholder="Popescu"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactForm.email}
                  onChange={(event) => setContactForm({ ...contactForm, email: event.target.value })}
                  placeholder="ion@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  value={contactForm.phone}
                  onChange={(event) => setContactForm({ ...contactForm, phone: event.target.value })}
                  placeholder="+373 69 123 456"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mesaj</Label>
                <textarea
                  id="message"
                  rows={4}
                  value={contactForm.message}
                  onChange={(event) => setContactForm({ ...contactForm, message: event.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#06D889] focus:ring-2 focus:ring-[#06D889]/20 outline-none transition-all resize-none"
                  placeholder="Cum te putem ajuta?"
                />
              </div>

              <Button type="submit" className="w-full btn-primary py-6">
                Trimite Mesaj
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  const quickLinks = [
    { name: 'Acasă', href: '#home' },
    { name: 'Despre Noi', href: '#about' },
    { name: 'Servicii', href: '#how-it-works' },
    { name: 'Prețuri', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ]

  const services = [
    'Parcare Solară',
    'Încărcare EV',
    'Abonamente',
    'Soluții B2B',
  ]

  return (
    <footer className="bg-[#273D2B] text-white">
      {/* Gradient Border */}
      <div className="h-1 bg-gradient-to-r from-[#06D889] via-[#FFD600] to-[#06D889] animate-gradient-flow" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#06D889] to-[#FFD600] rounded-xl flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl">
                Solar<span className="text-[#06D889]">Park</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Alimentăm un viitor sustenabil, un loc de parcare pe rând.
            </p>
            <div className="flex gap-3">
              {[Wifi, Camera, Mail].map((Icon, i) => (
                <a 
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#06D889] transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Linkuri Rapide</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-[#06D889] transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Servicii</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <a 
                    href="#"
                    className="text-gray-400 hover:text-[#06D889] transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Abonează-te pentru noutăți și oferte speciale.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
              />
              <Button className="bg-[#06D889] hover:bg-[#05b876] px-4">
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 SolarPark. Toate drepturile rezervate.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[#06D889] transition-colors">Politica de Confidențialitate</a>
            <a href="#" className="hover:text-[#06D889] transition-colors">Termeni și Condiții</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <HowItWorksSection />
        <ReservationSection />
        <PricingSection />
        <GreenEnergySection />
        <ForCompaniesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
