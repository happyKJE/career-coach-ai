import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TechStackChart } from "@/components/charts/tech-stack-chart";
import { Star, Code, Briefcase, Target, Download, CheckCircle, AlertCircle, Lightbulb, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { AnalysisResult } from "@/lib/types";

export default function ResultsPage() {
    const { id } = useParams();
    const resumeId = parseInt(id || "0");

    const { data, isLoading } = useQuery<{
        analysis: AnalysisResult;
    }>({
        queryKey: [`/api/resumes/${resumeId}/analysis`],
        enabled: !!resumeId,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-xl">분석 결과를 불러오는 중...</div>
            </div>
        );
    }

    if (!data?.analysis) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Card className="w-full max-w-md mx-4">
                    <CardContent className="pt-6 text-center">
                        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <h1 className="text-xl font-bold mb-2">분석 결과를 찾을 수 없습니다</h1>
                        <p className="text-slate-600 mb-4">이력서 분석이 완료되지 않았습니다.</p>
                        <Link href="/upload">
                            <Button>새로운 이력서 업로드</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const analysisResult = data.analysis as AnalysisResult;

    const getCompetitionIcon = (text: string) => {
        if (text.includes('상위')) {
            return <TrendingUp className="text-emerald-600" />;
        } else if (text.includes('하위')) {
            return <TrendingDown className="text-red-600" />;
        }
        return <Minus className="text-amber-600" />;
    };

    const getCompetitionColor = (text: string) => {
        if (text.includes('상위')) {
            return 'from-emerald-50 to-emerald-100 border-emerald-200';
        } else if (text.includes('하위')) {
            return 'from-red-50 to-red-100 border-red-200';
        }
        return 'from-amber-50 to-amber-100 border-amber-200';
    };

    const getSuggestionIcon = (type: string) => {
        switch (type) {
            case 'strength':
                return <CheckCircle className="text-emerald-600" />;
            case 'improvement':
                return <AlertCircle className="text-amber-600" />;
            case 'suggestion':
                return <Lightbulb className="text-blue-600" />;
            default:
                return <Lightbulb className="text-blue-600" />;
        }
    };

    const getSuggestionColor = (type: string) => {
        switch (type) {
            case 'strength':
                return 'bg-emerald-100 text-emerald-800';
            case 'improvement':
                return 'bg-amber-100 text-amber-800';
            case 'suggestion':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-700';
            case 'medium':
                return 'bg-amber-100 text-amber-700';
            case 'low':
                return 'bg-emerald-100 text-emerald-700';
            default:
                return 'bg-blue-100 text-blue-700';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">분석 결과 대시보드</h2>
                    <p className="text-lg text-slate-600">AI가 분석한 이력서 결과를 확인해보세요</p>
                </div>

                {/* Summary Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-600">종합 점수</p>
                                    <p className="text-2xl font-bold text-slate-900">{analysisResult.overallScore}</p>
                                </div>
                                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <Star className="h-6 w-6 text-emerald-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-600">기술 매치율</p>
                                    <p className="text-2xl font-bold text-slate-900">{analysisResult.techMatch}%</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Code className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-600">경력 연차</p>
                                    <p className="text-2xl font-bold text-slate-900">{analysisResult.experience}</p>
                                </div>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Briefcase className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-600">추천 직무</p>
                                    <p className="text-2xl font-bold text-slate-900">{analysisResult.recommendedPositions?.length || 0}개</p>
                                </div>
                                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                                    <Target className="h-6 w-6 text-amber-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Tech Stack Analysis */}
                    <Card>
                        <CardHeader>
                            <CardTitle>기술 스택 분석</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {analysisResult.techStackAnalysis && analysisResult.techStackAnalysis.length > 0 ? (
                                <TechStackChart data={analysisResult.techStackAnalysis} />
                            ) : (
                                <div className="space-y-4">
                                    {analysisResult.techStackAnalysis?.map((tech, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-medium">{tech.skill}</span>
                                                <span className="text-sm text-slate-600">{tech.percentage}%</span>
                                            </div>
                                            <Progress value={tech.percentage} className="h-2" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Competition Analysis */}
                    <Card>
                        <CardHeader>
                            <CardTitle>경쟁력 분석</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className={`bg-gradient-to-r p-4 rounded-lg border ${getCompetitionColor(analysisResult.competitiveAnalysis?.techSkills || '')}`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium">기술 역량</p>
                                            <p className="text-2xl font-bold">{analysisResult.competitiveAnalysis?.techSkills || '분석 중'}</p>
                                        </div>
                                        {getCompetitionIcon(analysisResult.competitiveAnalysis?.techSkills || '')}
                                    </div>
                                </div>

                                <div className={`bg-gradient-to-r p-4 rounded-lg border ${getCompetitionColor(analysisResult.competitiveAnalysis?.careerCompetitiveness || '')}`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium">경력 경쟁력</p>
                                            <p className="text-2xl font-bold">{analysisResult.competitiveAnalysis?.careerCompetitiveness || '분석 중'}</p>
                                        </div>
                                        {getCompetitionIcon(analysisResult.competitiveAnalysis?.careerCompetitiveness || '')}
                                    </div>
                                </div>

                                <div className={`bg-gradient-to-r p-4 rounded-lg border ${getCompetitionColor(analysisResult.competitiveAnalysis?.projectQuality || '')}`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium">프로젝트 품질</p>
                                            <p className="text-2xl font-bold">{analysisResult.competitiveAnalysis?.projectQuality || '분석 중'}</p>
                                        </div>
                                        {getCompetitionIcon(analysisResult.competitiveAnalysis?.projectQuality || '')}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recommended Positions */}
                {analysisResult.recommendedPositions && analysisResult.recommendedPositions.length > 0 && (
                    <Card className="mb-12">
                        <CardHeader>
                            <CardTitle>추천 포지션</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {analysisResult.recommendedPositions.map((position, index) => (
                                    <div key={index} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-semibold text-slate-900">{position.title}</h4>
                                            <Badge className={`${position.matchPercentage >= 90 ? 'bg-emerald-100 text-emerald-700' : position.matchPercentage >= 80 ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {position.matchPercentage}% 매치
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-3">{position.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-500">연봉: {position.salaryRange}</span>
                                            <Button variant="link" size="sm" className="p-0 h-auto">
                                                자세히 보기
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Resume Improvement Suggestions */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    <Card>
                        <CardHeader>
                            <CardTitle>이력서 첨삭 제안</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {analysisResult.improvementSuggestions?.map((suggestion, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            {getSuggestionIcon(suggestion.type)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-medium text-slate-900">{suggestion.title}</p>
                                                <Badge variant="outline" className={getSuggestionColor(suggestion.type)}>
                                                    {suggestion.type === 'strength' ? '강점' :
                                                        suggestion.type === 'improvement' ? '개선' : '제안'}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-slate-600">{suggestion.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>스펙 강화 추천</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {analysisResult.skillRecommendations?.map((skill, index) => (
                                    <div key={index} className="border border-slate-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-medium text-slate-900">{skill.skill}</h4>
                                            <Badge variant="outline" className={getPriorityColor(skill.priority)}>
                                                {skill.priority === 'high' ? '우선순위 높음' :
                                                    skill.priority === 'medium' ? '추천' : '장기 계획'}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-slate-600">{skill.description}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Download Section */}
                <Card className="bg-gradient-to-r from-primary to-primary/90 text-white">
                    <CardContent className="p-8 text-center">
                        <h3 className="text-2xl font-bold mb-4">AI 첨삭 이력서 받기</h3>
                        <p className="text-primary-100 mb-6">분석 결과를 바탕으로 개선된 이력서를 다운로드하세요</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="secondary" size="lg">
                                <Download className="mr-2 h-5 w-5" />
                                GPT 첨삭 이력서 다운로드
                            </Button>
                            <Link href={`/features/${resumeId}`}>
                                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
                                    부가 기능 이용하기
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
