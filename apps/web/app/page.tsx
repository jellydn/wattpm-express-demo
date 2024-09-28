import styles from "./page.module.css";

// This URL is available only in wattpm
const API_URL = "http://http-node.plt.local";

/**
 * Fetches content from the internal node API service.
 * @returns {Promise<string>} The content retrieved from the API.
 * @throws {Error} If the fetch operation fails or the response is invalid.
 */
async function fetchContent() {
	const response = await fetch(API_URL, { cache: "no-store" });
	const data = await response.json();
	return data.content;
}

export default async function Home() {
	const content = await fetchContent();

	return (
		<div className={styles.page}>
			<main className={styles.main}>{content}</main>
		</div>
	);
}
