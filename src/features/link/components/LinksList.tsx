import { useEffect, useState } from "react";
import { useLinks } from "../hooks/useLink";
import { useReorderLinks } from "../hooks/useReorderLinks";
import Empty from "@/components/ui/Empty";
import LinkListSeleton from "./LinkListSeleton";
import LinkItem from "./LinkItem";
import type { LinkDTO } from "@/types/link";

function LinksList() {
  const { links, isLoading } = useLinks();
  const { reorderLinks } = useReorderLinks();

  const [orderedLinks, setOrderedLinks] = useState<LinkDTO[]>([]);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  useEffect(() => {
    if (links) {
      setOrderedLinks(links);
    }
  }, [links]);

  if (isLoading) return <LinkListSeleton />;

  if (!links || links.length === 0) return <Empty message="No links yet" />;

  const handleMove = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= orderedLinks.length || fromIndex === toIndex) {
      return;
    }

    const next = [...orderedLinks];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);

    setOrderedLinks(next);
    const validIds = next
      .map((l) => l.link_id)
      .filter((id): id is number => typeof id === "number");
    reorderLinks(validIds);
  };


  const handleDragStart = (index: number) => {
    setDraggedIdx(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragOverIdx !== index) {
      setDragOverIdx(index);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === dropIndex) {
      setDraggedIdx(null);
      setDragOverIdx(null);
      return;
    }

    handleMove(draggedIdx, dropIndex);
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  return (
    <div className="flex flex-col gap-3">
      {orderedLinks.map((link: LinkDTO, index: number) => (
        <LinkItem
          key={link.link_id}
          link={link}
          isFirst={index === 0}
          isLast={index === orderedLinks.length - 1}
          onMoveUp={() => handleMove(index, index - 1)}
          onMoveDown={() => handleMove(index, index + 1)}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          isDragging={draggedIdx === index}
          isDragOver={dragOverIdx === index}
        />
      ))}
    </div>
  );
}

export default LinksList;
