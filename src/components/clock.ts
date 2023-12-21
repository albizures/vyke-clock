import { div, span } from '../elements'

function zeroPad(value: number) {
	const strValue = String(value)

	if (strValue.length === 1) {
		return `0${strValue}`
	}

	return strValue
}

function getValues(date: Date) {
	return {
		hours: zeroPad(date.getHours()),
		minutes: zeroPad(date.getMinutes()),
		seconds: zeroPad(date.getSeconds()),
	}
}

function ClockValueContainer(...children: Array<HTMLElement | string>) {
	return div({ class: 'flex flex-col md:text-2xl' }, ...children)
}

function ClockValue(defaultValue: string, label: string) {
	const value = span({
		style: { '--value': defaultValue },
	})
	const ref = {
		update(update: string) {
			(value as HTMLSpanElement).style.setProperty('--value', update)
		},
		element: ClockValueContainer(
			span({ class: 'countdown font-mono justify-center text-4xl md:text-8xl' },
				value,
			),
			label,
		),
	}

	return ref
}

export function Clock() {
	const values = getValues(new Date())

	const hours = ClockValue(values.hours, 'hours')
	const minutes = ClockValue(values.minutes, 'minutes')
	const seconds = ClockValue(values.seconds, 'seconds')

	const ref = {
		update() {
			const values = getValues(new Date())
			hours.update(values.hours)
			minutes.update(values.minutes)
			seconds.update(values.seconds)
		},
		element: div({ class: 'grid grid-flow-col gap-5 text-center auto-cols-max' },
			hours.element,
			span({ class: 'text-4xl md:text-7xl' }, ':'),
			minutes.element,
			span({ class: 'text-4xl md:text-7xl' }, ':'),
			seconds.element,
		),
	}

	return ref
}
