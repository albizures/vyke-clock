import './style.css'
import requestAnimationFrames from 'request-animation-frames'
import { Clock } from './components/clock'
import { button, div, li, ul } from './elements'

function Settings() {
	return div({ class: 'settings transition-all duration-400 absolute right-0 top-0 px-4 py-2' },
		ThemeToggle(),
	)
}

function ThemeSelector(name: string) {
	function onClick() {
		document.documentElement.dataset.theme = name
	}

	return li(button({ onclick: onClick }, name))
}

function ThemeToggle() {
	return div({ class: 'dropdown dropdown-end' },
		div({ tabindex: '0', role: 'button', class: 'm-1 btn' }, 'Theme'),
		ul({ tabindex: '0', class: 'p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52' },
			ThemeSelector('cupcake'),
			ThemeSelector('dark'),
			ThemeSelector('light'),
		),
	)
}

function main() {
	const clock = Clock()

	setTimeout(async () => {
		for await (const _timestamp of requestAnimationFrames()) {
			clock.update()
		}
	})

	return div({ class: 'clock-container fixed inset w-full h-full flex justify-center items-center' },
		clock.element,
		Settings(),
	)
}

document.getElementById('app')!.append(main())
