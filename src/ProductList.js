import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Checkbox } from '@mui/material';
import { useState, useEffect } from 'react';

export default function CheckboxList({ list, purchaseIsDone }) {
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const completedProducts = list.filter(item => item.completed);
    setChecked(completedProducts);
  }, [list]);

  const handleToggle = (value, productId) => () => {
    setChecked(prevChecked => [...prevChecked, productId]);
    purchaseIsDone(productId);
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {list.map((value, index) => {
        return (
          <ListItem
            key={index}
            disablePadding
            sx={{
              borderRadius: '4px',
              backgroundColor:
                checked.indexOf(value) !== -1
                  ? 'rgba(25, 118, 210, 0.1)'
                  : 'inherit',
              mb: '4px',
            }}
          >
            <ListItemButton
              role={undefined}
              onClick={handleToggle(value, index)}
            >
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
