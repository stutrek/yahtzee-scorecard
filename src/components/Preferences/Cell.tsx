import React, { useState } from 'react';

import GameNavigation from './GameNavigation';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import { usePreferenceArray, useCurrentGame } from '../../data/dataHooks';

const PreferencesCell: React.FC<{}> = () => {
	const [loading, prefs, setPreference] = usePreferenceArray();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	
	if (loading || prefs === undefined) {
		return null;
	}

	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
	  setAnchorEl(event.currentTarget);
	}
  
	function handleClose() {
	  setAnchorEl(null);
	}
  
	return <div>
		<Button onClick={handleClick}>
			Open Menu
		</Button>
		<Menu
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClose={handleClose}
		>
			<GameNavigation />
			{prefs.map(pref => {
				const toggle = () => {
					setPreference(pref.key, !pref.value);
				}
				return <MenuItem key={pref.key}>
					<FormControlLabel
						control={
							<Switch
								checked={!!pref.value}
								onChange={toggle}
								color="primary"
							/>
						}
						label={pref.label}
					/>
				</MenuItem>
			})}
    	</Menu>

	</div>;
}

export default PreferencesCell;