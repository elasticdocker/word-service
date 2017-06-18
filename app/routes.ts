/**
 * Main application routes
 */

export default function (app: any) {
	// Insert all routes below
	app.use('/api', require('./api/hangman'));
}
