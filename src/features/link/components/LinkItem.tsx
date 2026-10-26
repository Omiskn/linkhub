import type { LinkDTO } from "@/types/link";
import LinkOperation from "./LinkOperation";
import { GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import React from "react";

type LinkItemProps = {
  link: LinkDTO;
  isFirst?: boolean;
  isLast?: boolean;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  isDragging?: boolean;
  isDragOver?: boolean;
};

function LinkItem({
  link,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  draggable,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  isDragging,
  isDragOver,
}: LinkItemProps) {
  return (
    <div
      key={link.link_id}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      className={`flex flex-col gap-3 rounded-xl border bg-background p-3 transition-all sm:flex-row sm:items-center sm:justify-between ${
        isDragging ? "opacity-40 scale-[0.98]" : "opacity-100"
      } ${
        isDragOver ? "border-primary ring-2 ring-primary/20" : "border-border"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <div
            className="cursor-grab active:cursor-grabbing rounded-lg border p-2 text-muted-foreground hover:bg-muted"
            title="Drag to reorder"
            aria-label="Drag handle"
          >
            <GripVertical className="size-4" />
          </div>

          <div className="flex flex-col gap-0.5">
            <button
              type="button"
              disabled={isFirst}
              onClick={onMoveUp}
              className="rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed"
              title="Move up"
              aria-label="Move up"
            >
              <ChevronUp className="size-3" />
            </button>
            <button
              type="button"
              disabled={isLast}
              onClick={onMoveDown}
              className="rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed"
              title="Move down"
              aria-label="Move down"
            >
              <ChevronDown className="size-3" />
            </button>
          </div>
        </div>

        <div>
          <p className="font-medium">{link.title}</p>
          <p className="text-sm text-muted-foreground break-all">{link.url}</p>
        </div>
      </div>

      <LinkOperation link={link} isActive={link.is_active} />
    </div>
  );
}

export default LinkItem;
