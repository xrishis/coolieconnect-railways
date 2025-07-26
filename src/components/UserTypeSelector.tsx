import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserTypeSelectorProps {
  selectedType: "passenger" | "coolie" | null;
  onSelect: (type: "passenger" | "coolie") => void;
  className?: string;
}

export const UserTypeSelector = ({ selectedType, onSelect, className }: UserTypeSelectorProps) => {
  const userTypes = [
    {
      type: "passenger" as const,
      title: "Passenger",
      description: "Book a coolie for your luggage",
      icon: Users,
      color: "bg-primary",
    },
    {
      type: "coolie" as const,
      title: "Coolie",
      description: "Earn by helping passengers",
      icon: UserCheck,
      color: "bg-railway-orange",
    },
  ];

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4", className)}>
      {userTypes.map((userType) => {
        const Icon = userType.icon;
        const isSelected = selectedType === userType.type;

        return (
          <Card
            key={userType.type}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-glow",
              isSelected ? "ring-2 ring-primary shadow-primary" : "shadow-card"
            )}
            onClick={() => onSelect(userType.type)}
          >
            <CardContent className="p-6 text-center space-y-4">
              <div className={cn(
                "w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white shadow-card",
                userType.color
              )}>
                <Icon className="h-8 w-8" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {userType.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {userType.description}
                </p>
              </div>

              <Button
                variant={isSelected ? "default" : "outline"}
                className="w-full"
              >
                Select {userType.title}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};