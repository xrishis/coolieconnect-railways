import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthCard } from "@/components/AuthCard";
import { UserTypeSelector } from "@/components/UserTypeSelector";
import { OTPInput } from "@/components/OTPInput";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ArrowLeft, Phone, Ticket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type LoginStep = "select-type" | "enter-details" | "verify-otp";

export default function Login() {
  const [step, setStep] = useState<LoginStep>("select-type");
  const [userType, setUserType] = useState<"passenger" | "coolie" | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pnrNumber, setPnrNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUserTypeSelect = (type: "passenger" | "coolie") => {
    setUserType(type);
    setStep("enter-details");
  };

  const handleSendOTP = async () => {
    if (!phoneNumber || (userType === "passenger" && !pnrNumber)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("verify-otp");
      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${phoneNumber}`,
      });
    }, 2000);
  };

  const handleOTPComplete = (otp: string) => {
    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userType}!`,
      });
      
      // Navigate to appropriate dashboard
      if (userType === "passenger") {
        navigate("/passenger-dashboard");
      } else {
        navigate("/coolie-dashboard");
      }
    }, 1500);
  };

  const handleBack = () => {
    if (step === "verify-otp") {
      setStep("enter-details");
    } else if (step === "enter-details") {
      setStep("select-type");
      setUserType(null);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case "select-type":
        return (
          <AuthCard
            title="Welcome Back"
            description="Choose your account type to continue"
          >
            <UserTypeSelector
              selectedType={userType}
              onSelect={handleUserTypeSelect}
            />
          </AuthCard>
        );

      case "enter-details":
        return (
          <AuthCard
            title={`${userType === "passenger" ? "Passenger" : "Coolie"} Login`}
            description="Enter your details to receive OTP"
          >
            <div className="space-y-4">
              {userType === "passenger" && (
                <div className="space-y-2">
                  <Label htmlFor="pnr">PNR Number</Label>
                  <div className="relative">
                    <Ticket className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="pnr"
                      placeholder="Enter your PNR number"
                      value={pnrNumber}
                      onChange={(e) => setPnrNumber(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button 
                onClick={handleSendOTP} 
                className="w-full" 
                variant="hero"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" text="Sending OTP..." />
                ) : (
                  "Send OTP"
                )}
              </Button>
            </div>
          </AuthCard>
        );

      case "verify-otp":
        return (
          <AuthCard
            title="Verify OTP"
            description={`Enter the 6-digit code sent to ${phoneNumber}`}
          >
            <div className="space-y-6">
              <OTPInput
                length={6}
                onComplete={handleOTPComplete}
                disabled={isLoading}
              />
              
              {isLoading && (
                <LoadingSpinner text="Verifying OTP..." />
              )}
              
              <div className="text-center">
                <Button variant="link" className="text-sm">
                  Didn't receive code? Resend
                </Button>
              </div>
            </div>
          </AuthCard>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-railway-light via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        {step !== "select-type" && (
          <Button
            variant="ghost"
            onClick={handleBack}
            className="absolute -top-12 left-0 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
        
        {renderStepContent()}
      </div>
    </div>
  );
};