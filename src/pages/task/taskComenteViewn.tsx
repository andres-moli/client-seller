import dayjs from "dayjs";
import React from "react";
import { TaskComment } from "../../domain/graphql";
import FileIcon from "../../components/ui/icon/iconFile";
interface CommentProps {
  comment: TaskComment;
}

const TaskCommentView: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm mb-4">
      {/* Encabezado del comentario */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="text-sm font-semibold text-gray-700">
            {comment.createdByUser.fullName}
          </span>
          <span className="text-sm text-gray-500 ml-2">
            ({comment.createdByUser.email})
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}
        </span>
      </div>

      {/* Descripción del comentario */}
      <p className="text-gray-700 mb-2">{comment.taskDescription}</p>

      {/* Estado de la tarea */}
      <div className="mb-2">
        <span className="text-sm font-semibold text-gray-700">Estado:</span>
        <span className="text-sm text-gray-600 ml-2">{comment.taskStatus}</span>
      </div>

      {/* Archivo adjunto */}
      {comment.file && (
        <div className="mt-2">
          <a
            href={comment.file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            <FileIcon comment={comment} /> {comment.file.fileName}
          </a>
        </div>
      )}
    </div>
  );
};

export default TaskCommentView;