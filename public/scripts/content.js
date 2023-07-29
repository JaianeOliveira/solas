/* eslint-disable no-redeclare */
/* global chrome */

export function search(text) {
	chrome.search.query({ text });
}
