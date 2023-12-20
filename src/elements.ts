import { createProxy } from '@vyke/elements'
import {
	type HtmlChild,
	type HtmlConfig,
	createHtmlElement,
} from '@vyke/elements/dom'

export const {
	div,
	span,
	details,
	summary,
	ul,
	li,
	a,
	button,
} = createProxy<HtmlConfig, HtmlChild>(createHtmlElement)
