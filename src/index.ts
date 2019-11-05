import * as fs from 'fs';
import mailgun from 'mailgun-js'
import * as dotenv from 'dotenv';
import csvParser from 'csv-parser';


dotenv.config();

(async () => {

	// fs.createReadStream('csvs/cobalt-intelligence-leads.csv')
	// 	.pipe(csvParser())
	// 	.on('data', (row) => {
	// 		console.log('row.email1', row.email1);
	// 	})
	// 	.on('end', () => {
	// 		console.log('CSV file successfully processed');
	// 	});

	const mg = mailgun({
		apiKey: process.env.mailGunApiKey as any,
		domain: 'sandbox4fb05a8ed1b34531adee291493f8c4fe.mailgun.org'
	});

	const mailData = {
		from: `Brandon Minert <brandon@citadelpackaging.com>`,
		// to: row.email1,
		to: 'brandon@citadelpackaging.com',
		subject: `Jars`,
		html: `Hello!
		<br>
		we've got stuff - https://www.citadelpackaging.com/product/4-oz-frosted-black-70-400-pp-straight-based-double-wall-jar/?utm_source=email
		<br>
		you want it
		<br>
		buy my product
		<br>
		<img src="https://mk0vozurewewn3jle8ns.kinstacdn.com/wp-content/uploads/2019/05/4-oz-Frosted-Black-70-400-PP-Straight-Based-Double-Wall-Jar.jpeg" />
		<br>
		Brandon Minert
		<br>
		brandon@citadelpackaging.com
		<br>
		${process.env.phoneNumber}
		`
	};

	mg.messages().send(mailData, async (error, body) => {
		if (error) {
			console.log('some error', error);
		}
		// console.log('Sent message', body, row.email1);
	});


})();