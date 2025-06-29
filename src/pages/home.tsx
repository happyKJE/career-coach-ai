import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, ChartLine, Target, Bus, Upload, Play } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-hero">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Bus className="h-8 w-8 text-primary" />
                            <span className="ml-2 text-xl font-bold text-slate-900">ResumeAI</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                        AI가 분석하는<br/>
                        <span className="text-primary">스마트 이력서 진단</span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                        인공지능 기술로 이력서를 분석하고, 맞춤형 개선 방안을 제시합니다.<br/>
                        경쟁력 있는 이력서로 취업 성공률을 높여보세요.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link href="/upload">
                            <Button size="lg" className="text-lg font-semibold py-4 px-8">
                                <Upload className="mr-2 h-5 w-5" />
                                시작하기
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="text-lg font-semibold py-4 px-8">
                            <Play className="mr-2 h-5 w-5" />
                            데모 보기
                        </Button>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-3 gap-8 mt-16">
                        <Card className="bg-white border-slate-200 card-hover">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                    <Brain className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">AI 기반 분석</h3>
                                <p className="text-slate-600">GPT 기술을 활용한 정확한 이력서 분석과 개선 제안</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border-slate-200 card-hover">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                    <ChartLine className="h-6 w-6 text-emerald-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">경쟁력 분석</h3>
                                <p className="text-slate-600">시장 데이터 기반 경쟁자 대비 포지션 분석</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border-slate-200 card-hover">
                            <CardContent className="p-6">
                                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                    <Target className="h-6 w-6 text-amber-600" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">맞춤 추천</h3>
                                <p className="text-slate-600">개인별 맞춤 직무 추천 및 스킬 강화 가이드</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <Bus className="h-6 w-6 text-primary-400" />
                                <span className="ml-2 text-xl font-bold">ResumeAI</span>
                            </div>
                            <p className="text-slate-400">AI 기술로 더 나은 이력서를 만들어보세요.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">서비스</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="#" className="hover:text-white">이력서 분석</a></li>
                                <li><a href="#" className="hover:text-white">자기소개서 생성</a></li>
                                <li><a href="#" className="hover:text-white">면접 대비</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">지원</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="#" className="hover:text-white">FAQ</a></li>
                                <li><a href="#" className="hover:text-white">고객센터</a></li>
                                <li><a href="#" className="hover:text-white">이용약관</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">연락처</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li>이메일: help@resumeai.com</li>
                                <li>전화: 02-1234-5678</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
                        <p>&copy; 2024 ResumeAI. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
