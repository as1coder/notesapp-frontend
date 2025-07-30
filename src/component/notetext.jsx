import React, { useState } from 'react';

const Notetext = ({ text, id, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onSave(id, editedText);
    setIsEditing(false);
  };

  return (
    <div className="bg-slate-600 rounded-xl mt-6 p-4 shadow-lg shadow-slate-700 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
      {isEditing ? (
        <input
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="text-black px-4 py-2 rounded w-full sm:flex-1"
        />
      ) : (
        <div className="text-white text-base font-medium break-words whitespace-pre-wrap w-full sm:flex-1">
          {text}
        </div>
      )}
      <div className="flex gap-2 mt-2  justify-around">
        <button
          className="bg-slate-700 hover:bg-slate-400 text-white px-4 py-1 rounded-lg shadow hover:shadow-md transition duration-200 w-fit self-end sm:self-auto"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>

        {isEditing ? (
          <button
            className="bg-green-600 hover:bg-green-400 text-white px-4 py-1 rounded-lg shadow hover:shadow-md transition duration-200 w-fit self-end sm:self-auto"
            onClick={handleSaveClick}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-slate-700 hover:bg-slate-400 text-white px-4 py-1 rounded-lg shadow hover:shadow-md transition duration-200 w-fit self-end sm:self-auto"
            onClick={handleEditClick}
          >
            Edit
          </button>
      )}
      </div>
    </div>
  );
};

export default Notetext;
