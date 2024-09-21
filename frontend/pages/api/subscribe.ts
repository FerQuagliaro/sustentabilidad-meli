// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default async function subscribeFormHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Only POST requests allowed' });
  }
  // Save user in Sheets
  try {
    // Try to add the user to Strapi
    // await axios.post(`${process.env.API_BASEURL}/subscribed-users`, {
    //   name: req.body.name,
    //   email: req.body.email,
    //   description: req.body.description,
    // });

    await new Promise((resolve, reject) => {
      const spreadsheetId = '1Jvuqz3YnXaOU-vKVy-uJJOZStm9PurhwDora5Gd-k7U';
      const sheetName = `subscriptions-${req.body.locale || 'es'}`;

      const jwtClient = new google.auth.JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
          /\\n/g,
          '\n'
        ),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({
        version: 'v4',
        auth: jwtClient,
      });

      sheets.spreadsheets.values.get(
        {
          auth: jwtClient,
          spreadsheetId: spreadsheetId,
          range: `${sheetName}!A:A`,
        },
        (err, res) => {
          if (err) {
            return reject(err);
          }

          const data = res?.data?.values || [];
          let i = 0;

          // Get the first empty row
          for (i = 0; i < data.length; i++) {
            if (!data[i][0]) break;
          }

          sheets.spreadsheets.values.update(
            {
              auth: jwtClient,
              spreadsheetId: spreadsheetId,
              range: `${sheetName}!A${i + 1}`,
              valueInputOption: 'USER_ENTERED',
              requestBody: {
                values: [[req.body.name, req.body.email, req.body.whoAreYou]],
              },
            },
            (err, resp) => {
              if (err) {
                console.log('Data Error :', err);
                reject(err);
              }
              resolve(resp);
            }
          );
        }
      );
    });

    return res.status(200).json({
      message: 'Message sent correctly',
      status: 'OK',
    });
  } catch (e: any) {
    console.log(e.response?.data?.errors || e.response?.data?.error);

    return res.status(500).json({
      message: e.message,
      error: e.message,
      status: 'Internal Server Error',
    });
  }
}
