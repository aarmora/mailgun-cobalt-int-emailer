import * as fs from 'fs';
import mailgun from 'mailgun-js'
import * as dotenv from 'dotenv';
import csvParser from 'csv-parser';


dotenv.config();

(async () => {

	fs.createReadStream('csvs/cobalt-intelligence-leads.csv')
		.pipe(csvParser())
		.on('data', (row) => {
			console.log('row.email1', row.email1);
		})
		.on('error', (error) => {
			console.error('There was an error reading the csv file', error);
		})
		.on('end', () => {
			console.log('CSV file successfully processed');
		});

	const mg = mailgun({
		apiKey: process.env.mailGunApiKey as any,
		domain: process.env.mailGunDomain
	});

	const mailData = {
		from: `Jordan Hansen <jordan@cobaltintelligence.com>`,
		to: 'jbhansen84@gmail.com',
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


})();