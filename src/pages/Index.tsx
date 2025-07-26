import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-railway.jpg";
import { 
  Train, 
  Users, 
  Shield, 
  Clock, 
  Star, 
  Smartphone,
  MapPin,
  CreditCard,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Smartphone,
      title: "Easy Booking",
      description: "Book a coolie with just your PNR number and mobile"
    },
    {
      icon: MapPin,
      title: "Live Tracking", 
      description: "Track your assigned coolie in real-time"
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Pay safely with cash or UPI options"
    },
    {
      icon: Shield,
      title: "Verified Coolies",
      description: "All coolies are verified and rated by passengers"
    },
    {
      icon: Clock,
      title: "Quick Service",
      description: "Get help within minutes of booking"
    },
    {
      icon: Star,
      title: "Quality Assured",
      description: "Rate and review your experience"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Enter PNR",
      description: "Simply enter your PNR number to get train details"
    },
    {
      step: "02", 
      title: "Choose Service",
      description: "Select luggage count and pickup/drop points"
    },
    {
      step: "03",
      title: "Get Matched",
      description: "We'll assign the nearest verified coolie"
    },
    {
      step: "04",
      title: "Track & Pay",
      description: "Track your coolie and pay after service"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-railway-orange/10" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-railway-orange/10 text-railway-orange border-railway-orange/20">
                  <Train className="h-3 w-3 mr-1" />
                  Indian Railways Official Partner
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Your{" "}
                  <span className="bg-gradient-hero bg-clip-text text-transparent">
                    Trusted
                  </span>{" "}
                  Railway Porter Service
                </h1>
                
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                  Book verified coolies for your luggage instantly. Safe, reliable, and professional service at every Indian railway station.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="xl" 
                  variant="hero"
                  className="group"
                  onClick={() => navigate("/login")}
                >
                  Book a Coolie Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="xl" 
                  variant="outline"
                  onClick={() => navigate("/login")}
                >
                  Join as Coolie
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  500+ Stations
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  10,000+ Happy Passengers
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  24/7 Available
                </div>
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="relative rounded-2xl overflow-hidden shadow-glow">
                <img 
                  src={heroImage} 
                  alt="Railway coolie helping passenger"
                  className="w-full h-[400px] sm:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              
              {/* Floating stats card */}
              <Card className="absolute -bottom-6 -left-6 bg-white shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">2000+</p>
                      <p className="text-sm text-muted-foreground">Verified Coolies</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Why Choose CoolieConnect?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of railway porter services with our modern, reliable platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Book a coolie in just 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="text-center space-y-4 animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative">
                  <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-primary">
                    {step.step}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-muted -z-10" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to Experience Hassle-Free Travel?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied passengers who trust CoolieConnect for their luggage needs
            </p>
            <Button 
              size="xl" 
              variant="glass"
              className="group"
              onClick={() => navigate("/login")}
            >
              Get Started Today
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
