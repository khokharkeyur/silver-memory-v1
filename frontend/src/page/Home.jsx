import React, { useEffect, useState } from "react";
import api from "../component/api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotes,
  addNote,
  updateNote,
  deleteNote,
} from "../redux/todoReducers";

const Home = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.list);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [deleteNoteId, setDeleteNoteId] = useState(null);

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    name: "",
  });

  const fetchNotesData = async () => {
    try {
      const res = await api.get("/task");
      dispatch(setNotes(res.data || []));
    } catch (error) {
      toast.error("Failed to fetch notes");
    }
  };

  useEffect(() => {
    fetchNotesData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormValues({ title: "", description: "", name: "" });
    setIsEditing(false);
    setEditNoteId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (isEditing) {
        res = await api.put(`/task/updateTask/${editNoteId}`, formValues);
        console.log("res.data :", res.data);
        dispatch(updateNote(res.data));
        toast.success("Note updated successfully");
      } else {
        res = await api.post("/task/create", formValues);
        dispatch(addNote(res.data));
        toast.success("Note created successfully");
      }

      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (note) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setEditNoteId(note._id);
    setFormValues({
      title: note.title,
      description: note.description,
      name: note.name,
    });
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/task/delete/${deleteNoteId}`);
      dispatch(deleteNote(deleteNoteId));
      toast.success("Note deleted successfully");
      setDeleteNoteId(null);
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Notes Management</h1>
        <button
          className="bg-blue-500 px-4 py-2 rounded"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
        >
          Create Note
        </button>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-4">
        {notes.length === 0 ? (
          <p className="text-gray-500">No notes available</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <p className="text-gray-600">{note.description}</p>
              <p className="text-sm text-gray-400 mt-2">By {note.name}</p>

              <div className="flex gap-2 mt-4">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded w-full"
                  onClick={() => handleEdit(note)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded w-full"
                  onClick={() => setDeleteNoteId(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-center">
              {isEditing ? "Edit Note" : "Create Note"}
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formValues.title}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-2"
                required
              />

              <input
                type="text"
                name="name"
                placeholder="Author Name"
                value={formValues.name}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-2"
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formValues.description}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-3"
                rows="3"
                required
              />

              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteNoteId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow text-center w-80">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete?
            </h2>
            <div className="flex justify-between">
              <button
                className="bg-gray-400 px-4 py-2 rounded text-white"
                onClick={() => setDeleteNoteId(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 px-4 py-2 rounded text-white"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
