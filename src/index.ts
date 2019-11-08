import * as fs from 'fs';
import mailgun from 'mailgun-js'
import * as dotenv from 'dotenv';
import csvParser from 'csv-parser';


dotenv.config();

(async () => {

	const mg = mailgun({
		apiKey: process.env.mailGunApiKey as any,
		domain: process.env.mailGunDomain
	});

	fs.createReadStream('csvs/cobalt-intelligence-leads.csv')
		.pipe(csvParser())
		.on('data', (row) => {

			const mailData = {
				from: `Jordan Hansen <jordan@cobaltintelligence.com>`,
				to: row.email1,
				subject: `Jars`,
				html: `Hello!
				<br>
				we've got stuff
				<br>
				you want it
				<br>
				buy my product
				<br>
				Jordan Hansen
				<br>
				jordan@cobaltintelligence.com
				https://cobaltintelligence.com
				`
			};

			mg.messages().send(mailData, async (error, body) => {
				if (error) {
					console.error('some error', error);
				}
				console.log('Sent message');
			});
		})
		.on('error', (error) => {
			console.error('There was an error reading the csv file', error);
		})
		.on('end', () => {
			console.log('CSV file successfully processed');
		});


})();