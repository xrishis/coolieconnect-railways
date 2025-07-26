import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle, 
  X, 
  Navigation,
  Wallet,
  Star,
  BarChart3,
  Luggage,
  Timer
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CoolieDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [activeJob, setActiveJob] = useState<any>(null);
  const { toast } = useToast();

  const pendingRequests = [
    {
      id: 1,
      passengerName: "Priya Sharma",
      pnr: "1234567890",
      trainName: "Rajdhani Express",
      platform: "Platform 2",
      luggageCount: 3,
      pickupPoint: "Main Station Gate",
      dropPoint: "Coach A1",
      estimatedPay: 150,
      distance: "500m",
      timePosted: "2 mins ago"
    },
    {
      id: 2,
      passengerName: "Amit Kumar",
      pnr: "0987654321", 
      trainName: "Shatabdi Express",
      platform: "Platform 7",
      luggageCount: 2,
      pickupPoint: "Platform 7",
      dropPoint: "Exit Gate",
      estimatedPay: 100,
      distance: "300m",
      timePosted: "5 mins ago"
    }
  ];

  const todayStats = {
    jobsCompleted: 8,
    totalEarnings: 1200,
    rating: 4.8,
    hoursWorked: 6.5
  };

  const handleAcceptJob = (job: any) => {
    setActiveJob(job);
    toast({
      title: "Job Accepted",
      description: `You accepted ${job.passengerName}'s request`,
    });
  };

  const handleRejectJob = (jobId: number) => {
    toast({
      title: "Job Declined",
      description: "The request has been declined",
      variant: "destructive"
    });
  };

  const handleCompleteJob = () => {
    setActiveJob(null);
    toast({
      title: "Job Completed",
      description: "Payment will be processed shortly",
    });
  };

  const renderJobRequests = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Job Requests</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Available</span>
          <Switch 
            checked={isOnline} 
            onCheckedChange={setIsOnline}
          />
        </div>
      </div>

      {!isOnline && (
        <Card className="border-muted bg-muted/30">
          <CardContent className="p-4 text-center">
            <p className="text-muted-foreground">
              You're offline. Turn on availability to receive job requests.
            </p>
          </CardContent>
        </Card>
      )}

      {isOnline && pendingRequests.map((request) => (
        <Card key={request.id} className="shadow-card hover:shadow-glow transition-all duration-300">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">{request.passengerName}</span>
                    <Badge variant="secondary" className="text-xs">
                      PNR: {request.pnr.slice(-4)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{request.trainName}</p>
                </div>
                <Badge variant="outline" className="text-primary font-semibold">
                  ₹{request.estimatedPay}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{request.platform}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Luggage className="h-4 w-4 text-muted-foreground" />
                    <span>{request.luggageCount} items</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-muted-foreground" />
                    <span>{request.distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <span>{request.timePosted}</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Route:</span>
                  <span className="font-medium">
                    {request.pickupPoint} → {request.dropPoint}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleRejectJob(request.id)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Decline
                </Button>
                <Button 
                  variant="hero" 
                  className="flex-1"
                  onClick={() => handleAcceptJob(request)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {isOnline && pendingRequests.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <div className="space-y-2">
              <p className="text-muted-foreground">No job requests at the moment</p>
              <p className="text-sm text-muted-foreground">
                Stay online and you'll be notified when new requests arrive
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderActiveJob = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Active Job</h2>
      
      <Card className="shadow-card border-primary/20">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">{activeJob.passengerName}</span>
              </div>
              <Badge className="bg-primary">
                Active Job
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{activeJob.trainName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Luggage className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{activeJob.luggageCount} luggage items</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{activeJob.distance} distance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold">₹{activeJob.estimatedPay}</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Route Details</h4>
              <div className="flex items-center justify-between text-sm">
                <span>{activeJob.pickupPoint}</span>
                <span className="text-muted-foreground">→</span>
                <span>{activeJob.dropPoint}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Call Passenger
              </Button>
              <Button variant="hero" className="flex-1" onClick={handleCompleteJob}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Job
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStats = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Today's Summary</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-gradient-primary rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-foreground">{todayStats.jobsCompleted}</p>
            <p className="text-xs text-muted-foreground">Jobs Completed</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-railway-orange rounded-full flex items-center justify-center">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-foreground">₹{todayStats.totalEarnings}</p>
            <p className="text-xs text-muted-foreground">Total Earnings</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-railway-blue rounded-full flex items-center justify-center">
              <Star className="h-6 w-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-foreground">{todayStats.rating}</p>
            <p className="text-xs text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-gradient-primary rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-foreground">{todayStats.hoursWorked}h</p>
            <p className="text-xs text-muted-foreground">Hours Worked</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-railway-light via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Coolie Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your jobs and track your earnings
          </p>
        </div>

        <div className="space-y-8">
          {renderStats()}
          
          <Separator />
          
          {activeJob ? renderActiveJob() : renderJobRequests()}
        </div>
      </div>
    </div>
  );
};