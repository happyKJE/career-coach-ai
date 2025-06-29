import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { ProgressSteps } from "@/components/ui/progress-steps";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ParsedResumeData } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";

export default function UploadPage() {
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedPosition, setSelectedPosition] = useState<string>("");
    const [experienceYears, setExperienceYears] = useState<string>("");
    const [expectedSalary, setExpectedSalary] = useState<string>("");
    const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);
    const [resumeId, setResumeId] = useState<number | null>(null);

    const steps = [
        { number: 1, title: "파일 업로드", completed: !!parsedData, active: !parsedData },
        { number: 2, title: "직무 선택", completed: false, active: !!parsedData },
        { number: 3, title: "분석 결과", completed: false, active: false },
    ];

    const uploadMutation = useMutation({
        mutationFn: async () => {
            if (!selectedFile) throw new Error("파일을 선택해주세요");

            const formData = new FormData();
            formData.append('resume', selectedFile);
            formData.append('selectedPosition', selectedPosition);
            formData.append('experienceYears', experienceYears);
            formData.append('expectedSalary', expectedSalary);

            const response = await apiRequest('POST', '/api/resumes/upload', formData);
            return response.json();
        },
        onSuccess: (data) => {
            setParsedData(data.parsedData);
            setResumeId(data.resumeId);
            toast({
                title: "업로드 완료",
                description: "이력서가 성공적으로 분석되었습니다.",
            });
        },
        onError: (error) => {
            toast({
                title: "업로드 실패",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const analyzeMutation = useMutation({
        mutationFn: async () => {
            if (!resumeId) throw new Error("Resume ID not found");

            const response = await apiRequest('POST', `/api/resumes/${resumeId}/analyze`);
            return response.json();
        },
        onSuccess: () => {
            toast({
                title: "분석 완료",
                description: "이력서 분석이 완료되었습니다.",
            });
            setLocation(`/results/${resumeId}`);
        },
        onError: (error) => {
            toast({
                title: "분석 실패",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
        setParsedData(null);
        setResumeId(null);
    };

    const handleFileRemove = () => {
        setSelectedFile(null);
        setParsedData(null);
        setResumeId(null);
    };

    const handleUpload = () => {
        uploadMutation.mutate();
    };

    const handleAnalyze = () => {
        analyzeMutation.mutate();
    };

    return (
        <div className="min-h-screen bg-white py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">이력서 업로드</h2>
                    <p className="text-lg text-slate-600">이력서를 업로드하고 AI 분석을 시작해보세요</p>
                </div>

                <ProgressSteps steps={steps} className="mb-12" />

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* File Upload Area */}
                    <div>
                        <FileUpload
                            onFileSelect={handleFileSelect}
                            onFileRemove={handleFileRemove}
                            selectedFile={selectedFile}
                            isUploading={uploadMutation.isPending}
                        />

                        {selectedFile && !parsedData && (
                            <div className="mt-4">
                                <Button
                                    onClick={handleUpload}
                                    disabled={uploadMutation.isPending}
                                    className="w-full"
                                >
                                    {uploadMutation.isPending ? "분석 중..." : "파일 분석하기"}
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Job Position Selection */}
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">관심 직무 선택</h3>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="position">직무</Label>
                                    <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="직무를 선택해주세요" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="backend">백엔드 개발자</SelectItem>
                                            <SelectItem value="frontend">프론트엔드 개발자</SelectItem>
                                            <SelectItem value="fullstack">풀스택 개발자</SelectItem>
                                            <SelectItem value="ai">AI/ML 엔지니어</SelectItem>
                                            <SelectItem value="devops">DevOps 엔지니어</SelectItem>
                                            <SelectItem value="mobile">모바일 개발자</SelectItem>
                                            <SelectItem value="data">데이터 사이언티스트</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="salary">희망 연봉 (만원)</Label>
                                    <Input
                                        id="salary"
                                        type="number"
                                        placeholder="예: 4000"
                                        value={expectedSalary}
                                        onChange={(e) => setExpectedSalary(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="experience">경력 연차</Label>
                                    <Select value={experienceYears} onValueChange={setExperienceYears}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="선택해주세요" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">신입</SelectItem>
                                            <SelectItem value="1">1년차</SelectItem>
                                            <SelectItem value="2">2년차</SelectItem>
                                            <SelectItem value="3">3년차</SelectItem>
                                            <SelectItem value="4">4년차</SelectItem>
                                            <SelectItem value="5+">5년차 이상</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Section */}
                {parsedData && (
                    <Card className="mt-12">
                        <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">추출된 정보 미리보기</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium text-slate-700 mb-2">기본 정보</h4>
                                    <div className="space-y-2 text-sm">
                                        <div><span className="text-slate-500">이름:</span> <span>{parsedData.name}</span></div>
                                        <div><span className="text-slate-500">이메일:</span> <span>{parsedData.email}</span></div>
                                        <div><span className="text-slate-500">연락처:</span> <span>{parsedData.phone}</span></div>
                                        <div><span className="text-slate-500">경력:</span> <span>{parsedData.experience}</span></div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-slate-700 mb-2">주요 기술</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {parsedData.skills.map((skill, index) => (
                                            <Badge key={index} variant="secondary">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {parsedData.projects.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="font-medium text-slate-700 mb-2">주요 프로젝트</h4>
                                    <div className="space-y-2 text-sm">
                                        {parsedData.projects.slice(0, 3).map((project, index) => (
                                            <div key={index} className="border-l-2 border-primary/20 pl-3">
                                                <div className="font-medium">{project.name}</div>
                                                <div className="text-slate-600">{project.description}</div>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {project.technologies.map((tech, techIndex) => (
                                                        <Badge key={techIndex} variant="outline" className="text-xs">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 pt-6 border-t border-slate-200">
                                <Button
                                    onClick={handleAnalyze}
                                    disabled={analyzeMutation.isPending || !selectedPosition}
                                    className="w-full md:w-auto"
                                >
                                    <BarChart3 className="mr-2 h-4 w-4" />
                                    {analyzeMutation.isPending ? "분석 중..." : "AI 분석 시작하기"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
