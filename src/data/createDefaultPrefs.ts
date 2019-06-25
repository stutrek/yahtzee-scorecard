import { Preference, PreferenceTypes } from '../types';

export default function defaultPrefs (): Preference[] {
	return [
		{
			key: 'showScoresBeforeComplete',
			label: 'Show totals during game',
			type: PreferenceTypes.Boolean,
			value: false
		}
	]
}