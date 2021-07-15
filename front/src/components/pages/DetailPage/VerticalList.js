import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

function VerticalList() {
    return (
        <List component="nav" aria-label="mailbox folders">
            <ListItem button>
                <ListItemText primary="Inbox" />
            </ListItem>
            <Divider />
            <ListItem button divider>
                <ListItemText primary="Drafts" />
            </ListItem>
        </List>
    );
}

export default VerticalList
