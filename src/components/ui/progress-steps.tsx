import { cn } from "@/lib/utils";

interface Step {
    number: number;
    title: string;
    completed: boolean;
    active: boolean;
}

interface ProgressStepsProps {
    steps: Step[];
    className?: string;
}

export function ProgressSteps({ steps, className }: ProgressStepsProps) {
    return (
        <div className={cn("flex items-center justify-center", className)}>
            {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                    <div className="flex items-center">
                        <div
                            className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                                step.completed || step.active
                                    ? "bg-primary text-white"
                                    : "bg-slate-200 text-slate-600"
                            )}
                        >
                            {step.number}
                        </div>
                        <span
                            className={cn(
                                "ml-2 text-sm font-medium",
                                step.completed || step.active
                                    ? "text-primary"
                                    : "text-slate-400"
                            )}
                        >
              {step.title}
            </span>
                    </div>
                    {index < steps.length - 1 && (
                        <div className="w-16 h-1 bg-slate-200 mx-4"></div>
                    )}
                </div>
            ))}
        </div>
    );
}
