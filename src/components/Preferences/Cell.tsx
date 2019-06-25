import React from 'react';

import { usePreferenceArray } from '../../data/dataHooks';

const PreferencesCell: React.FC<{}> = () => {
	const [loading, prefs, setPreference] = usePreferenceArray();
	if (loading || prefs === undefined) {
		return null;
	}

	return <React.Fragment>
		{prefs.map(pref => {
			const toggle = () => {
				setPreference(pref.key, !pref.value);
			}
			return  <input type="checkbox" checked={!!pref.value} onChange={toggle} key={pref.key} />
		})}
	</React.Fragment>
}

export default PreferencesCell;