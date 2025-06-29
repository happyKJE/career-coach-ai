import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { PenTool, Mic, PieChart, AlertCircle } from "lucide-react";
import { InterviewQuestion } from "@/lib/types";

interface InterviewQuestionResponse {
    questions: InterviewQuestion[];
}

export default function FeaturesPage() {
    const { id } = useParams();
    const resumeId = parseInt(id || "0");
    const { toast } = useToast();
    const queryClient = useQueryClient();

    // Cover Letter States
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [style, setStyle] = useState("");

    // Interview Questions States
    const [interviewPosition, setInterviewPosition] = useState("");

    const { data: resumeData } = useQuery({
        queryKey: [`/api/resumes/${resumeId}/analysis`],
        enabled: !!resumeId,
    });

    const { data: coverLetters } = useQuery<string[]>({
        queryKey: [`/api/resumes/${resumeId}/cover-letters`],
        enabled: !!resumeId,
    });

    const { data: interviewQuestions } = useQuery<InterviewQuestionResponse>({
        queryKey: [`/api/resumes/${resumeId}/interview-questions`],
        enabled: !!resumeId,
    });

    const coverLetterMutation = useMutation({
        mutationFn: async () => {
            const response = await apiRequest('POST', `/api/resumes/${resumeId}/cover-letter`, {
                company,
                position,
                style,
            });
            return response.json();
        },
        onSuccess: () => {
            toast({
                title: "자기소개서 생성 완료",
                description: "맞춤형 자기소개서가 생성되었습니다.",
            });
            queryClient.invalidateQueries({ queryKey: [`/api/resumes/${resumeId}/cover-letters`] });
        },
        onError: (error) => {
            toast({
                title: "생성 실패",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const interviewMutation = useMutation({
        mutationFn: async () => {
            const response = await apiRequest('POST', `/api/resumes/${resumeId}/interview-questions`, {
                position: interviewPosition,
            });
            return response.json();
        },
        onSuccess: () => {
            toast({
                title: "면접 질문 생성 완료",
                description: "맞춤형 면접 질문이 생성되었습니다.",
            });
            queryClient.invalidateQueries({ queryKey: [`/api/resumes/${resumeId}/interview-questions`] });
        },
        onError: (error) => {
            toast({
                title: "생성 실패",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    if (resumeId === 0) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Card className="w-full max-w-md mx-4">
                    <CardContent className="pt-6 text-center">
                        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <h1 className="text-xl font-bold mb-2">잘못된 접근입니다</h1>
                        <p className="text-slate-600">이력서 ID를 찾을 수 없습니다.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const getQuestionTypeColor = (type: string) => {
        switch (type) {
            case 'technical':
                return 'bg-blue-100 text-blue-700';
            case 'behavioral':
                return 'bg-green-100 text-green-700';
            case 'experience':
                return 'bg-purple-100 text-purple-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getQuestionTypeLabel = (type: string) => {
        switch (type) {
            case 'technical':
                return '기술 질문';
            case 'behavioral':
                return '행동 질문';
            case 'experience':
                return '경험 질문';
            default:
                return '기타';
        }
    };

    return (
        <div className="min-h-screen bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">부가 기능</h2>
                    <p className="text-lg text-slate-600">취업 성공을 위한 추가 도구들을 활용해보세요</p>
                </div>

                {/* Feature Cards */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    <Card className="bg-slate-50 border-slate-200">
                        <CardContent className="p-8 text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                                <PenTool className="h-6 w-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">자기소개서 생성기</h3>
                            <p className="text-slate-600 mb-6">AI가 이력서 정보를 바탕으로 맞춤형 자기소개서를 생성해드립니다.</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-50 border-slate-200">
                        <CardContent className="p-8 text-center">
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                                <Mic className="h-6 w-6 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">면접 예상 질문</h3>
                            <p className="text-slate-600 mb-6">직무별 면접 예상 질문과 AI의 답변 가이드를 제공합니다.</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-50 border-slate-200">
                        <CardContent className="p-8 text-center">
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                                <PieChart className="h-6 w-6 text-amber-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-4">합격률 시뮬레이터</h3>
                            <p className="text-slate-600 mb-6">현재 이력서로 지원 시 예상 합격률을 시뮬레이션합니다.</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Feature Tabs */}
                <Tabs defaultValue="cover-letter" className="space-y-8">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="cover-letter">자기소개서 생성</TabsTrigger>
                        <TabsTrigger value="interview">면접 질문</TabsTrigger>
                        <TabsTrigger value="simulator">합격률 시뮬레이터</TabsTrigger>
                    </TabsList>

                    {/* Cover Letter Tab */}
                    <TabsContent value="cover-letter">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <PenTool className="h-5 w-5 mr-2 text-purple-600" />
                                    AI 자기소개서 생성
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid lg:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-medium mb-3">생성 옵션</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="company">지원 회사</Label>
                                                <Input
                                                    id="company"
                                                    placeholder="회사명을 입력하세요"
                                                    value={company}
                                                    onChange={(e) => setCompany(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="position">지원 직무</Label>
                                                <Input
                                                    id="position"
                                                    placeholder="지원하는 직무를 입력하세요"
                                                    value={position}
                                                    onChange={(e) => setPosition(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="style">작성 스타일</Label>
                                                <Select value={style} onValueChange={setStyle}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="스타일을 선택하세요" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="professional">전문적이고 간결한 스타일</SelectItem>
                                                        <SelectItem value="creative">창의적이고 열정적인 스타일</SelectItem>
                                                        <SelectItem value="practical">경험 중심의 실무적 스타일</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <Button
                                                onClick={() => coverLetterMutation.mutate()}
                                                disabled={!company || !position || !style || coverLetterMutation.isPending}
                                                className="w-full"
                                            >
                                                {coverLetterMutation.isPending ? "생성 중..." : "자기소개서 생성"}
                                            </Button>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-3">생성된 자기소개서</h4>
                                        <div className="bg-slate-50 rounded-lg p-4 h-96 overflow-y-auto">
                                            {coverLetters && 0 < coverLetters.length ? (
                                                <div className="space-y-4">
                                                    {coverLetters.map((letter: any, index: number) => (
                                                        <div key={index} className="bg-white p-4 rounded border">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <div>
                                                                    <div className="font-medium">{letter.company} - {letter.position}</div>
                                                                    <div className="text-sm text-slate-500">{letter.style}</div>
                                                                </div>
                                                                <Button size="sm" variant="outline">
                                                                    다운로드
                                                                </Button>
                                                            </div>
                                                            <div className="text-sm text-slate-700 whitespace-pre-wrap">
                                                                {letter.content.substring(0, 200)}...
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-slate-500 text-center py-8">
                                                    생성된 자기소개서가 없습니다.<br/>
                                                    위 옵션을 입력하고 생성해보세요.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Interview Questions Tab */}
                    <TabsContent value="interview">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Mic className="h-5 w-5 mr-2 text-emerald-600" />
                                    면접 예상 질문 & 답변 가이드
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-6">
                                    <div className="flex gap-4 items-end">
                                        <div className="flex-1">
                                            <Label htmlFor="interview-position">직무</Label>
                                            <Input
                                                id="interview-position"
                                                placeholder="면접 직무를 입력하세요"
                                                value={interviewPosition}
                                                onChange={(e) => setInterviewPosition(e.target.value)}
                                            />
                                        </div>
                                        <Button
                                            onClick={() => interviewMutation.mutate()}
                                            disabled={!interviewPosition || interviewMutation.isPending}
                                        >
                                            {interviewMutation.isPending ? "생성 중..." : "질문 생성"}
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {interviewQuestions?.questions ? (
                                        (interviewQuestions.questions as InterviewQuestion[]).map((question, index) => (
                                            <Card key={index} className="border-slate-200">
                                                <CardContent className="p-6">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <h4 className="font-medium text-slate-900 flex-1">{question.question}</h4>
                                                        <Badge className={getQuestionTypeColor(question.type)}>
                                                            {getQuestionTypeLabel(question.type)}
                                                        </Badge>
                                                    </div>
                                                    <div className="bg-slate-50 rounded-lg p-4">
                                                        <p className="text-sm font-medium text-slate-700 mb-2">AI 추천 답변 포인트:</p>
                                                        <ul className="text-sm text-slate-600 space-y-1">
                                                            {question.answerPoints.map((point, pointIndex) => (
                                                                <li key={pointIndex}>• {point}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-slate-500">
                                                면접 질문이 생성되지 않았습니다.<br/>
                                                직무를 입력하고 질문을 생성해보세요.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Success Rate Simulator Tab */}
                    <TabsContent value="simulator">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <PieChart className="h-5 w-5 mr-2 text-amber-600" />
                                    합격률 시뮬레이터
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-12">
                                    <PieChart className="h-16 w-16 text-amber-600 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">합격률 시뮬레이터</h3>
                                    <p className="text-slate-600 mb-6">
                                        현재 이력서로 지원 시 예상 합격률을 분석합니다.<br/>
                                        이 기능은 곧 제공될 예정입니다.
                                    </p>
                                    <Button disabled>
                                        시뮬레이션 시작 (준비 중)
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
