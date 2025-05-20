import Savings from "../models/savings.model.js";
import Income from "../models/income.model.js";
import Expense from "../models/expense.model.js";
import mongoose from "mongoose";
import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const addSavingsGoal = async (req, res) => {
  const { title, description, targetAmount, savedAmount, deadline } = req.body;
  const user = req.user._id;
  try {
    const income = await Income.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(user) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expense = await Expense.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(user) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const incomeTotal = income[0]?.total || 0;
    const expenseTotal = expense[0]?.total || 0;

    const savingsGoal = new Savings({
      user,
      title,
      description,
      targetAmount,
      savedAmount,
      deadline,
    });

    const prompt = `
You are a smart financial assistant. Here is a user's savings goal:
- Goal Title: ${savingsGoal.title}
- Description: ${savingsGoal?.description}
- Target Amount: ₹${savingsGoal.targetAmount}
- Saved So Far: ₹${savingsGoal.savedAmount}
- Deadline: ${
      savingsGoal.deadline
        ? new Date(savingsGoal.deadline).toDateString()
        : "N/A"
    }
- Current Total Income: ₹${incomeTotal}
- Total Expenses: ₹${expenseTotal}

Suggest a brief strategy (1-2 lines) to improve progress toward this specific goal. Be practical and concise.
        `;

    let suggestion = "No suggestion available.";

    try {
      const aiResponse = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful financial advisor AI.",
          },
          { role: "user", content: prompt },
        ],
        model: "llama-3.3-70b-versatile",
      });

      suggestion = aiResponse.choices[0]?.message?.content || suggestion;
    } catch (err) {
      console.log("AI suggestion error:", err.message);
    }

    const newGoal = await savingsGoal.save();
    const progress = Math.min(
      (newGoal.savedAmount / newGoal.targetAmount) * 100,
      100
    ).toFixed(2);
    const goal = { ...newGoal.toObject(), suggestion, progress };

    res.status(200).json({ message: "new goal created", goal });
  } catch (error) {
    console.log("Error in add Savings Goal controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSavingsGoal = async (req, res) => {
  const userId = req.user._id;
  // console.log(userId)
  try {
    const income = await Income.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expense = await Expense.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const incomeTotal = income[0]?.total || 0;
    const expenseTotal = expense[0]?.total || 0;
    const savings = incomeTotal - expenseTotal;
    const goals = await Savings.find({ user: userId });
    if (!goals) {
      res.status(404).json({ message: "No Goals Found!" });
    }
    // console.log(incomeTotal,expenseTotal, savings)
    const goalsWithProgress = await Promise.all(
      goals.map(async (goal) => {
        const progress = Math.min(
          (goal.savedAmount / goal.targetAmount) * 100,
          100
        ).toFixed(2);

        const prompt = `
You are a smart financial assistant. Here is a user's savings goal:
- Goal Title: ${goal.title}
- Description: ${goal?.description}
- Target Amount: ₹${goal.targetAmount}
- Saved So Far: ₹${goal.savedAmount}
- Deadline: ${goal.deadline ? new Date(goal.deadline).toDateString() : "N/A"}
- Current Total Income: ₹${incomeTotal}
- Total Expenses: ₹${expenseTotal}

Suggest a brief strategy (1-2 lines) to improve progress toward this specific goal. Be practical and concise.
        `;

        let suggestion = "No suggestion available.";

        try {
          const aiResponse = await groq.chat.completions.create({
            messages: [
              {
                role: "system",
                content: "You are a helpful financial advisor AI.",
              },
              { role: "user", content: prompt },
            ],
            model: "llama-3.3-70b-versatile",
          });

          suggestion = aiResponse.choices[0]?.message?.content || suggestion;
        } catch (err) {
          console.log("AI suggestion error:", err.message);
        }

        return {
          ...goal.toObject(),
          progress: `${progress}%`,
          suggestion,
        };
      })
    );

    res.status(200).json({ goalsWithProgress });
  } catch (error) {
    console.log("Error in get savings goal controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getGoals = async (req, res) => {
  try {
    const goals = await Savings.find({ user: req.user._id });
    res.json(goals);
  } catch (error) {
    console.log("Error in get goals controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSavingsGoal = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Savings.findByIdAndDelete({ _id: id });
    if (response) {
      res.status(200).json({ message: "Goal Deleted Successfully" });
    } else {
      res.status(404).json({ message: "could not find goal", goal: response });
    }
  } catch (error) {
    console.log("Error in delete savings goal controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateSavingsGoal = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  const { title, description, targetAmount, savedAmount, deadline } = req.body;

  try {
    const income = await Income.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expense = await Expense.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const incomeTotal = income[0]?.total || 0;
    const expenseTotal = expense[0]?.total || 0;

    const goal = await Savings.findOne({ _id: id });
    if (!goal) {
      return res.status(404).json({ message: "Goal not found!" });
    }

    const updatedGoal = await Savings.findByIdAndUpdate(
      id,
      { title, description, targetAmount, savedAmount, deadline },
      { new: true }
    );

    const prompt = `
You are a smart financial assistant. Here is a user's savings goal:
- Goal Title: ${updatedGoal.title}
- Description: ${updatedGoal?.description}
- Target Amount: ₹${updatedGoal.targetAmount}
- Saved So Far: ₹${updatedGoal.savedAmount}
- Deadline: ${
      updatedGoal.deadline
        ? new Date(updatedGoal.deadline).toDateString()
        : "N/A"
    }
- Current Total Income: ₹${incomeTotal}
- Total Expenses: ₹${expenseTotal}

Suggest a brief strategy (1-2 lines) to improve progress toward this specific goal. Be practical and concise.
        `;

    let suggestion = "No suggestion available.";

    try {
      const aiResponse = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful financial advisor AI.",
          },
          { role: "user", content: prompt },
        ],
        model: "llama-3.3-70b-versatile",
      });

      suggestion = aiResponse.choices[0]?.message?.content || suggestion;
    } catch (err) {
      console.log("AI suggestion error:", err.message);
    }
    const progress = Math.min(
      (updatedGoal.savedAmount / updatedGoal.targetAmount) * 100,
      100
    ).toFixed(2);
    const updatedGoalWithSuggestion = {
      ...updatedGoal.toObject(),
      suggestion,
      progress,
    };

    res
      .status(200)
      .json({
        message: "Goal updated successfully!",
        goal: updatedGoalWithSuggestion,
      });
  } catch (error) {
    console.log("Error in updateSavingsGoal controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
