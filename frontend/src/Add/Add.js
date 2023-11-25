import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
export default function AddQuestion() {
    const [obj, setobj] = useState({
        question: '', subject: '', topic: '', difficulty: '', marks: ''
    })
    function handlesubmit() {
        console.log(obj)
        axios.post('http://localhost:5000/addquestion', obj);
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
            <Paper elevation={3}>
                <TextField id="outlined-basic" value={obj.question} onChange={(e) => { setobj((obj) => ({ ...obj, question: e.target.value })); }} label="Question" variant="outlined" style={{ width: '80%', margin: '10px' }} multiline
                    maxRows={4} />
                <TextField id="outlined-basic" value={obj.subject} onChange={(e) => { setobj((obj) => ({ ...obj, subject: e.target.value })); }} label="Subject" variant="outlined" style={{ width: '80%', margin: '10px' }} />
                <TextField id="outlined-basic" value={obj.topic} onChange={(e) => { setobj((obj) => ({ ...obj, topic: e.target.value })); }} label="Topic" variant="outlined" style={{ width: '80%', margin: '10px' }} />
                <TextField id="outlined-basic" value={obj.difficulty} onChange={(e) => { setobj((obj) => ({ ...obj, difficulty: e.target.value })); }} label="Difficulty" variant="outlined" style={{ width: '80%', margin: '10px' }} />
                <TextField id="outlined-basic" value={obj.marks} onChange={(e) => { setobj((obj) => ({ ...obj, marks: e.target.value })); }} label="Marks" variant="outlined" style={{ width: '80%', margin: '10px' }} />
                <Button variant="outlined" style={{ width: '80%', margin: '10px' }} onClick={handlesubmit}>Submit</Button>
            </Paper>
        </Box>
    );
}