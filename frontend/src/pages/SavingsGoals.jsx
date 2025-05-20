import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getSavingsGoals, updateSavingsGoal, deleteSavingsGoal, addSavingsGoal } from '../store/slices/savingsGoalSlice';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import dayjs from '../utils/dayjs';
import toast from 'react-hot-toast';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import ThemeToggle from '../components/ThemeToggle';
import { Box,Grid,useTheme } from '@mui/material';

export default function SavingsGoals() {
  const dispatch = useDispatch();
  const [savingsGoals, setSavingsGoals] = useState([])
  const [edit, setEdit] = useState(false)
  const [editId, setEditId] = useState("")
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    targetAmount: 0,
    savedAmount: 0,
    deadline: dayjs(), // Provide a default dayjs object
  });
  const [createOpen, setCreateOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    targetAmount: 0,
    savedAmount: 0,
    deadline: null,
  });

  // const [formData,setFormData]=
  {/* title, description, targetAmount,savedAmount, deadline */ }
  useEffect(() => {
    const getdata = async () => {
      const data = await dispatch(getSavingsGoals())
      setSavingsGoals(data?.payload?.goalsWithProgress)

    }
    getdata();

  }, [])

  // console.log(savingsGoals);

  const handleEditBtn = (id, data) => {
    setEdit(true);
    setEditId(id);
    setEditData({
      title: data.title || "",
      description: data.description || "",
      targetAmount: data.targetAmount || 0,
      savedAmount: data.savedAmount || 0,
      deadline: data.deadline ? dayjs(data.deadline) : dayjs(),
    });



  };
  // console.log(editId)
  //    console.log(editData)


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      await dispatch(deleteSavingsGoal(id));
      setSavingsGoals((prev) => prev.filter((g) => g._id !== id));
    }
  };

  const handleUpdate = async () => {
    const updatedData = {
      ...editData,
      deadline: editData.deadline ? editData.deadline.toISOString() : null,
    };

    try {
      const res = await dispatch(updateSavingsGoal({ goalId: editId, data: updatedData }));
      console.log(res.payload.goal)

      if (res?.payload?.goal) {
        setSavingsGoals((prev) =>
          prev.map((g) => g._id === res.payload.goal._id ? res.payload.goal : g)
        );
        toast.success(res?.payload?.message);
      } else {
        console.error("Failed to update goal", res);
      }
      setEdit(false);
      setEditData({});
      setEditId("");
    } catch (error) {
      console.error("Edit failed:", error);
      setEdit(false);
    }
  };

  const handleCreateOpen = () => {
    setCreateOpen(true);
    setNewGoal({
      title: "",
      description: "",
      targetAmount: 0,
      savedAmount: 0,
      deadline: null,
    });
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
  };

  const handleCreateSubmit = async () => {
    try {
      const res = await dispatch(addSavingsGoal(newGoal));

      if (res?.payload?.goal) {
        setSavingsGoals((prev) => [...prev, res.payload.goal]);
      } else {
        console.error("Failed to create goal", res);
      }
      setCreateOpen(false);
    } catch (err) {
      console.error("Error creating goal:", err);
      setCreateOpen(false);
    }
  };


  const theme = useTheme()
  const cardBg = theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f5f5f5';
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pr: 4 }}>
        <ThemeToggle />
      </Box>
      <div style={{ margin: "8px", flexGrow: "revert" }}>

        <Button variant="contained" onClick={handleCreateOpen}>Add New Goal</Button>
        <div style={{ width: "100%" }}>
          {
            savingsGoals.map((goal, index) => (

              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"

                >
                  <Typography component="span" sx={{ fontWeight: "bold", fontSize: "20px" }}>{goal.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography><strong>Target:</strong> ₹{goal.targetAmount}</Typography>
                  {goal.description ? <Typography><strong>Description:</strong> {goal.description}</Typography> : <></>}
                  <Typography><strong>Saved:</strong> ₹{goal.savedAmount}</Typography>
                  <Typography><strong>Progress:</strong> {goal.progress}</Typography>
                  <Typography><strong>Suggestion:</strong> {goal.suggestion}</Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                <strong>Created:</strong> {dayjs(goal.createdAt)}
              </Typography> */}
                </AccordionDetails>
                <AccordionActions>
                  <Button variant='contained' onClick={() => handleEditBtn(goal._id, goal)}>Edit</Button>
                  <Button color="error" variant='contained' onClick={() => handleDelete(goal._id)}>Delete</Button>
                </AccordionActions>
              </Accordion>
            ))
          }
        </div>
        <Dialog
          open={edit}
          onClose={() => setEdit(false)}

        >
          <DialogTitle>Edit Goal</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
            {/* title, description, targetAmount,savedAmount, deadline */}
            <TextField autoFocus required margin="dense" id="name" name="title" label="Enter Goal" type="text" fullWidth value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
            <TextField autoFocus required margin="dense" id="name" name="description" label="Description" type="text" fullWidth value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
            <TextField autoFocus required margin="dense" id="name" name="targetAmount" label="Target Amount" type="number" fullWidth value={editData.targetAmount} onChange={(e) => setEditData({ ...editData, targetAmount: Number(e.target.value) })} />
            <TextField autoFocus required margin="dense" id="name" name="savedAmount" label="Saved Amount" type="number" fullWidth value={editData.savedAmount} onChange={(e) => setEditData({ ...editData, savedAmount: Number(e.target.value) })} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                  label="Deadline"
                  value={editData.deadline || dayjs()}  // Always ensure it's not undefined
                  onChange={(newDate) => setEditData({ ...editData, deadline: newDate })}
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
              </DemoContainer>
            </LocalizationProvider>


          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdate} variant="contained">Save</Button>
            <Button onClick={() => setEdit(false)} color="primary">Cancel</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={createOpen} onClose={handleCreateClose}>
          <DialogTitle>Add New Goal</DialogTitle>
          <DialogContent>
            <TextField autoFocus required margin="dense" label="Goal Title" fullWidth value={newGoal.title} onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })} />
            <TextField required margin="dense" label="Description" fullWidth value={newGoal.description} onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })} />
            <TextField required margin="dense" label="Target Amount" type="number" fullWidth value={newGoal.targetAmount} onChange={(e) => setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })} />
            <TextField required margin="dense" label="Saved Amount" type="number" fullWidth value={newGoal.savedAmount} onChange={(e) => setNewGoal({ ...newGoal, savedAmount: Number(e.target.value) })} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Deadline"
                value={newGoal.deadline}
                onChange={(newDate) => setNewGoal({ ...newGoal, deadline: newDate })}
                slotProps={{ textField: { fullWidth: true, required: true } }}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateClose}>Cancel</Button>
            <Button onClick={handleCreateSubmit} variant="contained">Add</Button>
          </DialogActions>
        </Dialog>


      </div>
    </>
  )
}
