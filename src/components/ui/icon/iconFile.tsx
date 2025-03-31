import { FileText, FileImage, File, FileSpreadsheetIcon, LucideFileSymlink, FileVideo } from "lucide-react";

const getFileIcon = (extension: string) => {
  switch (extension.toLowerCase()) {
    case "pdf":
      return <LucideFileSymlink className="text-red-500 w-6 h-6" />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <FileImage className="text-blue-500 w-6 h-6" />;
    case "doc":
    case "docx":
      return <File className="text-blue-700 w-6 h-6" />;
    case "xls":
    case "xlsx":
          return <FileSpreadsheetIcon className="text-green-500 w-6 h-6" />;
    case "mp4":
    case "avi":
    case "mov":
    case "wmv":
    case "mkv":
      return <FileVideo className="text-purple-500 w-6 h-6" />;
    default:
      return <FileText className="text-gray-500 w-6 h-6" />;
  }
};

const FileIcon = ({ comment }: { comment: { file: { fileExtension: string } } }) => {
  return <div>{getFileIcon(comment.file.fileExtension)}</div>;
};

export default FileIcon;
