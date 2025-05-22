import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Avatar,
  Stack
} from '@mui/material';

function CommentForm({ onAddComment }: any) {
    const [comment, setComment] = useState('');
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (comment.trim() === '') return;
        
        const newComment = {
            text: comment,
        };
        
        onAddComment(newComment);
        setComment('');
    };
    
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar 
            src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg" 
            alt="User" 
            sx={{ width: 40, height: 40 }} 
            />
            <Box sx={{ flexGrow: 1 }}>
            <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                variant="outlined"
                sx={{
                mb: 1,
                '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }
                }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={comment.trim() === ''}
                >
                Post
                </Button>
            </Box>
            </Box>
        </Stack>
        </Box>
    );
}

export default CommentForm;