export interface ParsedResumeData {
    name: string;
    email: string;
    phone: string;
    skills: string[];
    experience: string;
    education: string[];
    projects: Array<{
        name: string;
        description: string;
        technologies: string[];
    }>;
}

export interface RecommendedPosition {
    title: string;
    matchPercentage: number;
    description: string;
    salaryRange: string;
}

export interface ImprovementSuggestion {
    type: 'strength' | 'improvement' | 'suggestion';
    title: string;
    description: string;
}

export interface SkillRecommendation {
    skill: string;
    priority: 'high' | 'medium' | 'low';
    description: string;
}

export interface CompetitiveAnalysis {
    techSkills: string;
    careerCompetitiveness: string;
    projectQuality: string;
}

export interface TechStackItem {
    skill: string;
    percentage: number;
}

export interface AnalysisResult {
    overallScore: number;
    techMatch: number;
    experience: string;
    recommendedPositions: RecommendedPosition[];
    improvementSuggestions: ImprovementSuggestion[];
    skillRecommendations: SkillRecommendation[];
    competitiveAnalysis: CompetitiveAnalysis;
    techStackAnalysis: TechStackItem[];
}

export interface InterviewQuestion {
    question: string;
    type: string;
    answerPoints: string[];
}
