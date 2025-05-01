import React from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  Typography,
  Divider
} from '@mui/material';
import { format } from 'date-fns';


function formatDate(dateString: any) {
  try {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy');
  } catch (e) {
    return dateString;
  }
}

function CommentList({ comments }: any) {
    if (!comments || comments.length === 0) {
        return (
        <Box sx={{ py: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">
            No comments yet. Be the first to comment!
            </Typography>
        </Box>
        );
    }
  
    return (
        <List>
        {comments.map((comment: any, index: any) => (
            <React.Fragment key={comment.id}>
            <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                <ListItemAvatar>
                <Avatar 
                    alt={comment.user} 
                    src={`https://i.pravatar.cc/150?u=${comment.user}`} 
                />
                </ListItemAvatar>
                <ListItemText
                primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle2" component="span">
                        {comment.user}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" component="span">
                        {formatDate(comment.timestamp)}
                    </Typography>
                    </Box>
                }
                secondary={
                    <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ mt: 1 }}
                    >
                    {comment.text}
                    </Typography>
                }
                />
            </ListItem>
            {index < comments.length - 1 && (
                <Divider variant="inset" component="li" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
            )}
            </React.Fragment>
        ))}
        </List>
    );
}

export default CommentList;