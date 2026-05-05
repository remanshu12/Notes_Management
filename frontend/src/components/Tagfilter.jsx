import React from "react";

function TagFilter({ tags, selectedTag, onSelectTag }) {
  return (
    <div className="tag-filter">
      <button onClick={() => onSelectTag("")}>All</button>

      {tags.map((tag) => (
        <button
          key={tag}
          className={selectedTag === tag ? "active-tag" : ""}
          onClick={() => onSelectTag(tag)}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}

export default TagFilter;