import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
export default function CreatePaper() {
    const [obj, setobj] = useState({
        easy: '', medium: '', hard: '', marks: ''
    })
    const [question, setquestion] = useState("");
    async function generatePaper() {
        const data = await axios.post('http://localhost:5000/generatepaper', obj);
        setquestion(JSON.stringify(data.data));
        console.log(question)
    }
    return (
        <Box
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                width: '100%',
                height: '80vh',
                padding: '10px'
            }}
        >
            <Paper elevation={3} style={{ width: '100%' }}>
                <TextField id="outlined-basic" value={obj.easy} onChange={(e) => { setobj((obj) => ({ ...obj, easy: e.target.value })); }} label="Easy Percentage" variant="outlined" style={{ width: '80%', margin: '10px' }} multiline
                />
                <TextField id="outlined-basic" value={obj.medium} onChange={(e) => { setobj((obj) => ({ ...obj, medium: e.target.value })); }} label="Medium Percentage" variant="outlined" style={{ width: '80%', margin: '10px' }} multiline
                />
                <TextField id="outlined-basic" value={obj.hard} onChange={(e) => { setobj((obj) => ({ ...obj, hard: e.target.value })); }} label="Hard Percentage" variant="outlined" style={{ width: '80%', margin: '10px' }} multiline
                />
                <TextField id="outlined-basic" value={obj.marks} onChange={(e) => { setobj((obj) => ({ ...obj, marks: e.target.value })); }} label="Total Marks Distribution" variant="outlined" style={{ width: '80%', margin: '10px' }} multiline
                />
                <Button variant="outlined" style={{ width: '80%', margin: '10px' }} onClick={generatePaper}>Create Paper</Button>

            </Paper>
            <h4>
                {question}
            </h4>
        </Box>
    );
}