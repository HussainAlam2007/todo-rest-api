import Todo from "../models/todo.model.js";
import mongoose from "mongoose";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "title is required",
      });
    }
    const todo = await Todo.create({ title, description });
    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTodos = async (req, res) => {
  try {
    const { search, sort, page = 1, limit = 20 } = req.query;
    let query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    let sortOption = {};
    if (sort === "asc") sortOption.createdAt = 1;
    else sortOption.createdAt = -1;
    const skip = (page - 1) * limit;
    const todos = await Todo.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));
    const totalTodos = await Todo.countDocuments(query);
    return res.status(200).json({
      success: true,
      message: "Todo fetched successfully",
      total: totalTodos,
      page: Number(page),
      limit: Number(limit),
      data: todos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Todo ID",
      });
    }
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo Fetched Successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Todo ID",
      });
    }
    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }
    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const toggleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Todo ID",
      });
    }
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not Found",
      });
    }
    todo.isCompleted = !todo.isCompleted;
    await todo.save();
    return res.status(200).json({
      success: true,
      message: "Todo toggled successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Todo ID",
      });
    }
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
