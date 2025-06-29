import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/home";
import UploadPage from "@/pages/upload";
import ResultsPage from "@/pages/results";
import FeaturesPage from "@/pages/features";
import NotFound from "@/pages/not-found";

function Router() {
  return (
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/upload" component={UploadPage} />
        <Route path="/results/:id" component={ResultsPage} />
        <Route path="/features/:id?" component={FeaturesPage} />
        <Route component={NotFound} />
      </Switch>
  );
}

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
  );
}

export default App;
