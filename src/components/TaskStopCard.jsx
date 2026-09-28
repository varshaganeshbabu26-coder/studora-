import { CheckCircle2, Circle, Calendar, Sparkles, Pencil, Trash2 } from 'lucide-react'
import Modal from './Modal'
import Badge from './Badge'
import Button from './Button'

export default function TaskStopCard({ open, onClose, task, onToggle, onEdit, onDelete, onAskAI }) {
  if (!task) return null

  return (
    <Modal open={open} onClose={onClose} title="Task details">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
          <Badge variant={task.completed ? 'success' : 'default'}>
            {task.completed ? 'Done' : 'Pending'}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Due: {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="primary">{task.subject}</Badge>
          <Badge variant={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'default'}>
            {task.priority}
          </Badge>
        </div>

        <div className="flex flex-col gap-2 border-t border-gray-100 pt-4 sm:flex-row">
          <Button
            variant={task.completed ? 'secondary' : 'primary'}
            onClick={() => onToggle(task.id)}
            className="flex-1"
          >
            {task.completed ? <Circle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            {task.completed ? 'Mark undone' : 'Mark done'}
          </Button>
          <Button variant="outline" onClick={() => onEdit(task)}>
            <Pencil className="h-4 w-4" /> Edit
          </Button>
          <Button variant="ghost" onClick={() => onAskAI(task)}>
            <Sparkles className="h-4 w-4" /> Ask AI
          </Button>
          <Button variant="danger" onClick={() => onDelete(task.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Modal>
  )
}
