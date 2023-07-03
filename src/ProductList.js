import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Checkbox } from '@mui/material';
import { useState } from 'react';

export default function CheckboxList({ list }) {
  const [checked, setChecked] = useState([]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {list.map((value, index) => {
        return (
          <ListItem
            key={index}
            disablePadding
            onClick={handleToggle(value)}
            sx={{
              borderRadius: '4px',
              backgroundColor:
                checked.indexOf(value) !== -1
                  ? 'rgba(25, 118, 210, 0.1)'
                  : 'inherit',
              mb: '4px',
            }}
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  padding={10}
                  edge='start'
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={value.products} />
              <ListItemText
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
                primary={value.quantity}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
