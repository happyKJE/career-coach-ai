import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload, File, X } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    onFileRemove: () => void;
    selectedFile: File | null;
    isUploading?: boolean;
    className?: string;
}

export function FileUpload({
                               onFileSelect,
                               onFileRemove,
                               selectedFile,
                               isUploading = false,
                               className
                           }: FileUploadProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/plain': ['.txt'],
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        },
        multiple: false,
        disabled: isUploading,
    });

    if (selectedFile) {
        return (
            <div className={cn("bg-slate-50 rounded-xl p-6 border border-slate-300", className)}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <File className="h-8 w-8 text-slate-400" />
                        <div>
                            <p className="font-medium text-slate-900">{selectedFile.name}</p>
                            <p className="text-sm text-slate-500">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onFileRemove}
                        disabled={isUploading}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div
            {...getRootProps()}
            className={cn(
                "bg-slate-50 rounded-xl p-8 border-2 border-dashed border-slate-300 hover:border-primary/50 transition-colors duration-200 cursor-pointer",
                isDragActive && "border-primary bg-primary/5",
                isUploading && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            <input {...getInputProps()} />
            <div className="text-center">
                <CloudUpload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">이력서 파일 업로드</h3>
                <p className="text-slate-600 mb-4">PDF, DOCX, TXT 파일을 지원합니다</p>
                <Button
                    type="button"
                    disabled={isUploading}
                    className="pointer-events-none"
                >
                    {isUploading ? "업로드 중..." : "파일 선택"}
                </Button>
                <p className="text-sm text-slate-500 mt-2">또는 파일을 여기로 드래그하세요</p>
            </div>
        </div>
    );
}
