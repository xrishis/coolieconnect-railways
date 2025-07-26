import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { 
  Train, 
  MapPin, 
  Clock, 
  User, 
  Luggage, 
  Navigation,
  QrCode,
  CreditCard,
  Phone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PassengerDashboard() {
  const [pnrNumber, setPnrNumber] = useState("");
  const [trainInfo, setTrainInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStep, setBookingStep] = useState<"pnr" | "details" | "confirmation">("pnr");
  const [luggageCount, setLuggageCount] = useState(1);
  const [pickupPoint, setPickupPoint] = useState("");
  const [dropPoint, setDropPoint] = useState("");
  const { toast } = useToast();

  const handlePNRSubmit = async () => {
    if (!pnrNumber || pnrNumber.length !== 10) {
      toast({
        title: "Invalid PNR",
        description: "Please enter a valid 10-digit PNR number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to fetch train details
    setTimeout(() => {
      setTrainInfo({
        trainNumber: "12345",
        trainName: "Mumbai Express",
        from: "New Delhi",
        to: "Mumbai Central", 
        arrivalTime: "14:30",
        platform: "Platform 4",
        coach: "S4",
        seat: "45, 46"
      });
      setIsLoading(false);
      setBookingStep("details");
    }, 2000);
  };

  const handleBookCoolie = () => {
    if (!pickupPoint || !dropPoint) {
      toast({
        title: "Missing Information",
        description: "Please select pickup and drop points",
        variant: "destructive"
      });
      return;
    }

    setBookingStep("confirmation");
    toast({
      title: "Coolie Booked Successfully!",
      description: "Your coolie will arrive at the pickup point shortly",
    });
  };

  const renderPNRStep = () => (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Train className="h-5 w-5 text-primary" />
            Enter Your PNR Number
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pnr">PNR Number</Label>
            <div className="flex gap-2">
              <Input
                id="pnr"
                placeholder="Enter 10-digit PNR"
                value={pnrNumber}
                onChange={(e) => setPnrNumber(e.target.value)}
                maxLength={10}
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <QrCode className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button 
            onClick={handlePNRSubmit} 
            className="w-full" 
            variant="hero"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner size="sm" text="Fetching train details..." />
            ) : (
              "Get Train Details"
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-muted/30 border-dashed">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Don't have your PNR? You can also book by entering train details manually
          </p>
          <Button variant="link" className="mt-2">
            Enter Train Details
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderBookingStep = () => (
    <div className="space-y-6">
      {/* Train Information Card */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Train className="h-5 w-5 text-primary" />
            Train Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{trainInfo.trainNumber}</Badge>
                <span className="font-semibold">{trainInfo.trainName}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {trainInfo.from} → {trainInfo.to}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{trainInfo.arrivalTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{trainInfo.platform}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Details Card */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Luggage className="h-5 w-5 text-primary" />
            Booking Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Number of Luggage Items</Label>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setLuggageCount(Math.max(1, luggageCount - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center font-semibold">{luggageCount}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setLuggageCount(luggageCount + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Estimated Weight</Label>
              <Input placeholder="Optional (kg)" />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickup">Pickup Point</Label>
              <select 
                id="pickup"
                className="w-full p-2 border border-input rounded-md"
                value={pickupPoint}
                onChange={(e) => setPickupPoint(e.target.value)}
              >
                <option value="">Select pickup point</option>
                <option value="main-gate">Main Station Gate</option>
                <option value="platform">Platform {trainInfo?.platform?.slice(-1)}</option>
                <option value="parking">Parking Area</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="drop">Drop Point</Label>
              <select 
                id="drop"
                className="w-full p-2 border border-input rounded-md"
                value={dropPoint}
                onChange={(e) => setDropPoint(e.target.value)}
              >
                <option value="">Select drop point</option>
                <option value="coach">Coach {trainInfo?.coach}</option>
                <option value="exit-gate">Exit Gate</option>
                <option value="taxi-stand">Taxi Stand</option>
              </select>
            </div>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Estimated Cost:</span>
              <span className="text-lg font-bold text-primary">₹{luggageCount * 50}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Final cost may vary based on distance and actual service
            </p>
          </div>

          <Button 
            onClick={handleBookCoolie} 
            className="w-full" 
            variant="hero"
          >
            Book Coolie Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="space-y-6">
      <Card className="shadow-card border-primary/20">
        <CardContent className="p-6 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Coolie Assigned!</h3>
            <p className="text-muted-foreground">
              Ramesh Kumar is on his way to your pickup point
            </p>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span>Coolie Name:</span>
              <span className="font-semibold">Ramesh Kumar</span>
            </div>
            <div className="flex justify-between">
              <span>Rating:</span>
              <span className="font-semibold">4.8 ⭐</span>
            </div>
            <div className="flex justify-between">
              <span>Experience:</span>
              <span className="font-semibold">5 years</span>
            </div>
            <div className="flex justify-between">
              <span>Contact:</span>
              <span className="font-semibold">+91 98765 43210</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Call Coolie
            </Button>
            <Button variant="outline" className="flex-1">
              <Navigation className="h-4 w-4 mr-2" />
              Track Live
            </Button>
          </div>

          <Button variant="hero" className="w-full">
            <CreditCard className="h-4 w-4 mr-2" />
            Pay ₹{luggageCount * 50}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-railway-light via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Passenger Dashboard
          </h1>
          <p className="text-muted-foreground">
            Book a coolie for your luggage assistance
          </p>
        </div>

        {bookingStep === "pnr" && renderPNRStep()}
        {bookingStep === "details" && renderBookingStep()}
        {bookingStep === "confirmation" && renderConfirmationStep()}
      </div>
    </div>
  );
};